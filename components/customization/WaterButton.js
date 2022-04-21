import React, { Component } from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

function WaterButton(props) {
  return (
    <View style={[styles.container, props.style]}>
      <View style={styles.water_ShadowStack}>
        <View style={styles.water_Shadow}></View>
        <TouchableOpacity style={styles.water_Button}>
          <Text style={styles.water2}>WATER</Text>
          <Icon name="cup-water" style={styles.icon2}></Icon>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  water_Shadow: {
    top: "2.83%",
    left: 3,
    height: "100%",
    position: "absolute",
    backgroundColor: "rgba(13,136,148,1)",
    borderRadius: 15,
    right: -3
  },
  water_Button: {
    top: "0%",
    left: 0,
    height: "100%",
    position: "absolute",
    backgroundColor: "rgba(15,163,177,1)",
    borderRadius: 15,
    shadowColor: "rgba(15,163,177,1)",
    shadowOffset: {
      width: 3,
      height: 3
    },
    elevation: 5,
    shadowOpacity: 0.01,
    shadowRadius: 0,
    right: 0
  },
  water2: {
    top: "2.83%",
    position: "absolute",
    fontFamily: "roboto-700",
    color: "rgba(255,255,255,1)",
    fontSize: 18,
    height: "20.76%",
    textAlign: "center",
    right: 0,
    left: 0
  },
  icon2: {
    top: 31,
    left: 34,
    position: "absolute",
    color: "rgba(255,255,255,1)",
    fontSize: 69
  }
});

export default WaterButton;
