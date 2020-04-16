import { DateTimeFormatter } from '@microsoft/globe';

window.test = function test(date) {
  return new DateTimeFormatter().formatDateTime(new Date(date));
}
