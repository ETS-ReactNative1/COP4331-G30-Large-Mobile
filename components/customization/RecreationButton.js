import React, { Component } from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import MaterialCommunityIconsIcon from "react-native-vector-icons/MaterialCommunityIcons";
import IoniconsIcon from "react-native-vector-icons/Ionicons";

export default class RecreationButton extends Component {
  constructor(props) {
    super(props);
    this.state = {clicked: false};
  }

  onPress = async (props) => {
    const newClicked = !this.state.clicked;
    this.setState({clicked : newClicked});
    props.onRecreationClicked(newClicked);
  };

  render() {
    const { clicked } = this.state;
    return (
      <View style={[styles.container, this.props.style]}>
        <View style={!clicked ? styles.recreation_Shadow : styles.clicked_Shadow}>
          <TouchableOpacity
          onPress = {() => this.onPress(this.props)}
          style={!clicked ? styles.recreation_Button : styles.clicked}>
            <Text style={styles.recreation2}>RECREATION</Text>
            <FontAwesomeIcon
              name="soccer-ball-o"
              style={styles.icon5}
            ></FontAwesomeIcon>
            <View style={styles.icon7Row}>
              <MaterialCommunityIconsIcon
                name="football"
                style={styles.icon7}
              ></MaterialCommunityIconsIcon>
              <IoniconsIcon
                name="md-basketball"
                style={styles.icon8}
              ></IoniconsIcon>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {},
  recreation_Shadow: {
    top: "2.83%",
    left: 3,
    height: "100%",
    position: "absolute",
    backgroundColor: "rgba(13,136,148,1)",
    borderRadius: 15,
    right: -3
  },
  recreation_Button: {
    top: "0%",
    left: 0,
    height: "100%",
    position: "absolute",
    backgroundColor: "rgba(15,163,177,1)",
    borderRadius: 15,
    shadowColor: "rgba(15,163,177,1)",
    shadowOffset: {
      width: 3,
      height: 3
    },
    elevation: 5,
    shadowOpacity: 0.01,
    shadowRadius: 0,
    right: 0
  },
  recreation2: {
    top: "2.83%",
    position: "absolute",
    fontFamily: "roboto-700",
    color: "rgba(255,255,255,1)",
    fontSize: 18,
    height: "20.76%",
    textAlign: "center",
    left: 0,
    right: 0
  },
  icon5: {
    top: 33,
    left: 51,
    position: "absolute",
    color: "rgba(255,255,255,1)",
    fontSize: 35
  },
  icon7: {
    top: 68,
    left: 34,
    position: "absolute",
    color: "rgba(255,255,255,1)",
    fontSize: 35
  },
  icon8: {
    top: 68,
    left: 72,
    position: "absolute",
    color: "rgba(255,255,255,1)",
    fontSize: 35
  },
  clicked: {
    top: "0%",
    left: 0,
    height: "100%",
    position: "absolute",
    backgroundColor: "rgba(255,155,66,1)",
    borderRadius: 15,
    shadowColor: "rgba(15,163,177,1)",
    shadowOffset: {
      width: 3,
      height: 3
    },
    elevation: 5,
    shadowOpacity: 0.01,
    shadowRadius: 0,
    right: 0
  },
  clicked_Shadow: {
    top: "2.83%",
    left: 3,
    height: "100%",
    position: "absolute",
    backgroundColor: "rgba(178,102,38,1)",
    borderRadius: 15,
    right: -3
  },
  clicked: {
    top: "0%",
    left: 0,
    height: "100%",
    position: "absolute",
    backgroundColor: "rgba(255,155,66,1)",
    borderRadius: 15,
    shadowColor: "rgba(178,102,38,1)",
    shadowOffset: {
      width: 3,
      height: 3
    },
    elevation: 5,
    shadowOpacity: 0.01,
    shadowRadius: 0,
    right: 0
  }
});
