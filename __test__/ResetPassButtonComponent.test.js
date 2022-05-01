import 'react-native';
import React from 'react';
import * as renderer from 'react-test-renderer';
import LoginButtonComponent from "../components/login/LoginButtonComponent";
import SignUpButtonComponent from "../components/register/SignUpButtonComponent";
import ResetPassButtonComponent from "../components/forgot_password/ResetPassButtonComponent";
import { shallow, mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import fetchMock from 'fetch-mock';

configure({adapter : new Adapter()});

let props;
beforeEach(() => {
  props = {
    test: true,
    onEmailSentChange: function(val) {},
    onMessageChange: function(val) {},
    onEmailValidChange: function(val) {},
  };
});

describe('Reset Password Screen Functionality', () => {
  //let response;

  //const wrapper = shallow(<ResetPassButtonComponent {...props} />);

/*
  beforeEach(async () => {
    //global.email_forgot_password = "test@test.com";
    //response = await wrapper.instance().resetPasswordClick(props);
  });*/

  it('Should erase user input on successful email (User found)', async () => {
    //expect.assertions(1);
    //const url = 'https://cop4331-g30-large.herokuapp.com/api/forgotpass';
    //global.email_forgot_password = "asdsad";
    //let email = "";
    //let response = await wrapper.instance().resetPasswordClick(props);
    /*
    fetchMock.post(url, {
      status: 200,
      body: JSON.stringify({email:email})
    });*/

    //expect(global.email_forgot_password).toEqual();

    global.email_forgot_password = "test@test.com";

    const wrapper = shallow(<ResetPassButtonComponent {...props} />);
    const instance  = wrapper.instance();

    //await instance.resetPasswordClick(props);
    //await expect(global.email_forgot_password).toEqual("");

    return expect(instance.resetPasswordClick(props)).resolves.toEqual(200);
    //return instance.resetPasswordClick(props).then(expect(global.email_forgot_password).toEqual(""));
  });
});