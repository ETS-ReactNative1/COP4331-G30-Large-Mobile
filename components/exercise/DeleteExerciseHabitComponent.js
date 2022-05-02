import React, { Component } from "react";
import { StyleSheet, TouchableOpacity, Alert } from "react-native";
import Icon from "react-native-vector-icons/Feather";

export default class DeleteExerciseHabitComponent extends Component {
  render () {
    return (
      <TouchableOpacity
        onPress={() => this.deleteHabitClick(this.props)}
        style={[styles.container, this.props.style]}
      >
        <Icon name="x-circle" style={styles.icon}></Icon>
      </TouchableOpacity>
    );
  }

  removeHabit = async (props) =>
  {
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
        obj = {
          exercise: false,
          meal: false,
          medication: false,
          recreation: res.Recreation,
          sleep: res.Sleep,
          water: res.Water
        };

        let endpoint_address_customize = 'https://cop4331-g30-large.herokuapp.com/api/customize/' + global.username.trim();
        js = JSON.stringify(obj);
        const response_customize = await fetch(endpoint_address_customize, {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});
        res = JSON.parse(await response_customize.text());
      }

      props.navigation.navigate("Dashboard");
    }
    catch(e) {

      console.log(e.message);
    }
  }

  deleteHabitClick = async (props) =>
  {
    Alert.alert(
      "Delete Habit",
      "Are you sure you want to delete your \"Recreation\" habit journal?",
      [
        { text: "Yes", 
          onPress: () => this.removeHabit(props)
        },
        {
          text: "Cancel", 
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        }
      ]
    );
  }
}

const styles = StyleSheet.create({
  container: {},
  icon: {
    top: 0,
    left: 0,
    position: "absolute",
    color: "rgba(250,41,41,1)",
    fontSize: 50
  }
});
