import { actionsType } from '../actions';
import dbh from '../../auth_firebase';


const productsList = [];

dbh.collection("products").get().then(res=>res.forEach(element => {
  const d = element.data();
  productsList.push({id: element.id, name: d.name, desc: d.desc, img: d.img, price: d.price});
}));

const addProduct = (state, action) => {
  dbh.collection("products").doc(action.newProduct).set({price: 0.00, name: "", img: "", desc: ""});
  productsList.push({price: 0.00, name: "", img: "", desc: "", id: action.newProduct});
  return productsList;
};

const removeProduct = (state, action) => {
  dbh.collection("products").doc(action.productId).delete();
  productsList.splice(productsList.findIndex(p => p.id === action.productId), 1);
  return productsList;
}

const editProduct = (state, action) => {
  dbh.collection("products").doc(action.product.id).set({price: action.product.price, name: action.product.name, img: action.product.img, desc: action.product.desc});
  productsList.splice(productsList.findIndex(p => p.id === action.product.id), 1, action.product);
  return productsList;
}

export const products = (state = productsList, action) => {
  switch (action.type) {
    case actionsType.GET_PRODUCT:
      return getProduct(state, action);
    case actionsType.ADD_PRODUCT:
      return addProduct(state, action);
    case actionsType.REMOVE_PRODUCT:
      return removeProduct(state, action);
    case actionsType.EDIT_PRODUCT:
      return editProduct(state, action);
    default:
      return state;
  }
};