import {
  LOGIN,
  LOGOUT,
  USERTYPE,
  SET_TOKEN,
  SETUSERDATA,
  SET_LOCATION,
} from './types';

export const login = () => {
  return {type: LOGIN};
};

export const logout = () => {
  return {type: LOGOUT};
};

export const setUserData = data => {
  return {type: SETUSERDATA, payload: data};
};
export const setUserLocation = data => {
  return {type: SET_LOCATION, payload: data};
};

export const userType = user => {
  return {type: USERTYPE, payload: user};
};

export const setToken = token => {
  return {type: SET_TOKEN, token};
};
