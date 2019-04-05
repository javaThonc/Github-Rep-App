import React, { Component } from 'react';
import { ScrollView, StyleSheet,Text, View, Image, Button, TouchableHighlight} from 'react-native';
import {ImageBackground, rgb } from 'react-native'
import { AppRegistry, SectionList , FlatList, Linking,AsyncStorage} from 'react-native';
import * as Animatable from 'react-native-animatable';
AnimatImg = Animatable.createAnimatableComponent(Image);
AnimatView = Animatable.createAnimatableComponent(View);
import { Icon } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
const axios = require('axios');

export default class Like extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      onClicked: false,
      repo: ""
    }
  }
  handlerButtonOnClick = ()=>{
    this.setState({
       onClicked: this.state.onClicked ? false : true
    });
    const repo = this.state.repo
    if(this.state.onClicked){
      axios.put('/user/starred/' + AsyncStorage.getItem('@MySuperStore:userName')+ repo, null, {
                  baseURL: 'https://api.github.com',
                  headers: { 'Authorization': 'token ' + '7abfbbbfb4a8def9f006700f2556d6a2f9b4ec24',
                              'Content-Length': 0 }
              })
    }else{
      axios.delete('/user/starred/' + AsyncStorage.getItem('@MySuperStore:userName') + repo, null, {
                  baseURL: 'https://api.github.com',
                  headers: { 'Authorization': 'token ' + '7abfbbbfb4a8def9f006700f2556d6a2f9b4ec24',
                              'Content-Length': 0 }
              })
    }
  }
  render() {
    return (
        <View style = {styles.container}>
            <Ionicons
                onPress={this.handlerButtonOnClick}
                color = 'rgb(22, 104, 204)'
                name={this.state.onClicked?'md-heart':'md-heart-empty'}
                size= {35}
                raised
          />
        </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    paddingRight:15,
    paddingTop:2
  },
});
