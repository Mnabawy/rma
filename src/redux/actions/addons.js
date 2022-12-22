import {CREATE_ADDON} from './types';

export const createAddons = data => {
  return {
    type: CREATE_ADDON,
    payload: data,
  };
};
