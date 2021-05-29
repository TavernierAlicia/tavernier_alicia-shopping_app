import React from "react";
import { connect } from 'react-redux';
import { View, StyleSheet, Text, TouchableOpacity, TextInput } from "react-native";
import store from '../redux/store';
import { useIsFocused } from '@react-navigation/native';

const Account = ({route, navigation}) => {

  const Auth                          = React.useContext(route.params.Authentification);
  const [email, setEmail]             = React.useState("");
  const [password, setPassword]       = React.useState("");
  const [user, setUser]               = React.useState(Auth.token ? store.getState().users.find(u => u.token === Auth.token) : false);
  const [newEmail, setNewEmail]       = React.useState("");
  const [newName, setNewName]         = React.useState("");
  const [newPassword, setNewPassword] = React.useState("");

  const isFocused = useIsFocused();
  React.useEffect(() => {
    setEmail("")
    setPassword("")
    setUser(Auth.token ? store.getState().users.find(u => u.token === Auth.token) : false)
  } , [isFocused]);

  

  const logout = _ => {
    Auth.setToken(null);
    navigation.navigate('Home');
  };

  const login = (e, p) => {
    const userMail = store.getState().users.find(u => u.email == e)
    if (userMail && userMail.password === p) {
      Auth.setToken(userMail.token);
      navigation.navigate('Home'); 
    }
  }


  const create = _ => {
    if (newName && newEmail && newPassword) {
      store.dispatch({ type: 'ADD_USER', newUser: {name: newName, email: newEmail, password: newPassword}});
      login(newEmail, newPassword);
    }
  }

  return user ? (
        <View style={styles.container}>
          <View style={styles.block}>
            <Text>Welcolme {user.name}</Text>
          </View>
          <View style={styles.block}>
            <TouchableOpacity onPress={() => logout()}><Text>Logout</Text></TouchableOpacity>
          </View>
        </View>

      ) : (
      <View style={styles.container}>
        <View style={styles.block}>
          <TextInput placeholder="email" value={email} onChangeText={setEmail} style={styles.input} />
          <TextInput secureTextEntry={true} placeholder="password" style={styles.input} value={password} onChangeText={setPassword} />
          <TouchableOpacity onPress={() => login(email, password)}><Text>Sign In</Text></TouchableOpacity>
        </View>
        <View style={styles.block}>
          <TextInput placeholder="email" value={newEmail} onChangeText={setNewEmail} style={styles.input} />
          <TextInput placeholder="name" value={newName} onChangeText={setNewName} style={styles.input} />
          <TextInput secureTextEntry={true} placeholder="password" style={styles.input} value={newPassword} onChangeText={setNewPassword} />
          <TouchableOpacity onPress={() => create()}><Text>Sign Up</Text></TouchableOpacity>
        </View>
      </View>
      )

      {/* <View style={styles.block}>
        <TouchableOpacity><Text>Login</Text></TouchableOpacity>
      </View>
    </View>
  ) */}
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "white",
    flexDirection: "column"
  },
  block: {
    flex: 1,
    alignItems: "center",
    flexDirection: "column",
    borderBottomWidth: 1,
    paddingVertical: 20
  },
  input: {
    height: 40,
    borderWidth: 1,
    paddingHorizontal: 5,
    marginVertical: 20
  },
});

const mapToProps = (state) => {
  return {
    data: state.Account
  }
};

export default connect(mapToProps)(Account);
