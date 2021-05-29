import React from "react";
import { connect } from 'react-redux';
import { View, StyleSheet, Text, Image, TouchableOpacity } from "react-native";
import InputSpinner from "react-native-input-spinner";
import store from '../redux/store';
import { useIsFocused } from '@react-navigation/native';


const ProductDetail = ({route, navigation}) => {

  const productId             = route.params.itemid;

  const Auth                  = React.useContext(route.params.Authentification);
  const [item, setItem]       = React.useState(store.getState().products.find(p => p.id === productId));
  const [user, setUser]       = React.useState(Auth.token ? store.getState().users.find(u => u.token === Auth.token) : false);
  const [isAdmin, setIsAdmin] = React.useState(user ? user.is_admin : false);
  const [quantity, setQuantity] = React.useState(1);

  const isFocused = useIsFocused();
  React.useEffect(() => {
    setItem(store.getState().products.find(p => p.id === productId));
    setUser(Auth.token ? store.getState().users.find(u => u.token === Auth.token) : false);
    setIsAdmin(user ? user.is_admin : false);
    setQuantity(1);
  } , [isFocused]);

  if (!item) navigation.navigate('Home');
 
  const deleteItem = _ => {
    store.dispatch({ type: 'REMOVE_PRODUCT', productId: productId});
    navigation.navigate('Home');
  };

  const addCart = _ => {
    store.dispatch({ type: 'ADD_TO_CART', productId: productId, quantity: quantity});
    navigation.navigate('Home');
    navigation.navigate('Cart');
  };

  return (
    <View style={styles.container}>
      <View style={styles.subcontainer}>
        <Text>{item.name}</Text>
        <Image source={{ uri: item.img }} style={styles.img} />
        <Text>{item.desc}</Text>
        <Text style={styles.price}>{item.price}$</Text>
        <View style={styles.buy}>
          <InputSpinner style={{width: 175}} value={quantity} skin="square" onChange={setQuantity} />
          <TouchableOpacity onPress={() => addCart()}>
              <Text>Add To Cart</Text>
            </TouchableOpacity>
        </View>
        {isAdmin && (
          <View style={styles.btns}>
            <TouchableOpacity onPress={() => deleteItem()}>
              <Text>Delete</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('ProductEdit', {itemid: item.id})}>
              <Text>Edit</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "white",
  },
  subcontainer: {
    maxWidth: 400,
    alignItems: "center",
    flexDirection: 'column',
    justifyContent: "space-evenly",
    paddingTop: 50
  },
  img: {
    height: 150,
    width: 150,
    margin: 50,
  },
  btns: {
    justifyContent: "space-evenly",
    flexDirection: "row",
    width: 300
  },
  price: {
    marginVertical: 20
  },
  buy: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    marginVertical  : 20,
    width: 300
  }

});

const mapToProps = (state) => {
  return {
    data: state.ProductDetail
  }
};

export default connect(mapToProps)(ProductDetail);
