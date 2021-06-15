import React from "react";
import { connect } from 'react-redux';
import { View, StyleSheet, Text, FlatList } from "react-native";
import store from '../redux/store';
import { useIsFocused } from '@react-navigation/native';
import { TouchableOpacity } from "react-native-gesture-handler";


const Orders = ({route, navigation}) => {

  const Auth                  = React.useContext(route.params.Authentification);
  const [user, setUser]         = React.useState(Auth.token ? store.getState().users.find(u => u.token === Auth.token) : false);
  

  const [products, setProducts] = React.useState(store.getState().products);
  const [orders, setOrders] = React.useState(user ? store.getState().orders.filter(o => o.userId === user.id) : []);
  
  const isFocused = useIsFocused();

  React.useEffect(() => {
    if (!user) {
      navigation.navigate('Home');
      navigation.navigate('Account');
    }

    setUser(Auth.token ? store.getState().users.find(u => u.token === Auth.token) : false);
    setOrders(user ? store.getState().orders.filter(o => o.userId === user.id) : []);
    setProducts(store.getState().products);

  } , [isFocused]);

  return (
    <View style={styles.container}>
      <FlatList 
        data={orders.sort((a,b) => b - a)}
        keyExtractor={ (item) => item.id }
        extraData={{show: isFocused}}
        style={styles.list}
        renderItem={({item}) => 
        {
          let price = (_ => {
            let p = 0.00;
            for (let cd of item.cart) {
              console.log(cd)
              const product = products.find(p => p.id == cd.productId);
              p += (product.price * 100 * cd.quantity);
            }
            return Math.round(p) / 100;
          })();
        
          return (
              <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('OrderDetails', {orderid: item.id})}>
                <Text>{item.date.toUTCString()}</Text>
                <Text style={styles.price}>{price}$</Text>
                <Text style={styles.details}>Show details</Text>
              </TouchableOpacity> 
          );
        }
      }
    
      
      />
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "white",
  },
  list: {
    flex: 1
  },  
  item: {
    justifyContent: "space-between",
    alignItems: "center",
    width: 300,
    paddingVertical: 20,
    flexDirection: "column",
    borderBottomWidth: 1
  },
  price: {
    fontWeight: "bold",
    paddingVertical: 10
  },
  details: {
    fontStyle: "italic"
  }
});

const mapToProps = (state) => {
  return {
    data: state.Orders
  }
};

export default connect(mapToProps)(Orders);
