import { View, Text, AppRegistry, Image, Icon,AsyncStorage  } from 'react-native';
import React, { Component } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import PureChart from 'react-native-pure-chart';
import _ from 'lodash';
const axios = require('axios');
class Visual extends React.Component {
  constructor(props){
     super(props);
     this.state = {
       userName: null,
       urlAvatar: 'https://facebook.github.io/react-native/docs/assets/favicon.png',// Place holder
       bio:null,
       name:null,
       inst:null,
       web:null,
       length: 2,
       search : '',
       fulldata:[],
       text1:"Variation of Forks",
       text2:"watchers",
       data : [
       { "forks": 6192},{ "forks": 6832},{ "forks": 5900},{ "forks": 6123},{ "forks": 3200},
       { "forks": 6192},{ "forks": 6832},{ "forks": 5900},{ "forks": 6123},{ "forks": 3200},
       ],
       data2 : [
       { "watchers": 6192},{ "watchers": 6832},{ "watchers": 5900},{ "watchers": 6123},{ "watchers": 3200},
       { "watchers": 6192},{ "watchers": 6832},{ "watchers": 5900},{ "watchers": 6123},{ "watchers": 3200},
       ],

     }
  }

  render(){
    let sampleData = []
    let sampleData2 = []
    for (let i = 0; i < 10; i++) {
      sampleData.push(this.state.data[i]['forks'])
    }
    for (let i = 0; i < 10; i++) {
      sampleData2.push(this.state.data[i]['watchers'])
    }
    return (
        <View style={styles.viewStyles}>
          <PureChart data={sampleData} type='line' />
          <Text> {this.state.text1}</Text>
          <PureChart data={sampleData} type='bar' color = 'yello' />
          <Text> {this.state.text2}</Text>
          <Ionicons
            onPress = {() => {
            this.props.navigation.navigate('Main')}}
            name='ios-home'
            color='#517fa4'
            size={40}
          />
        </View>

      );
  }

   // Fetch data from API in github
  async getData(){
    const tt = await AsyncStorage.getItem('@MySuperStore:type');
    const kk = await AsyncStorage.getItem('@MySuperStore:search');
    const para = await AsyncStorage.getItem('@MySuperStore:para');
    axios.get('https://api.github.com/search/repositories?q=Deep')//'https://api.github.com/search/'+ AsyncStorage.getItem('@MySuperStore:type')+'?q=' + AsyncStorage.getItem('@MySuperStore:search'))
    .then((res) => {
      this.setState({
        text1: "Number of Forks",
        text1: "Number of watchers",
        data: res.data.items,
        data2:res.data.items,
      })
    })
  }
    // Fetch data after creating the data
  componentDidMount(){
    this.getData();
  }



}
const styles = {
  viewStyles: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft:20,
    paddingRight: 20
  }
}

export default Visual;