import React, { Component } from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default class WaterButton extends Component {
  render() {
    return (
      <View style={[styles.container, this.props.style]}>
        <View style={styles.water_Shadow}>
          <TouchableOpacity
          onPress={() => this.waterClick(this.props)}
          style={this.props.onPress ? styles.clicked : styles.water_Button}>
            <Text style={styles.water2}>WATER</Text>
            <Icon name="cup-water" style={styles.icon2}></Icon>
          </TouchableOpacity>
        </View>
      </View>
    );
  }


  waterClick = async (props) =>
  {
    props.onWaterClicked(true);
  }
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
  },
  clicked: {
    top: "0%",
    left: 0,
    height: "100%",
    position: "absolute",
    backgroundColor: "rgba(255,155,66,1)",
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
  }
});
