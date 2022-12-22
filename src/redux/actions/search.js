import {ADD_SEARCH, REMOVE_SEARCH, CLEAR_SEARCH} from '../actions/types';

export const addToSearch = payload => ({
  type: ADD_SEARCH,
  payload,
});

export const removeFromSearch = payload => ({
  type: REMOVE_SEARCH,
  payload,
});

export const clearSearch = payload => ({
  type: CLEAR_SEARCH,
  payload,
});
