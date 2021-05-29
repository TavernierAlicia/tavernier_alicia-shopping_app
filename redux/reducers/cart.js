import { actionsType } from '../actions';

const cartUser = [];

const addToCart = (state, action) => {
  if (!action.quantity) return ordersList;
  const currentCartProduct = cartUser.find(cu => cu.productId === action.productId);
  if (currentCartProduct) {
    currentCartProduct.quantity += action.quantity;
  } else {
    cartUser.push({
      productId: action.productId,
      quantity: action.quantity
    });
  }
  return cartUser;
};

const removeFromCart = (state, action) => {
  if (cartUser.find(cu => cu.productId === action.productId)) {
    cartUser.splice(cartUser.findIndex(cp => cp.productId === action.productId), 1);
  }
  return cartUser;
};

const editQuantityCart = (state, action) => {
  if (!action.quantity) return removeFromCart(state, {type: actionsType.EDIT_QUANTITY_CART, productId: action.productId});
  const cartProduct = cartUser.find(cu => cu.productId === action.productId);
  if (!cartProduct) return addToCart(state, {type: actionsType.ADD_TO_CART, productId: action.productId, quantity: action.quantity});
  cartProduct.quantity = action.quantity;
  return cartUser;
};

const cleanCart = (state, action) => {
  while (cartUser.length) cartUser.pop();
  return cartUser;
};

export const cart = (state = cartUser, action) => {
  switch (action.type) {
    case actionsType.ADD_TO_CART:
      return addToCart(state, action);
    case actionsType.REMOVE_FROM_CART:
      return removeFromCart(state, action);
    case actionsType.EDIT_QUANTITY_CART:
      return editQuantityCart(state, action);
    case actionsType.CLEAN_CART:
      return cleanCart(state, action);
    default:
      return state;
  }
};