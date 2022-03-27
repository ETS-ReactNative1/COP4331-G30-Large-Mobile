import React, { Component } from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";
import { createStackNavigator, createAppContainer } from 'react-navigation'; 

export default class RegisterButtonComponent extends Component {
  render() {
    return (
      <TouchableOpacity style={[styles.container, this.props.style]}>
        <TouchableOpacity /* Conditional navigation not supported at the moment */
          onPress={() => this.props.navigation.navigate('Register')}
          style={styles.register_Button}
        ></TouchableOpacity>
        <Text style={styles.register_Text}>Register</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {},
  register_Button: {
    top: "0%",
    left: 0,
    height: "100%",
    position: "absolute",
    backgroundColor: "rgba(15,163,177,1)",
    borderRadius: 50,
    right: 0
  },
  register_Text: {
    top: "38.03%",
    left: 0,
    position: "absolute",
    fontFamily: "roboto-regular",
    color: "rgba(255,255,255,1)",
    fontSize: 16,
    lineHeight: 10,
    right: 0,
    textAlign: "center",
    height: "23.94%"
  }
});
