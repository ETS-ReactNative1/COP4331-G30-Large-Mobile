import React, { Component } from "react";
import { StyleSheet, View, Image, TextInput, Text, ImageBackground } from "react-native";
import GoBackButtonComponent from "../components/GoBackButtonComponent";

export default class DashboardMobile extends Component {
  render() {
    return (
        <View style={styles.container}>
            <ImageBackground source={require("../assets/images/Pingu_1.png")} 
            resizeMode="cover"
            style={styles.background}>
                <GoBackButtonComponent
                navigation = {this.props.navigation}
                style={styles.goBackButtonComponent}
                ></GoBackButtonComponent>
            </ImageBackground>
        </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:"rgba(255,255,255,1)"
  },
  background: {
    flex: 1,
    justifyContent: "center",
    width:"100%",
    height:"100%"
  },
  goBackButtonComponent: {
    position: "absolute",
    top: "4.65%",
    right: 24,
    height: 50,
    width: 50
  }
});