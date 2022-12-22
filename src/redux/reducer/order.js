import {
  CREATE_ORDER,
  SET_SERVICE,
  SHOW_TERMS,
  SET_ADDRESS,
  SET_ORDER_ID,
  SET_ORDER_DATA,
  SET_ORDER_ADDONS,
  SET_ORDER_IMAGES,
  RESET_DATA
} from '../actions/types';

const initailState = {
  orderData: {},
  showTerms: false,
  orderSteps: 3,
  service: {},
  address: {},
  orderId: '',
  addons: {},
  images: [],
};

export default (state = initailState, action) => {
  switch (action.type) {
    case CREATE_ORDER:
      return {
        ...state,
        orderData: {...action.payload, ...state.orderData},
      };

    case SHOW_TERMS:
      return {
        ...state,
        showTerms: true,
        orderSteps: 4,
      };
    case SET_SERVICE:
      return {
        ...state,
        service: action.payload,
      };
    case SET_ORDER_DATA:
      return {
        ...state,
        orderId: action.payload,
      };
    case SET_ORDER_ADDONS:
      return {
        ...state,
        addons: action.payload,
      };

    case SET_ORDER_IMAGES:
      return {
        ...state,
        images: action.payload,
      };
    case RESET_DATA:
      return initailState;

    default:
      return state;
  }
};
