import React, { Component } from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";

export default class SleepAddButtonComponent extends Component {
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
    props.onAsleepHrValidChange(true);
    props.onAsleepMinValidChange(true);
    props.onAwakeHrValidChange(true);
    props.onAwakeMinValidChange(true);
    props.onMessageChange('');

    var dateReg = new RegExp('(0[1-9]|1[0-2])/(0[1-9]|[12][0-9]|3[01])/[0-9]{4}');
    //var hourReg = new RegExp('1[0-2]|0[1-9]');
    //var minuteReg = new RegExp('[1-5]?[0-9]');
    let asleepHrNum = Number(props.asleepHr);
    let asleepMinNum = Number(props.asleepMin);
    let awakeHrNum = Number(props.awakeHr);
    let awakeMinNum = Number(props.awakeMin);

    // Verify date format
    if (!dateReg.test(props.date))
    {
      props.onMessageChange("Date must be in format MM/DD/YYYY");
      props.onDateValidChange(false);
      return;
    }

    // Verify asleep hour format
    if (asleepHrNum < 1 || asleepHrNum > 12)
    {
      props.onMessageChange("Asleep hour must be 1-12");
      props.onAsleepHrValidChange(false);
      return;
    }

    // Verify asleep minute format
    if (asleepMinNum < 0 || asleepMinNum > 60)
    {
      props.onMessageChange("Asleep minute must be 0-60");
      props.onAsleepMinValidChange(false);
      return;
    }

    // Verify awake hour format
    if (awakeHrNum < 1 || awakeHrNum > 12)
    {
      props.onMessageChange("Awake hour must be 1-12");
      props.onAwakeHrValidChange(false);
      return;
    }

    // Verify awake minute format
    if (awakeMinNum < 0 || awakeMinNum > 60)
    {
      props.onMessageChange("Awake minute must be 0-60");
      props.onAwakeMinValidChange(false);
      return;
    }

    try
    {
      var obj = {
        date:props.date.trim(),
        startHour:Number(props.asleepHr),
        startMin:Number(props.asleepMin),
        startMeridiam: (props.isAsleepPM ? "pm" : "am"),
        endHour:Number(props.awakeHr),
        endMin:Number(props.awakeMin),
        endMeridiam: (props.isAwakePM ? "pm" : "am"),
      };
      
      /*
      console.log(
          "starthour: " + props.asleepHr +
          " startmin: " + props.asleepMin +
          " endhour: " + props.awakeHr +
          " endmin: " + props.awakeMin +
          " start: " + obj.startMeridiam + 
          " end: " + obj.endMeridiam
      );*/

      /*
      console.log(
        "user: " + global.username.trim() +
        " date: " + obj.date
      );*/

      // Save/update water log
      const endpoint = 'https://cop4331-g30-large.herokuapp.com/api/sleep/' + global.username.trim();
      var js = JSON.stringify(obj); 
      const response = await fetch(endpoint, 
      {method:'POST',body:js,headers:{'Content-Type': 'application/json'}}); 
      var res = JSON.parse(await response.text());

      props.onMessageChange("Sleep Entry Successfully Added");

      props.updateTracker();
    }
    catch(e)
    {
      props.onMessageChange(e.message);
      console.log(e);
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
