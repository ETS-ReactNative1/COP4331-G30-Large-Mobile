import React, { Component } from "react";
import { StyleSheet, View, Text, TextInput, ImageBackground } from "react-native";
import GoBackButtonComponent from "../components/register/GoBackButtonComponent";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import SignUpButtonComponent from "../components/register/SignUpButtonComponent";
import { createStackNavigator, createAppContainer } from 'react-navigation'; 
import { render } from "react-dom";
import { backgroundColor } from "react-native/Libraries/Components/View/ReactNativeStyleAttributes";

export default class RegisterMobile extends Component {
  render() {
    return (
      <View style={styles.container}>
          <ImageBackground source={require("../assets/images/background.png")} 
          resizeMode="cover"
          style={styles.background}>
        <GoBackButtonComponent
          navigation = {this.props.navigation}
          style={styles.goBackButtonComponent}
        ></GoBackButtonComponent>
        <View style={styles.register_Register}>
          <View style={styles.register_RegisterBackground}>
          <Text style={styles.header_Register}>Register</Text>
          <View style={styles.fullName}>
            <TextInput
              placeholder="Full Name"
              style={styles.fullNameField}
            ></TextInput>
            <FontAwesomeIcon
              name="male"
              style={styles.nameIcon}
            ></FontAwesomeIcon>
          </View>
          <View style={styles.email}>
            <TextInput placeholder="E-Mail" style={styles.emailField}></TextInput>
            <FontAwesomeIcon
              name="envelope"
              style={styles.eMailIcon}
            ></FontAwesomeIcon>
          </View>
          <View style={styles.phone}>
            <TextInput
              placeholder="Phone number"
              keyboardType="numeric"
              style={styles.phoneField}
            ></TextInput>
            <FontAwesomeIcon
              name="phone"
              style={styles.phoneIcon}
            ></FontAwesomeIcon>
          </View>
          <View style={styles.username}>
            <TextInput
              placeholder="Username"
              style={styles.usernameField}
            ></TextInput>
            <FontAwesomeIcon
              name="user"
              style={styles.userIcon}
            ></FontAwesomeIcon>
          </View>
          <View style={styles.password}>
            <TextInput
              placeholder="Password"
              style={styles.passwordField}
            ></TextInput>
            <FontAwesomeIcon
              name="key"
              style={styles.passwordIcon}
            ></FontAwesomeIcon>
          </View>
          <SignUpButtonComponent
            button1={"undefined"}
            SignUp_Button="LoginMobile"
            style={styles.signUpButtonComponent}
          ></SignUpButtonComponent>
          </View>
        </View>
        </ImageBackground>
      </View>
    );
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
  goBackButtonComponent: {
    position: "absolute",
    top: "4.65%",
    right: 24,
    height: 50,
    width: 50
  },
  register_Register: {
    top: "15.99%",
    height: "68.02%",
    position: "absolute",
    left: 24,
    right: 24
  },
  register_RegisterBackground: {
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
  header_Register: {
    top: "5.42%",
    position: "absolute",
    fontFamily: "roboto-700",
    color: "rgba(15,163,177,1)",
    fontSize: 28,
    height: 34,
    left: 0,
    right: 0,
    textAlign: "center"
  },
  fullName: {
    top: "18.94%",
    left: 13,
    height: 41,
    position: "absolute",
    right: 16
  },
  fullNameField: {
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
  nameIcon: {
    top: 9,
    left: 0,
    position: "absolute",
    color: "rgba(15,163,177,1)",
    fontSize: 30
  },
  email: {
    top: "30.71%",
    left: 13,
    height: 41,
    position: "absolute",
    right: 16
  },
  emailField: {
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
    left: 30,
    borderTopWidth: 0,
    borderRightWidth: 0,
    borderLeftWidth: 0,
    right: 0
  },
  eMailIcon: {
    top: 13,
    left: 0,
    position: "absolute",
    color: "rgba(15,163,177,1)",
    fontSize: 20
  },
  phone: {
    top: "42.72%",
    left: 13,
    height: 41,
    position: "absolute",
    right: 16
  },
  phoneField: {
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
    left: 30,
    borderTopWidth: 0,
    borderRightWidth: 0,
    borderLeftWidth: 0,
    right: 0
  },
  phoneIcon: {
    top: 11,
    left: 0,
    position: "absolute",
    color: "rgba(15,163,177,1)",
    fontSize: 25
  },
  username: {
    top: "54.63%",
    left: 13,
    height: 41,
    position: "absolute",
    right: 16
  },
  usernameField: {
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
  userIcon: {
    top: 13,
    left: 0,
    position: "absolute",
    color: "rgba(15,163,177,1)",
    fontSize: 25
  },
  password: {
    top: "66.48%",
    left: 13,
    height: 41,
    position: "absolute",
    right: 16
  },
  passwordField: {
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
  passwordIcon: {
    top: 14,
    left: 0,
    position: "absolute",
    color: "rgba(15,163,177,1)",
    fontSize: 20
  },
  signUpButtonComponent: {
    position: "absolute",
    top: "83.75%",
    left: 52,
    height: "8.75%",
    right: 54
  }
});
