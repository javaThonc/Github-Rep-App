import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, View, Image  } from 'react-native';
import {ImageBackground, rgb } from 'react-native'
import { AppRegistry, SectionList , FlatList, Linking, TouchableOpacity} from 'react-native';
import * as Animatable from 'react-native-animatable';
AnimatImg = Animatable.createAnimatableComponent(Image);

const axios = require('axios');


// Create reusable components for the text
class TextView extends Component {
  render() {
    return (
        <Text  style={{fontSize: 20}}>{this.props.text}</Text>
    );
  }
}

// Default class that represent the main components  in the
// Follower page
export default class Repositories extends React.Component {
  static navigationOptions = {
    title: 'Followers',
    headerStyle: {
      backgroundColor: 'rgb(245,245,	240)',
    },
  };
  // constructor that has a default urlAvatar because it must have one
  constructor(props){
     super(props);
     this.state = {
       urlAvatar: 'https://facebook.github.io/react-native/docs/assets/favicon.png',// Place holder
       data: [],
     }
   }

  // Render function that display the necessary data
  render() {
    let table = []
    // For loop that consequtively generate all the views that come from API
    for (let i = 0; i < this.state.data.length; i+=4) {
        let row = []
        let content = []
        for(let j = i; j < i+4 && j <  this.state.data.length; j++){
          let index = i+j
          content.push(<TouchableOpacity onPress={()=>{Linking.openURL(this.state.data[j]['html_url'])}}>
                        <AnimatImg
                          animation = 'bounceIn'
                          style = {styles.userIconStyle}
                          source = {{uri: this.state.data[j]['avatar_url']}}

                        />
                      </TouchableOpacity>)
        }
        row.push(<View style = {styles.accoutInfoStyle}>{content}</View>)
        table.push(<View style = {styles.accountStyle}>{row}</View>)
    }
    return (
        <ScrollView style={styles.container}>
        <AnimatView animation ="bounceInDown" style ={styles.viewCon} >
          <Animatable.Text style = {styles.RepoStyle}>
                {this.state.data.length}
          </Animatable.Text>
        </AnimatView>
        {table}
        </ScrollView>
    );
  }
  // Fetch data from API in github
  async getData(){
    axios.get('https://api.github.com/users/facebook-github-bot/followers')
    .then((res) => {
      const dataAPI = res.data;
      // Split text into individual words and count length
      this.setState({
        data:dataAPI
      })
      AsyncStorage.setItem('@MySuperStore:followerList', JSON.stringify(this.state.data));
    })
  }
  // Fetch data after creating the data
  componentDidMount(){
    this.getData();
  }

}
// Different styles for different views in the profile Page
const styles = StyleSheet.create({
  viewCon:{
    backgroundColor:'rgb(22, 104, 204)',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  userIconStyle:{
    width: 80,
    height: 80,
    backgroundColor: 'transparent',
    borderColor: 'rgb(245,245,240)',
    borderWidth: 2,
    borderRadius:40,
  },
  userInfoStyle:{
    flex: 1,
    paddingBottom:5
  },
  RepoStyle:{
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
    textAlign:'center',
    fontSize:110,
    fontWeight: 'bold',
    color:'white',
    fontFamily: 'AvenirNextCondensed-Heavy'
  },
  accoutInfoStyle:{
    flex: 1,
    justifyContent: 'space-between',
    paddingTop: 5,
    paddingBottom: 5,
    flexDirection: 'row',
    paddingLeft:15,
    paddingRight:15
  },
  accountStyle:{
    paddingTop: 50,
  },



});
