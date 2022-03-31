import React, { Component } from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";
import { createStackNavigator, createAppContainer } from 'react-navigation'; 

export default class LoginButtonComponent extends Component {
  render() {
    return (
      <TouchableOpacity style={[styles.container, this.props.style]}>
        <TouchableOpacity
          onPress = {() => this.loginClick(this.props)}
          style={styles.login_Button}
        >
          <Text style={styles.login_Text}>{this.props.Login_Text || "Login"}</Text>
        </TouchableOpacity>
      </TouchableOpacity>
    )
  }

  loginClick = async (props) =>
  {
    try 
    {
      // Get typed username and password
      var obj = {username:global.username_login.trim(),password:global.password_login.trim()}; 

      props.onMessageChange("");

      // Request user info
      var js = JSON.stringify(obj); 
      const response = await fetch('https://cop4331-g30-large.herokuapp.com/api/login', 
      {method:'POST',body:js,headers:{'Content-Type': 'application/json'}}); 
      var res = JSON.parse(await response.text());

      // If no user found
      if( res.id === '' ) 
      { 
        // Change message on login screen
        props.onMessageChange("Username or Password Incorrect"); 
      } 
      else 
      {
        global.userId = res.id.toString();

        // Navigate to dashboard
        console.log("Navigate to Dashboard");
        props.navigation.navigate('Dashboard');
      } 
    } 
    catch(e) 
    {
      props.onMessageChange(e.message); 
    }

    //global.password = "";
    //global.username = "";
  }
}



const styles = StyleSheet.create({
  container: {},
  login_Button: {
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    position: "absolute",
    backgroundColor: "rgba(15,163,177,1)",
    borderRadius: 50
  },
  login_Text: {
    top: "25%",
    left: 0,
    position: "absolute",
    fontFamily: "roboto-regular",
    color: "rgba(255,255,255,1)",
    fontSize: 16,
    textAlign: "center",
    right: 0
  }
});
