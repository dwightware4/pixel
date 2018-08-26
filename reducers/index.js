import { combineReducers } from 'redux';
import fontsLoaded from './fontsLoaded';
import getArticles from './getArticles';
import navigation from './navigation';


export default combineReducers({
  fontsLoaded,
  getArticles,
  navigation,
});
