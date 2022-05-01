import React, { Component } from "react";
import { StyleSheet, View, Image, Text, ScrollView, TouchableOpacity, FlatList} from "react-native";
import AddHabitButtonComponent from "../components/dashboard/AddHabitButtonComponent";
import MenuButtonComponent from "../components/dashboard/MenuButtonComponent";
import HabitViewerComponent from "../components/dashboard/HabitViewerComponent";
//import { Center } from "@builderx/utils";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import MaterialCommunityIconsIcon from "react-native-vector-icons/MaterialCommunityIcons";
import EntypoIcon from "react-native-vector-icons/Entypo";
import { backgroundColor } from "react-native/Libraries/Components/View/ReactNativeStyleAttributes";
import HabitComponent from "../components/dashboard/HabitComponent";

export default class DashboardMobile extends Component {
  state = {
    exerciseIsTracked: false,
    recreationIsTracked: false,
    sleepIsTracked: false,
    waterIsTracked: false,
    exerciseTask: '',
    recreationTask: '',
    sleepTask: '',
    waterTask: '' 
  }

  async getHabits ()
  {
    try
    {
      var obj = {};

      // pings the API
      let endpoint_address_search = 'https://cop4331-g30-large.herokuapp.com/api/getCustomization/' + global.username.trim();
      var js = JSON.stringify(obj);
      const response_search = await fetch(endpoint_address_search, {method:'GET',headers:{'Content-Type': 'application/json'}});
      var res = JSON.parse(await response_search.text());

      //console.log(response_search.status);

      if (response_search.status === 400)
      {

      }
      else if (response_search.status === 200)
      {
        this.setState(({exerciseIsTracked}) => ({exerciseIsTracked: res.Exercise}));
        this.setState(({recreationIsTracked}) => ({recreationIsTracked: res.Recreation}));
        this.setState(({sleepIsTracked}) => ({sleepIsTracked: res.Sleep}));
        this.setState(({waterIsTracked}) => ({waterIsTracked: res.Water}));
      }
    }
    catch (e)
    {

    }
  }

  // define a separate function to get triggered on focus
  onFocusFunction = () => {
    (async () => this.getHabits())();
  }

  // add a focus listener onDidMount
  async componentDidMount () {
    this.focusListener = this.props.navigation.addListener('didFocus', () => {
      this.onFocusFunction()
    })
  }

  // and don't forget to remove the listener
  componentWillUnmount () {
    this.focusListener.remove();
  }
/*
  componentDidMount()
  {
    (async () => this.getHabits())();
  }
*/
  render() {
    return (
      <View style={styles.container}>
        <Image
          source={require("../assets/images/background3.png")}
          resizeMode="stretch"
          style={styles.image3}
        ></Image>
        
        <Text style={styles.header_Dashboard}>Dashboard</Text>

        <AddHabitButtonComponent
          navigation = {this.props.navigation}
          style={styles.addHabitButtonComponent}
        ></AddHabitButtonComponent>

        <MenuButtonComponent
          navigation = {this.props.navigation}
          style={styles.menuButtonComponent}
        ></MenuButtonComponent>

        <View style={styles.dashboard_Milestone}>
          <Text style={styles.milestone_Text}>x Month Milestone</Text>
          <View style={styles.progressBar}>
            <View style={styles.progress}></View>
          </View>
        </View>
        <View style={styles.dashboard_Profile}>
          <Image
            source={require("../assets/images/Pingu_1.png")}
            resizeMode="cover"
            style={styles.profilePicture}
          ></Image>
          <View style={styles.welcome_Group}>
            <Text style={styles.welcome_Message}>
              Welcome{"\n"}
              Back,{"\n"}
              {global.firstName === "" ? global.username : global.firstName}!
            </Text>
            {/*<Text style={styles.welcome_Name}>{global.username}! </Text>*/}
          </View>
        </View>

        <View style={styles.dashboard_Habits}>
          <View style={styles.dashboard_HabitsBackground}>
            <View style={styles.dashboard_HabitsContainer}>
              <View style={styles.dashboard_Scroll}>
                <ScrollView>
                  {
                    this.state.exerciseIsTracked && (
                      <HabitComponent
                        name = "Exercise"
                        task = {this.state.exerciseTask}
                        navigation = {this.props.navigation}
                      ></HabitComponent>
                    )
                  }
                  {
                    this.state.recreationIsTracked && (
                      <HabitComponent
                        name = "Recreation"
                        task = {this.state.recreationTask}
                        navigation = {this.props.navigation}
                      ></HabitComponent>
                    )
                  }
                  {
                    this.state.sleepIsTracked && (
                      <HabitComponent
                        name = "Sleep"
                        task = {this.state.sleepTask}
                        navigation = {this.props.navigation}
                      ></HabitComponent>
                    )
                  }
                  {
                    this.state.waterIsTracked && (
                      <HabitComponent
                        name = "Water"
                        task = {this.state.waterTask}
                        navigation = {this.props.navigation}
                      ></HabitComponent>
                    )
                  }
                </ScrollView>
              </View>
              {/*
              <View style={styles.list}>
                <View style={styles.habit}>
                  <View style={styles.habit_Shadow}>
                    <View style={styles.habit_Background}>
                      <MaterialCommunityIconsIcon
                        name="dumbbell"
                        style={styles.habit_HabitIcon}
                      ></MaterialCommunityIconsIcon>
                      <View style ={styles.habit_Desc}>
                        <Text style={styles.habit_Title}>Habit Name</Text>
                        <Text style={styles.habit_Task}>Example Task</Text>
                      </View>
                      <FontAwesomeIcon
                        name="circle-o"
                        style={styles.habit_CheckIcon}
                      ></FontAwesomeIcon>
                    </View>
                  </View>
                </View>
              </View>*/}

              {/* Test */}
              {/*
              <View style={styles.list1}>
                <View style={styles.habit1}>
                  <View style={styles.habitBackground1}></View>
                  <FontAwesomeIcon
                    name="circle-o"
                    style={styles.habitCheckIcon1}
                  ></FontAwesomeIcon>
                  <MaterialCommunityIconsIcon
                    name="dumbbell"
                    style={styles.habitHabitIcon1}
                  ></MaterialCommunityIconsIcon>
                  <Text style={styles.habitTitle1}>Habit Name</Text>
                  <Text style={styles.habitTask1}>Example Task</Text>
                </View>
              </View>
              <View style={styles.list2}>
                <View style={styles.addHabit}>
                  <View style={styles.addHabitBackground}></View>
                  <EntypoIcon
                    name="plus"
                    style={styles.addHabitIcon}
                  ></EntypoIcon>
                  <Text style={styles.addHabit_Text}>Add a Habit</Text>
                </View>
              </View>
              <Text style={styles.endOfList}>End of List</Text>
              */}
            </View>
          </View>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,1)"
  },
  image3: {
    top: 0,
    left: 0,
    width: "100%",
    position: "absolute",
    bottom: 209,
    opacity: 0.9,
    backgroundColor: "rgba(100,100,100,1)"
  },
  header_Dashboard: {
    top: 47,
    position: "absolute",
    fontFamily: "roboto-700",
    color: "rgba(255,255,255,1)",
    fontSize: 28,
    height: 34,
    left: 0,
    right: 0,
    textAlign: "center"
  },
  addHabitButtonComponent: {
    position: "absolute",
    top: 39,
    left: 15,
    height: 50,
    width: 50
  },
  menuButtonComponent: {
    position: "absolute",
    top: 42,
    height: 45,
    width: 45,
    right: 15
  },
  dashboard_Milestone: {
    top: "14%",
    left: 0,
    height: "7.03%",
    position: "absolute",
    right: 0
  },
  milestone_Text: {
    top: 0,
    position: "absolute",
    fontFamily: "roboto-700",
    color: "rgba(255,255,255,1)",
    textAlign: "center",
    width: "100%"
  },
  progressBar: {
    top: 23,
    left: 55,
    height: "55.75%",
    position: "absolute",
    right: 56,
    backgroundColor: "rgba(255,255,255,1)",
    borderWidth: 1,
    borderColor: "rgba(15,163,177,1)",
    borderStyle: "solid"
  },
  progress: {
    top: 0,
    left: 0,
    position: "absolute",
    backgroundColor: "rgba(15,163,177,1)",
    width: "75.69%",
    bottom: 0
  },
  dashboard_Profile: {
    top: "24%",
    left: 0,
    position: "absolute",
    right: 0,
    height: "23.24%"
  },
  profilePicture: {
    top: "3.47%",
    left: "10%",
    width: 185,
    height: 185,
    position: "absolute",
    borderWidth: 4,
    borderColor: "rgba(255,155,66,1)",
    borderRadius: 100,
    borderStyle: "solid"
  },
  welcome_Group: {
    top: "16.85%",
    left: 221,
    position: "absolute",
    right: "10%",
    height: "66.28%"
  },
  welcome_Message: {
    top: 0,
    position: "absolute",
    fontFamily: "roboto-700",
    color: "rgba(255,255,255,1)",
    fontSize: 28,
    textAlign: "left",
    right: 0
  },
  welcome_Name: {
    position: "absolute",
    fontFamily: "roboto-700",
    color: "rgba(255,255,255,1)",
    fontSize: 28,
    textAlign: "left",
    right: 0,
    top: 0
  },
  dashboard_Habits: {
    top: "50%",
    left: 0,
    height: "49%",
    position: "absolute",
    right: 0,
  },
  dashboard_HabitsBackground: {
    top: "0%",
    left: 0,
    position: "absolute",
    right: 0,
    borderRadius: 50,
    backgroundColor: "rgba(255,255,255,1)",
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
    bottom: 0,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
  },
  dashboard_HabitsContainer: {
    top: "3.5%",
    left: 8,
    position: "absolute",
    backgroundColor: "rgba(255,255,255,1)",
    borderWidth: 1,
    borderColor: "rgba(220,220,220,1)",
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: {
      height: 3,
      width: 0
    },
    elevation: 10,
    shadowOpacity: 0.25,
    shadowRadius: 10,
    borderRadius: 50,
    height: "100%",
    right: 8,
    bottom: 0,
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
    
  },
  dashboard_Scroll: {
    borderRadius: 50,
    overflow: 'hidden',
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
  },
  list: {
    top: "8.09%",
    left: 0,
    height: "25.49%",
    position: "absolute",
    right: 0,
    flex: 1,
    flexDirection: 'row',
    //alignItems: 'center',
    justifyContent: 'center'
  },
  habit: {
    top: 0,
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
    position: "absolute",
    backgroundColor: "rgba(15,129,140,1)",
    borderRadius: 50,
    overflow: "visible",
    right: 0
  },
  habit_Background: {
    top: 0,
    left: "0%",
    width: "100%",
    height: "92.05%",
    position: "absolute",
    backgroundColor: "rgba(15,163,177,0.9)",
    borderRadius: 50,
    overflow: "visible",
    flex: 1,
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
    fontSize: 50,
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
    fontSize: 50,
    left: "20%",
    alignSelf: "center",
  },
  habit_Desc: {
    top: 0,
    left: 0,
    height: "100%",
    //position: "absolute",
    right: 0,
    flex: 1,
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
    fontSize: 16,
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

  },/* ----------------------------------------------------------------------------------------------===== */
  list1: {
    top: "36.7%",
    left: 0,
    height: "22.49%",
    position: "absolute",
    right: 0
  },
  habit1: {
    top: 0,
    height: "100.02%",
    position: "absolute",
    left: 16,
    right: 16
  },
  habitBackground1: {
    top: 0,
    left: "0%",
    width: "100.01%",
    height: "92.05%",
    position: "absolute",
    backgroundColor: "rgba(15,163,177,1)",
    borderRadius: 50,
    overflow: "visible",
    shadowColor: "rgba(10,137,148,1)",
    shadowOffset: {
      width: 3,
      height: 3
    },
    elevation: 75,
    shadowOpacity: 0.5,
    shadowRadius: 25
  },
  habitCheckIcon1: {
    top: 12,
    position: "absolute",
    color: "rgba(255,255,255,1)",
    fontSize: 50,
    right: 14
  },
  habitHabitIcon1: {
    left: 14,
    position: "absolute",
    color: "rgba(255,255,255,1)",
    fontSize: 50,
    top: 10
  },
  habitTitle1: {
    top: 14,
    left: 0,
    position: "absolute",
    fontFamily: "roboto-700",
    color: "rgba(255,255,255,1)",
    fontSize: 16,
    right: 0,
    textAlign: "center"
  },
  habitTask1: {
    left: 0,
    position: "absolute",
    fontFamily: "roboto-regular",
    color: "rgba(255,255,255,1)",
    right: 0,
    textAlign: "center",
    bottom: 21
  },
  list2: {
    top: "66.02%",
    left: 0,
    height: "22.25%",
    position: "absolute",
    right: 0
  },
  addHabit: {
    top: 0,
    height: "100.02%",
    position: "absolute",
    left: 16,
    right: 16
  },
  addHabitBackground: {
    top: 0,
    left: "0%",
    width: "100.01%",
    height: "92.05%",
    position: "absolute",
    borderRadius: 50,
    overflow: "visible",
    borderWidth: 1,
    borderColor: "rgba(211,211,211,1)",
    borderStyle: "dashed",
    backgroundColor: "rgba(245,245,245,1)"
  },
  addHabitIcon: {
    top: 0,
    position: "absolute",
    color: "rgba(194,189,189,1)",
    fontSize: 50
  },
  addHabit_Text: {
    left: 0,
    position: "absolute",
    fontFamily: "roboto-regular",
    color: "rgba(185,182,182,1)",
    right: 0,
    textAlign: "center",
    bottom: 12
  },
  endOfList: {
    left: 0,
    position: "absolute",
    fontFamily: "roboto-regular",
    color: "rgba(155,155,155,1)",
    bottom: 8,
    right: 0,
    textAlign: "center"
  }
});
