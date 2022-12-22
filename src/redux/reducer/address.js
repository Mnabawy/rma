import {ADD_ADDRESS} from '../actions/types';

const initailState = {
  address: '',
};

export default (state = initailState, action) => {
  switch (action.type) {
    case ADD_ADDRESS:
    //   console.log('address from reducer', action);
      return {
        address: action.payload,
      };
    default:
      return state;
  }
};
