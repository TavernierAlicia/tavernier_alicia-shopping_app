import React from "react";
import { connect } from 'react-redux';
import { View, StyleSheet, Text } from "react-native";


const Cart = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text>Oskour2</Text>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "white",
  }
});

const mapToProps = (state) => {
  return {
    data: state.Cart
  }
};

export default connect(mapToProps)(Cart);
