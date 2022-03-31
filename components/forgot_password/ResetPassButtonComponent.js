import React, { Component } from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";

export default class ResetPasswordButtonComponent extends Component {
  render() {
    return (
      <TouchableOpacity style={[styles.container, this.props.style]}>
        <TouchableOpacity
          onPress={() => this.resetPasswordClick(this.props)}
          style={styles.reset_Button}
        >
          <Text style={styles.reset_Text}>Reset Password</Text>
        </TouchableOpacity>
      </TouchableOpacity>
    );
  }

  resetPasswordClick = async (props) =>
  {
    console.log("Not Finished Yet");
  }
}

const styles = StyleSheet.create({
  container: {},
  reset_Button: {
    top: "0%",
    height: "100%",
    position: "absolute",
    backgroundColor: "rgba(15,163,177,1)",
    borderRadius: 50,
    left: 0,
    width: "100%"
  },
  reset_Text: {
    top: "25%",
    left: 0,
    position: "absolute",
    fontFamily: "roboto-regular",
    color: "rgba(255,255,255,1)",
    fontSize: 16,
    textAlign: "center",
    right: 0
  }
});
