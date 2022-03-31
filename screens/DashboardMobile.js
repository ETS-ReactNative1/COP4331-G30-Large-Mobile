import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import FeatherIcon from "react-native-vector-icons/Feather";
import Svg, { Ellipse } from "react-native-svg";
import MaterialCommunityIconsIcon from "react-native-vector-icons/MaterialCommunityIcons";

export default class Dashboard extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.rect2}>
          <FeatherIcon name="plus-circle" style={styles.icon}></FeatherIcon>
          <FeatherIcon name="align-right" style={styles.icon2}></FeatherIcon>
          <Text style={styles.xTimeMilestone}>x time Milestone</Text>
          <View style={styles.rect}></View>
          <Svg viewBox="0 0 197 197" style={styles.ellipse}>
            <Ellipse
              stroke="rgba(15,163,177,1)"
              strokeWidth={1}
              fill="rgba(255,255,255,1)"
              cx={99}
              cy={99}
              rx={98}
              ry={98}
            ></Ellipse>
          </Svg>
          <FeatherIcon name="check-circle" style={styles.icon4}></FeatherIcon>
        </View>
        <View style={styles.list}>
          <View style={styles.habit_Example}>
            <View style={styles.example_Background}>
            <FeatherIcon name="circle" style={styles.example_Check}></FeatherIcon>
            <MaterialCommunityIconsIcon
              name="dumbbell"
              style={styles.example_Icon}
            ></MaterialCommunityIconsIcon>
            <Text style={styles.example_Title}>Habit Name</Text>
            <Text style={styles.exampleTask}>Example Task</Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:"rgba(255,255,255,1)"
  },
  rect2: {
    top: "0%",
    left: 0,
    height: "57.02%",
    position: "absolute",
    backgroundColor: "rgba(255,255,255,1)",
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: {
      height: 3,
      width: 0
    },
    elevation: 10,
    shadowOpacity: 0.25,
    shadowRadius: 10,
    right: 1
  },
  icon: {
    top: 39,
    left: 15,
    position: "absolute",
    color: "rgba(15,163,177,1)",
    fontSize: 50
  },
  icon2: {
    top: 39,
    position: "absolute",
    color: "rgba(15,163,177,1)",
    fontSize: 50,
    right: 12
  },
  xTimeMilestone: {
    top: 99,
    left: 129,
    position: "absolute",
    fontFamily: "roboto-regular",
    color: "#121212"
  },
  rect: {
    top: 126,
    left: 55,
    height: 37,
    position: "absolute",
    backgroundColor: "#E6E6E6",
    right: 55
  },
  ellipse: {
    top: 186,
    width: 197,
    height: 197,
    position: "absolute",
    left: 82
  },
  icon4: {
    top: 305,
    left: 303,
    position: "absolute",
    color: "rgba(128,128,128,1)",
    fontSize: 40
  },
  list: {
    top: 457,
    left: 0,
    height: 88,
    position: "absolute",
    right: 0
  },
  habit_Example: {
    top: 0,
    height: 88,
    position: "absolute",
    left: 22,
    right: 22
  },
  example_Background: {
    top: "75%",
    left: "0%",
    width: "100.01%",
    height: 81,
    position: "absolute",
    backgroundColor: "rgba(230,230,230,1)",
    borderRadius: 50,
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: {
      height: 5,
      width: 0
    },
    elevation: 5,
    shadowOpacity: 1,
    shadowRadius: 0
  },
  example_Check: {
    top: 19,
    position: "absolute",
    color: "rgba(128,128,128,1)",
    fontSize: 40,
    right: 16
  },
  example_Icon: {
    top: 12,
    left: 14,
    position: "absolute",
    color: "rgba(128,128,128,1)",
    fontSize: 50
  },
  example_Title: {
    top: 9,
    left: 0,
    position: "absolute",
    fontFamily: "roboto-700",
    color: "#121212",
    fontSize: 16,
    right: 0,
    textAlign: "center"
  },
  exampleTask: {
    top: 49,
    left: 0,
    position: "absolute",
    fontFamily: "roboto-regular",
    color: "#121212",
    right: 0,
    textAlign: "center"
  }
});
