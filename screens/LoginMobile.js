import React, { Component } from "react";
import { StyleSheet, View, Image, TextInput, Text, ImageBackground } from "react-native";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import LoginButtonComponent from "../components/login/LoginButtonComponent";
import ForgotPasswordButtonComponent from "../components/login/ForgotPasswordButtonComponent";
import RegisterButtonComponent from "../components/login/RegisterButtonComponent";
import { createStackNavigator, createAppContainer } from 'react-navigation'; 
import { render } from "react-dom";
import { borderColor } from "react-native/Libraries/Components/View/ReactNativeStyleAttributes";

/*
global.username_login = "";
global.password_login = "";
global.userId = "";*/

export default class LoginMobile extends Component {
/*
constructor() 
{ 
  super() 
  this.state = 
  { 
    message: 'oh ya'
  }
}*/

  state = {
    message: ''
  }

  handleMessageChange = message =>
  {
    if (message !== "Success")
    {
      // Show error message
      this.setState({message})
    }
    else
    {
      // Clear text inputs
      this.usernameInput.clear();
      this.passwordInput.clear();
    }

  }

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground source={require("../assets/images/background3.png")} 
          resizeMode="cover"
          style={styles.background}>

          {/* Body */}
          <View style={styles.login_Login}>
            <View style={styles.login_LoginBackground}>

              {/* Logo */}
              <Image
                source={require("../assets/images/dailygrind5.png")}
                resizeMode="contain"
                style={styles.logo}
              ></Image>

              {/* Error text */}
              <Text style={styles.text_Incorrect}>{this.state.message}</Text>

              {/* Username Input */}
              <View style={styles.username}>
                <TextInput
                  placeholder="Username"
                  style={styles.usernameField1}
                  onChangeText={(val) => {this.usernameChangedHandler(val)}}
                  ref={input => { this.usernameInput = input }}
                ></TextInput>
                <FontAwesomeIcon
                  name="user"
                  style={styles.userIcon1}
                ></FontAwesomeIcon>
              </View>

              {/* Password Input */}
              <View style={styles.password}>
                <TextInput
                  placeholder="Password"
                  secureTextEntry={true}
                  style={styles.passwordField1}
                  onChangeText={(val) => {this.passwordChangedHandler(val)}}
                  ref={input => { this.passwordInput = input }}
                ></TextInput>
                <FontAwesomeIcon
                  name="key"
                  style={styles.passwordIcon1}
                ></FontAwesomeIcon>
              </View>

              {/* Login Button */}
              <LoginButtonComponent
                navigation = {this.props.navigation}
                state = {this.state}
                onMessageChange = {this.handleMessageChange}
                style={styles.loginButtonComponent}
              ></LoginButtonComponent>

              {/* Forgot Password Button */}
              <ForgotPasswordButtonComponent
                navigation = {this.props.navigation}
                style={styles.forgotPasswordButtonComponent}
              ></ForgotPasswordButtonComponent>

            </View>
          </View>

          {/* Body */}
          <View style={styles.login_Register}>
            <View style={styles.login_RegisterBackground}>
              <Text style={styles.text_NotRegistered}>Not Registered?</Text>
              <RegisterButtonComponent
                navigation = {this.props.navigation}
                state = {this.state}
                style={styles.registerButtonComponent}
              ></RegisterButtonComponent>
            </View>
          </View>

        </ImageBackground>
      </View>
    )
  }

  usernameChangedHandler = async(val) =>
  {
    global.username_login = val;
  }

  passwordChangedHandler = async(val) =>
  {
    global.password_login = val;
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:"rgba(255,255,255,1)"
  },
  background: {
    flex: 1,
    justifyContent: "center",
    width:"100%",
    height:"100%"
  },
  login_Login: {
    top: "12.49%",
    height: "53.31%",
    position: "absolute",
    right: 22,
    left: 22
  },
  login_LoginBackground: {
    top: "0%",
    left: 0,
    height: "100%",
    position: "absolute",
    backgroundColor: "rgba(255,255,255,1)",
    borderRadius: 15,
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: {
      width: 3,
      height: 3
    },
    elevation: 10,
    shadowOpacity: 0.25,
    shadowRadius: 10,
    right: 0,
    borderColor: "rgba(210,210,210,210)",
    borderWidth: 1
  },
  logo: {
    top: "12.93%",
    left: 0,
    height: 52,
    position: "absolute",
    width: "100%"
  },
  text_Incorrect: {
    top: "28.5%",
    left: 0,
    position: "absolute",
    fontFamily: "roboto-700",
    color: "rgba(242, 38, 19, 1)",
    fontSize: 16,
    textAlign: "center",
    right: 0
  },
  username: {
    top: "35.7%",
    left: "8%",
    height: 41,
    position: "absolute",
    right: "8%"
  },
  usernameField1: {
    position: "absolute",
    fontFamily: "roboto-regular",
    color: "#121212",
    height: 41,
    borderWidth: 1,
    borderColor: "#000000",
    textAlign: "left",
    backgroundColor: "rgba(255,255,255,1)",
    fontSize: 16,
    top: "0%",
    left: 29,
    borderTopWidth: 0,
    borderRightWidth: 0,
    borderLeftWidth: 0,
    right: 0
  },
  userIcon1: {
    top: 13,
    left: 0,
    position: "absolute",
    color: "rgba(15,163,177,1)",
    fontSize: 25
  },
  password: {
    top: "50.83%",
    left: "8%",
    height: 41,
    position: "absolute",
    right: "8%"
  },
  passwordField1: {
    position: "absolute",
    fontFamily: "roboto-regular",
    color: "#121212",
    height: 41,
    borderWidth: 1,
    borderColor: "#000000",
    textAlign: "left",
    backgroundColor: "rgba(255,255,255,1)",
    fontSize: 16,
    top: "0%",
    left: 29,
    borderTopWidth: 0,
    borderRightWidth: 0,
    borderLeftWidth: 0,
    right: 0
  },
  passwordIcon1: {
    top: 14,
    left: 0,
    position: "absolute",
    color: "rgba(15,163,177,1)",
    fontSize: 20
  },
  loginButtonComponent: {
    position: "absolute",
    top: "70.97%",
    left: 56,
    height: "11.24%",
    right: 56
  },
  forgotPasswordButtonComponent: {
    position: "absolute",
    top: "87.14%",
    left: 0,
    right: 0,
    height: 19
  },
  login_Register: {
    top: "75.88%",
    height: "15.14%",
    position: "absolute",
    left: 22,
    right: 22
  },
  login_RegisterBackground: {
    top: "0%",
    left: 0,
    width: "100%",
    height: "100%",
    position: "absolute",
    backgroundColor: "rgba(255,255,255,1)",
    borderRadius: 15,
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: {
      width: 3,
      height: 3
    },
    elevation: 10,
    shadowOpacity: 0.25,
    shadowRadius: 10,
    borderColor: "rgba(210,210,210,210)",
    borderWidth: 1
  },
  text_NotRegistered: {
    top: "18.74%",
    left: 0,
    position: "absolute",
    fontFamily: "roboto-regular",
    color: "rgba(0,0,0,1)",
    fontSize: 16,
    right: 0,
    textAlign: "center"
  },
  registerButtonComponent: {
    position: "absolute",
    top: "42.15%",
    left: 56,
    height: "39.64%",
    right: 56
  }
});
