window.test = function test(date) {
  return new Intl.DateTimeFormat('en-US').format(new Date(date));
};
