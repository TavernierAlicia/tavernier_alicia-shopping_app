import { actionsType } from '../actions';
import dbh from '../../auth_firebase';

const ordersList = [];

dbh.collection("orders").get().then(res=>res.forEach(element => {
  const d = element.data();
  ordersList.push({id: element.id, userId: d.user_id, date: d.date, cart: []})
})).then(_ => dbh.collection('ordered_products').get().then(res=>res.forEach(element => {
  const d = element.data();
  ordersList.find(ol => ol.id == d.order_id).cart.push({quantity: d.quantity, productId: d.product_id});
})));


const addOrder = (state, action) => {
  const orderDate = new Date(); 
  db.collection("orders").add({
    date: orderDate,
    user_d: action.userId
  })
  .then(docRef => {
    for (let c of action.cart) {
      db.collection("ordered_products").add({quantity: c.quantity, productId: c.product_id});
    }
    ordersList.push({cart: action.cart, date: orderDate, id: docRef.id, userId: action.userId });
  })
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