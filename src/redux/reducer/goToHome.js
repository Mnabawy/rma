import {TOGGLE_OPEN_HOME} from '../actions/types';

const initialState = {
  go_to_home: true,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_OPEN_HOME:
      return {
        go_to_home: false,
      };

    default:
      return state;
  }
};
