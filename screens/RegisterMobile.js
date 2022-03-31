import React, { Component } from "react";
import { StyleSheet, View, Text, TextInput, ImageBackground } from "react-native";
import GoBackButtonComponent from "../components/GoBackButtonComponent";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import SignUpButtonComponent from "../components/register/SignUpButtonComponent";
import { createStackNavigator, createAppContainer } from 'react-navigation'; 
import { render } from "react-dom";
import { backgroundColor } from "react-native/Libraries/Components/View/ReactNativeStyleAttributes";

global.firstName = "";
global.lastName = "";
global.username = "";
global.password = "";
global.email = "";
global.phone = "";

export default class RegisterMobile extends Component {
  state = {
    message: '',
    emailSent: false,
    isEmailValid: true,
    isPhoneValid: true,
    isUsernameValid: true,
    isPasswordValid: true
  }

  // Changes if email has been sent
  handleEmailSentChange = isSent =>
  {
    this.setState(({emailSent}) => ({emailSent:isSent}));
  }

  // Changes registration message
  handleMessageChange = message =>
  {
    this.setState({message})
  }

  // Changes validity of email input
  handleEmailValidChange = valid =>
  {
    this.setState(({isEmailValid}) => ({isEmailValid:valid}));
  }

  // Changes validity of phone input
  handlePhoneValidChange = valid =>
  {
    this.setState(({isPhoneValid}) => ({isPhoneValid:valid}));
  }

  // Changes validity of username input
  handleUsernameValidChange = valid =>
  {
    this.setState(({isUsernameValid}) => ({isUsernameValid:valid}));
  }

  // Changes validity of password input
  handlePasswordValidChange = valid =>
  {
    this.setState(({isPasswordValid}) => ({isPasswordValid:valid}));
  }

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
              <Text style={styles.text_Incorrect}>{this.state.message}</Text>
              <View style={styles.fullName}>
                <TextInput
                  placeholder="First Name"
                  style={styles.firstNameField}
                  onChangeText={(val) => {this.firstNameChangedHandler(val)}}
                ></TextInput>
                <TextInput
                  placeholder="Last Name"
                  style={styles.lastNameField}
                  onChangeText={(val) => {this.lastNameChangedHandler(val)}}
                ></TextInput>
                <FontAwesomeIcon
                  name="male"
                  style={styles.nameIcon}
                ></FontAwesomeIcon>
              </View>
              <View style={styles.email}>
                <TextInput 
                placeholder="E-Mail *" 
                style={[styles.emailField, !this.state.isEmailValid && styles.incorrect]}
                onChangeText={(val) => {this.emailChangedHandler(val)}}
                ></TextInput>
                <FontAwesomeIcon
                  name="envelope"
                  style={styles.eMailIcon}
                ></FontAwesomeIcon>
              </View>
              <View style={styles.phone}>
                <TextInput
                  placeholder="Phone number"
                  keyboardType="phone-pad"
                  style={[styles.phoneField, !this.state.isPhoneValid && styles.incorrect]}
                  onChangeText={(val) => {this.phoneChangedHandler(val)}}
                ></TextInput>
                <FontAwesomeIcon
                  name="phone"
                  style={styles.phoneIcon}
                ></FontAwesomeIcon>
              </View>
              <View style={styles.username}>
                <TextInput
                  placeholder="Username *"
                  style={[styles.usernameField, !this.state.isUsernameValid && styles.incorrect]}
                  onChangeText={(val) => {this.usernameChangedHandler(val)}}
                ></TextInput>
                <FontAwesomeIcon
                  name="user"
                  style={styles.userIcon}
                ></FontAwesomeIcon>
              </View>
              <View style={styles.password}>
                <TextInput
                  placeholder="Password *"
                  style={[styles.passwordField, !this.state.isPasswordValid && styles.incorrect]}
                  onChangeText={(val) => {this.passwordChangedHandler(val)}}
                ></TextInput>
                <FontAwesomeIcon
                  name="key"
                  style={styles.passwordIcon}
                ></FontAwesomeIcon>
              </View>
              <SignUpButtonComponent
                navigation = {this.props.navigation}
                state = {this.state}
                onEmailSentChange = {this.handleEmailSentChange}
                onMessageChange = {this.handleMessageChange}
                onEmailValidChange = {this.handleEmailValidChange}
                onPhoneValidChange = {this.handlePhoneValidChange}
                onUsernameValidChange = {this.handleUsernameValidChange}
                onPasswordValidChange = {this.handlePasswordValidChange}
                style={styles.signUpButtonComponent}
              ></SignUpButtonComponent>
            </View>
          </View>
          <View style={styles.register_Verification}>
          {
            // Determines if email sent flag is true
            this.state.emailSent && (
              <View style={styles.register_VerificationBackground}>
                <Text
                style={styles.text_verifyEmail}
                >Email Verification Sent! Check your email.</Text>
              </View>
            )
          }
          </View>
        </ImageBackground>
      </View>
    );
  }
  firstNameChangedHandler = async(val) =>
  {
    global.firstName = val;
  }

  lastNameChangedHandler = async(val) =>
  {
    global.lastName = val;
  }

  emailChangedHandler = async(val) =>
  {
    global.email = val;
  }

  phoneChangedHandler = async(val) =>
  {
    global.phone = val;
  }

  usernameChangedHandler = async(val) =>
  {
    global.username = val;
  }

  passwordChangedHandler = async(val) =>
  {
    global.password = val;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:"rgba(255,255,255,1)"
  },
  incorrect: {
    backgroundColor: "rgba(242, 38, 19, 0.1)"
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
    left: 22,
    right: 22
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
    //height: 34,
    left: 0,
    right: 0,
    textAlign: "center"
  },
  text_Incorrect: {
    top: "15%",
    left: 0,
    position: "absolute",
    fontFamily: "roboto-700",
    color: "rgba(242, 38, 19, 1)",
    fontSize: 16,
    textAlign: "center",
    right: 0
  },
  fullName: {
    top: "22%",
    left: "8%",
    height: 41,
    position: "absolute",
    right: "8%",
  },
  firstNameField: {
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
    right: "51%"
  },
  lastNameField: {
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
    left: "52%",
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
    top: "33%",
    left: "8%",
    height: 41,
    position: "absolute",
    right: "8%"
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
    top: "44%",
    left: "8%",
    height: 41,
    position: "absolute",
    right: "8%"
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
    top: "55%",
    left: "8%",
    height: 41,
    position: "absolute",
    right: "8%"
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
    top: "66%",
    left: "8%",
    height: 41,
    position: "absolute",
    right: "8%"
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
  },
  register_Verification: {
    top: "90%",
    height: "6%",
    position: "absolute",
    left: 22,
    right: 22
  },
  register_VerificationBackground: {
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
  text_verifyEmail: {
    top: "18.74%",
    left: 0,
    position: "absolute",
    fontFamily: "roboto-regular",
    color: "rgba(0,0,0,1)",
    fontSize: 16,
    right: 0,
    textAlign: "center"
  }
});
