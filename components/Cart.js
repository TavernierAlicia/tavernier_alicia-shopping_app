import React from "react";
import { connect } from 'react-redux';
import { View, StyleSheet, Text, FlatList, TouchableOpacity, Image } from "react-native";
import store from '../redux/store';
import { useIsFocused } from '@react-navigation/native';
import InputSpinner from "react-native-input-spinner";



const Cart = ({route, navigation}) => {

  const Auth = React.useContext(route.params.Authentification);
  const [user, setUser]               = React.useState(Auth.token ? store.getState().users.find(u => u.token === Auth.token) : false);

  const [cartDetail, setCartDetail] = React.useState(store.getState().cart);
  const [change, setChange] = React.useState(false);
  const [products, setProducts] = React.useState(store.getState().products);
  const ST = _ => {
    let price = 0.00;
    for (let cd of cartDetail) {
      const product = products.find(p => p.id == cd.productId);
      price += (product.price * 100 * cd.quantity);
    }
    return Math.round(price) / 100;
  };
  const [total, setTotal] = React.useState(ST());
  const isFocused = useIsFocused();
  React.useEffect(() => {
    setUser(Auth.token ? store.getState().users.find(u => u.token === Auth.token) : false);
    setCartDetail(store.getState().cart);
    setTotal(ST());
    setProducts(store.getState().products);
  } , [isFocused]);

  const deleteItem = productId => {
    store.dispatch({ type: 'REMOVE_FROM_CART', productId: productId});
    setCartDetail(store.getState().cart);
    setChange(!change);
    setTotal(ST());
  }

  const editQuantity = (productId, value) => {
    store.dispatch({ type: 'EDIT_QUANTITY_CART', productId: productId, quantity: value});
    setCartDetail(store.getState().cart);
    setChange(!change);
    setTotal(ST());
  }

  const buy = _ => {
    if (user) {
      store.dispatch({type: 'ADD_ORDER', cart: Array.from(cartDetail), userId: user.id});
      store.dispatch({ type: 'CLEAN_CART'});
      navigation.navigate('Home');
    } else {
      navigation.navigate('Account');
    }
  };

  

  return (
    <View style={styles.container}>
      {
        cartDetail.length ? (
          <TouchableOpacity style={styles.buy} onPress={() => buy()}><Text>Buy</Text></TouchableOpacity>
        ) : (
          <View style={styles.buy}><Text>Empty cart</Text></View>
        )
        
      }
      <FlatList
         data={cartDetail}
         keyExtractor={ (item) => item.productId }
         extraData={{show: isFocused, change: change}}
         style={styles.list}
         renderItem={({item}) => {
          const product = products.find(p => p.id == item.productId);
          return (
            <View style={styles.item}>
              <Image source={product.img} style={styles.img} />
              <Text>{product.name}</Text>
              <InputSpinner value={item.quantity}
                onChange={value => editQuantity(item.productId, value)}
                longStep={1}
                step={1}
                width={100}
                height={30}
              />
              <TouchableOpacity onPress={() => deleteItem(item.productId)}><Image source={"https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Linecons_dustbin.svg/512px-Linecons_dustbin.svg.png"} style={styles.delete} /></TouchableOpacity>
            </View>
         );}}
      />
      <View style={styles.prices}><Text>{total} $</Text></View>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "white",
    width: "100%"
  },
  item: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingVertical: 20,
    flexDirection: "row"
  },
  list: {
    width: 400
  },
  img: {
    height: 40,
    width: 40
  },
  delete: {
    height: 20,
    width: 20
  },
  buy: {
    width: "100%",
    textAlign: "center",
    paddingTop: 20,
    paddingBottom: 30,
    borderBottomWidth: 1,
    borderBottomColor: "black"
  },
  prices: {
    paddingVertical: 20,
    borderTopColor: "black",
    borderTopWidth: 1,
    width: "100%",
    textAlign: "center",
  }
});

const mapToProps = (state) => {
  return {
    data: state.Cart
  }
};

export default connect(mapToProps)(Cart);
