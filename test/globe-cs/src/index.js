import { DateTimeFormatter } from '@microsoft/globe';

const dtf = new DateTimeFormatter('cs-CZ');

window.test = function test(date) {
  return dtf.formatDateTime(new Date(date));
};
