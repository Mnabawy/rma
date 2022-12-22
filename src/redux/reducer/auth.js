import {
  LOGIN,
  LOGOUT,
  SETUSERDATA,
  SET_TOKEN,
  USERTYPE,
  SUPPLIER,
  USER,
  SET_LOCATION,
  TOGGLE_OPEN_HOME,
} from '../actions/types';

const initialState = {
  isLoggedIn: false,
  userData: null,
  userType: 'USER', // SUPPLIER || USER,
  token: null,
  location: null,
  go_to_home: true,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        isLoggedIn: true,
      };
    case LOGOUT:
      return {
        ...state,
        userData: null,
        token: null,
        isLoggedIn: false,
      };

    case USERTYPE:
      return {
        ...state,
        userType: action.payload,
      };
    case SETUSERDATA:
      return {
        ...state,
        userData: action.payload,
      };
    case SET_LOCATION:
      return {
        ...state,
        location: action.payload,
      };

    case SET_TOKEN:
      return {
        ...state,
        token: action.token,
      };

    default:
      return state;
  }
};
