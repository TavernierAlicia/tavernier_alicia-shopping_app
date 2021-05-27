import { actionsType } from '../actions';
import uuid from 'react-native-uuid';

const ordersList = [];

const addOrder = (state, action) => {
  ordersList.push({cart: action.cart, date: new Date(), id: uuid.v4(), userId: action.userId });
  return ordersList;
};

export const orders = (state = ordersList, action) => {
  switch (action.type) {
    case actionsType.ADD_ORDER:
      return addOrder(state, action);
    default:
      return state;
  }
};