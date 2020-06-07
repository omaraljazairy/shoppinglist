/**
 * Redux reducer for the application User object.
 * @author Omar Aljazairy
 * @version 1.0
 */
import * as actionTypes from '../actions/actionTypes';

const initialState = {
  userDate: {},
};

const userReducer = (state = initialState, action) => {
  console.log('action in reducer received: ', action);
  switch (action.type) {
    case actionTypes.SET_USER:
      const newUser = action.payload;
      console.log('new User: ', newUser);
      return {
        ...state,
        userDate: newUser,
      };
    case actionTypes.DELETE_USER:
      return {
        userDate: {},
      };
    default:
      return state;
  }
};

export default userReducer;
