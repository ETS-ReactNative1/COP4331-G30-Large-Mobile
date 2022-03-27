
import React from 'react'; 
import { StyleSheet, Text, View } from 'react-native'; 
import { createStackNavigator } from "react-navigation-stack"; 
import { createAppContainer } from "react-navigation"; 
import LoginMobile from './screens/LoginMobile';
import RegisterMobile from './screens/RegisterMobile';
//import CardScreen from './screens/CardScreen'; 

export default class App extends React.Component { 
 render() { 
 return <AppContainer />; 
 } 
}

const AppNavigator = createStackNavigator({ 
 Login: { 
  screen: LoginMobile, 
      navigationOptions: { 
        header: null // Will hide header for HomePage 
        } 
      },
  Register: { 
  screen: RegisterMobile, 
      navigationOptions: { 
        header: null // Will hide header for HomePage 
        } 
      }  
  },{ 
  initialRouteName: "Login" 
});

const AppContainer = createAppContainer(AppNavigator);

/*
export { default as LoginMobile } from "../screens/LoginMobile.js";

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';



export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});*/