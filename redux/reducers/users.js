import { actionsType } from '../actions';
import uuid from 'react-native-uuid';

const usersList = [{
  email: "admin@shopping.fr",
  password: "admin",
  name: "Admin",
  is_admin: true,
  token: "5d77abf3-90eb-496e-ab34-4084c76fb09d",
  id: "ed1a9be2-30cb-43ff-a5d2-0feaf22d6fae"
},{
  email: "user@google.fr",
  password: "user",
  name: "User Test",
  is_admin: false,
  token: "a8c15060-2f47-4b44-b3b1-0ff7ed6367b6",
  id: "7e842bea-b58a-4023-b1fa-dc5cacc44230"
}];

const addUser = (state, action) => {
  action.newUser.token = uuid.v4();
  action.newUser.id = uuid.v4();
  usersList.push(action.newUser);
  return usersList;
};

export const users = (state = usersList, action) => {
  switch (action.type) {
    case actionsType.ADD_USER:
      return addUser(state, action);
    default:
      return state;
  }
};