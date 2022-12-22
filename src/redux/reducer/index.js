import {combineReducers} from 'redux';
import auth from './auth';
import address from './address';
import lang from './lang';
import searchState from './search';
import order from './order';
import service from './service';
import rate from './rate';
import welcome from './welcome';
import goToHome from './goToHome';

export default combineReducers({
  auth,
  lang,
  searchState,
  address,
  order,
  service,
  rate,
  welcome,
  goToHome,
});
