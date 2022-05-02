import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { DrawerItems, SafeAreaView } from "react-navigation";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import MaterialCommunityIconsIcon from "react-native-vector-icons/MaterialCommunityIcons";
import Icon from "react-native-vector-icons/Entypo";

export default class HabitComponent extends Component {
  render() {
    return (
      <TouchableOpacity 
        onPress = {() => this.habitClick(this.props)}
        style={[styles.container, this.props.style]}
      >
        <View style={styles.list}>

          <View style={styles.habit}>
            <View style={styles.habit_Shadow}>
              <View style={styles.habit_Background}>

              {/* Habit Icon */}
              <MaterialCommunityIconsIcon
                name={this.getHabitIcon(this.props.name)}
                style={styles.habit_HabitIcon}
              ></MaterialCommunityIconsIcon>

              {/* Habit Description */}
              <View style ={styles.habit_Desc}>
                <Text style={styles.habit_Title}>{this.props.name}</Text>
                {/*<Text style={styles.habit_Task}>{this.props.task}</Text>*/}
              </View>

              <MaterialCommunityIconsIcon
                name={this.getHabitIcon(this.props.name)}
                style={styles.habit_CheckIcon}
              ></MaterialCommunityIconsIcon>

              {/* Habit Status */}
              {/*
              <FontAwesomeIcon
                name = "circle-o"
                //name={item.isFinished ? "check-circle" : (item.isInProgress ? "minus-circle" : "circle-o")}
                style={styles.habit_CheckIcon}
              ></FontAwesomeIcon>*/}

              </View>
            </View>
          </View>

        </View>
      </TouchableOpacity>
    );
  }

  habitClick = async (props) =>
  {
    var name = props.name
    try 
    {
      if (name === "Sleep")
      {
        console.log("Navigate to SleepHabit");
        props.navigation.navigate("SleepHabit");
      }
      else if (name === "Water")
      {
        console.log("Navigate to WaterHabit");
        props.navigation.navigate("WaterHabit");
      }
      else if (name === "Recreation")
      {
        console.log("Navigate to RecreationHabit");
        props.navigation.navigate("RecreationHabit");
      }
      else if (name === "Exercise")
      {
        console.log("Navigate to ExerciseHabit");
        props.navigation.navigate("ExerciseHabit");
      }
      else if (name === "Medication")
      {
        console.log("Navigate to MedicationHabit");
      }
      else if (name === "Meal")
      {
        console.log("Navigate to MealHabit");
      }
      else
      {
        console.log("Navigate to ___");
      }
    }
    catch (e)
    {

    }
  }

  // Gets icon according to habit name
  getHabitIcon = (str) =>
  {
    if (str === "Sleep")
    {
      return "power-sleep";
    }
    else if (str === "Water")
    {
      return "cup-water";
    }
    else if (str === "Recreation")
    {
      return "gamepad-variant";
    }
    else if (str === "Exercise")
    {
      return "dumbbell";
    }
    else if (str === "Medication")
    {
      return "pill";
    }
    else if (str === "Meal")
    {
      return "food-fork-drink";
    }
    else
    {
      return "cloud-question";
    }
  }
}

const styles = StyleSheet.create({
  container: {},
  habit_list: {
    height: "100%",
    width: "100%"
  },
  list: {
  //  top: "8.09%",
    left: 0,
    height: 102.5,
    //position: "absolute",
    right: 0,
    flex: 1,
    flexDirection: 'row',
    //alignItems: 'center',
    justifyContent: 'center',
    //backgroundColor: "#000",
    marginTop: "3%",
    marginBottom: "3%",
  },
  habit: {
   // top: 0,
    height: "100%",
    //position: "absolute",
    width: "91.21%",
    //left: 16,
    //alignSelf: "center"
    //flexDirection: "row",
    //flexWrap:"wrap",
  },
  habit_Shadow: {
    top: 5,
    left: 0,
    height: "92.05%",
    //position: "absolute",
    backgroundColor: "rgba(15,129,140,1)",
    borderRadius: 50,
    overflow: "visible",
    right: 0,
    //elevation: 5
  },
  habit_Background: {
    top: 0,
    left: "0%",
    width: "100%",
    height: "92.05%",
    //position: "absolute",
    backgroundColor: "rgba(15,163,177,0.9)",
    borderRadius: 50,
    overflow: "visible",
    //flex: 1,
    flexDirection: 'row',
    //alignItems: 'center',
    justifyContent: 'space-between'
  },
  habit_CheckIcon: {
    //top: 0,
    //bottom: 0,
    //marginTop: "5%",
    //position: "absolute",
    color: "rgba(255,255,255,1)",
    fontSize: 55,
    //right: "-135%",
    //left: "100%",
    right: "20%",
    alignSelf: "center",
  },
  habit_HabitIcon: {
    //top: 0,
    //bottom: 0,
    //marginTop: "5%",
    //position: "absolute",
    color: "rgba(255,255,255,1)",
    fontSize: 55,
    left: "20%",
    alignSelf: "center",
  },
  habit_Desc: {
    top: 0,
    left: 0,
    height: "100%",
    //position: "absolute",
    right: 0,
   // flex: 1,
    flexDirection: 'column',
    //alignItems: 'center',
    justifyContent: 'space-between'
  },
  habit_Title: {
    top: "25%",
    left: 0,
    right: 0,
    //position: "absolute",
    fontFamily: "roboto-700",
    color: "rgba(255,255,255,1)",
    fontSize: 28,
    textAlign: "center",
    alignSelf: "center",
  },
  habit_Task: {
    left: 0,
    right: 0,
    bottom: "10%",
    //position: "absolute",
    fontFamily: "roboto-regular",
    color: "rgba(255,255,255,1)",
    textAlign: "center",
    alignSelf: "center",
    fontSize: 16

  },
});