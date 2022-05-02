import React, { Component } from "react";
import { StyleSheet, View, Image, Text } from "react-native";
import GoBackButtonComponent from "../components/customization/GoBackButtonComponent";
import WaterButton from "../components/customization/WaterButton";
import RecreationButton from "../components/customization/RecreationButton";
import DoneButton from "../components/customization/DoneButton";
import SleepButton from "../components/customization/SleepButton";
import ExerciseButton from "../components/customization/ExerciseButton";

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

  handleExcerciseClicked = isClicked =>
  {
    this.setState(({isExerciseClicked}) => ({isExerciseClicked: isClicked}));
  }

  render() {
    return (
      <View style={styles.container}>
        <Image
        source={require("../assets/images/background3.png")}
        resizeMode="stretch"
        style={styles.image3}
        ></Image>

        <GoBackButtonComponent
          navigation={this.props.navigation}
          style={styles.goBackButtonComponent1}
        ></GoBackButtonComponent>

        <Text style={styles.habitTrackers}>Habit Trackers</Text>
        
        <Text style={styles.instruction}>Choose the habit's you would like{"\n"}to track for your Daily Grind!</Text>
        <View style={styles.customization_Background}>
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

          <ExerciseButton
            onExerciseClicked = {this.handleExcerciseClicked}
            style={styles.exerciseButton}
          ></ExerciseButton>

          <DoneButton
            onMessageChange = {this.handleMessageChange}
            navigation = {this.props.navigation}
            state = {this.state}
            style={styles.doneButton}
          ></DoneButton>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexWrap: "wrap",
    backgroundColor:"rgba(255,255,255,1)"
  },
  instruction: {
    top: "17.5%",
    position: "absolute",
    fontFamily: "roboto-700",
    color: "rgba(255,255,255,1)",
    fontSize: 22,
    //height: 34,
    left: 0,
    right: 0,
    textAlign: "center"
  },
  customization_Background: {
    top: "27.5%",
    left: "2.5%",
    height: "60%",
    width: "95%",
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
    right: "2.5%",
    borderColor: "rgba(210,210,210,210)",
    borderWidth: 1
  },
  goBackButtonComponent1: {
    position: "absolute",
    top: "5.29%",
    height: 50,
    width: 48,
    right: 29
  },
  image3: {
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    position: "absolute",
    bottom: 209,
    opacity: 0.9,
    backgroundColor: "rgba(100,100,100,1)"
  },
  habitTrackers: {
    top: "5.29%",
    position: "absolute",
    fontFamily: "roboto-700",
    color: "rgba(255,255,255,1)",
    fontSize: 28,
    height: 34,
    left: 0,
    right: 0,
    textAlign: "center"
  },
  waterButton: {
    position: "absolute",
    top: "10%",
    left: 111,
    right: 111,
    width: "45%",
    height: "25.32%"
  },
  sleepButton: {
    position: "absolute",
    top: "10%",
    left: 111,
    right: 111,
    width: "45%",
    height: "25.32%"
  },
  recreationButton: {
    position: "absolute",
    top: "40%",
    left: 111,
    right: 111,
    width: "45%",
    height: "25.32%"
  },
  exerciseButton: {
    position: "absolute",
    top: "40%",
    left: 111,
    right: 111,
    width: "45%",
    height: "25.32%"
  },
  doneButton: {
    position: "absolute",
    top: "80%",
    left: "15%",
    right: "15%",
    height: "10%"
  }
});
