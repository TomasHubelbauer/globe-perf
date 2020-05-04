import { DateTimeFormatter } from '@microsoft/globe';

const dtf = new DateTimeFormatter('en-US');

window.test = function test(date) {
  return dtf.formatDateTime(new Date(date));
};
