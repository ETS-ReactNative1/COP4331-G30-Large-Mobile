import React, { Component } from "react";
import { StyleSheet, View, Text, TextInput, ImageBackground } from "react-native";
import GoBackButtonComponent from "../components/GoBackButtonComponent";
import Icon from "react-native-vector-icons/FontAwesome";
import ResetPassButtonComponent from "../components/forgot_password/ResetPassButtonComponent";

export default class ForgotPasswordMobile extends Component {
  render() {
    return (
      <View style={styles.container}>
        <ImageBackground source={require("../assets/images/background.png")} 
          resizeMode="cover"
          style={styles.background}>

          {/* Return Button */}
          <GoBackButtonComponent
            navigation = {this.props.navigation}
            style={styles.goBackButtonComponent1}
          ></GoBackButtonComponent>

          {/* Body */}
          <View style={styles.forgotPassword_ForgotPassword}>
            <View style={styles.forgotPassword_Background}>

              {/* Directions */}
              <Text style={styles.header_Forgot}>Forgot Your Password?</Text>
              <Text style={styles.prompt_User_Text}> Enter the email linked to your account.</Text>

              {/* Email Input */}
              <View style={styles.email}>
                <TextInput placeholder="E-Mail" style={styles.emailField}></TextInput>
                <Icon name="envelope" style={styles.eMailIcon}></Icon>
              </View>

              {/* Reset Password Button */}
              <ResetPassButtonComponent
                style={styles.resetPasswordButtonComponent}
              ></ResetPassButtonComponent>

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
  goBackButtonComponent1: {
    position: "absolute",
    top: "6.5%",
    right: 24,
    height: 50,
    width: 50
  },
  forgotPassword_ForgotPassword: {
    height: "45%",
    position: "absolute",
    left: 25,
    top: "25%",
    right: 25
  },
  forgotPassword_Background: {
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
  header_Forgot: {
    top: "9.78%",
    position: "absolute",
    fontFamily: "roboto-700",
    color: "rgba(15,163,177,1)",
    fontSize: 28,
    height: 39,
    left: 0,
    textAlign: "center",
    right: 0
  },
  prompt_User_Text: {
    top: "25%",
    position: "absolute",
    fontFamily: "roboto-regular",
    color: "#121212",
    textAlign: "center",
    fontSize: 16,
    left: 23,
    height: 43,
    right: 23
  },
  email: {
    top: "51%",
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
  resetPasswordButtonComponent: {
    position: "absolute",
    top: "75%",
    left: 53,
    height: "13.33%",
    right: 53
  }
});
