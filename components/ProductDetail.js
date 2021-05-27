import React from "react";
import { connect } from 'react-redux';
import { View, StyleSheet, Text, Image } from "react-native";
import store from '../redux/store';


const ProductDetail = ({route, navigation}) => {
  const productId = route.params.itemid;
  const item = store.getState().products.find(p => p.id === productId);
  return (
    <View style={styles.container}>
      <Text>{item.name}</Text>
      <Image source={{ uri: item.img }} style={styles.img} />
      <Text>{item.desc}</Text>
      <Text>{item.price}$</Text>
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
    marginRight: 30,
  }
});

const mapToProps = (state) => {
  return {
    data: state.ProductDetail
  }
};

export default connect(mapToProps)(ProductDetail);
