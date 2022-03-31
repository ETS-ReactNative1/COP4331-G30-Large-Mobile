import React, { Component } from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";

export default class ForgotPasswordButtonComponent extends Component {
    render() {
    return (
      <TouchableOpacity 
      onPress={() => this.forgotPassButtonClick(this.props)}
      style={[styles.container, this.props.style]}
      >
        <Text style={styles.text_ForgotPassword}>Forgot Your Password?</Text>
      </TouchableOpacity>
    );
  }

  forgotPassButtonClick = async (props) =>
  {
    props.navigation.navigate('ForgotPassword');
  }
}

const styles = StyleSheet.create({
  container: {},
  text_ForgotPassword: {
    top: 0,
    left: 0,
    position: "absolute",
    fontFamily: "roboto-700",
    color: "rgba(15,163,177,1)",
    fontSize: 16,
    textAlign: "center",
    right: 0
  }
});
