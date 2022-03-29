import React from 'react'; 
import * as Font from "expo-font";
import { StyleSheet, Text, View } from 'react-native'; 
import { createStackNavigator } from "react-navigation-stack"; 
import { createAppContainer } from "react-navigation"; 
import LoginMobile from './screens/LoginMobile';
import RegisterMobile from './screens/RegisterMobile';
import DashboardMobile from './screens/DashboardMobile';

//import { AppLoading } from "expo";
//import './stylesheets/font.css';
//import './App.module.css';
//import CardScreen from './screens/CardScreen'; 

let customFonts = {
    'roboto_regular': require("./assets/fonts/roboto-regular.ttf"),
    'roboto_700': require("./assets/fonts/roboto-700.ttf")
};

export default class App extends React.Component {

  state = {
    loaded: false
  };

  // Load fonts
  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }

  componentDidMount() {
    this._loadFontsAsync();
  }

  render() {
    // If the fonts haven't loaded
    /*
    if (!this.state.loaded) {
      return <AppLoading />;
    }*/

    // App starts
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
      },
  Dashboard: { 
  screen: DashboardMobile, 
      navigationOptions: { 
        header: null // Will hide header for HomePage 
        } 
      }
  },{ 
  initialRouteName: "Login" 
});

const AppContainer = createAppContainer(AppNavigator);