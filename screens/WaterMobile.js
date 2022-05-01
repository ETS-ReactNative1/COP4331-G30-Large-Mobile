import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  Animated
} from "react-native";

import { TextInputMask } from 'react-native-masked-text';
import GoBackButtonComponent from "../components/water/GoBackButtonComponent";
import DeleteWaterHabitComponent from "../components/water/DeleteWaterHabitComponent";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import WaterAddButtonComponent from "../components/water/WaterAddButtonComponent";
import WaterSearchResultComponent from "../components/water/WaterSearchResultComponent";
import NoResultComponent from "../components/NoResultComponent";

var inputSearchRef;
var isDataLoaded = false;

export default class WaterMobile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bounceValue: new Animated.Value(0),  //This is the initial position of the subview
      isHidden: false,
      inputSearchValue: "",
      isSearchInputValid: true,

      addLog_Date: "",
      isDateValid: true,
      addLog_Amount: "",
      isAmountValid: true,

      message: "",
      searchResultExists: false,
      searchResultDate: "",
      searchResultAmount: 0,
      showSearchResult: false,

      waterIntakeToday: 0,
      currentDate: ""
    };
  }

  // Get the current date in MM/DD/YYYY format
  getCurrentDate() {
    var today = new Date(Date.now());
    let yyyy = today.getFullYear();
    let mm = today.getMonth() + 1; // Months start at 0!
    let dd = today.getDate();

    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;

    today = mm + '/' + dd + '/' + yyyy;

    return today;
  }

  // Animated counter (Not good with expo)
  counter = (minimum, maximum) => {
      for (let count = minimum; count <= maximum; count += 1) {
          setTimeout(() => {
              this.setState(({waterIntakeToday}) => ({waterIntakeToday: count}))
          }, 1);
      }
  }

  componentDidMount ()
  {     
    (async () => {
      // DELETE THIS
      //global.username = "Test";

      try
      {
        // Get current date
        var currDate = this.getCurrentDate().trim();

        // Automatically set dates
        this.setState(({currentDate}) => ({currentDate: currDate}));
        this.setState(({addLog_Date}) => ({addLog_Date: currDate}));

        //console.log(currDate);

        var obj = {
          date: currDate
        };

        // Get water data for current date
        const endpoint = 'https://cop4331-g30-large.herokuapp.com/api/getWater/' + global.username.trim();
        var js = JSON.stringify(obj); 
        const response = await fetch(endpoint, 
        {method:'POST',body:js,headers:{'Content-Type': 'application/json'}}); 
        var res = JSON.parse(await response.text());

        //this.counter(0, res.Ounces);

        //console.log(res.Ounces);
        this.setState(({waterIntakeToday}) => ({waterIntakeToday: res.Ounces}));
      }
      catch (e)
      {

      }
    })();
  }

  // Do log search
  getWaterResults = async () =>
  {
    try
    {
      var obj = {
        date:this.state.inputSearchValue
      };

      // Get water data for set date
      const endpoint = 'https://cop4331-g30-large.herokuapp.com/api/getWater/' + global.username.trim();
      var js = JSON.stringify(obj); 
      const response = await fetch(endpoint, 
      {method:'POST',body:js,headers:{'Content-Type': 'application/json'}}); 
      var res = JSON.parse(await response.text());

      // Search result found
      this.setState(({searchResultDate}) => ({searchResultDate: res.Date}));
      this.setState(({searchResultAmount}) => ({searchResultAmount: res.Ounces}));
      this.setState(({searchResultExists}) => ({searchResultExists: true}));
    }
    catch (e)
    {
      // Search result not found
      this.setState(({searchResultExists}) => ({searchResultExists: false}));
    }
  }

  // Search functionality and animation
  _toggleSubview() {    
    var reg = new RegExp('(0[1-9]|1[0-2])/(0[1-9]|[12][0-9]|3[01])/[0-9]{4}');

    this.setState(({showSearchResult}) => ({showSearchResult: false}));

    // If is valid date
    if (reg.test(this.state.inputSearchValue))
    {
      // DELETE THIS 
      //global.username = "Test";

      // Get results
      (async () => {
        const status = await this.getWaterResults();
      })();

      var toValue = 0;
      
      if(!this.state.isHidden) {
        toValue = 200;
      }

      // Do transition animation
      Animated.spring(
        this.state.bounceValue,
        {
          toValue: toValue,
          velocity: 3,
          tension: 2,
          friction: 8,
          useNativeDriver: true
        }
      ).start();
      
      this.setState(({isHidden}) => ({isHidden: !this.state.isHidden}));

      this.setState(({isSearchInputValid}) => ({isSearchInputValid: true}));
    }
    else
    {
      // Reset add window if input is not valid
      if (this.state.isHidden)
      {
        var toValue = 0;

        Animated.spring(
          this.state.bounceValue,
          {
            toValue: toValue,
            velocity: 3,
            tension: 2,
            friction: 8,
            useNativeDriver: true
          }
        ).start();

        this.setState(({isHidden}) => ({isHidden: !this.state.isHidden}));
      }

      this.setState(({isSearchInputValid}) => ({isSearchInputValid: false}));
    }

    // Let elements load
    setTimeout(() => { this.setState(({showSearchResult}) => ({showSearchResult: true})); }, 300);
  }

  amountChangedHandler = amount =>
  {
    this.setState(({addLog_Amount}) => ({addLog_Amount:amount}));
  }

  // Changes validity of date input
  handleDateValidChange = valid =>
  {
    this.setState(({isDateValid}) => ({isDateValid:valid}));
  }

  // Changes validity of amount input
  handleAmountValidChange = valid =>
  {
    this.setState(({isAmountValid}) => ({isAmountValid:valid}));
  }

  handleResultDeleted = reset =>
  {
    this.setState(({searchResultExists}) => ({searchResultExists:reset}));
  }

  // Changes registration message
  handleMessageChange = message =>
  {
    if (message === "Water Entry Successfully Added")
    {
      //this.counter(this.state.waterIntakeToday, this.state.waterIntakeToday + Number(this.state.addLog_Amount));

      // Update today's water intake
      if ((this.state.addLog_Date === this.getCurrentDate().trim()))
        this.setState(({waterIntakeToday}) => 
          ({waterIntakeToday: this.state.waterIntakeToday + Number(this.state.addLog_Amount)})
        );

      this.setState({message})

      setTimeout(() => { this.setState(({message}) => ({message: ""})); }, 5000);
    }
    else
    {
      this.setState({message});
    }
  }

  render() {
      return (
        <View style={styles.container}>
          <Image
            source={require("../assets/images/background3.png")}
            resizeMode="stretch"
            style={styles.image1}
          ></Image>

          <Text style={styles.header_Water}>Water</Text>

          <GoBackButtonComponent
            style={styles.goBackButtonComponent1}
            navigation={this.props.navigation}
          ></GoBackButtonComponent>

          <DeleteWaterHabitComponent
            style={styles.deleteWaterHabitComponent}
            navigation={this.props.navigation}
          ></DeleteWaterHabitComponent>

          {/* Search for habit */}
          <View style={styles.searchLog}>
            <FontAwesomeIcon
              name="search"
              style={styles.searchLog_Icon}
            ></FontAwesomeIcon>

            {/* Search Input Field */}
            <TextInputMask
              type={'datetime'}
              options={{
                format: 'MM/DD/YYYY'
              }}
              value={this.state.inputSearchValue}
              onChangeText={text => {
                this.setState({
                  inputSearchValue: text
                })
              }}
              placeholder="MM/DD/YYYY"
              style={[styles.searchLog_Field, !this.state.isSearchInputValid && styles.incorrect]}
              keyboardType={"number-pad"}
            />

            {/* Search Button */}
            <TouchableOpacity 
              style={styles.searchLog_GoButton}
              onPress = {() => this._toggleSubview()}
            >
              <FontAwesomeIcon
                name={!this.state.isHidden ? "arrow-right" : "remove"}
                style={styles.searchLog_GoIcon}
              ></FontAwesomeIcon>
            </TouchableOpacity>
          </View>

          {/* Search Result */}
          {
            // If add is hidden
            (this.state.isHidden && this.state.showSearchResult)
            &&
            (
              // If entry exists
              this.state.searchResultExists 
              ? 
                (
                  <WaterSearchResultComponent
                    amount={this.state.searchResultAmount}
                    date={this.state.searchResultDate}
                    style={styles.searchResult}
                    onDeletion={() => this._toggleSubview()}
                  ></WaterSearchResultComponent>
                )
              :
              // If entry doesn't exist
                (
                  <NoResultComponent
                    style={styles.searchResult}
                  ></NoResultComponent>
                )
            )
          }

          <Animated.View
            style={[styles.addLogView, {transform: [{translateY: this.state.bounceValue}]} ]}
          >
            {/* Current Intake */}
            <View style={styles.currentIntake}>
                <Text style={styles.currentIntake_Text}>
                  Today&#39;s Water Intake:{"\n"}{this.state.waterIntakeToday} FL OZ
                </Text>
            </View>

            {/* Recommended Intake */}
            <View style={styles.recommendedIntake}>
                <Text style={styles.recommendedIntake_Text}>
                  Recommended:{"\n"}64 FL OZ
                </Text>
            </View>

            {/* Add Water Entry */}
            <View style={styles.water_Habits}>
              <View style={styles.water_HabitBackground}>
                <View style={styles.water_HabitContainer}>

                  <Text 
                    style={[ (this.state.isDateValid && this.state.isAmountValid) ? styles.text_Correct : styles.text_Incorrect ]}
                  >{this.state.message}</Text>

                  {/* Date Input */}
                  <View style={styles.date}>
                    <Text style={styles.date_Header}>Date:</Text>
                    <TextInputMask
                      type={'datetime'}
                      options={{
                        format: 'MM/DD/YYYY'
                      }}
                      value={this.state.addLog_Date}
                      onChangeText={text => {
                        this.setState({
                          addLog_Date: text
                        })
                      }}
                      placeholder="MM/DD/YYYY"
                      style={[styles.date_Field, !this.state.isDateValid && styles.incorrect]}
                      keyboardType={"number-pad"}
                    />
                  </View>

                  {/* Amount Input */}
                  <View style={styles.amount}>
                    <Text style={styles.amount_Header}>Amount:</Text>
                    <TextInput
                      placeholder="Ex: 16.9"
                      style={[styles.amount_Field, !this.state.isAmountValid && styles.incorrect]}
                      //onChangeText={(val) => {this.amountChangedHandler(val)}}
                      onChangeText={text => {
                        this.setState({
                          addLog_Amount: text
                        })
                      }}
                      keyboardType={"number-pad"}
                    ></TextInput>
                    <Text style={styles.amount_Measurement}>FL OZ</Text>
                  </View>

                  {/* Unit conversions */}
                  <Text style={styles.measurementConversions}>
                    1 water bottle = 16.9 FL OZ{"\n\n"}1 glass = 8 FL OZ
                  </Text>

                  {/* Add Log Button */}
                  <WaterAddButtonComponent
                    navigation = {this.props.navigation}
                    state = {this.state}
                    amount = {this.state.addLog_Amount}
                    date = {this.state.addLog_Date}
                    onDateValidChange = {this.handleDateValidChange}
                    onAmountValidChange = {this.handleAmountValidChange}
                    onMessageChange = {this.handleMessageChange}
                    resetSearch = {this.handleResultDeleted}
                    style={styles.waterAddButtonComponent}
                  ></WaterAddButtonComponent>

                </View>
              </View>
            </View>
          </Animated.View>

        </View>
      );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  incorrect: {
    backgroundColor: "rgba(242, 38, 19, 0.1)"
  },
  text_Incorrect: {
    top: "6%",
    left: 0,
    position: "absolute",
    fontFamily: "roboto-700",
    color: "rgba(242, 38, 19, 1)",
    fontSize: 16,
    textAlign: "center",
    right: 0
  },
  text_Correct: {
    top: "6%",
    left: 0,
    position: "absolute",
    fontFamily: "roboto-700",
    color: "rgba(15,163,177,1)",
    fontSize: 16,
    textAlign: "center",
    right: 0
  },
  image1: {
    top: 0,
    left: 0,
    width: "100%",
    position: "absolute",
    height: "100%",
    bottom: 0,
    opacity: 0.9,
  },
  header_Water: {
    top: "5.29%",
    position: "absolute",
    fontFamily: "roboto-700",
    color: "rgba(255,255,255,1)",
    fontSize: 28,
    height: 34,
    left: 0,
    right: 0,
    textAlign: "center"
  },
  goBackButtonComponent1: {
    position: "absolute",
    top: "5.29%",
    height: 50,
    width: 50,
    //left: 21,
    zIndex: 100,
    left: "2%"
  },
  deleteWaterHabitComponent: {
    position: "absolute",
    top: "5.29%",
    height: 50,
    width: 50,
    zIndex: 100,
    //right: 13
    right: "2%"
  },
  searchLog: {
    top: "16.04%",
    left: "5%",
    height: 44,
    position: "absolute",
    right: "5%",
    backgroundColor: "rgba(255,255,255,1)",
    borderRadius: 25,
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: {
      width: 3,
      height: 3
    },
    elevation: 30,
    shadowOpacity: 0.25,
    shadowRadius: 10,
    zIndex: 100,
    flex: 1,
    justifyContent: "center",
    //flexDirection: "column"
  },
  searchLog_Icon: {
    left: 11,
    position: "absolute",
    color: "rgba(15,163,177,1)",
    fontSize: 30,
    //top: 7,
    flexDirection: "column"
  },
  searchLog_Field: {
    position: "absolute",
    fontFamily: "roboto-regular",
    color: "#121212",
    height: "83.73%",
    textAlign: "left",
    fontSize: 16,
    left: 62,
    right: 43,
    top: "8.14%",
    flexDirection: "column"
  },
  searchLog_GoButton: {
    //top: 4,
    width: 20,
    height: 35,
    position: "absolute",
    right: 9,
    flexDirection: "column",
    flex: 1,
    justifyContent: "center"
  },
  searchLog_GoIcon: {
    //top: 0,
    position: "absolute",
    color: "rgba(15,163,177,1)",
    fontSize: 35,
    right: 0,
    flexDirection: "column"
  },
  searchResult: {
    //top: "28%",
    //top: 500,
    //marginTop: "30%",
    //position: "absolute",
    //height: "100%",
    //width: "100%",
    //borderWidth: 1,
    //borderColor: "rgba(0,0,0,1)",
  },
  addLogView: { /* ----------------------------------------------------------------------------------------------------------------- */
    position: "absolute",
    height: "100%",
    width: "100%",
    //borderWidth: 1,
    //borderColor: "rgba(0,0,0,1)",
    bottom: 0,
  },
  currentIntake: {
    top: "25.06%",
    left: "5%",
    height: "8.92%",
    position: "absolute",
    backgroundColor: "rgba(255,255,255,1)",
    borderRadius: 25,
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: {
      width: 3,
      height: 3
    },
    elevation: 10,
    shadowOpacity: 0.25,
    shadowRadius: 10,
    right: "5%",
    flex: 1,
    justifyContent: 'center',
  },
  currentIntake_Text: {
    //position: "absolute",
    fontFamily: "roboto-700",
    color: "rgba(255,155,66,1)",
    fontSize: 20,
    textAlign: "center",
    //width: "100%"
    flexDirection: 'column',
    //alignItems: 'center',
    //justifyContent: 'center',
  },
  recommendedIntake: {
    top: "36.15%",
    left: "5%",
    height: "8.78%",
    position: "absolute",
    backgroundColor: "rgba(255,255,255,1)",
    borderRadius: 25,
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: {
      width: 3,
      height: 3
    },
    elevation: 10,
    shadowOpacity: 0.25,
    shadowRadius: 10,
    right: "5%",
    flex: 1,
    justifyContent: 'center',
  },
  recommendedIntake_Text: {
    //position: "absolute",
    fontFamily: "roboto-700",
    color: "rgba(255,155,66,1)",
    fontSize: 20,
    textAlign: "center",
    //width: "100%"
    flexDirection: 'column',
    //alignItems: 'center',
    //justifyContent: 'center',
  },
  water_Habits: {
    top: "47.7%",
    left: 0,
    height: "52.3%",
    position: "absolute",
    right: 0,
    bottom: 0
  },
  water_HabitBackground: {
    top: "0%",
    left: 0,
    position: "absolute",
    right: 0,
    borderRadius: 50,
    backgroundColor: "rgba(255,255,255,1)",
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
    bottom: 0,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50
  },
  water_HabitContainer: {
    top: "3.5%",
    left: 8,
    position: "absolute",
    backgroundColor: "rgba(255,255,255,1)",
    borderWidth: 1,
    borderColor: "rgba(211,209,209,1)",
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: {
      height: 3,
      width: 0
    },
    elevation: 30,
    shadowOpacity: 0.25,
    shadowRadius: 10,
    borderRadius: 50,
    right: 8,
    bottom: 0,
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0
  },
  date: {
    top: "14.69%",
    left: 38,
    height: 49,
    position: "absolute",
    right: 38
  },
  date_Header: {
    top: 7,
    left: 0,
    position: "absolute",
    fontFamily: "roboto-700",
    color: "rgba(15,163,177,1)",
    fontSize: 28
  },
  date_Field: {
    position: "absolute",
    fontFamily: "roboto-regular",
    color: "#121212",
    height: 41,
    borderWidth: 1,
    borderColor: "#000000",
    textAlign: "left",
    fontSize: 16,
    top: "3.31%",
    left: 77,
    borderTopWidth: 0,
    borderRightWidth: 0,
    borderLeftWidth: 0,
    right: 0
  },
  amount: {
    top: "35.49%",
    left: 38,
    height: 49,
    position: "absolute",
    right: 38
  },
  amount_Header: {
    top: 7,
    left: 0,
    position: "absolute",
    fontFamily: "roboto-700",
    color: "rgba(15,163,177,1)",
    fontSize: 28
  },
  amount_Field: {
    position: "absolute",
    fontFamily: "roboto-regular",
    color: "#121212",
    height: 41,
    borderWidth: 1,
    borderColor: "#000000",
    textAlign: "left",
    fontSize: 16,
    top: 2,
    left: 120,
    borderTopWidth: 0,
    borderRightWidth: 0,
    borderLeftWidth: 0,
    right: 47
  },
  amount_Measurement: {
    top: 13,
    position: "absolute",
    fontFamily: "roboto-700",
    color: "rgba(15,163,177,1)",
    fontSize: 16,
    right: 0
  },
  measurementConversions: {
    top: "56.72%",
    left: 0,
    position: "absolute",
    fontFamily: "roboto-regular",
    fontSize: 16,
    color: "#121212",
    textAlign: "center",
    right: 0
  },
  waterAddButtonComponent: {
    position: "absolute",
    left: 80,
    height: 45,
    right: 80,
    bottom: "5.85%"
  }
});
