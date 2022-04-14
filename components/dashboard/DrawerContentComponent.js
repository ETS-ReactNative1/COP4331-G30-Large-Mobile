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
              <Text style={styles.milestone_Text}>x Month Milestone</Text>
              <View style={styles.progressBar}>
                <View style={styles.progress}></View>
              </View>
            </View>
            <View style={styles.accountInformation}>
              <Text style={styles.header_Username}>{global.username}</Text>
              <Text style={styles.header_Email}>{global.email}</Text>
            </View>
          {/*</View>*/}
          </ImageBackground>
        </View>
        <View style={styles.scrollArea}>
          <ScrollView
            contentContainerStyle={styles.scrollArea_contentContainerStyle}
          ></ScrollView>
        </View>
        <View style={styles.divider}></View>
        <TouchableOpacity 
          onPress={() => this.onLogoutClick(this.props)}
          style={styles.logout_Button}
        >
          <Text style={styles.logoutText}>Logout</Text>
          <Icon name="log-out" style={styles.logoutIcon}></Icon>
        </TouchableOpacity>
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

    props.navigation.navigate('Login');
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
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
    top: "25%",
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
    top: "45.33%",
    left: 0,
    position: "absolute",
    right: 0,
    height: "50%"
  },
  header_Username: {
    top: "15.76%",
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
    fontSize: 16,
    textAlign: "center",
    right: 0,
    top: "61.81%",
    left: 0
  },
  scrollArea: {
    top: "28.92%",
    left: 0,
    height: "62.43%",
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
    fontSize: 20,
    right: "25%",
    alignSelf: "center"
  },
  logoutIcon: {
    //position: "absolute",
    color: "rgba(15,163,177,1)",
    fontSize: 24,
    //top: "24.22%",
    right: "15%",
    alignSelf: "center"
  }
});