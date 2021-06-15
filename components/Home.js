import React from "react";
import { connect } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';
import { View, StyleSheet, Text, TouchableOpacity, Image, FlatList } from "react-native";
import store from '../redux/store';
import InputSpinner from "react-native-input-spinner";



const Home = ({route, navigation}) => {

  const Auth                    = React.useContext(route.params.Authentification);
  const [products, setProducts] = React.useState(store.getState().products);
  const [user, setUser]         = React.useState(Auth.token ? store.getState().users.find(u => u.token === Auth.token) : false);
  const [isAdmin, setIsAdmin]   = React.useState(user ? user.is_admin : false);

  const isFocused = useIsFocused();
  React.useEffect(() => {
    setProducts(store.getState().products);
    setUser(Auth.token ? store.getState().users.find(u => u.token === Auth.token) : false);
    setIsAdmin(user ? user.is_admin : false);
  } , [isFocused]);


  const editQuantity = (productId, quantity) => {
    console
    if (quantity) {
      store.dispatch({ type: 'EDIT_QUANTITY_CART', productId: productId, quantity: quantity});

    } else {
      store.dispatch({ type: 'REMOVE_FROM_CART', productId: productId});
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.btnMenu} onPress={() => navigation.navigate('Account')}>
         <Image source={'https://w7.pngwing.com/pngs/676/904/png-transparent-computer-icons-my-account-icon-miscellaneous-photography-monochrome.png'} style={styles.iconMenu} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnMenu} onPress={() => navigation.navigate('Orders')}>
         <Image source={'https://icon-library.com/images/orders-icon/orders-icon-26.jpg'} style={styles.iconMenu} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnMenu} onPress={() => navigation.navigate('Cart')}>
         <Image source={'https://image.flaticon.com/icons/png/512/263/263142.png'} style={styles.iconMenu} />
        </TouchableOpacity>
      </View>
      { isAdmin && 
        (<View style={styles.item}>
          <TouchableOpacity onPress={() => navigation.navigate('ProductEdit', {itemid: -1})}>
            <Text>Add</Text>
          </TouchableOpacity>
        </View>
        )}
     <FlatList style={styles.listItem}
        data={products}
        keyExtractor={ (item) => item.id }
        extraData={{show: isFocused}}
        renderItem={({item}) => {
          const cartProduct = store.getState().cart.find(c => c.productId === item.id);
          return (
          <View style={styles.item}>
            <TouchableOpacity onPress={() => navigation.navigate('ProductDetail', {itemid: item.id})}>
              <View style={styles.itemHead}>
                <View style={styles.itemTitle}>
                  <Image source={{ uri: item.img }} style={styles.img} />
                  <Text>{item.name}</Text>
                </View>
              <Text style={styles.price}>{item.price}$</Text>
              </View>
              <Text>{item.desc}</Text>
              <View style={styles.btnDetail}>
                <Text>Show details</Text>
                <InputSpinner value={cartProduct ? cartProduct.quantity : 0}
                  onChange={value => editQuantity(item.id, value)}
                  longStep={1}
                  step={1}
                  width={100}
                  height={30}
                  enterKeyHint={""}
                />
              </View>
            </TouchableOpacity>
            { isAdmin && 
              (<View style={styles.edit}>
                <TouchableOpacity onPress={() => navigation.navigate('ProductDelete', {itemid: item.id})}>
                  <Text>Delete</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('ProductEdit', {itemid: item.id})}>
                  <Text>Edit</Text>
                </TouchableOpacity>

              </View>
              )}
          </View>

        )}} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "white",
    justifyContent: "center",
    flexDirection: "column"
  },
  add: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    flexDirection: "row",
    marginHorizontal: 20
  },
  edit: {
    flex: 1,
    width: "100%",
    fontStyle: "italic",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  item: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomColor: "black",
    borderBottomWidth: 1,
    marginTop: 20,
    width: 300,
    paddingBottom: 20
  },
  img: {
    height: 50,
    width: 50,
    margin: 20
  },
  price: {
    marginVertical: 10,
    fontStyle: 'italic'
  },
  header: {
    paddingVertical: 20,
    height: "100",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    width: "100%",
    borderBottomColor: "black",
    borderBottomWidth: 1,
  },
  iconMenu : {
    height: 30,
    width: 30
  },
  btnMenu: {
    flex: 1, 
    justifyContent: "center", 
    alignItems: "center"
  },
  btnDetail: {
    marginVertical: 20,
    width: 300,
    fontStyle: 'italic',
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row"
  },
  itemHead: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  itemTitle: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center"
  }
});

const mapToProps = (state) => {
  return {
    data: state.Home
  }
};

export default connect(mapToProps)(Home);
