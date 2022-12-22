import {ADD_RATE, ADD_RATE_SUPPLIER} from '../actions/types';

const INITIAL_STATE = {
  list: [],
  listSupplier: [],
};
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_RATE:
      const newList = [...state.list, action.payload];

      return {
        list: newList,
      };

    case ADD_RATE_SUPPLIER:
      const newListSupplier = [...state.listSupplier, action.payload];

      return {
        listSupplier: newListSupplier,
      };

    default:
      return state;
  }
};
