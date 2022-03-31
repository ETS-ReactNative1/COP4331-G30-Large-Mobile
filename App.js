import React from 'react'; 
import * as Font from "expo-font";
import { StyleSheet, Text, View } from 'react-native'; 
import { createStackNavigator } from "react-navigation-stack"; 
import { createAppContainer } from "react-navigation"; 
import LoginMobile from './screens/LoginMobile';
import RegisterMobile from './screens/RegisterMobile';
import DashboardMobile from './screens/DashboardMobile';
import SliderNativeComponent from 'react-native/Libraries/Components/Slider/SliderNativeComponent';
import AppLoading from 'expo-app-loading';
import ForgotPasswordMobile from './screens/ForgotPasswordMobile';

//import { AppLoading } from "expo";
//import './stylesheets/font.css';
//import './App.module.css';
//import CardScreen from './screens/CardScreen'; 

let customFonts = {
    'roboto-regular': require("./assets/fonts/roboto-regular.ttf"),
    'roboto-700': require("./assets/fonts/roboto-700.ttf"),
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
    while (Font.isLoading('roboto_regular') && Font.isLoading('roboto_700'))
    {}

    // App starts
    return <AppContainer />;
  }
}

// ADD SCREENS HERE
const AppNavigator = createStackNavigator({ 
 Login: { 
  screen: LoginMobile, 
      navigationOptions: { 
        headerShown: false // Will hide header for HomePage 
        } 
      },
  Register: { 
  screen: RegisterMobile, 
      navigationOptions: { 
        headerShown: false // Will hide header for HomePage 
        } 
      },
  Dashboard: { 
  screen: DashboardMobile, 
      navigationOptions: { 
        headerShown: false // Will hide header for HomePage 
        } 
      },
  ForgotPassword: {
  screen: ForgotPasswordMobile, 
      navigationOptions: { 
        headerShown: false // Will hide header for HomePage 
        } 
      },
  },{ 
  initialRouteName: "Login" 
});

const AppContainer = createAppContainer(AppNavigator);