import { DateTimeFormatter } from '@microsoft/globe';

window.test = function test(date) {
  return new DateTimeFormatter('en-US').formatDateTime(new Date(date));
};
