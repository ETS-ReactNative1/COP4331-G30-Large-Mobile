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
import FontAwesomeIcon from "@expo/vector-icons/FontAwesome5";
import MaterialCommunityIconsIcon from "@expo/vector-icons/MaterialCommunityIcons";
import Icon from "react-native-vector-icons/Entypo";

export default class HabitViewerComponent extends Component {
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
                <View style={styles.list}>

                  <View style={styles.habit}>
                    <View style={styles.habit_Shadow}>
                      <View style={styles.habit_Background}>

                        {/* Habit Icon */}
                        <MaterialCommunityIconsIcon
                        name={this.getHabitIcon(item.habitName)}
                        style={styles.habit_HabitIcon}
                        ></MaterialCommunityIconsIcon>

                        {/* Habit Description */}
                        <View style ={styles.habit_Desc}>
                          <Text style={styles.habit_Title}>{item.habitName}</Text>
                          <Text style={styles.habit_Task}>{item.recentTask}</Text>
                        </View>

                        {/* Habit Status */}
                        <FontAwesomeIcon
                          name={item.isFinished ? "check-circle" : (item.isInProgress ? "minus-circle" : "circle-o")}
                          style={styles.habit_CheckIcon}
                        ></FontAwesomeIcon>

                      </View>
                    </View>
                  </View>

                </View>
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