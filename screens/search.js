import React, { Component } from 'react';
import { ScrollView, StyleSheet,Text, View, Image, Button, TouchableHighlight} from 'react-native';
import {ImageBackground, rgb } from 'react-native'
import { AppRegistry, SectionList , FlatList, Linking,AsyncStorage} from 'react-native';
import * as Animatable from 'react-native-animatable';
AnimatImg = Animatable.createAnimatableComponent(Image);
AnimatView = Animatable.createAnimatableComponent(View);
AnimatButton = Animatable.createAnimatableComponent(Button);
import _ from 'lodash';
import { Icon } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';
const axios = require('axios');
import Like from '../components/likeButton.js'


// Create reusable components for the text
class TextView extends Component {
  render() {
    return (
        <Text  style={{paddingLeft:15, fontSize: 20, fontFamily:'AvenirNextCondensed-DemiBold'}}>{this.props.text}</Text>
    );
  }
}



// Default class that represent the main components  in the
// Repositories page
export default class Search extends React.Component {
  static navigationOptions = {
    title: 'Repositories',
    headerStyle: {
      backgroundColor: 'rgb(245,245,  240)',
    },
  };
  // constructor that has a default urlAvatar because it must have one
  constructor(props){
     super(props);
     this.state = {
       data: [],
       param:''
     }
   }

  render() {
    let content = []
    let table = []
    // For loop that consequtively generate all the views that come from API
    for (let i = 0; i < this.state.data.length; i++) {
        let title = []

        title.push( <Text style = {styles.titleFont}
                      onPress={()=>{Linking.openURL(this.state.data[i]['html_url'])}}>
                          {this.state.data[i]['name']
                      }
                     </Text> )
        title.push(<Like repo = {this.state.data[i]['name']} />)

        content.push(<View style = {styles.titleStyle}>{title}</View>)
        content.push(
          <TextView text = {this.state.data[i]['owner']['login']}/>
        )
        content.push(
          <Text  style={{paddingBottom:35, paddingLeft:15, fontSize: 20, fontFamily:'AvenirNextCondensed-DemiBold'}}>{this.state.data[i]['description']}</Text>
        )
    }
    table.push(
        <AnimatView style ={styles.userInfoStyle} animation = 'bounceInRight'>{content}</AnimatView>
    )
    return (

        <ScrollView style={styles.container}>
        <AnimatView animation ="bounceInDown" style ={styles.viewCon} >
           <Animatable.Text style = {styles.RepoStyle}>"Result</Animatable.Text>
        </AnimatView>
        {table}
        <View style={styles.icon}>
          <Ionicons
            onPress = {() => {
            this.props.navigation.navigate('Main')}}
            name='ios-home'
            color='#517fa4'
            size={40}
          />
        </View>

        </ScrollView>
    );
  }
  // Fetch data from API in github
  async getData(){
    const tt = await AsyncStorage.getItem('@MySuperStore:type');
    const kk = await AsyncStorage.getItem('@MySuperStore:search');
    axios.get('https://api.github.com/search/'+tt+'?q='+kk)//'https://api.github.com/search/'+ AsyncStorage.getItem('@MySuperStore:type')+'?q=' + AsyncStorage.getItem('@MySuperStore:search'))
    .then((res) => {
      this.setState({
        data: res.data.items,
      })
    })
  }
  filter(){
    const dataNew =_.sortBy(this.state.data, this.state.para);
    this.setState({
      data: dataNew
    })
  }
  // Fetch data after creating the data
  componentDidMount(){
    this.getData();
    this.filter();
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
  userInfoStyle:{
    flex: 1,
    paddingBottom:5,
    paddingTop:50
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
  titleStyle:{
    backgroundColor: 'rgb(245,245,  240)',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight:15
  },
  titleFont:{
    fontSize: 25,
    fontFamily:'AvenirNextCondensed-DemiBold',
    paddingLeft:15
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
    borderBottomWidth: 5,
    borderTopWidth: 5,
    borderColor: 'rgb(245,245,  240)',

  },
  icon:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  accountStyle:{
    fontSize: 30,
  },
  accountStyle2:{
    fontSize: 15,
  },


});
