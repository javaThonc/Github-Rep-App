import { View, Text, AppRegistry, Image, Icon  } from 'react-native';
import React, { Component } from 'react';
// Splash Screen that will appears before displaying the main page
class SplashScreen extends React.Component {
  performTimeConsumingTask = async() => {
    return new Promise((resolve) =>
      setTimeout(
        () => { resolve('result') },
        2000
      )
    )
  }
  async componentDidMount() {
    const data = await this.performTimeConsumingTask();
    if (data !== null) {
      this.props.navigation.navigate('SignIn');
    }
  }
  render() {
    return (
      <View style={styles.viewStyles}>
        <Image
          style={{width: 66*3, height: 58*3}}
          source={require('../assets/images/github-logo.png')}
        />
      </View>
    );
  }
}
const styles = {
  viewStyles: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white'
  }
}

export default SplashScreen;

