// Settings for the booking page. Edit, then push to GitHub; the site updates by itself.
window.SITE_CONFIG = {
  // Booking requests open the visitor's email app, ready to send to this address.
  // Left empty on purpose until Alex confirms the address he wants to use publicly.
  contactEmail: '',

  // Optional: a Calendly / Cal.com link. When set, a "pick an exact time" button appears next to the form.
  bookingUrl: '',

  minDaysAhead: 1,      // earliest day that can be requested = today + this many days
  maxWeeksAhead: 8,     // how far ahead the calendar goes
  closedWeekdays: [],   // days that cannot be requested: 0 = Sunday ... 6 = Saturday
  closedDates: [],      // single days that cannot be requested, as 'YYYY-MM-DD'
  windows: ['morning', 'afternoon', 'evening', 'flexible'], // times of day that can be requested
};
