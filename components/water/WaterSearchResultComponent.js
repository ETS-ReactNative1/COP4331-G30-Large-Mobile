import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Alert
} from "react-native";
import { DrawerItems, SafeAreaView } from "react-navigation";
import FontAwesomeIcon from "@expo/vector-icons/FontAwesome";
import MaterialCommunityIconsIcon from "react-native-vector-icons/MaterialCommunityIcons";
import Icon from "react-native-vector-icons/Entypo";

export default class WaterSearchResultComponent extends Component {
  
  state = {
    isLogDeleted: false
  }

  componentDidMount () {
  }


  render() {
    return (
    !this.state.isLogDeleted &&
      <View style={styles.container}>
        <View style={styles.waterHabit_Item}>
          <Text style={styles.waterHabit_Date}>{this.props.date}</Text>
          <Text style={styles.waterHabit_Amount}>Amount: {this.props.amount} FL OZ</Text>
          <TouchableOpacity 
            style={styles.waterHabit_RemoveButton}
            onPress={() => this.deleteLogClick(this.props)}
          >
            <FontAwesomeIcon
                name="trash"
                style={styles.waterHabit_RemoveIcon}
            ></FontAwesomeIcon>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  removeLog = async (props) =>
  {
    try
    {
      //global.username = "Test"

      var obj = {
        date:props.date.trim()
      };

      // Save/update water log
      const endpoint = 'https://cop4331-g30-large.herokuapp.com/api/deleteWater/' + global.username.trim();

      var js = JSON.stringify(obj); 
      const response = await fetch(endpoint,
      {method:'DELETE',body:js,headers:{'Content-Type': 'application/json'}}); 
      var res = JSON.parse(await response.text());

      this.setState(({isLogDeleted}) => ({isLogDeleted: true}));

      props.onDeletion();

      props.updateTracker();
      //props.resetSearch(false);
      //props.onMessageChange("Water Entry Successfully Added");
    }
    catch(e)
    {
      //props.onMessageChange(e.message);
      //console.log(e);
    }
  }

  deleteLogClick = async (props) =>
  {
    Alert.alert(
      "Delete Log",
      "Are you sure you want to delete you \"Water\" log for " + props.date + "?",
      [
        { text: "Yes", 
          onPress: () => this.removeLog(props)
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
  container: {
    flex: 1,
    //borderRadius: 50,
    //overflow: 'hidden',
    //borderBottomRightRadius: 0,
    //borderBottomLeftRadius: 0,
    top: "30%",
    zIndex: 100
  },
  waterHabit_Item: {
    //top: "40%",
    height: "11%",
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
    elevation: 10,
    shadowOpacity: 0.25,
    shadowRadius: 10,
    left: "13%",
    right: "13%"
  },
  waterHabit_Date: {
    top: "15%",
    position: "absolute",
    fontFamily: "roboto-700",
    color: "rgba(15,163,177,1)",
    fontSize: 20,
    textAlign: "left",
    left: "10%",
    width: "88.04%"
  },
  waterHabit_Amount: {
    bottom: "20%",
    left: "10%",
    position: "absolute",
    fontFamily: "roboto-regular",
    color: "#121212",
    textAlign: "left",
    width: "88.04%",
    fontSize: 14
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