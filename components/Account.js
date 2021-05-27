import React from "react";
import { connect } from 'react-redux';
import { View, StyleSheet, Text } from "react-native";


const Account = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text>Account</Text>
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
    data: state.Account
  }
};

export default connect(mapToProps)(Account);
