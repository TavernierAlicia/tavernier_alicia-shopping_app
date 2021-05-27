import { actionsType } from '../actions';
import uuid from 'react-native-uuid';

const productsList = [{
  id: "7d60d342-1955-47cc-bcbe-b0a6160e8d86",
  name: 'Red Shirt',
  desc: "Nouvelle Collection LBO 2021 Modèle 915 • Tee shirt long uni • Col rond • Revers cousus aux manches • Etiquette LBO certifiant l'authenticité.",
  img: "https://cdn.pixabay.com/photo/2016/10/02/22/17/red-t-shirt-1710578_1280.jpg",
  price: 29.99
},{
  id: "9dda1588-a0e6-4f1a-b24d-074a1bf545ca",
  name: "Blue Carpet",
  desc: "Dans l'entrée, dans le salon, dans une chambre d'enfant, dans la salle de bains... Ce tapis trouve sa place partout ! Caractéristiques : Tufté pur coton Renzo 3500 g/m².",
  img: "https://cdn.pixabay.com/photo/2017/08/10/03/19/blue-2617640_1280.jpg",
  price: 69.99
},{
  id: "0cc019de-8945-4a6d-aaca-6c2fd6fd844d",
  name: "Coffee Mug",
  desc: "MUG BLANC de la marque Monsieur Madame. Un cadeau parfait pour Humour,Caractère. Le motif RÂLEUSE À PLEIN TEMPS est imprimé en France dans notre atelier à Toulouse sur un MUG.",
  img: "https://cdn.pixabay.com/photo/2020/11/30/07/55/mug-5790231_1280.jpg",
  price: 6.99
}];

const addProduct = (state, action) => {
  action.newProduct.id = uuid.v4();
  productsList.push(action.newProduct)
  return productsList;
};

const removeProduct = (state, action) => {
  productsList.splice(productsList.findIndex(p => p.id === action.productId), 1);
  return productsList;
}

const editProduct = (state, action) => {
  productsList.splice(productsList.findIndex(p => p.id === action.product.id), 1, action.product);
  return productsList;
}

export const products = (state = productsList, action) => {
  switch (action.type) {
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