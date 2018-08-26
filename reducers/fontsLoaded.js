// reducers/loadFonts.js
import {
  List,
  Map
} from 'immutable'
import { types } from '../actions/types'

// update state when fonts are loaded so app content can be rendered
const fontsLoaded = ( state = Map({
  fontsDidLoad: false,
}), action ) => {

  switch (action.type) {

    case types.FONTS_LOADED:

      return action.payload.fontsLoaded ? state.set('fontsDidLoad', true) :
        state.set('fontsDidLoad', false);

    default:
      return state;
  }
}

export default fontsLoaded;
