import React, { Component } from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";

function RegisterButtonComponent(props) {
  return (
    <TouchableOpacity style={[styles.container, props.style]}>
      <TouchableOpacity
        onPress={() => console.log("Navigate to Untitled")}
        style={styles.button1}
      >
        <Text style={styles.register2}>Register</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {},
  button1: {
    width: 199,
    height: 42,
    backgroundColor: "rgba(15,163,177,1)",
    borderRadius: 50
  },
  register2: {
    fontFamily: "roboto_regular",
    color: "rgba(255,255,255,1)",
    fontSize: 16,
    marginTop: 10,
    marginLeft: 70
  }
});

export default RegisterButtonComponent;
