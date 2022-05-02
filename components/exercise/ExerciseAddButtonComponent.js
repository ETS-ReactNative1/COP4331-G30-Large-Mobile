import React, { Component } from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";

export default class ExerciseAddButtonComponent extends Component {
  render () {
    return (
      <TouchableOpacity style={[styles.container, this.props.style]}>
        <TouchableOpacity
          onPress={() => this.addLogClick(this.props)}
          style={styles.button1}
        >
          <Text style={styles.addLog}>Add Log</Text>
        </TouchableOpacity>
      </TouchableOpacity>
    );
  }

  addLogClick = async (props) =>
  {
    // Reset incorrect states
    props.onDateValidChange(true);
    props.onMessageChange('');

    var dateReg = new RegExp('(0[1-9]|1[0-2])/(0[1-9]|[12][0-9]|3[01])/[0-9]{4}');

    console.log(props.date);

    // Verify date format
    if (!dateReg.test(props.date))
    {
      props.onMessageChange("Date must be in format MM/DD/YYYY");
      props.onDateValidChange(false);
      return;
    }

    try
    {
      var obj = {
        date:props.date.trim(),
        activity:props.activity,
        exercise:props.exercise
      };

      // Save/update water log
      const endpoint = 'https://cop4331-g30-large.herokuapp.com/api/exercise/' + global.username.trim();

/*
      console.log(
        "user: " + global.username.trim() +
        " date: " + obj.date + 
        " ounces: " + obj.ounces
      );*/

      var js = JSON.stringify(obj); 
      const response = await fetch(endpoint, 
      {method:'POST',body:js,headers:{'Content-Type': 'application/json'}}); 
      var res = JSON.parse(await response.text());

      props.onMessageChange("Exercise Entry Successfully Added");
    }
    catch(e)
    {
      props.onMessageChange(e.message);
      //console.log(e);
    }
  }
}

const styles = StyleSheet.create({
  container: {},
  button1: {
    top: 0,
    left: 0,
    position: "absolute",
    backgroundColor: "rgba(15,163,177,1)",
    borderRadius: 50,
    right: 0,
    bottom: 0
  },
  addLog: {
    top: "27.42%",
    position: "absolute",
    fontFamily: "roboto-700",
    color: "rgba(255,255,255,1)",
    fontSize: 16,
    right: 0,
    left: 0,
    textAlign: "center"
  }
});
