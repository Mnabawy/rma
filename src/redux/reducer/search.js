import AsyncStorage from '@react-native-async-storage/async-storage';
import produce from 'immer';
import _ from 'lodash';
import {ADD_SEARCH, REMOVE_SEARCH, CLEAR_SEARCH} from '../actions/types';

const INITIAL_STATE = {
  searchText: '',
  searchList: [],
  totalCount: 0,
};

export default produce((state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_SEARCH:
      const newItem = {
        id: Math.random().toString(16).slice(2),
        text: action.payload.text,
      };

      return {
        searchText: action.payload.text,
        totalCount: state.totalCount + 1,
        searchList: state.searchList.concat(newItem),
      };

    // remove item from async storage
    case REMOVE_SEARCH:
      const newList = state.searchList.filter(
        item => item.id !== action.payload.id,
      );

      return {
        searchList: newList,
        totalCount: state.totalCount - 1,
      };
    case CLEAR_SEARCH:
      return INITIAL_STATE;
    default:
      break;
  }
}, INITIAL_STATE);
