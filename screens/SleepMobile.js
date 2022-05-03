import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  Switch,
  Animated
} from "react-native";

import { TextInputMask } from 'react-native-masked-text';
import GoBackButtonComponent from "../components/sleep/GoBackButtonComponent";
import DeleteSleepHabitComponent from "../components/sleep/DeleteSleepHabitComponent";
import FontAwesomeIcon from "@expo/vector-icons/FontAwesome";
import SleepAddButtonComponent from "../components/sleep/SleepAddButtonComponent";
import SleepSearchResultComponent from "../components/sleep/SleepSearchResultComponent";
import NoResultComponent from "../components/NoResultComponent";


export default class SleepMobile extends Component {
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

      addLog_AsleepHr: "",
      addLog_AsleepMin: "",
      addLog_AwakeHr: "",
      addLog_AwakeMin: "",

      isAsleepHrValid: true,
      isAsleepMinValid: true,
      isAsleepPM: true,
      isAwakeHrValid: true,
      isAwakeMinValid: true,
      isAwakePM: false,

      message: "",
      searchResultExists: false,
      searchResultDate: "",
      searchResultHours: 0,
      showSearchResult: false,

      sleepTimeYesterday: 0,
      currentDate: "",
      yesterdayDate: "",
      sleepTimeYesterdayArray: new Array()
    };
  }

  // Get the yesterday's date in MM/DD/YYYY format
  getYesterdayDate() {
    var today = new Date(Date.now());
    var yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    let yyyy = yesterday.getFullYear();
    let mm = yesterday.getMonth() + 1; // Months start at 0!
    let dd = yesterday.getDate();

    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;

    yesterday = mm + '/' + dd + '/' + yyyy;

    return yesterday;
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
              this.setState(({sleepTimeYesterday}) => ({sleepTimeYesterday: count}))
          }, 1);
      }
  }

  async getSleepHabit()
  {     
      // DELETE THIS
      //global.username = "Test";

    try
    {
      var array = new Array()

      // Get current date
      var currDate = this.getCurrentDate().trim();
      var yestDate = this.getYesterdayDate().trim();

      console.log(yestDate);

      // Automatically set dates
      this.setState(({currentDate}) => ({currentDate: currDate}));
      this.setState(({addLog_Date}) => ({addLog_Date: currDate}));
      this.setState(({yesterdayDate}) => ({yesterdayDate: yestDate}));

      //console.log(currDate);

      var obj = {
        date: yestDate
      };

      // Get water data for current date
      const endpoint = 'https://cop4331-g30-large.herokuapp.com/api/getSleep/' + global.username.trim();
      var js = JSON.stringify(obj); 
      const response = await fetch(endpoint, 
      {method:'POST',body:js,headers:{'Content-Type': 'application/json'}}); 
      var res = JSON.parse(await response.text());

      //this.counter(0, res.Ounces);

      //console.log(res.Ounces);
      this.setState(({sleepTimeYesterday}) => ({sleepTimeYesterday: res.Hours}));

      array = res.Hours.toString().split('.');
      array[1] = Math.round((array[1] / 100) * 60);
      this.setState(({sleepTimeYesterdayArray}) => ({sleepTimeYesterdayArray: array}));
    }
    catch (e)
    {
      array[0] = 0;
      array[1] = 0;
      this.setState(({sleepTimeYesterdayArray}) => ({sleepTimeYesterdayArray: array}));
      console.log(e);
    }
  }
  
  // add a focus listener onDidMount
  componentDidMount () {
    (async () => this.getSleepHabit())();
  }

  // Do log search
  getSleepResults = async () =>
  {
    try
    {
      var obj = {
        date:this.state.inputSearchValue
      };

      // Get water data for set date
      const endpoint = 'https://cop4331-g30-large.herokuapp.com/api/getSleep/' + global.username.trim();
      var js = JSON.stringify(obj); 
      const response = await fetch(endpoint, 
      {method:'POST',body:js,headers:{'Content-Type': 'application/json'}}); 
      var res = JSON.parse(await response.text());

      // Search result found
      this.setState(({searchResultDate}) => ({searchResultDate: res.Date}));
      this.setState(({searchResultHours}) => ({searchResultHours: res.Hours}));
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
    if (reg.test(this.state.inputSearchValue) && !this.state.isHidden)
    {
      // DELETE THIS 
      //global.username = "Test";

      var toValue = 0;

      // Get results
      (async () => {
        await this.getSleepResults();

        if (this.state.searchResultExists)
        {
          if(!this.state.isHidden) {
              toValue = 200;
          }
        }
        else
        {
          if(!this.state.isHidden) {
              toValue = 200;
          }
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
      })();
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
      
      if (!reg.test(this.state.inputSearchValue))
        this.setState(({isSearchInputValid}) => ({isSearchInputValid: false}));
    }
    
    // Let elements load
    setTimeout(() => { this.setState(({showSearchResult}) => ({showSearchResult: true})); }, 750);
  }

  // Changes validity of date input
  handleDateValidChange = valid =>
  {
    this.setState(({isDateValid}) => ({isDateValid:valid}));
  }

  // Changes validity of asleep hour input
  handleAsleepHrValidChange = valid =>
  {
    this.setState(({isAsleepHrValid}) => ({isAsleepHrValid:valid}));
  }

  // Changes validity of asleep minute input
  handleAsleepMinValidChange = valid =>
  {
    this.setState(({isAsleepMinValid}) => ({isAsleepMinValid:valid}));
  }

  // Changes validity of awake hour input
  handleAwakeHrValidChange = valid =>
  {
    this.setState(({isAwakeHrValid}) => ({isAwakeHrValid:valid}));
  }

  // Changes validity of awake minute input
  handleAwakeMinValidChange = valid =>
  {
    this.setState(({isAwakeMinValid}) => ({isAwakeMinValid:valid}));
  }

  handleResultDeleted = reset =>
  {
    this.setState(({searchResultExists}) => ({searchResultExists:reset}));
  }

  // Changes registration message
  handleMessageChange = message =>
  {
    if (message === "Sleep Entry Successfully Added")
    {
      //this.counter(this.state.waterIntakeToday, this.state.waterIntakeToday + Number(this.state.addLog_Amount));

      (async () => this.getSleepHabit())();

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
        
        <Text style={styles.header_Sleep}>Sleep</Text>

        <GoBackButtonComponent
          style={styles.goBackButtonComponent1}
          navigation={this.props.navigation}
        ></GoBackButtonComponent>

        <DeleteSleepHabitComponent
          style={styles.deleteSleepHabitComponent}
          navigation={this.props.navigation}
        ></DeleteSleepHabitComponent>

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
                <SleepSearchResultComponent
                  hours={this.state.searchResultHours}
                  date={this.state.searchResultDate}
                  style={styles.searchResult}
                  onDeletion={() => this._toggleSubview()}
                ></SleepSearchResultComponent>
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
          {/* Current Sleep */}
          <View style={styles.currentSleep}>
            <Text style={styles.currentSleep_Text}>
              Yesterday&#39;s Sleep Time:{"\n"}{this.state.sleepTimeYesterdayArray[0]} Hr {this.state.sleepTimeYesterdayArray[1]} Min
            </Text>
          </View>

          {/* Recommended Sleep */}
          <View style={styles.recommendedSleep}>
            <Text style={styles.recommendedSleep_Text}>
              Recommended:{"\n"}8 Hr 0 Min
            </Text>
          </View>

          {/* Add Sleep Entry */}
          <View style={styles.sleep_Habits}>
            <View style={styles.sleep_HabitBackground}>
              <View style={styles.sleep_HabitContainer}>
                <Text 
                  style={[ (this.state.isDateValid && 
                  (this.state.isAsleepHrValid && this.state.isAsleepMinValid) && 
                  (this.state.isAwakeHrValid && this.state.isAwakeMinValid)) 
                  ? styles.text_Correct : styles.text_Incorrect ]}
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

                {/* Asleep Input */}
                <View style={styles.asleep}>
                  <Text style={styles.asleep_Text}>When did you fall asleep?</Text>
                  <Text style={styles.alseep_Header}>Asleep:</Text>

                  {/* Asleep Hour */}
                  <TextInputMask
                    type={'custom'}
                    options={{
                      mask: '99'
                    }}
                    value={this.state.addLog_AsleepHr}
                    onChangeText={text => {
                      this.setState({
                        addLog_AsleepHr: text
                      })
                      console.log(this.state.addLog_AsleepHr);
                    }}
                    placeholder="HR"
                    style={[styles.asleep_HourField, !this.state.isAsleepHrValid && styles.incorrect]}
                    keyboardType={"number-pad"}
                  />

                  {/* Asleep Colon */}
                  <Text style={styles.asleep_Colon}>:</Text>

                  {/* Asleep Minute */}
                  <TextInputMask
                    type={'custom'}
                    options={{
                      mask: '99'
                    }}
                    value={this.state.addLog_AsleepMin}
                    onChangeText={text => {
                      this.setState({
                        addLog_AsleepMin: text
                      })
                    }}
                    placeholder="MIN"
                    style={[styles.asleep_MinuteField, !this.state.isAsleepMinValid && styles.incorrect]}
                    keyboardType={"number-pad"}
                  />

                  <View style={styles.meridiamTime1}>
                    <Switch
                      value={this.state.isAsleepPM}
                      disabled={false}
                      thumbColor="rgba(255,155,66,1)"
                      trackColor={{
                        true: "rgba(251,205,159,1)",
                        false: "rgba(251,205,159,1)"
                      }}
                      onValueChange={() => {
                        this.setState({
                          isAsleepPM: !this.state.isAsleepPM
                        })
                      }}
                      style={styles.meridiamSwitch1}
                    ></Switch>
                    <Text style={styles.aM1}>AM</Text>
                    <Text style={styles.pM1}>PM</Text>
                  </View>

                </View>

                <View style={styles.awoken}>
                  <Text style={styles.awoken_Text}>When did you wake up?</Text>
                  <Text style={styles.awoken_Header}>Awake:</Text>

                  {/* Awake Hour */}
                  <TextInputMask
                    type={'custom'}
                    options={{
                      mask: '99'
                    }}
                    value={this.state.addLog_AwakeHr}
                    onChangeText={text => {
                      this.setState({
                        addLog_AwakeHr: text
                      })
                    }}
                    placeholder="HR"
                    style={[styles.awoken_HourField, !this.state.isAwakeHrValid && styles.incorrect]}
                    keyboardType={"number-pad"}
                  />

                  {/* Awake Colon */}
                  <Text style={styles.awoken_Colon}>:</Text>

                  {/* Awake Minute */}
                  <TextInputMask
                    type={'custom'}
                    options={{
                      mask: '99'
                    }}
                    value={this.state.addLog_AwakeMin}
                    onChangeText={text => {
                      this.setState({
                        addLog_AwakeMin: text
                      })
                    }}
                    placeholder="MIN"
                    style={[styles.awoken_MinuteField, !this.state.isAwakeMinValid && styles.incorrect]}
                    keyboardType={"number-pad"}
                  />

                  <View style={styles.meridiamTime2}>
                    <Switch
                      value={this.state.isAwakePM}
                      disabled={false}
                      thumbColor="rgba(255,155,66,1)"
                      trackColor={{
                        true: "rgba(251,205,159,1)",
                        false: "rgba(251,205,159,1)"
                      }}
                      onValueChange={() => {
                        this.setState({
                          isAwakePM: !this.state.isAwakePM
                        })
                      }}
                      style={styles.meridiamSwitch2}
                    ></Switch>
                    <Text style={styles.aM2}>AM</Text>
                    <Text style={styles.pM2}>PM</Text>
                  </View>
                </View>

                <SleepAddButtonComponent
                    navigation = {this.props.navigation}
                    state = {this.state}
                    isAsleepPM = {this.state.isAsleepPM}
                    isAwakePM = {this.state.isAwakePM}
                    asleepHr = {this.state.addLog_AsleepHr}
                    asleepMin = {this.state.addLog_AsleepMin}
                    awakeHr = {this.state.addLog_AwakeHr}
                    awakeMin = {this.state.addLog_AwakeMin}
                    date = {this.state.addLog_Date}

                    onAsleepHrValidChange = {this.handleAsleepHrValidChange}
                    onAsleepMinValidChange = {this.handleAsleepMinValidChange}
                    onAwakeHrValidChange = {this.handleAwakeHrValidChange}
                    onAwakeMinValidChange = {this.handleAwakeMinValidChange}
                    onDateValidChange = {this.handleDateValidChange}
                    onMessageChange = {this.handleMessageChange}

                    resetSearch = {this.handleResultDeleted}
                  style={styles.sleepAddButtonComponent}
                ></SleepAddButtonComponent>
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
  header_Sleep: {
    top: 47,
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
  deleteSleepHabitComponent: {
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
    width: 35,
    height: 35,
    position: "absolute",
    right: "2%",
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
    top: "23%",
    //borderWidth: 1,
    //borderColor: "rgba(0,0,0,1)",
    zIndex: -1,
    bottom: 0,
  },
  currentSleep: {
    //top: "25.06%",
    top: "2.25%",
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
  currentSleep_Text: {
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
  recommendedSleep: {
    top: "13.34%",
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
  recommendedSleep_Text: {
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
  sleep_Habits: {
    top: "24.89%",
    left: 0,
    height: "52.3%",
    position: "absolute",
    right: 0,
    bottom: 0
  },
  sleep_HabitBackground: {
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
  sleep_HabitContainer: {
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
  asleep: {
    top: "33.05%",
    left: 38,
    height: 71,
    position: "absolute",
    right: 38,
    //borderColor: "#000",
    //borderWidth: 1
  },
  asleep_Text: {
    top: 5,
    left: 0,
    position: "absolute",
    fontFamily: "roboto-regular",
    color: "rgba(15,163,177,1)",
    right: 0,
    textAlign: "center"
  },
  alseep_Header: {
    top: 29,
    left: 0,
    position: "absolute",
    fontFamily: "roboto-700",
    color: "rgba(15,163,177,1)",
    fontSize: 28
  },
  asleep_HourField: {
    position: "absolute",
    fontFamily: "roboto-regular",
    color: "#121212",
    height: 41,
    borderWidth: 1,
    borderColor: "#000000",
    textAlign: "center",
    fontSize: 16,
    top: "33.17%",
    borderTopWidth: 0,
    borderRightWidth: 0,
    borderLeftWidth: 0,
    width: "17.6%",
    right: "47.5%"
  },
  asleep_Colon: {
    position: "absolute",
    fontFamily: "roboto-regular",
    color: "rgba(0,0,0,1)",
    fontSize: 28,
    top: "30.92%",
    textAlign: "center",
    width: 7,
    right: "42.5%"
  },
  asleep_MinuteField: {
    position: "absolute",
    fontFamily: "roboto-regular",
    color: "#121212",
    height: 41,
    borderWidth: 1,
    borderColor: "#000000",
    textAlign: "center",
    fontSize: 16,
    top: "33.17%",
    borderTopWidth: 0,
    borderRightWidth: 0,
    borderLeftWidth: 0,
    right: "22.5%",
    width: "17.6%"
  },
  meridiamTime1: {
    width: 51,
    height: 36,
    position: "absolute",
    right: "3%",
    top: "25%"
  },
  meridiamSwitch1: {
    position: "absolute",
    top: "20%",
    left: 6,
    transform: [{ scaleX: 1.3 }, { scaleY: 1.3 }]
  },
  aM1: {
    top: 0,
    left: "20%",
    position: "absolute",
    fontFamily: "roboto-700",
    color: "rgba(255,155,66,1)",
    fontSize: 12
  },
  pM1: {
    top: 0,
    left: "80%",
    position: "absolute",
    fontFamily: "roboto-700",
    color: "rgba(255,155,66,1)",
    fontSize: 12
  },
  awoken: {
    top: "55.72%",
    left: 38,
    height: 71,
    position: "absolute",
    right: 38
  },
  awoken_Text: {
    top: 5,
    left: 0,
    position: "absolute",
    fontFamily: "roboto-regular",
    color: "rgba(15,163,177,1)",
    textAlign: "center",
    right: 0
  },
  awoken_Header: {
    top: 29,
    left: 0,
    position: "absolute",
    fontFamily: "roboto-700",
    color: "rgba(15,163,177,1)",
    fontSize: 28,
    height: 34
  },
  awoken_HourField: {
    position: "absolute",
    fontFamily: "roboto-regular",
    color: "#121212",
    height: 41,
    borderWidth: 1,
    borderColor: "#000000",
    textAlign: "center",
    fontSize: 16,
    top: "33.17%",
    borderTopWidth: 0,
    borderRightWidth: 0,
    borderLeftWidth: 0,
    width: "17.6%",
    right: "47.5%"
  },
  awoken_Colon: {
    position: "absolute",
    fontFamily: "roboto-regular",
    color: "rgba(0,0,0,1)",
    fontSize: 28,
    top: "30.92%",
    textAlign: "center",
    width: 7,
    right: "42.5%"
  },
  awoken_MinuteField: {
    position: "absolute",
    fontFamily: "roboto-regular",
    color: "#121212",
    height: 41,
    borderWidth: 1,
    borderColor: "#000000",
    textAlign: "center",
    fontSize: 16,
    top: "33.17%",
    borderTopWidth: 0,
    borderRightWidth: 0,
    borderLeftWidth: 0,
    right: "22.5%",
    width: "17.6%"
  },
  meridiamTime2: {
    width: 51,
    height: 36,
    position: "absolute",
    right: "3%",
    top: "25%"
  },
  meridiamSwitch2: {
    position: "absolute",
    top: "20%",
    left: 6,
    transform: [{ scaleX: 1.3 }, { scaleY: 1.3 }]
  },
  aM2: {
    top: 0,
    left: "20%",
    position: "absolute",
    fontFamily: "roboto-700",
    color: "rgba(255,155,66,1)",
    fontSize: 12
  },
  pM2: {
    top: 0,
    left: "80%",
    position: "absolute",
    fontFamily: "roboto-700",
    color: "rgba(255,155,66,1)",
    fontSize: 12
  },
  sleepAddButtonComponent: {
    position: "absolute",
    left: 80,
    height: 45,
    right: 80,
    bottom: "5.85%"
  }
});
