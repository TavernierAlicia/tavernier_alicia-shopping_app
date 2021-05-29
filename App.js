import React from "react";
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
import ProductEdit from "./components/ProductEdit";

const Stack = createStackNavigator();


export default function App() {


  const [token, setToken] = React.useState(null);
  const Authentification  = React.createContext({token: token, setToken: setToken});
  
  return (
    <Provider store={store}>
      <Authentification.Provider value={{token: token, setToken: setToken}}>
        <View style={{ flex: 1 }}>
          <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
              <Stack.Screen name="Account"        component={Account}       initialParams={{ Authentification: Authentification}} />
              <Stack.Screen name="Cart"           component={Cart}          initialParams={{ Authentification: Authentification}} />
              <Stack.Screen name="Home"           component={Home}          initialParams={{ Authentification: Authentification}}  options={{headerShown: false}} />
              <Stack.Screen name="Orders"         component={Orders}        initialParams={{ Authentification: Authentification}} />
              <Stack.Screen name="ProductDetail"  component={ProductDetail} initialParams={{ Authentification: Authentification}} />
              <Stack.Screen name="ProductEdit"    component={ProductEdit}   initialParams={{ Authentification: Authentification}} />
            </Stack.Navigator>
          </NavigationContainer>
        </View>
      </Authentification.Provider>
    </Provider>
  );
};