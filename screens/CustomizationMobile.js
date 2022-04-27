import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import GoBackButtonComponent from "../components/customization/GoBackButtonComponent";
import WaterButton from "../components/customization/WaterButton";
import RecreationButton from "../components/customization/RecreationButton";
import DoneButton from "../components/customization/DoneButton";
import SleepButton from "../components/customization/SleepButton";

export default class CustomizationMobile extends Component {

  state = {
    message: '',
    isWaterClicked: false,
    isSleepClicked: false,
    isRecreationClicked: false,
    isExerciseClicked: false,
    isMealClicked: false,
    isMedicationClicked: false,
  }

  handleMessageChange = message =>
  {
    this.setState({message})
  }

  handleWaterClicked = isClicked =>
  {
    this.setState(({isWaterClicked}) => ({isWaterClicked: isClicked}));
  }

  handleSleepClicked = isClicked =>
  {
    this.setState(({isSleepClicked}) => ({isSleepClicked: isClicked}));
  }

  handleRecreationClicked = isClicked =>
  {
    this.setState(({isRecreationClicked}) => ({isRecreationClicked: isClicked}));
  }

  render() {
    return (
      <View style={styles.container}>
        <GoBackButtonComponent
          navigation={this.props.navigation}
          style={styles.goBackButtonComponent1}
        ></GoBackButtonComponent>

        <Text style={styles.habitTrackers}>Habit Trackers</Text>

        <WaterButton
          onWaterClicked = {this.handleWaterClicked}
          style={styles.waterButton}
        ></WaterButton>

        <RecreationButton
          onRecreationClicked = {this.handleRecreationClicked}
          style={styles.recreationButton}
        ></RecreationButton>

        <SleepButton
          onSleepClicked = {this.handleSleepClicked}
          style={styles.sleepButton}
        ></SleepButton>

        <DoneButton
          onMessageChange = {this.handleMessageChange}
          navigation = {this.props.navigation}
          state = {this.state}
          style={styles.doneButton}
        ></DoneButton>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:"rgba(255,255,255,1)"
  },
  goBackButtonComponent1: {
    position: "absolute",
    top: "5.16%",
    height: 50,
    width: 48,
    right: 29
  },
  habitTrackers: {
    top: "13.78%",
    left: 27,
    position: "absolute",
    fontFamily: "roboto-700",
    color: "rgba(15,163,177,1)",
    fontSize: 30,
    textAlign: "left",
    right: 27,
    height: "5%"
  },
  waterButton: {
    position: "absolute",
    top: "23.39%",
    left: 111,
    right: 112,
    height: "14.32%"
  },
  sleepButton: {
    position: "absolute",
    top: "42.42%",
    left: 111,
    right: 112,
    height: "14.32%"
  },
  recreationButton: {
    position: "absolute",
    top: "62.17%",
    left: 111,
    right: 111,
    height: "14.32%"
  },
  doneButton: {
    position: "absolute",
    top: "87.25%",
    left: 179,
    right: 28,
    height: "6.49%"
  },
  register_Verification: {
    top: "90%",
    height: "6%",
    position: "absolute",
    left: 22,
    right: 22
  },
  register_VerificationBackground: {
    top: "0%",
    left: 0,
    height: "100%",
    position: "absolute",
    backgroundColor: "rgba(255,255,255,1)",
    borderRadius: 15,
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: {
      width: 3,
      height: 3
    },
    elevation: 10,
    shadowOpacity: 0.25,
    shadowRadius: 10,
    right: 0,
    borderColor: "rgba(210,210,210,210)",
    borderWidth: 1
  },
  text_verifyEmail: {
    top: "18.74%",
    left: 0,
    position: "absolute",
    fontFamily: "roboto-regular",
    color: "rgba(0,0,0,1)",
    fontSize: 16,
    right: 0,
    textAlign: "center"
  }
});
