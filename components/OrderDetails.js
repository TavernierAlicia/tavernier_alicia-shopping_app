import React from "react";
import { connect } from 'react-redux';
import { View, StyleSheet, Text, FlatList, Image } from "react-native";
import store from '../redux/store';
import { useIsFocused } from '@react-navigation/native';

const OrderDetails = ({route, navigation}) => {

  const orderId             = route.params.orderid;

  const Auth = React.useContext(route.params.Authentification);
  const [user, setUser] = React.useState(Auth.token ? store.getState().users.find(u => u.token === Auth.token) : false);

  const [orderDetail, setOrderDetail] = React.useState(store.getState().orders.find(o => o.userId === user.id && o.id == orderId));

  const [products, setProducts] = React.useState(store.getState().products);

  console.log(orderDetail);

  if (!orderDetail)  {
    navigation.navigate('Home');
  }

  const ST = _ => {
    let price = 0.00;
    for (let cd of orderDetail.cart) {
      const product = products.find(p => p.id == cd.productId);
      price += (product.price * 100 * cd.quantity);
    }
    return Math.round(price) / 100;
  };

  const [total, setTotal] = React.useState(ST());

  const isFocused = useIsFocused();

  React.useEffect(() => {
    setUser(Auth.token ? store.getState().users.find(u => u.token === Auth.token) : false);
    setOrderDetail(store.getState().orders.find(o => o.userId === user.id && o.id == orderId));
    setTotal(ST());
    setProducts(store.getState().products);
  } , [isFocused]);

  return (
    <View style={styles.container}>
      <View style={styles.buy}><Text>Order of {orderDetail.date.toUTCString()}</Text></View>
      <FlatList
         data={orderDetail.cart}
         keyExtractor={ (item) => item.productId }
         extraData={{show: isFocused}}
         style={styles.list}
         renderItem={({item}) => {
          const product = products.find(p => p.id == item.productId);
          return (
            <View style={styles.item}>
              <Image source={product.img} style={styles.img} />
              <View style={styles.desc}>
                <Text style={styles.quantity}>{item.quantity}</Text>
                <Text>{product.name}</Text>
                <Text style={styles.price}>{Math.round(product.price * 100 * item.quantity) / 100}€</Text>
              </View>
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
    flexDirection: "column"
  },
  desc: {
    flex: 1,
    width: 300,
    justifyContent: "space-between",
    flexDirection: "row",
    textAlign: "center"
  },
  quantity: {
    width: 20,
    textAlign: 'left'
  },
  price: {
    width: 60,
    textAlign: "right"
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
    data: state.OrderDetails
  }
};

export default connect(mapToProps)(OrderDetails);
