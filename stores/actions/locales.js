/**
 * Redux action for the user's language.
 * @author Omar Aljazairy
 * @version 1.0
 */
import * as actionType from './actionTypes';

export const setLanguage = language => {
  return {
    type: actionType.SET_LANGUAGE,
    payload: language,
  };
};

export const getLanguage = language => ({
  type: actionType.GET_LANGUAGE,
  payload: language,
});
