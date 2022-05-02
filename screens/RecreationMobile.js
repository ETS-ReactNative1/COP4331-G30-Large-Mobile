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
import GoBackButtonComponent from "../components/recreation/GoBackButtonComponent";
import DeleteRecreationHabitComponent from "../components/recreation/DeleteRecreationHabitComponent";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import RecreationAddButtonComponent from "../components/recreation/RecreationAddButtonComponent";
import RecreationSearchResultComponent from "../components/recreation/RecreationSearchResultComponent";
import NoResultComponent from "../components/NoResultComponent";
import DropDownPicker from "react-native-dropdown-picker";

//function RecreationMobile(props) {
export default class RecreationMobile extends Component {
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
      addLog_TimeSpent: "",
      isTimeSpentValid: true,
      addLog_Activity: "",

      message: "",
      searchResultExists: false,
      searchResultDate: "",
      searchResultAmount: 0,
      showSearchResult: false,
      searchResultActivities: {},

      waterIntakeToday: 0,
      totalRecreationTime: 0,
      currentDate: "",

      isPickerOpen: false,
      isResultsReturned: false
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
        const endpoint = 'https://cop4331-g30-large.herokuapp.com/api/getRecreation/' + global.username.trim();
        var js = JSON.stringify(obj); 
        const response = await fetch(endpoint, 
        {method:'POST',body:js,headers:{'Content-Type': 'application/json'}}); 
        var res = JSON.parse(await response.text());

        //this.counter(0, res.Ounces);

        //console.log(res.Gaming);
        var total = res.ScreenTime + res.Television + res.Gaming + res.Sport + 
                    res.Art + res.Chores + res.Work + res.Other;
        //console.log(total);
        this.setState(({totalRecreationTime}) => ({totalRecreationTime: total}));
      }
      catch (e)
      {
        this.setState(({totalRecreationTime}) => ({totalRecreationTime: 0}));
      }
    })();
  }

  // Do log search
  getRecreationResults = async () =>
  {
    try
    {
      var obj = {
        date:this.state.inputSearchValue
      };

      // Get water data for set date
      const endpoint = 'https://cop4331-g30-large.herokuapp.com/api/getRecreation/' + global.username.trim();
      var js = JSON.stringify(obj); 
      const response = await fetch(endpoint, 
      {method:'POST',body:js,headers:{'Content-Type': 'application/json'}}); 
      var res = JSON.parse(await response.text());

      console.log(response.status);
      // Search result found
      if (response.status === 200)
      {
        this.setState(({searchResultDate}) => ({searchResultDate: res.Date}));
        //this.setState(({searchResultAmount}) => ({searchResultAmount: res.Ounces}));
        this.setState(({searchResultActivities}) => ({searchResultActivities: res}));
        this.setState(({searchResultExists}) => ({searchResultExists: true}));
      }
      else
      {
        // Search result not found
        this.setState(({searchResultExists}) => ({searchResultExists: false}));
      }
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
        await this.getRecreationResults();

        if (this.state.searchResultExists)
        {
          if(!this.state.isHidden) {
              toValue = 350;
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
  handleTimeSpentValidChange = valid =>
  {
    this.setState(({isTimeSpentValid}) => ({isTimeSpentValid:valid}));
  }

  handleResultDeleted = reset =>
  {
    this.setState(({searchResultExists}) => ({searchResultExists:reset}));
  }

  // Changes registration message
  handleMessageChange = message =>
  {
    if (message === "Recreation Entry Successfully Added")
    {
      //this.counter(this.state.waterIntakeToday, this.state.waterIntakeToday + Number(this.state.addLog_Amount));

      // Update today's water intake
      
      if ((this.state.addLog_Date === this.getCurrentDate().trim()))
        this.setState(({totalRecreationTime}) => 
          ({totalRecreationTime: this.state.totalRecreationTime + Number(this.state.addLog_TimeSpent)})
        );
      
      this.setState({message})

      setTimeout(() => { this.setState(({message}) => ({message: ""})); }, 5000);
    }
    else
    {
      this.setState({message});
    }
  }

  render () {
    return (
      <View style={styles.container}>
        <Image
          source={require("../assets/images/background3.png")}
          resizeMode="stretch"
          style={styles.image1}
        ></Image>

        <Text style={styles.header_Recreation}>Recreation</Text>

        <GoBackButtonComponent
          style={styles.goBackButtonComponent1}
          navigation={this.props.navigation}
        ></GoBackButtonComponent>

        <DeleteRecreationHabitComponent
          style={styles.deleteRecreationHabitComponent}
          navigation={this.props.navigation}
        ></DeleteRecreationHabitComponent>

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
                  <RecreationSearchResultComponent
                    //amount={this.state.searchResultAmount}
                    activities={this.state.searchResultActivities}
                    date={this.state.searchResultDate}
                    style={styles.searchResult}
                    onDeletion={() => this._toggleSubview()}
                  ></RecreationSearchResultComponent>
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

          {/* Current Recreation Time */}
          <View style={styles.currentRecreation}>
              <Text style={styles.currentRecreation_Text}>
                Today&#39;s Recreation Time:{"\n"}{this.state.totalRecreationTime} Hours
              </Text>
          </View>

          {/* Recommended Recreation Time */}
          <View style={styles.recommendedRecreation}>
              <Text style={styles.recommendedRecreation_Text}>
                Recommended:{"\n"}3 Hours
              </Text>
          </View>

          {/* Add Recreation Entry */}
          <View style={styles.recreation_Habits}>
            <View style={styles.recreation_HabitBackground}>
              <View style={styles.recreation_HabitContainer}>

                <Text 
                  style={[ (this.state.isDateValid && this.state.isTimeSpentValid) ? styles.text_Correct : styles.text_Incorrect ]}
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

                {/* Drop down activity menu */}
                <View style={styles.activity}>
                  <Text style={styles.activity_Header}>Activity:</Text>
                  <DropDownPicker
                    items={[
                      {label: 'Television', value: 'Television'},
                      {label: 'Gaming', value: 'Gaming'},
                      {label: 'Screen Time', value: 'ScreenTime'},
                      {label: 'Sports', value: 'Sport'},
                      {label: 'Art', value: 'Art'},
                      {label: 'Chores', value: 'Chores'},
                      {label: 'Work', value: 'Work'},
                      {label: 'Other', value: 'Other'},
                    ]}
                    //defaultIndex={0}
                    containerStyle={{height: "10%"}}
                    open={this.state.isPickerOpen}
                    value={this.state.addLog_Activity}
                    onPress={() => {
                      this.setState({
                        isPickerOpen: !this.state.isPickerOpen
                      })
                    }}
                    onSelectItem={item => {
                      this.setState({
                        addLog_Activity: item.value
                      })
                      this.setState({
                        isPickerOpen: false
                      })
                    }}
                    style={styles.activity_Field}
                  />
                  {/*
                  <TextInput
                    placeholder="Ex: Gaming"
                    style={styles.activity_Field}
                  ></TextInput>*/}
                </View>

                {/* Time Spent Input */}
                <View style={styles.timeSpent}>
                  <Text style={styles.timeSpent_Text}>Time Spent:</Text>
                  <TextInput
                    placeholder="Ex: 1.5"
                    style={[styles.timeSpent_Field, !this.state.isTimeSpentValid && styles.incorrect]}
                    onChangeText={text => {
                      this.setState({
                        addLog_TimeSpent: text
                      })
                    }}
                    keyboardType={"number-pad"}
                  ></TextInput>
                  <Text style={styles.timeSpent_Measurement}>Hours</Text>
                </View>

                <RecreationAddButtonComponent
                  navigation = {this.props.navigation}
                  state = {this.state}
                  activity = {this.state.addLog_Activity}
                  timeSpent = {this.state.addLog_TimeSpent}
                  date = {this.state.addLog_Date}
                  onDateValidChange = {this.handleDateValidChange}
                  onMessageChange = {this.handleMessageChange}
                  resetSearch = {this.handleResultDeleted}
                  style={styles.recreationAddButtonComponent}
                ></RecreationAddButtonComponent>
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
  header_Recreation: {
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
  deleteRecreationHabitComponent: {
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
  currentRecreation: {
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
  currentRecreation_Text: {
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
  recommendedRecreation: {
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
  recommendedRecreation_Text: {
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
  recreation_Habits: {
    top: "47.7%",
    left: 0,
    height: "52.3%",
    position: "absolute",
    right: 0
  },
  recreation_HabitBackground: {
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
  recreation_HabitContainer: {
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
  activity: {
    top: "34.99%",
    left: 38,
    height: 49,
    position: "absolute",
    right: 38
  },
  activity_Header: {
    top: 7,
    left: 0,
    position: "absolute",
    fontFamily: "roboto-700",
    color: "rgba(15,163,177,1)",
    fontSize: 28
  },
  activity_Field: {
    position: "absolute",
    fontFamily: "roboto-regular",
    color: "#121212",
    height: 41,
    borderWidth: 1,
    borderColor: "#000000",
    textAlign: "left",
    fontSize: 16,
    top: "3.31%",
    //left: 115,
    width: "65%",
    borderTopWidth: 0,
    borderRightWidth: 0,
    borderLeftWidth: 0,
    right: 0
  },
  timeSpent: {
    top: "54.26%",
    left: 38,
    height: 49,
    position: "absolute",
    right: 38
  },
  timeSpent_Text: {
    top: 7,
    left: 0,
    position: "absolute",
    fontFamily: "roboto-700",
    color: "rgba(15,163,177,1)",
    fontSize: 28
  },
  timeSpent_Field: {
    position: "absolute",
    fontFamily: "roboto-regular",
    color: "#121212",
    height: 41,
    borderWidth: 1,
    borderColor: "#000000",
    textAlign: "left",
    fontSize: 16,
    top: 2,
    left: 164,
    borderTopWidth: 0,
    borderRightWidth: 0,
    borderLeftWidth: 0,
    right: 47
  },
  timeSpent_Measurement: {
    top: 13,
    position: "absolute",
    fontFamily: "roboto-700",
    color: "rgba(15,163,177,1)",
    fontSize: 16,
    right: 0
  },
  recreationAddButtonComponent: {
    position: "absolute",
    left: 80,
    height: 45,
    right: 80,
    bottom: "5.85%"
  }
});