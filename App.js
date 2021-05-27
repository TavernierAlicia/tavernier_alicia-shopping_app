import React, { useState } from "react";
import { View } from "react-native";
import { Provider } from "react-redux";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import store from "./redux/store";
import Home from "./components/Home";
import Cart from "./components/Cart";
import Orders from "./components/Orders";
import Account from "./components/Account";
import ProductDetail from "./components/ProductDetail";

const Stack = createStackNavigator();


export default function App() {

  const [userToken, setUserToken] = useState("123");

  
  return (
    <Provider store={store}>
      <View style={{ flex: 1 }}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" component={Home} initialParams={{ userToken: userToken } }/>
            <Stack.Screen name="Cart" component={Cart} />
            <Stack.Screen name="Orders" component={Orders} />
            <Stack.Screen name="Account" component={Account} initialParams={{ userToken: userToken, setUserToken: setUserToken }} />
            <Stack.Screen name="ProductDetail" component={ProductDetail} initialParams={{ userToken: userToken }} />
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    </Provider>
  );
};