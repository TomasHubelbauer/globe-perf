import { DateTimeFormatter } from '@microsoft/globe';

window.test = function test(date) {
  return new DateTimeFormatter('cs-CZ').formatDateTime(new Date(date));
};
