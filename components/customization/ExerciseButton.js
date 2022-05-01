import React, { Component } from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome5";

export default class ExerciseButton extends Component {
  constructor(props) {
    super(props);
    this.state = {clicked: false};
  }

  // This correct do not change.
  onPress = async (props) => {
    const newClicked = !this.state.clicked;
    this.setState({clicked : newClicked});
    props.onExerciseClicked(newClicked);
  };

  render(){
    const { clicked } = this.state;
    return (
      <View style={[styles.container, this.props.style]}>
        <View style={!clicked ? styles.exercise_Shadow : styles.clicked_Shadow}>
          <TouchableOpacity
          onPress={() => this.onPress(this.props)}
          style={!clicked ? styles.exercise_Button : styles.clicked}>
            <Text style={styles.exerciseText}>EXERCISE</Text>
            <FontAwesomeIcon name="dumbbell" style={styles.icon2}></FontAwesomeIcon>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {},
  exercise_Shadow: {
    top: "2.83%",
    left: 3,
    height: "100%",
    position: "absolute",
    backgroundColor: "rgba(13,136,148,1)",
    borderRadius: 15,
    right: -3,
    marginRight: "-50%",
    marginLeft: "50%",
    marginTop: "-110%"
  },
  exercise_Button: {
    top: "0%",
    left: 0,
    height: "97%",
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
    right: 4
  },
  exerciseText: {
    top: "2.83%",
    position: "absolute",
    fontFamily: "roboto-700",
    color: "rgba(255,255,255,1)",
    fontSize: 18,
    height: "20.76%",
    textAlign: "center",
    left: 0,
    right: 0
  },
  icon2: {
    top: 31,
    left: 34,
    position: "absolute",
    color: "rgba(255,255,255,1)",
    fontSize: 69
  },
  clicked_Shadow: {
    top: "2.83%",
    left: 3,
    height: "100%",
    position: "absolute",
    backgroundColor: "rgba(178,102,38,1)",
    borderRadius: 15,
    right: -3,
    marginRight: "-50%",
    marginLeft: "50%",
    marginTop: "-110%"
  },
  clicked: {
    top: "0%",
    left: 0,
    height: "97%",
    position: "absolute",
    backgroundColor: "rgba(255,155,66,1)",
    borderRadius: 15,
    shadowColor: "rgba(178,102,38,1)",
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
