/**
 * Redux action for the user object.
 * @author Omar Aljazairy
 * @version 1.0
 */
import * as actionType from './actionTypes';

export const setUser = user => {
  console.log('user received in action: ', user);
  return {
    type: actionType.SET_USER,
    payload: user,
  };
};

export const getUser = () => ({
  type: actionType.GET_USER,
  payload: null,
});

export const deleteUser = () => ({
  type: actionType.DELETE_USER,
  payload: null,
});
