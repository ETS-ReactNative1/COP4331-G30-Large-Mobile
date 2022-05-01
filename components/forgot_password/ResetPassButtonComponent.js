import React, { Component } from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";

export default class ResetPasswordButtonComponent extends Component {
  render() {
    return (
      <TouchableOpacity style={[styles.container, this.props.style]}>
        <TouchableOpacity
          onPress={() => this.resetPasswordClick(this.props)}
          style={styles.reset_Button}
        >
          <Text style={styles.reset_Text}>Reset Password</Text>
        </TouchableOpacity>
      </TouchableOpacity>
    );
  }

  resetPasswordClick = async (props) =>
  {
    try
    {
      props.onEmailValidChange(true);

      // Get typed username and password
      var obj = {email:global.email_forgot_password.trim()}; 

      // Request user info
      var js = JSON.stringify(obj); 
      const response = await fetch('https://cop4331-g30-large.herokuapp.com/api/forgotpass', 
      {method:'POST',body:js,headers:{'Content-Type': 'application/json'}}); 
      //var res = JSON.parse(await response.text());

      console.log("Reset endpoint pinged " + response.status);

      if (response.status === 400)
      {
        props.onMessageChange("No account found for this email");
        props.onEmailValidChange(false);
      }
      else if (response.status === 200)
      {
        props.onMessageChange("Success");
        props.onEmailValidChange(true);
        props.onEmailSentChange(true);

        global.email_forgot_password = "";
      }

      return response.status;
    }
    catch(e)
    {
      props.onMessageChange(e.message);

      return e.message;
    }
  }
}

const styles = StyleSheet.create({
  container: {},
  reset_Button: {
    top: "0%",
    height: "100%",
    position: "absolute",
    backgroundColor: "rgba(15,163,177,1)",
    borderRadius: 50,
    left: 0,
    width: "100%"
  },
  reset_Text: {
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
