import moment from 'moment';

window.test = function test(date) {
  return moment(date).format('M/D/YYYY');
}
