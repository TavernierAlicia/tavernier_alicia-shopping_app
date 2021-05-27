import React from "react";
import { connect } from 'react-redux';
import { View, StyleSheet, Text } from "react-native";


const Orders = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text>Oskour4</Text>
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
    data: state.Orders
  }
};

export default connect(mapToProps)(Orders);
