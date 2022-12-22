import {HAS_SHOWED} from '../actions/types';

const INITILA_STATE = {
  showed: false,
};

export default (state = INITILA_STATE, action) => {
  switch (action.type) {
    case HAS_SHOWED:
      return {
        showed: true,
      };

    default:
      return state;
  }
};
