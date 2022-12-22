import {ADD_RATE, ADD_RATE_SUPPLIER} from './types';

export const addRate = data => {
  console.log(data);
  return {
    type: ADD_RATE,
    payload: data,
  };
};

export const addRateSupplier = data => {
  // console.log(data);
  return {
    type: ADD_RATE_SUPPLIER,
    payload: data,
  };
};
