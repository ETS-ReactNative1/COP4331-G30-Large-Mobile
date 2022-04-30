import React, { Component } from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";

export default class SignUpButtonComponent extends Component {
  render() {
    return (
      <TouchableOpacity style={[styles.container, this.props.style]}>
        <TouchableOpacity
          //onPress={() => console.log("Navigate to Untitled")}
          onPress = {() => this.signUpClick(this.props)}
          style={styles.signUp_Button}
        >
          <Text style={styles.signUp_Text}>Sign Up</Text>
        </TouchableOpacity>
      </TouchableOpacity>
    );
  }

  signUpClick = async (props) =>
  {
    try
    {
      // Reset attributes
      props.onUsernameValidChange(true);
      props.onPasswordValidChange(true);
      props.onEmailValidChange(true);
      props.onMessageChange("");

      if (!this.isInputValid(props))
      {
        return;
      }

      // Get all relevant information
      var obj = {
        firstName:global.firstName.trim(),
        lastName:global.lastName.trim(),
        username:global.username.trim(),
        phone:global.phone.trim(),
        email:global.email.trim(),
        password:global.password.trim()
      };

      // Request user info
      var js = JSON.stringify(obj);
      const response = await fetch('https://cop4331-g30-large.herokuapp.com/api/register',
      {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});
      var res = JSON.parse(await response.text());

      props.onEmailSentChange(true);

      if (response.status === 500)
      {
        props.onMessageChange(res.error);
      }
      else if (response.status === 200)
      {
        let endpoint_verify = 'https://cop4331-g30-large.herokuapp.com/api/emailverify';
        const response_verify = await fetch(endpoint_verify, {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});
        let res_verify = JSON.parse(await response_verify.text());

        let endpoint_address = 'https://cop4331-g30-large.herokuapp.com/api/initialize:' + global.username.trim();
        const response_initialize = await fetch(endpoint_address, {method:'POST',body:'',headers:{'Content-Type': 'application/json'}});
        var res_initialize = JSON.parse(await response.text());

      }

      //global.firstName = res.firstName;
      //global.lastName = res.lastName;
      //global.userId = res.id.toString();

      // Navigate to dashboard
      //console.log("Navigate to Dashboard");
      //props.navigation.navigate('Dashboard');
    }
    catch(e)
    {
      props.onMessageChange(e.message);
      //console.log(e.message);
    }
  }

  // Determines registration input validity
  isInputValid(props)
  {
    // If required fields empty
    if (global.username === "" || global.password === "" || global.email === "")
    {
      props.onMessageChange("Required fields not filled");

      if (global.username === "")
        props.onUsernameValidChange(false);

      if (global.password === "")
        props.onPasswordValidChange(false);

      if (global.email === "")
        props.onEmailValidChange(false);

      return false;
    }
    else
    {
        props.onUsernameValidChange(true);
        props.onPasswordValidChange(true);
        props.onEmailValidChange(true);
    }

    // Password not long enough
    if (global.password.length < 5)
    {
      props.onMessageChange("Password must be 5 or more characters");
      props.onPasswordValidChange(false);
      return false;
    }
    else
    {
      props.onPasswordValidChange(true);
    }

    var reg;
    //const emailReg = "/\S+@\S+\.\S+/";
    const emailReg = '[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+';
    const phoneReg1 = '[0-9]{3}-[0-9]{3}-[0-9]{4}';
    const phoneReg2 = '[0-9]{10}';

    reg = new RegExp(emailReg);

    // Invalid email
    if (!reg.test(global.email))
    {
      props.onMessageChange("Invalid email address");
      props.onEmailValidChange(false);
      return false;
    }
    else
    {
      props.onEmailValidChange(true);
    }

    // If phone not empty
    if (global.phone.length != 0)
    {
      // Includes dashes
      if (global.phone.includes('-'))
      {
        reg = new RegExp(phoneReg1);

        // Invalid phone w/ dashes
        if (!reg.test(global.phone) || global.phone.length != 12)
        {
          props.onMessageChange("Invalid phone number");
          props.onPhoneValidChange(false);
          return false;
        }
        else
        {
          props.onPhoneValidChange(true);
        }
      }
      else
      {
        reg = new RegExp(phoneReg2);

        // Invalid phone w/ no dashes
        if (!reg.test(global.phone) || global.phone.length != 10)
        {
          props.onMessageChange("Invalid phone number");
          props.onPhoneValidChange(false);
          return false;
        }
        else
        {
          props.onPhoneValidChange(true);
        }
      }
    }

    return true;
  }
}

const styles = StyleSheet.create({
  container: {},
  signUp_Button: {
    top: "0%",
    height: "100%",
    position: "absolute",
    backgroundColor: "rgba(15,163,177,1)",
    borderRadius: 50,
    left: 0,
    width: "100%"
  },
  signUp_Text: {
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
