import { View, Text, AppRegistry, Image, Icon, TextInput,TouchableOpacity,Linking,AsyncStorage } from 'react-native';
import React, { Component } from 'react';
// Splash Screen that will appears before displaying the main page
class SigninScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      userText: '',
      password: ''
    }
  }
  pressEvent(){
    this.props.navigation.navigate('Main', {userName: this.state.userText.toLowerCase(), password: this.state.password})
  }
  render() {
    return (
      <View style={styles.viewStyles}>
        <Image
          style={{width: 66*3, height: 58*3}}
          source={require('../assets/images/mark-github.png')}
        />
        <View style={styles.viewStyles2}>
          <TextInput
            placeholder="Enter your email"
            placeholderTextColor = 'black'
            style = {styles.input}
            returnKeyType = "next"
            value={this.state.userText}
            onChangeText={(text) => this.setState({userText: text})}

          />
          <TextInput
            placeholder="Enter your password"
            placeholderTextColor = 'black'
            secureTextEntry
            style = {styles.input}
            returnKeyType = "go"
            value={this.state.password}
            onChangeText={(text) => this.setState({password: text})}

          />
          <TouchableOpacity
            onPress={() => {
                AsyncStorage.setItem('@MySuperStore:userName', this.state.userText);
                AsyncStorage.setItem('@MySuperStore:password', this.state.password);

                const profileUrl = 'http://api.github.com/users/'+this.state.userText;
                const repoUrl = 'http://api.github.com/users/'+this.state.userText+'/repos';

                AsyncStorage.setItem('@MySuperStore:profile', profileUrl);
                AsyncStorage.setItem('@MySuperStore:repo', repoUrl);
                this.props.navigation.navigate('Main')
            }}>
            <Text style = {styles.text}>LOGIN</Text>
          </TouchableOpacity>
        </View>

      </View>
    );
  }
}
const styles = {
  viewStyles: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
    paddingTop:200
  },
  input:{
    backgroundColor:'white',
    color:'black',
  },
  viewStyles2: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
    paddingTop:50
  },
  text:{
    fontSize: 30,
    paddingTop:150
  }
}

export default SigninScreen;
