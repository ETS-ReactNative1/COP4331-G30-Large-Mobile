import React, { Component } from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import Icon from "@expo/vector-icons/Feather";

export default class AddHabitButtonComponent extends Component {
  render() {
    return (
      <TouchableOpacity 
        onPress={() => this.addHabitClick(this.props)}
        style={[styles.container, this.props.style]}
      >
        <Icon name="plus-circle" style={styles.icon}></Icon>
      </TouchableOpacity>
    );
  }

  addHabitClick = async (props) =>
  {
    props.navigation.navigate("Customization");
  }
}

const styles = StyleSheet.create({
  container: {},
  icon: {
    top: 0,
    left: 0,
    position: "absolute",
    color: "rgba(255,255,255,1)",
    fontSize: 50
  }
});