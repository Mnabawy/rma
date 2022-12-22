import {SET_SERVICE_ID, SET_SERVICE_TERMS} from './types';

export const setServiceId = id => {
  console.log('id from service id actions', id);
  return {
    type: SET_SERVICE_ID,
    payload: id,
  };
};
export const setServiceTerms = data => {
  return {
    type: SET_SERVICE_TERMS,
    payload: data,
  };
};
