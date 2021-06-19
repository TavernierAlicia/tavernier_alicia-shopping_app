import { actionsType } from '../actions';
import uuid from 'react-native-uuid';
import dbh from '../../auth_firebase';

const usersList = [];

dbh.collection("users").get().then(res=>res.forEach(element => {
  const d = element.data();
  usersList.push({id: element.id, name: d.name, email: d.email, password: d.password, is_admin: d.is_admin, token: d.token});
}));

const addUser = (state, action) => {
  action.newUser.token = uuid.v4();
  return dbh.collection("users").add(action.newUser).then(docRef => {
    action.newUser.id = docRef.id;
    usersList.push(action.newUser);
  })
};

export const users = (state = usersList, action) => {
  switch (action.type) {
    case actionsType.ADD_USER:
      return addUser(state, action);
    default:
      return state;
  }
};