#!/usr/bin/env python3
"""Publishing checks for this site. Read-only: never modifies the checkout.

  pages    Rebuild with `node src/build.mjs` in a temporary copy and confirm the
           committed pages (*.html, en/*.html, ro/*.html) match src/content.mjs and assets/.
  contact  Scan every file that would be published for Alex's contact details
           (email addresses, phone numbers, tel:/mailto: links, LinkedIn URLs).
           Only values listed in automations/approved-public-contact.json pass;
           add a value there only when Andreea says Alex agreed to publish it.
"""
import json
from pathlib import Path
import re
import shutil
import subprocess
import sys
import tempfile

ROOT = Path(__file__).resolve().parents[1]
PAGES = ['index.html', 'services.html', 'book.html',
         'en/index.html', 'en/services.html', 'en/book.html',
         'ro/index.html', 'ro/services.html', 'ro/book.html']
# Technical strings that look like contact data but are not anyone's details.
NOT_CONTACT = {'git@github.com'}
PATTERNS = {
    'email': re.compile(r'[A-Za-z0-9._%+-]+@[A-Za-z0-9-]+(?:\.[A-Za-z0-9-]+)*\.[A-Za-z]{2,}'),
    'phone': re.compile(r'(?<![\w.#-])(?:\+|00)\d[\d ().-]{7,}\d|(?<![\w.#-])07\d{2}[ .-]?\d{3}[ .-]?\d{3}(?!\d)'),
    'tel link': re.compile(r'tel:[^\s"\'<>)]+', re.I),
    'mailto link': re.compile(r'mailto:[^\s"\'<>)]+', re.I),
    'LinkedIn': re.compile(r'linkedin\.com/[^\s"\'<>)]*', re.I),
    'contactEmail': re.compile(r'contactEmail\s*:\s*[\'"]([^\'"]+)[\'"]'),
}


def check_pages():
    with tempfile.TemporaryDirectory() as tmp:
        tmp = Path(tmp)
        for d in ('src', 'assets'):
            shutil.copytree(ROOT / d, tmp / d)
        (tmp / 'ro').mkdir()
        subprocess.run(['node', str(tmp / 'src/build.mjs')], cwd=tmp, check=True)
        stale = [p for p in PAGES if not (ROOT / p).exists()
                 or (ROOT / p).read_bytes() != (tmp / p).read_bytes()]
    if stale:
        return [f'{p} is not up to date with src/ and assets/; run `node src/build.mjs` and review.'
                for p in stale]
    print(f'pages: {len(PAGES)} generated pages match src/build.mjs output.')
    return []


def check_contact():
    approved = set(json.loads((ROOT / 'automations/approved-public-contact.json').read_text())['approved'])
    files = subprocess.run(['git', 'ls-files', '-z', '--cached', '--others', '--exclude-standard'],
                           cwd=ROOT, check=True, capture_output=True).stdout.decode().split('\0')
    problems = []
    for name in filter(None, files):
        path = ROOT / name
        if not path.is_file() or name == 'scripts/check_site.py':
            continue
        text = path.read_text(errors='ignore')
        for kind, pattern in PATTERNS.items():
            for m in pattern.finditer(text):
                value = m.group(m.lastindex or 0)
                if kind in ('mailto link', 'tel link') and value.lower() in ('mailto:', 'tel:'):
                    continue
                if value in NOT_CONTACT or value in approved:
                    continue
                if kind == 'phone' and len(re.sub(r'\D', '', value)) < 9:
                    continue
                line = text.count('\n', 0, m.start()) + 1
                problems.append(f'{name}:{line}: possible {kind} "{value}" is not in '
                                'automations/approved-public-contact.json')
    if not problems:
        print(f'contact: no unapproved email, phone or LinkedIn data in {len(files) - 1} publishable files.')
    return problems


def main():
    which = sys.argv[1:] or ['pages', 'contact']
    problems = []
    for name in which:
        problems += {'pages': check_pages, 'contact': check_contact}[name]()
    for p in problems:
        print('FAIL', p, file=sys.stderr)
    sys.exit(1 if problems else 0)


if __name__ == '__main__':
    main()
