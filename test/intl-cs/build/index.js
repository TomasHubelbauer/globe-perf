window.test = function test(date) {
  return new Intl.DateTimeFormat('cs-CZ').format(new Date(date));
};
