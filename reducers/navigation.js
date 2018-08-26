//  reducers/navigation.js
import { types } from '../actions/types';
import { Map } from 'immutable';


const navigation = ( state = Map({
  openDrawer: false,
}), action ) => {

  switch(action.type) {

    case types.TOGGLE_DRAWER:

      return state.set('openDrawer', !state.get('openDrawer'));
      

    default:
      return state;
  }
}

export default navigation;
