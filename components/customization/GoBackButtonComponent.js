import React, { Component } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import Icon from "@expo/vector-icons/Feather";

export default class GoBackButtonComponent extends Component {
  render() {
    return (
      <TouchableOpacity 
        style={[styles.container, this.props.style]}
        onPress={() => this.goBackClick(this.props)}
      >
        <Icon name="arrow-left-circle"
          style={styles.icon1}
        ></Icon>
      </TouchableOpacity>
    );
  }

  goBackClick = async (props) =>
  {
    props.navigation.navigate('Dashboard');
  }
}

const styles = StyleSheet.create({
  container: {},
  icon1: {
    top: 0,
    left: 0,
    position: "absolute",
    color: "rgba(255,255,255,1)",
    fontSize: 50,
    height: 50,
    width: 50
  }
});
