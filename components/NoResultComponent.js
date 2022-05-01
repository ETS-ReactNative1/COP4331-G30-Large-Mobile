import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";

export default class NoResultComponent extends Component {
  render () {
    return (
      <View style={styles.container}>
        <Text style={styles.noEntry_Text}>No Entries Found</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    top: "30%",
    backgroundColor: "rgba(255,255,255,1)",
    borderWidth: 1,
    borderColor: "rgba(230,230,230,1)",
    borderRadius: 25,
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: {
      width: 3,
      height: 3
    },
    elevation: 10,
    shadowOpacity: 0.25,
    shadowRadius: 10,
    width: "70%",
    height: "9%",
    left: "13%",
    right: "13%"
  },
  noEntry_Text: {
    position: "absolute",
    fontFamily: "roboto-700",
    color: "rgba(15,163,177,1)",
    textAlign: "center",
    fontSize: 18,
    left: 0,
    top: 21,
    right: 0
  }
});
