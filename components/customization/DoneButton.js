import React, { Component } from "react";
import { StyleSheet, TouchableOpacity, View, Text } from "react-native";

export default class DoneButton extends Component {
  render() {
    return (
      <TouchableOpacity style={[styles.container, this.props.style]}>
        <TouchableOpacity
        onPress = {() => this.doneClick(this.props)}
        style={styles.rect}
        >
          <Text style={styles.done}>Done</Text>
        </TouchableOpacity>
      </TouchableOpacity>
    );
  }

  // Working
  doneClick = async (props) => {
    try {
      var obj = {};

      // pings the API
      let endpoint_address_search = 'https://cop4331-g30-large.herokuapp.com/api/getCustomization/' + global.username.trim();
      var js = JSON.stringify(obj);
      const response_search = await fetch(endpoint_address_search, {method:'GET',headers:{'Content-Type': 'application/json'}});
      var res = JSON.parse(await response_search.text());

      console.log(response_search.status);

      if (response_search.status === 400)
      {

      }
      else if (response_search.status === 200)
      {
        // Checks to see which which buttons are click
        obj = {
          exercise: props.state.isExerciseClicked || res.Exercise,
          meal: false,
          medication: false,
          recreation: props.state.isRecreationClicked || res.Recreation,
          sleep: props.state.isSleepClicked || res.Sleep,
          water: props.state.isWaterClicked || res.Water
        };

        let endpoint_address_customize = 'https://cop4331-g30-large.herokuapp.com/api/customize/' + global.username.trim();
        js = JSON.stringify(obj);
        const response_customize = await fetch(endpoint_address_customize, {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});
        res = JSON.parse(await response_customize.text());

        props.navigation.navigate('Dashboard');
      }
    }
    catch(e) {

      console.log(e.message);
    }
  }
}

const styles = StyleSheet.create({
  container: {},
  rect: {
    top: "0%",
    left: 0,
    height: "99.95%",
    position: "absolute",
    backgroundColor: "rgba(15,163,177,1)",
    borderRadius: 51,
    right: 0
  },
  done: {
    position: "absolute",
    fontFamily: "roboto-700",
    color: "rgba(255,255,255,1)",
    textAlign: "center",
    fontSize: 20,
    height: "47.8%",
    left: 31,
    top: "26.1%",
    right: 31
  }
});
