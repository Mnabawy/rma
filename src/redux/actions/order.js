import {
  CREATE_ORDER,
  SHOW_TERMS,
  SET_SERVICE,
  SET_ADDRESS,
  SET_ORDER_ID,
  SET_ORDER_DATA,
  SET_ORDER_ADDONS,
  SET_ORDER_IMAGES,
  RESET_DATA,
} from './types';

export const createOrder = data => {
  return {
    type: CREATE_ORDER,
    payload: data,
  };
};
export const setService = data => {
  return {
    type: SET_SERVICE,
    payload: data,
  };
};
export const setOrderData = data => {
  console.log('data from action', data);
  return {
    type: SET_ORDER_DATA,
    payload: data,
  };
};

export const setOrderAddons = data => {
  return {
    type: SET_ORDER_ADDONS,
    payload: data,
  };
};

export const showTerms = () => {
  return {
    type: SHOW_TERMS,
  };
};

export const setOderImages = data => {
  return {
    type: SET_ORDER_IMAGES,
    payload: data,
  };
};

export const resetData = () => {
  return {
    type: RESET_DATA,
  };
};
