const intl = new Intl.DateTimeFormat('en-US');

window.test = function test(date) {
  return intl.format(new Date(date));
};
