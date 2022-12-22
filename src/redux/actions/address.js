import {ADD_ADDRESS} from './types';

export const addAddress = address => {
  return {type: ADD_ADDRESS, payload: address};
};
