import { combineReducers } from "redux";

import { products } from "./products";
import { users } from "./users";
import { orders } from "./orders";
import { cart } from "./cart";

export default combineReducers({
  products, users, orders, cart
});
