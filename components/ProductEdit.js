import React from "react";
import { connect } from 'react-redux';
import { View, StyleSheet, TextInput, Text, Image, TouchableOpacity } from "react-native";
import InputSpinner from "react-native-input-spinner";
import store from '../redux/store';
import { useIsFocused } from '@react-navigation/native';
import uuid from 'react-native-uuid';


const ProductEdit = ({route, navigation}) => {

  const [productId, setProductId] = React.useState(route.params.itemid);

  const Auth                  = React.useContext(route.params.Authentification);
  const [item, setItem]       = React.useState(store.getState().products.find(p => p.id === productId));
  const [user, setUser]       = React.useState(Auth.token ? store.getState().users.find(u => u.token === Auth.token) : false);
  const [isAdmin, setIsAdmin] = React.useState(user ? user.is_admin : false);

  const isFocused = useIsFocused();
  React.useEffect(() => {
    setItem(store.getState().products.find(p => p.id === productId));
    setUser(Auth.token ? store.getState().users.find(u => u.token === Auth.token) : false);
    setIsAdmin(user ? user.is_admin : false);
    if (item) {
      setName(item.name);
      setImg(item.img);
      setDesc(item.desc);
      setPrice(item.price);
    }
  } , [isFocused, productId]);

  if (!isAdmin) navigation.goBack();

  if (productId == -1) {
    const p =  uuid.v4();
    store.dispatch({type: 'ADD_PRODUCT', newProduct: p})
    setItem({name: "", img: "", desc: "", price: 0.00, id: p});
    setProductId(p);
  } else if (!item)  {
    navigation.navigate('Home');
  }

  const [name, setName] = React.useState(item ? item.name : '');
  const [img, setImg] = React.useState(item ? item.img : '');
  const [desc, setDesc] = React.useState(item ? item.desc : '');
  const [price, setPrice] = React.useState(item ? item.price : '');

  const editItem = _ => {
    store.dispatch({ type: 'EDIT_PRODUCT', product: {name: name, img: img, id: item.id, desc: desc, price: price}});
  }
  const deleteItem = _ => {
    store.dispatch({ type: 'REMOVE_PRODUCT', productId: item.id});
    navigation.navigate('Home');
  }

  return (
    <View style={styles.container}>
      <TextInput style={styles.input}
        onChangeText={setName}
        placeholder="Name of product"
        value={name}
      />
      <TextInput style={styles.input}
        onChangeText={setImg}
        placeholder="Url of picture"
        value={img}
      />
      <Image source={{ uri: img }} style={styles.img} />
      <TextInput
        style={styles.inputTextarea}
        onChangeText={setDesc}
        placeholder="Description of product"
        value={desc}
        multiline={true}
        numberOfLines={5}
      />
      <View>
      <InputSpinner value={price}
        onChange={setPrice}
        longStep={1}
        step={0.01}
        type="float"
        append={<Text style={{paddingRight: 10}}>$</Text>}
        width={175}
      />
      </View>
      <View style={styles.btns}>
      <TouchableOpacity onPress={() => deleteItem()}>
          <Text>Delete</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => editItem()}>
          <Text>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "white",
    flexDirection: 'column',
    justifyContent: "space-evenly",
    
  },
  img: {
    height: 150,
    width: 150,
  },
  btns: {
    justifyContent: "space-evenly",
    flexDirection: "row",
    width: 300
  },
  input: {
    height: 40,
    borderWidth: 1,
    paddingHorizontal: 5
  },
  inputTextarea: {
    borderWidth: 1,
    padding: 10,
    width: 398,
    height: 180
  }
});

const mapToProps = (state) => {
  return {
    data: state.ProductEdit
  }
};

export default connect(mapToProps)(ProductEdit);
