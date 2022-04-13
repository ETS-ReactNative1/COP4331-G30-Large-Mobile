import React, { Component } from "react";
import { StyleSheet, ScrollView, View, TouchableNativeFeedback, Text } from "react-native";
import { DrawerItems, SafeAreaView } from "react-navigation";
import Icon from "react-native-vector-icons";

export default class DrawerContentComponent extends Component {
  render() {
  /*
    //const { theme, user } = this.props;
    const ripple = TouchableNativeFeedback.Ripple('#adacac', false);

    return (
      <View style={{ flex: 1 }}>

        <ScrollView>
          <SafeAreaView
            style={styles.container}
            forceInset={{ top: 'always', horizontal: 'never' }}
          >
            <View style={[ styles.containHeader, { backgroundColor: '#fff' }]}>
              <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Avatar size='large' rounded icon={{ name: 'user-circle-o', type: 'font-awesome', size: 80 }} />
                <Text style={{ color: '#f9f9f9', marginTop: '3%', fontFamily: 'sans-serif-condensed' }}>{`Hi ${global.firstName}`}</Text>
                <Text style={{ color: '#f9f9f9', fontFamily: 'sans-serif-condensed' }}>{`${user.email}`}</Text>
              </View>
            </View>

            <DrawerItems {...this.props} />

            <View>
              <View style={{ marginTop: '2%' }}>
                <Divider style={{ backgroundColor: '#777f7c90' }} />
              </View>
              <View style={{ marginTop: '3%' }}>
                <ColorPalette />
              </View>
              <View style={{ marginTop: '5%' }}>
                <Divider style={{ backgroundColor: '#777f7c90' }} />
              </View>
            </View>
          </SafeAreaView>
        </ScrollView>

        <View elevation={6} style={{ backgroundColor: '#ffffff' }}>
          <TouchableNativeFeedback background={ripple}>
            <View style={styles.containDrawerOption}>
              <Icon
                name='logout'
                type='simple-line-icon'
                size={20}
                color={theme.pri700}
                containerStyle={{ marginRight: '10%' }}
              />
              <Text style={{ color: 'black', fontFamily: 'sans-serif-medium' }}>Logout</Text>
            </View>
          </TouchableNativeFeedback>

          <TouchableNativeFeedback background={ripple}>
            <View style={styles.containDrawerOption}>
              <Icon
                name='user-secret'
                type='font-awesome'
                size={24}
                color={"#000"}
                containerStyle={{ marginRight: '10%' }}
              />
              <Text style={{ color: 'black', fontFamily: 'sans-serif-medium' }}>Developer</Text>
            </View>
          </TouchableNativeFeedback>
        </View>

      </View>
    );*/

  
    return (
      <TouchableOpacity style={[styles.container, this.props.style]}>
        <Icon name="align-right" 
          onPress={() => this.openMenuClick(this.props)}
          style={styles.icon3}></Icon>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },/*
  icon3: {
    top: 0,
    position: "absolute",
    color: "rgba(255,255,255,1)",
    fontSize: 45,
    right: 0
  },
    containHeader: {
    paddingTop: '4%',
    paddingBottom: '4%'
  },
  containDrawerOption: {
    paddingLeft: '6%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: '1%',
    paddingBottom: '5%',
    backgroundColor: '#e6e6e6',
  },
  headerText: {
    textAlign: 'center',
    fontFamily: 'sans-serif-medium',
    fontWeight: '600',
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 50
  },
  actionText: {
    textAlign: 'center',
    fontFamily: 'sans-serif-medium',
    fontWeight: '600',
    marginRight: '3%',
    marginLeft: '3%',
  },
  closeBtn: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 17,
  },
  closeText: {
    fontFamily: 'sans-serif-medium',
    fontWeight: '600',
    marginRight: '3%',
    marginLeft: '3%',
  }*/
});