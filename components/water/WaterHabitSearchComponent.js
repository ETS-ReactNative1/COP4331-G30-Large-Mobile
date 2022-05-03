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
import FontAwesomeIcon from "@expo/vector-icons/FontAwesome";
import MaterialCommunityIconsIcon from "react-native-vector-icons/MaterialCommunityIcons";
import Icon from "react-native-vector-icons/Entypo";

export default class WaterHabitSearchComponent extends Component {
 /* constructor(props) {
    super(props);

    this.state = {
      //loading: false,
      data: [],
      //page: 1,
      //seed: 1,
      error: null,
      //refreshing: false,
    };
  }*/

  state = {
    //loading: false,
    data: [
      {
        id: 1,
        habitName: "Habit Name",
        recentTask: "Task",
        isFinished: false,
        isInProgress: false,
      },
      {
        id: 2,
        habitName: "Habit Name",
        recentTask: "Task",
        isFinished: true,
        isInProgress: false,
      },
      {
        id: 3,
        habitName: "Habit Name",
        recentTask: "Task",
        isFinished: false,
        isInProgress: true,
      },
      {
        id: 4,
        habitName: "Habit Name",
        recentTask: "Task",
        isFinished: false,
        isInProgress: false,
      },
      {
        id: 5,
        habitName: "Habit Name",
        recentTask: "Task",
        isFinished: false,
        isInProgress: true,
      },
    ],
    //page: 1,
    //seed: 1,
    error: null,
    //refreshing: false,
  };
  
  componentDidMount () {
    this.getHabitData();
  }

  // GET HABIT DATA
  //getHabitData = () =>
  async getHabitData()
  {
    console.log("Values set");
    await this.setState({
      data: [
        {
          id: 1,
          habitName: "Exercise",
          recentTask: "2x10 Pushups",
          isFinished: false,
          isInProgress: false,
        },
        {
          id: 2,
          habitName: "Sleep",
          recentTask: "8 Hours",
          isFinished: true,
          isInProgress: false,
        },
        {
          id: 3,
          habitName: "Water",
          recentTask: "Last water break:\n3:50PM",
          isFinished: false,
          isInProgress: true,
        },
        {
          id: 4,
          habitName: "Meal",
          recentTask: "Dinner Time!",
          isFinished: false,
          isInProgress: false,
        },
        {
          id: 5,
          habitName: "Custom",
          recentTask: "Have you studied?",
          isFinished: false,
          isInProgress: true,
        },
      ],
      error: ""
    });
  }

  /*
  renderHabitItem = async ({ item }) => {
    //const backgroundColor = item.id === selectedId ? "#6e3b6e" : "#f9c2ff";
    //const color = item.id === selectedId ? 'white' : 'black';

    return (
      <View style={styles.list}>
        <View style={styles.habit}>
          <View style={styles.habit_Shadow}>
            <View style={styles.habit_Background}>
              <MaterialCommunityIconsIcon
              name="dumbbell"
              style={styles.habit_HabitIcon}
              ></MaterialCommunityIconsIcon>
              <View style ={styles.habit_Desc}>
                <Text style={styles.habit_Title}>{item.habitName}</Text>
                <Text style={styles.habit_Task}>{item.recentTask}</Text>
              </View>
              <FontAwesomeIcon
                name={this.state.isFinished ? "check-circle" : (this.state.isInProgress ? "minus-circle" : "circle-o")}
                style={styles.habit_CheckIcon}
              ></FontAwesomeIcon>
            </View>
          </View>
        </View>
      </View>
    );
  };
  */

  // Gets icon according to habit name
  getHabitIcon = (str) =>
  {
    if (str === "sleep")
    {
      return "power-sleep";
    }
    else if (str === "water")
    {
      return "cup-water";
    }
    else if (str === "recreation")
    {
      return "gamepad-variant";
    }
    else if (str === "exercise")
    {
      return "dumbbell";
    }
    else if (str === "medication")
    {
      return "pill";
    }
    else if (str === "meal")
    {
      return "food-fork-drink";
    }
    else
    {
      return "cloud-question";
    }
  }

  render() {
    return (
      <View style={styles.container}>

          {/* Habit List */}
          <FlatList
              //data={this.state.data}
              data={this.state.data}
              //renderItem={item => this.renderHabitItem(item)}
              //contentContainerStyle={{borderRadius: 50, overflow: "hidden"}}
              renderItem={({item}) =>
                <View style={styles.waterHabit_Item}>
                  <Text style={styles.waterHabit_Date}>{item.Date}</Text>
                  <Text style={styles.waterHabit_Amount}>Amount: {item.TotalOunces} FL OZ</Text>
                  <TouchableOpacity style={styles.waterHabit_RemoveButton}>
                    <FontAwesomeIcon
                      name="trash"
                      style={styles.waterHabit_RemoveIcon}
                    ></FontAwesomeIcon>
                  </TouchableOpacity>
                </View>
              /*
                <View style={styles.list}>

                  <View style={styles.habit}>
                    <View style={styles.habit_Shadow}>
                      <View style={styles.habit_Background}>

                        <MaterialCommunityIconsIcon
                          name={this.getHabitIcon(item.habitName)}
                          style={styles.habit_HabitIcon}
                        ></MaterialCommunityIconsIcon>

                        <View style ={styles.habit_Desc}>
                          <Text style={styles.habit_Title}>{item.habitName}</Text>
                          <Text style={styles.habit_Task}>{item.recentTask}</Text>
                        </View>

                        <FontAwesomeIcon
                          name={item.isFinished ? "check-circle" : (item.isInProgress ? "minus-circle" : "circle-o")}
                          style={styles.habit_CheckIcon}
                        ></FontAwesomeIcon>

                      </View>
                    </View>
                  </View>

                </View>
                */
              }
              keyExtractor={(item) => item.id}
              //extraData={selectedId}
          />

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 50,
    overflow: 'hidden',
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
  },
waterHabit_Item: {
    top: 148,
    left: 30,
    height: 66,
    position: "absolute",
    backgroundColor: "rgba(255,255,255,1)",
    borderWidth: 1,
    borderColor: "rgba(230,230,230,1)",
    borderRadius: 25,
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: {
      width: 3,
      height: 3
    },
    elevation: 30,
    shadowOpacity: 0.25,
    shadowRadius: 10,
    right: 30
  },
  waterHabit_Date: {
    top: 7,
    position: "absolute",
    fontFamily: "roboto-700",
    color: "rgba(15,163,177,1)",
    fontSize: 14,
    textAlign: "left",
    left: 30,
    width: "88.04%"
  },
  waterHabit_Amount: {
    top: 32,
    left: 30,
    position: "absolute",
    fontFamily: "roboto-regular",
    color: "#121212",
    textAlign: "left",
    width: "88.04%"
  },
  waterHabit_RemoveButton: {
    top: 12,
    width: 32,
    height: 40,
    position: "absolute",
    right: 12
  },
  waterHabit_RemoveIcon: {
    top: 0,
    left: 0,
    position: "absolute",
    color: "rgba(15,163,177,1)",
    fontSize: 40
  },
  waterHabitItem2: {
    top: 414,
    left: 30,
    width: 301,
    height: 175,
    position: "absolute",
    backgroundColor: "rgba(255,255,255,1)",
    borderWidth: 1,
    borderColor: "rgba(230,230,230,1)",
    borderRadius: 25,
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: {
      width: 3,
      height: 3
    },
    elevation: 30,
    shadowOpacity: 0.25,
    shadowRadius: 10
  },
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
    top: "10%",
    left: 0,
    right: 0,
    //position: "absolute",
    fontFamily: "roboto-700",
    color: "rgba(255,255,255,1)",
    fontSize: 18,
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