import React, { Component } from "react";
import { StyleSheet, View, Text, TextInput, ImageBackground } from "react-native";
import GoBackButtonComponent from "../components/GoBackButtonComponent";
import Icon from "react-native-vector-icons/FontAwesome";
import ResetPassButtonComponent from "../components/forgot_password/ResetPassButtonComponent";

/*
global.email_forgot_password = "";*/

export default class ForgotPasswordMobile extends Component {
  state = {
    message: '',
    isEmailValid: true,
    emailSent: false,
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
      this.newPasswordInput.clear();
    }
  }

  // Changes validity of email input
  handleEmailValidChange = valid =>
  {
    this.setState(({isEmailValid}) => ({isEmailValid:valid}));
  }

  // Changes if email has been sent
  handleEmailSentChange = isSent =>
  {
    this.setState(({emailSent}) => ({emailSent:isSent}));
  }

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground source={require("../assets/images/background3.png")} 
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

              <Text style={styles.text_Incorrect}>{this.state.message}</Text>

              {/* Email Input */}
              <View style={styles.email}>
                <TextInput placeholder="E-Mail" 
                  style={[styles.emailField, !this.state.isEmailValid && styles.incorrect]}
                  onChangeText={(val) => {this.forgotPasswordEmailChangedHandler(val)}}
                  ref={input => { this.newPasswordInput = input }}
                ></TextInput>
                <Icon name="envelope" style={styles.eMailIcon}></Icon>
              </View>

              {/* Reset Password Button */}
              <ResetPassButtonComponent
                state={this.state}
                onMessageChange = {this.handleMessageChange}
                onEmailValidChange = {this.handleEmailValidChange}
                onEmailSentChange = {this.handleEmailSentChange}
                style={styles.resetPasswordButtonComponent}
              ></ResetPassButtonComponent>

            </View>
          </View>

          <View style={styles.resetPassword_Verification}>
          {
            // Determines if email sent flag is true
            this.state.emailSent && (
              <View style={styles.resetPassword_VerificationBackground}>
                <Text
                style={styles.text_verifyEmail}
                >Password Reset Sent! Check your email.</Text>
              </View>
            )
          }
          </View>

        </ImageBackground>
      </View>
    );
  }

  forgotPasswordEmailChangedHandler = async(val) =>
  {
    global.email_forgot_password = val;
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
  text_Incorrect: {
    top: "40%",
    left: 0,
    position: "absolute",
    fontFamily: "roboto-700",
    color: "rgba(242, 38, 19, 1)",
    fontSize: 16,
    textAlign: "center",
    right: 0
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
  },
  resetPassword_Verification: {
    top: "80%",
    height: "6%",
    position: "absolute",
    left: 22,
    right: 22
  },
  resetPassword_VerificationBackground: {
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
