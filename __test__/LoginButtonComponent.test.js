import 'react-native';
import React from 'react';
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import * as renderer from 'react-test-renderer';
import LoginButtonComponent from "../components/login/LoginButtonComponent";
import SignUpButtonComponent from "../components/register/SignUpButtonComponent";
import ResetPassButtonComponent from "../components/forgot_password/ResetPassButtonComponent";
import { shallow, mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({adapter : new Adapter()});

jest.mock('react-native-vector-icons/FontAwesome');
jest.mock('react-native-vector-icons/Feather');

let props;
beforeEach(() => {
  props = {
    test: true,
    onMessageChange: function(val) {},
  };
});

describe('Login Screen Functionality', () => {
  it('Should return -1 (No user found)', async () => {
    global.userId = "";
    global.username_login = "";
    global.password_login = "Password";
    
    const wrapper = shallow(<LoginButtonComponent {...props} />);
    await wrapper.instance().loginClick(props)
    expect(global.userId).toEqual("");
  });
});


/*
describe('Screen Tests', () => {

  it('Forgot password renders correctly', () => {
    const tree = renderer.create(
      <ForgotPasswordMobile />
      ).toJSON();
    expect(tree).toMatchSnapshot();
  });


  it('Register renders correctly', () => {
    const tree = renderer.create(
      <RegisterMobile />
      ).toJSON();
    expect(tree).toMatchSnapshot();
  });

//import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
  it('Login renders correctly', () => {
    const tree = renderer.create(
      <LoginMobile />
      ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
*/
/*
import React from "react";
import renderer from "react-test-renderer";
//import App from "../App.js"
import LoginMobile from '../screens/LoginMobile';

describe("<LoginMobile />", () => {
    it('has 1 child', () => {
        const tree = renderer.create(<LoginMobile />).toJSON();
        expect(tree.children.length).toBe(1);
    });
});*/