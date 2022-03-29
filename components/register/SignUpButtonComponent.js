import React, { Component } from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";

export default class SignUpButtonComponent extends Component {
  render() {
    return (
      <TouchableOpacity style={[styles.container, this.props.style]}>
        <TouchableOpacity /* Conditional navigation not supported at the moment */
          onPress={() => console.log("Navigate to Untitled")}
          style={styles.signUp_Button}
        >
          <Text style={styles.signUp_Text}>Sign Up</Text>
        </TouchableOpacity>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {},
  signUp_Button: {
    top: "0%",
    height: "100%",
    position: "absolute",
    backgroundColor: "rgba(15,163,177,1)",
    borderRadius: 50,
    left: 0,
    width: "100%"
  },
  signUp_Text: {
    top: "25%",
    left: 0,
    position: "absolute",
    fontFamily: "roboto_regular",
    color: "rgba(255,255,255,1)",
    fontSize: 16,
    textAlign: "center",
    right: 0
  }
});
