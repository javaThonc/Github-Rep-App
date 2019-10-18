import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, View, Image,AsyncStorage,Button  } from 'react-native';
import {ImageBackground, rgb } from 'react-native'
import * as Animatable from 'react-native-animatable';
AnimatImg = Animatable.createAnimatableComponent(Image);
AnimatView = Animatable.createAnimatableComponent(View);
import { Avatar, Badge, Icon, withBadge } from 'react-native-elements'
import { SearchBar } from 'react-native-elements';
import { Constants, Svg } from 'expo'
const axios = require('axios');
// Create reusable components for the text
class TextView extends Component {
  render() {
    return (
      <View style={styles.accoutInfoStyle}>
        <Text style = {styles.accountStyle2}>{this.props.text}</Text>
      </View>
    );
  }
}

//Main class that build up the main components of the Profile page
export default class Profile extends React.Component {
  handleSearch = text => {
    this.setState({ search:text });
  };
  static navigationOptions = {
    title: 'Profile',
    headerStyle: {
      backgroundColor: 'rgb(245,245,	240)',
    },
  };
  constructor(props){
     super(props);
     this.state = {
       userName: null,
       urlAvatar: 'https://facebook.github.io/react-native/docs/assets/favicon.png',// Place holder
       bio:null,
       name:null,
       inst:null,
       date:null,
       web:null,
       length: 2,
       search : '',
       fulldata:[],

     }
  }

  // Render function that display the necessary data
  render() {
    const { search } = this.state;
    return (
      <ScrollView style={styles.container}>
        <AnimatView animation = 'bounceIn' style={styles.userInfoStyle}>
          <Image
            source = {{uri: this.state.urlAvatar }}
            style={styles.userIconStyle}
          />
          <Badge
            status = 'error'
            value = {this.state.length}
            containerStyle={{ position: 'absolute', top: 65, right: 65 }}
            badgeStyle = {{width: 30, height: 30}}
            onPress = {() => {
              this.setState({
                length:0
            });
            this.props.navigation.navigate('Noti')}}
          />
        </AnimatView>
        <AnimatView style={styles.accoutInfoStyle} animation = 'bounceInRight'>
          <Text style ={styles.accountStyle}> {this.state.name} </Text>
          <TextView text={this.state.userName}/>
          <TextView text={this.state.date}/>
          <TextView text={this.state.web}/>
          <Text style ={styles.accountStyle3}> {this.state.inst}</Text>
          <SearchBar
            platform = 'ios'
            placeholder="Enter the Repositories!!!"
            onChangeText={this.handleSearch}
            value= {search}
          />
          <Button
            onPress = { () =>{
                AsyncStorage.setItem('@MySuperStore:type','repositories');
                AsyncStorage.setItem('@MySuperStore:search',this.state.search);
                this.props.navigation.navigate('Visual');
              }
            }
            title="GO"
            color="white"
            accessibilityLabel="Learn more about this purple button"
          />
        </AnimatView>

      </ScrollView>
    );
  }

  // Fetch data from API in github
  async getData(){
    const web =  await AsyncStorage.getItem('@MySuperStore:profile');
    console.log(web)
    axios.get(web)
    .then((res) => {
      const userName = res.data.login;
      const headIcon = res.data.avatar_url;
      const Bio = res.data.bio;
      const nameReal= res.data.name;
      const inistitute = res.data.company;
      // Split text into individual words and count length
      const [days, time] = res.data.created_at.split('T');

      this.setState({
        userName: userName,
        urlAvatar: headIcon,
        bio: Bio,
        name:nameReal,
        inst:inistitute,
        date:days,
        web:web
      })
    })
  }

  // Fetch data from API in github
  async getData2(){
    const token = '7abfbbbfb4a8def9f006700f2556d6a2f9b4ec24'
    axios.get('https://api.github.com/notifications', {
      headers: { 'Authorization': 'token ' + token }
    }).then((res) => {
      const returnVal = res.data.length;
      const leng =  returnVal == 0 ? 2 : returnVal;
      this.setState({
        length:leng
      })
    })
  }
  // Fetch data after creating the data
  componentDidMount(){
    this.getData();
    this.getData2();
  }
}
// Different styles for different views in the profile Page
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  userInfoStyle:{
    flex: 1,
    paddingTop: 55,
    paddingBottom: 95,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userIconStyle:{
    width: 260,
    height: 260,
    backgroundColor: 'transparent',
    borderColor: 'rgb(245,245,	240)',
    borderWidth: 10,
    borderRadius:130,
  },
  userNameStyle:{
    paddingTop: 21,
    paddingLeft: 90,
    backgroundColor: 'transparent',
    fontSize: 20,
    textAlign:'right',
    justifyContent: 'flex-end',
  },
  accoutInfoStyle:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'rgb(242,	242	,242)',
    borderWidth: StyleSheet.hairlineWidth,
    backgroundColor: 'rgb(245,245,	240)',

  },
  accountStyle:{
    paddingTop: 15,
    fontSize: 30,
    paddingVertical: 5,
    fontFamily: 'AvenirNextCondensed-DemiBold'
  },
  accountStyle2:{
    fontSize: 15,
    paddingVertical: 1.5,
    fontFamily: 'AvenirNextCondensed-DemiBold'
  },
  accountStyle3:{
    paddingBottom: 15,
    fontSize: 15,
    paddingVertical: 1.5,
    fontFamily: 'AvenirNextCondensed-DemiBold'
  },


});
