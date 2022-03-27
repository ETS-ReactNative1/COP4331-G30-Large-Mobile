import React, { Component } from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";

function LoginButtonComponent(props) {
  return (
    <TouchableOpacity style={[styles.container, props.style]}>
      <TouchableOpacity
        onPress={() => console.log("Navigate to Untitled")}
        style={styles.button2}
      >
        <Text style={styles.text1}>Login</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {},
  button2: {
    width: 199,
    height: 42,
    backgroundColor: "rgba(15,163,177,1)",
    borderRadius: 50
  },
  text1: {
    fontFamily: "roboto-regular",
    color: "rgba(255,255,255,1)",
    fontSize: 16,
    marginTop: 10,
    marginLeft: 80
  }
});

export default LoginButtonComponent;
