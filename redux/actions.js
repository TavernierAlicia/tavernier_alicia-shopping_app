export const actionsType = {
  ADD_PRODUCT:        'ADD_PRODUCT',
  REMOVE_PRODUCT:     'REMOVE_PRODUCT',
  EDIT_PRODUCT:       'EDIT_PRODUCT',
  CLEAN_CART:         'CLEAN_CART',
  REMOVE_FROM_CART:   'REMOVE_FROM_CART',
  ADD_TO_CART:        'ADD_TO_CART',
  EDIT_QUANTITY_CART: 'EDIT_QUANTITY_CART',
  ADD_ORDER:          'ADD_ORDER',
  ADD_USER:           'ADD_USER'
};

export const addProduct = newProduct => ({
  type: actionsType.ADD_PRODUCT,
  newProduct: newProduct
});

export const removeProduct = productId => ({
  type: actionsType.REMOVE_PRODUCT,
  productId: productId
});

export const editProduct = product => ({
  type: actionsType.EDIT_PRODUCT,
  product: product
});

export const cleanCart = _ => ({
  type: actionsType.CLEAN_CART
})

export const removeFromCart = productId => ({
  type: actionsType.REMOVE_FROM_CART,
  productId: productId
})

export const addToCart = (productId, quantity) => ({
  type: actionsType.ADD_TO_CART,
  productId: productId,
  quantity: quantity
});

export const editQuantityCart = (productId, quantity) => ({
  type: actionsType.EDIT_QUANTITY_CART,
  productId: productId,
  quantity: quantity
});

export const addOrder = (cart, userId) => ({
  type: actionsType.ADD_ORDER,
  cart: cart,
  userId: userId
});

export const addUser = (newUser) => ({
  type: actionsType.ADD_USER,
  newUser: newUser
});
