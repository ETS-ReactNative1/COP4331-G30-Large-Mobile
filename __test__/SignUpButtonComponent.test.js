import 'react-native';
import React from 'react';
import * as renderer from 'react-test-renderer';
import LoginButtonComponent from "../components/login/LoginButtonComponent";
import SignUpButtonComponent from "../components/register/SignUpButtonComponent";
import ResetPassButtonComponent from "../components/forgot_password/ResetPassButtonComponent";
import { shallow, mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({adapter : new Adapter()});

let props;
beforeEach(() => {
  props = {
    test: true,
    onEmailSentChange: function(val) {},
    onMessageChange: function(val) {},
    onEmailValidChange: function(val) {},
    onPhoneValidChange: function(val) {},
    onUsernameValidChange: function(val) {},
    onPasswordValidChange: function(val) {},
  };
});

describe('Register Screen Functionality', () => {
  it('Should return true (User info is valid)', () => {
    global.firstName = "";
    global.lastName = "";
    global.username = "username";
    global.password = "password";
    global.email = "test@test.com";
    global.phone = "";

    const wrapper = shallow(<SignUpButtonComponent {...props} />);
    const val = wrapper.instance().isInputValid(props);
    expect(val).toEqual(true);
  });
});