import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ImageBackground
} from "react-native";
import { DrawerItems, SafeAreaView } from "react-navigation";
import Icon from "react-native-vector-icons/Entypo";

export default class MenuButtonComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentDate: "",
    };
  }

  // Get the current date in MM/DD/YYYY format
  getCurrentDate() {
    var today = new Date(Date.now());
    let yyyy = today.getFullYear();
    let mm = today.getMonth() + 1; // Months start at 0!
    let dd = today.getDate();

    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;

    today = mm + '/' + dd + '/' + yyyy;

    return today;
  }

  componentDidMount() {
    var currDate = this.getCurrentDate()
    this.setState(({currentDate}) => ({currentDate: currDate}));
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.menu_Header}>
          {/*<View style={styles.menu_HeaderBackground}>*/}
          <ImageBackground
          source={require("../../assets/images/background3.png")}
          resizeMode="stretch"
          style={styles.menu_HeaderBackground}
          >
            <View style={styles.dashboard_Milestone}>
              <Text style={styles.milestone_Text}>{this.state.currentDate}</Text>
              {/*<View style={styles.progressBar}>
                <View style={styles.progress}></View>
              </View>*/}
            </View>
            <View style={styles.accountInformation}>
              <Text style={styles.header_Username}>{global.username}</Text>
              <Text style={styles.header_Email}>{global.email}</Text>
            </View>
          {/*</View>*/}
          </ImageBackground>
        </View>
        <View style={styles.scrollArea}>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate("Customization");
            }}
            style={styles.menu_button}
          >
            <Text style={styles.menu_buttonText}>{"\t"}Add A Habit</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              if (global.isExerciseTracked)
                this.props.navigation.navigate("ExerciseHabit");
            }}
            style={global.isExerciseTracked ? styles.menu_button : styles.menu_buttonInactive}
          >
            <Text style={styles.menu_buttonText}>{"\t"}Exercise</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              if (global.isRecreationTracked)
                this.props.navigation.navigate("RecreationHabit");
            }}
            style={global.isRecreationTracked ? styles.menu_button : styles.menu_buttonInactive}
          >
            <Text style={styles.menu_buttonText}>{"\t"}Recreation</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              if (global.isSleepTracked)
                this.props.navigation.navigate("SleepHabit");
            }}
            style={global.isSleepTracked ? styles.menu_button : styles.menu_buttonInactive}
          >
            <Text style={styles.menu_buttonText}>{"\t"}Sleep</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            onPress={() => {
              if (global.isWaterTracked)
                this.props.navigation.navigate("WaterHabit");
            }}
            style={global.isWaterTracked ? styles.menu_button : styles.menu_buttonInactive}
          >
            <Text style={styles.menu_buttonText}>{"\t"}Water</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate("Dashboard");
            }}
            style={styles.menu_buttonOther}
          >
            <Text style={styles.menu_buttonTextOther}>{"\t"}Settings</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => this.onLogoutClick(this.props)}
            style={styles.menu_buttonOther}
          >
            <Text style={styles.menu_buttonTextOther}>{"\t"}Logout</Text>
          </TouchableOpacity>
{/*
          <ScrollView
            contentContainerStyle={styles.scrollArea_contentContainerStyle}
          >

          </ScrollView>*/}
        </View>
        {/*
        <View style={styles.divider}></View>
        <TouchableOpacity 
          onPress={() => this.onLogoutClick(this.props)}
          style={styles.logout_Button}
        >
          <Text style={styles.logoutText}>Logout</Text>
          <Icon name="log-out" style={styles.logoutIcon}></Icon>
        </TouchableOpacity>
        */}
      </View>
    );
  }

  onLogoutClick = async (props) =>
  {
    global.firstName = "";
    global.lastName = "";
    global.username = "";
    global.password = "";
    global.email = "";
    global.phone = "";

    global.username_login = "";
    global.password_login = "";

    global.isExerciseTracked = false;
    global.isRecreationTracked = false;
    global.isSleepTracked = false;
    global.isWaterTracked = false;

    props.navigation.navigate('Login');
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  menu_buttonInactive: {
    marginTop: "5%",
    marginBottom: "5%",
    //backgroundColor: "#FF9B42",
    backgroundColor: "rgba(100,100,100,0.25)",
    height: "7.75%",
    //elevation: 10,
    width: "80%",
    marginLeft: 'auto',
    borderTopLeftRadius: 25,
    borderBottomLeftRadius: 25,
    //flex: 1
  },
  menu_button: {
    marginTop: "5%",
    marginBottom: "5%",
    //backgroundColor: "#FF9B42",
    backgroundColor: "#0FA3B1",
    height: "7.75%",
    //elevation: 10,
    width: "80%",
    marginLeft: 'auto',
    borderTopLeftRadius: 25,
    borderBottomLeftRadius: 25,
    //flex: 1
  },
  menu_buttonOther: {
    marginTop: "5%",
    marginBottom: "5%",
    backgroundColor: "#FF9B42",
    //backgroundColor: "#0FA3B1",
    height: "7.75%",
    //elevation: 10,
    width: "100%",
    marginLeft: 'auto',
    //borderTopLeftRadius: 25,
    //borderBottomLeftRadius: 25,
    //flex: 1
  },
  menu_buttonText: {
    //position: "absolute",
    fontFamily: "roboto-700",
    //color: "rgba(15,163,177,1)",
    color: "#FFF",
    textAlign: "right",
    fontSize: 20,
    width: "100%",
    right: "10%",
    top: "22%"
    //flexDirection: "column",
    //ustifyContent: "center"
  },
  menu_buttonTextOther: {
    //position: "absolute",
    fontFamily: "roboto-700",
    //color: "rgba(15,163,177,1)",
    color: "#FFF",
    textAlign: "center",
    fontSize: 20,
    width: "100%",
    //right: "10%",
    top: "22%"
    //flexDirection: "column",
    //ustifyContent: "center"
  },
  divider: {
    height: 1,
    top:"92%",
    backgroundColor: "rgba(200,200,200,1)"
  },
  menu_Header: {
    top: 0,
    left: 0,
    height: "28.92%",
    position: "absolute",
    right: 0
  },
  menu_HeaderBackground: {
    top: "0%",
    left: 0,
    position: "absolute",
    backgroundColor: "rgba(255,155,66,1)",
    right: 0,
    height: "100%"
  },
  dashboard_Milestone: {
    top: "20%",
    left: 0,
    height: "20%",
    position: "absolute",
    right: 0
  },
  milestone_Text: {
    top: 0,
    position: "absolute",
    fontFamily: "roboto-700",
    color: "rgba(255,255,255,1)",
    textAlign: "center",
    fontSize: 28,
    width: "100%"
  },
  progressBar: {
    top: 23,
    left: "5%",
    height: "55.75%",
    position: "absolute",
    right: "5%",
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
  accountInformation: {
    top: "40%",
    left: 0,
    position: "absolute",
    right: 0,
    height: "50%"
  },
  header_Username: {
    top: "10%",
    position: "absolute",
    fontFamily: "roboto-700",
    color: "rgba(255,255,255,1)",
    fontSize: 28,
    textAlign: "center",
    right: 0,
    left: 0
  },
  header_Email: {
    position: "absolute",
    fontFamily: "roboto-700",
    color: "rgba(255,255,255,1)",
    fontSize: 18,
    textAlign: "center",
    right: 0,
    top: "55%",
    left: 0
  },
  scrollArea: {
    top: "31%",
    left: 0,
    height: "82%",
    marginTop: 'auto',
    position: "absolute",
    backgroundColor: "rgba(255,255,255,1)",
    right: 0
  },
  scrollArea_contentContainerStyle: {
    height: 462
  },
  logout_Button: {
    top: "92%",
    left: 0,
    height: "8.65%",
    position: "absolute",
    right: 0,
    flex: 1,
    flexDirection: 'row',
    //alignItems: 'center',
    justifyContent: 'flex-end'
  },
  logoutText: {
    //top: "28.91%",
    //position: "absolute",
    fontFamily: "roboto-700",
    color: "rgba(15,163,177,1)",
    fontSize: 24,
    right: "25%",
    alignSelf: "center"
  },
  logoutIcon: {
    //position: "absolute",
    color: "rgba(15,163,177,1)",
    fontSize: 22,
    //top: "24.22%",
    right: "15%",
    alignSelf: "center"
  }
});