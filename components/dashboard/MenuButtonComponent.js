import React, { Component } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Icon from "@expo/vector-icons/Feather";

export default class MenuButtonComponent extends Component {
  render() {
    return (
      <TouchableOpacity style={[styles.container, this.props.style]}>
        <Icon name="align-right" 
          onPress={() => this.openMenuClick(this.props)}
          style={styles.icon3}></Icon>
      </TouchableOpacity>
    );
  }

  openMenuClick = async (props) =>
  {
    props.navigation.openDrawer();
    //props.navigation.navigate('Login');
  }
}

const styles = StyleSheet.create({
  container: {},
  icon3: {
    top: 0,
    position: "absolute",
    color: "rgba(255,255,255,1)",
    fontSize: 45,
    right: 0
  }
});