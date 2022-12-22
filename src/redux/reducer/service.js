import {SET_SERVICE_ID, SET_SERVICE_TERMS} from '../actions/types';

const INITIAL_STATE = {
  service_id: null,
  terms: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_SERVICE_ID:
      return {
        ...state,
        service_id: action.payload,
      };

    case SET_SERVICE_TERMS:
      return {
        ...state,
        terms: action.payload,
      };

    default:
      return {
        ...state,
      };
  }
};
