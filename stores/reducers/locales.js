/**
 * Redux reducer for the application language.
 * @author Omar Aljazairy
 * @version 1.0
 */
import * as actionTypes from '../actions/actionTypes';
// import Locale from '../../models/locales';

const initialState = {
  language: 'iq',
};

const localeReducer = (state = initialState, action) => {
  console.log('action in reducer received: ', action);
  switch (action.type) {
    case actionTypes.SET_LANGUAGE:
      const newLanguage = action.payload;
      console.log('newLanguage: ', newLanguage);
      return {
        ...state,
        language: newLanguage,
      };
    default:
      return state;
  }
};

export default localeReducer;
