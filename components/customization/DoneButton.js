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

  // thid gives an error JSON Parse error: Unrecognized token '<'
  doneClick = async (props) =>
  {
    try {

      props.onMessageChange("");

      var obj = {
        exercise: props.state.isExerciseClicke,
        meal: props.state.isMealClicked,
        medication: props.state.isMedicationClicked,
        recreation: props.state.isRecreationClicked,
        sleep: props.state.isSleepClicked,
        water: props.state
      };

      // pings the API
      let endpoint_address_search = 'https://cop4331-g30-large.herokuapp.com/api/getCustomization:' + global.username;
      var js = JSON.stringify(obj);
      const response_search = await fetch(endpoint_address_search, {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});
      var res = JSON.parse(await response_search.text());

      if (endpoint_address_search.status === 500)
      {
        props.onMessageChange(res.error);
      }
      else if (endpoint_address_search.status === 200)
      {
        // check what is being brought back in res.

        // Add the rest
        obj.sleep = obj.sleep || res.Sleep;
        obj.water = obj.water || res.Water;
        obj.recreation = obj.water || res.Recreation;

        let endpoint_address_customize = 'https://cop4331-g30-large.herokuapp.com/api/customize:' + global.username;
        js = JSON.stringify(obj);
        const response_customize = await fetch(endpoint_address_customize, {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});
        res = JSON.parse(await response_customize.text());
      }


      // Back to Dashboard Screen
      props.navigation.navigate('Dashboard');
    }
    catch(e) {
      props.onMessageChange(e.message);
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
