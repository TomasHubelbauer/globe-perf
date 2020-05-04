const intl = new Intl.DateTimeFormat('cs-CZ');

window.test = function test(date) {
  return intl.format(new Date(date));
};
