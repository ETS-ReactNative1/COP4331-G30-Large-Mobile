import React, { Component } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Feather";

export default class AddHabitButtonComponent extends Component {

  render() {
    return (
      <TouchableOpacity
      onPress={() => this.props.navigation.navigate('Customization')}
      style={[styles.container, this.props.style]}
      >
        <Icon name="plus-circle" style={styles.icon}></Icon>
      </TouchableOpacity>
    );
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
