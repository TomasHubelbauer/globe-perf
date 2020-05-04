import { DateTimeFormatter } from '@microsoft/globe';

const dtf = new DateTimeFormatter('cs-CZ');

window.test = function test(date) {
  return dtf.formatDateTime(new Date(date));
};

window.profile = function () {
  const date = new Date(2020, 3, 16, 10, 0, 0).toISOString();
  for (let index = 0; index < 1000; index++) {
    window.test(date);
  }
};
