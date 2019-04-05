import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import SplashScreen from "../screens/SplashScreen.js"
import SigninScreen from "../screens/Signin.js"
import Repositories from '../screens/Repositories';
import Search from '../screens/search.js';
import Visual from '../screens/visual.js';
import Notification from '../screens/Notification.js';


import MainTabNavigator from './MainTabNavigator';

export default createAppContainer(createSwitchNavigator({
  // You could add another route here for authentication.
  // Read more at https://reactnavigation.org/docs/en/auth-flow.html
  Splash: SplashScreen,
  SignIn: SigninScreen,
  Noti: Notification,
  search : Search,
  Main: MainTabNavigator,
  Visual: Visual,
  
}));