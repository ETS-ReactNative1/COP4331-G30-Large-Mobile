import React, { Component } from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";
import { createStackNavigator, createAppContainer } from 'react-navigation'; 

export default class RegisterButtonComponent extends Component {
  render() {
    return (
      <TouchableOpacity style={[styles.container, this.props.style]}>
        <TouchableOpacity /* Conditional navigation not supported at the moment */
          onPress={() => this.props.navigation.navigate('Register')}
          style={styles.register_Button}
        >
          <Text style={styles.register_Text}>Register</Text>
        </TouchableOpacity>
      </TouchableOpacity>
    );
  }
/*
  registerClick = async (props) =>
  {
    console.log("Navigate to Untitled")

    try 
    { 
      var obj = {username:global.username.trim(),password:global.password.trim()}; 
        console.log(obj);
      var js = JSON.stringify(obj); 
      const response = await fetch('https://cop4331-g30-large.herokuapp.com/api/login', 
      {method:'POST',body:js,headers:{'Content-Type': 'application/json'}}); 
      var res = JSON.parse(await response.text());

      console.log("ID = " + "'" + res.id + "'");
      if( res.id === '' ) 
      { 
        
        props.setState({message: "Username/Password combination incorrect" }); 
      } 
      else 
      { 
        global.firstName = res.firstName;
        global.lastName = res.lastName; 
        global.userId = res.id.toString();

        console.log("ID = " + "'" + global.userId + "'");
        props.navigation.navigate('Dashboard');
      } 
    } 
    catch(e) 
    {
      props.state.setState({message: e.message }); 
    }

    //global.password = "";
    //global.username = "";
  }*/
}

const styles = StyleSheet.create({
  container: {},
  register_Button: {
    top: "0%",
    left: 0,
    height: "100%",
    position: "absolute",
    backgroundColor: "rgba(15,163,177,1)",
    borderRadius: 50,
    right: 0
  },
  register_Text: {
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
