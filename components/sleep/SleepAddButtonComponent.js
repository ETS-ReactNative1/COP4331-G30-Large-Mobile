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

/*
  isAsleepPM = {this.state.isAsleepPM}
  isAwakePM = {this.state.isAwakePM}
  asleepHr = {this.state.addLog_AsleepHr}
  asleepMin = {this.state.addLog_AsleepMin}
  awakeHr = {this.state.addLog_AwakeHr}
  awakeMin = {this.state.addLog_AwakeMin}
  date = {this.state.addLog_Date}

  onAsleepHrValidChange = {this.handleAsleepHrValidChange}
  onAsleepMinValidChange = {this.handleAsleepMinValidChange}
  onAwakeHrValidChange = {this.handleAwakeHrValidChange}
  onAwakeMinValidChange = {this.handleAwakeMinValidChange}
  onDateValidChange = {this.handleDateValidChange}
  onMessageChange = {this.handleMessageChange}
*/

  addLogClick = async (props) =>
  {
    // Reset incorrect states
    props.onDateValidChange(true);
    props.onAsleepHrValidChange(true);
    props.onAsleepMinValidChange(true);
    props.onAwakeHrValidChange(true);
    props.onAwakeMinValidChange(true);
    props.onMessageChange('');

    console.log(global.username + "PRESSED");

    var dateReg = new RegExp('(0[1-9]|1[0-2])/(0[1-9]|[12][0-9]|3[01])/[0-9]{4}');
    var hourReg = new RegExp('((0[1-9]|1[0-2])|([1-9]))');
    var minuteReg = new RegExp('(([0-5][0-9])|[0-9]|60)');

    console.log(props.date);

    // Verify date format
    if (!dateReg.test(props.date))
    {
      props.onMessageChange("Date must be in format MM/DD/YYYY");
      props.onDateValidChange(false);
      return;
    }

    console.log(props.asleepHr);
    // Verify asleep hour format
    console.log(hourReg.test(props.asleepHr));
    if (!hourReg.test(props.asleepHr))
    {
      props.onMessageChange("Asleep hour must be 1-12");
      props.onAsleepHrValidChange(false);
      return;
    }

    // Verify asleep minute format
    if (!minuteReg.test(props.asleepMin))
    {
      props.onMessageChange("Asleep minute must be 0-60");
      props.onAsleepMinValidChange(false);
      return;
    }

    // Verify awake hour format
    if (!hourReg.test(props.awakeHr))
    {
      props.onMessageChange("Awake hour must be 1-12");
      props.onAwakeHrValidChange(false);
      return;
    }

    // Verify awake minute format
    if (!minuteReg.test(props.awakeMin))
    {
      props.onMessageChange("Awake minute must be 0-60");
      props.onAwakeMinValidChange(false);
      return;
    }

    try
    {
      //global.username = "Test"

/*
  const date = req.body.date;
  let startHour = req.body.startHour;
  let startMin = req.body.startMin;
  const startMeridiam = req.body.startMeridiam;
  let endHour = req.body.endHour;
  let endMin = req.body.endMin;
  const endMeridiam = req.body.endMeridiam;
*/

      var obj = {
        date:props.date.trim(),
        startHour:Number(props.asleepHr),
        startMin:Number(props.asleepMin),
        startMeridiam: (props.isAsleepPM ? "pm" : "am"),
        endHour:Number(props.awakeHr),
        endMin:Number(props.awakeMin),
        endMeridiam: (props.isAwakePM ? "pm" : "am"),
      };

      console.log(
          "starthour: " + props.asleepHr +
          " startmin: " + props.asleepMin +
          " endhour: " + props.awakeHr +
          " endmin: " + props.awakeMin +
          " start: " + obj.startMeridiam + 
          " end: " + obj.endMeridiam
      );

      // Save/update water log
      const endpoint = 'https://cop4331-g30-large.herokuapp.com/api/sleep/' + global.username.trim();


      console.log(
        "user: " + global.username.trim() +
        " date: " + obj.date
      );

      var js = JSON.stringify(obj); 
      const response = await fetch(endpoint, 
      {method:'POST',body:js,headers:{'Content-Type': 'application/json'}}); 
      var res = JSON.parse(await response.text());

      props.onMessageChange("Sleep Entry Successfully Added");
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
