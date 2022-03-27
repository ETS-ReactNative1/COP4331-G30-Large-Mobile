import React, { Component } from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";

function LoginButtonComponent(props) {
  return (
    <TouchableOpacity style={[styles.container, props.style]}>
      <TouchableOpacity
        onPress={this.loginClick}
        style={styles.login_Button}
      ></TouchableOpacity>
      <Text style={styles.login_Text}>{props.Login_Text || "Login"}</Text>
    </TouchableOpacity>
  );
}

loginClick = async () =>
{
  try 
  { 
    var obj = {login:global.username.trim(),password:global.password.trim()}; 
    var js = JSON.stringify(obj); 
    const response = await fetch('https://cop4331-g30-large.herokuapp.com/api/login', 
    {method:'POST',body:js,headers:{'Content-Type': 'application/json'}}); 
    var res = JSON.parse(await response.text()); 
    if( res.id <= 0 ) 
    { 
      this.setState({message: "Username/Password combination incorrect" }); 
    } 
    else 
    { 
      global.firstName += res.FirstName;
      global.lastName = res.LastName; 
      global.userId = res._id;
      this.props.navigation.navigate('Login');
    } 
  } 
  catch(e) 
  { 
    this.setState({message: e.message }); 
  }
  //global.password = "";
  //global.username = "";
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
    top: "38.03%",
    left: 0,
    position: "absolute",
    fontFamily: "roboto-regular",
    color: "rgba(255,255,255,1)",
    fontSize: 16,
    textAlign: "center",
    right: 0,
    lineHeight: 10,
    height: "23.94%"
  }
});

export default LoginButtonComponent;
