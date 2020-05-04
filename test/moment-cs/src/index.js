import moment from 'moment';
import 'moment/locale/cs';

window.test = function test(date) {
  return moment(date).format('L');
};
