import React from "react";
import { connect } from 'react-redux';
import { View, StyleSheet, Text, TouchableOpacity, Image, FlatList } from "react-native";
import store from '../redux/store';


const Home = ({route, navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.footer}>
        <TouchableOpacity style={styles.btnMenu} onPress={() => navigation.navigate('Account')}>
         <Image source={'https://w7.pngwing.com/pngs/676/904/png-transparent-computer-icons-my-account-icon-miscellaneous-photography-monochrome.png'} style={styles.iconMenu} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnMenu} onPress={() => navigation.navigate('Orders')}>
         <Image source={'https://icon-library.com/images/orders-icon/orders-icon-26.jpg'} style={styles.iconMenu} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnMenu} onPress={() => navigation.navigate('Cart')}>
         <Image source={'https://image.flaticon.com/icons/png/512/263/263142.png'} style={styles.iconMenu} />
        </TouchableOpacity>
      </View>
     <FlatList style={styles.listItem}
        data={store.getState().products}
        keyExtractor={ (item) => item.id }
        renderItem={({item}) => 
          <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('ProductDetail', {itemid: item.id})}>
            <Text>{item.name}</Text>
            <Image source={{ uri: item.img }} style={styles.img} />
            <Text>{item.desc}</Text>
            <Text style={styles.price}>{item.price}$</Text>
            <Text>{route.params.userToken ? "Edit product" : "Show details"}</Text>
          </TouchableOpacity>
        }
      />
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "white",
    justifyContent: "center",
    flexDirection: "column"
  },
  listItem: {
  },
  item: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomColor: "black",
    borderBottomWidth: 1,
    marginTop: 20,
    width: 300,
    paddingBottom: 20
  },
  img: {
    height: 50,
    width: 50,
    marginVertical: 20
  },
  price: {
    marginVertical: 10,
    fontStyle: 'italic'
  },
  footer: {
    paddingVertical: 10,
    height: "100",
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    width: "100%"
  },
  iconMenu : {
    height: 30,
    width: 30
  },
  btnMenu: {
    flex: 1, justifyContent: "center", alignItems: "center"
  }
});

const mapToProps = (state) => {
  return {
    data: state.Home
  }
};

export default connect(mapToProps)(Home);
