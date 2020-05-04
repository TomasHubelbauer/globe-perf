import moment from 'moment';

window.test = function test(date) {
  return moment(new Date(date)).format('L');
};
