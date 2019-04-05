import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import Profile from '../screens/Profile';
import Repositories from '../screens/Repositories';
import Following from '../screens/Following';
import Follower from '../screens/Follower';
// Create the profileStack stack to hold the data page
const profileStack = createStackNavigator({
  Profile: Profile,
});

// Specify where the page come from
profileStack.navigationOptions = {
  tabBarLabel: 'Profile',
  tabBarIcon: ({ focused }) => (
    // Add a Icon
    <TabBarIcon
      focused={focused}
      name={`logo-github${focused ? '' : ''}`}
    />
  ),
};

// Create the Repositories stack to hold the data page
const repStack = createStackNavigator({
  Repositories: Repositories,
});
// Specify where the page come from
repStack.navigationOptions = {
  tabBarLabel: 'Repositories',
  // Add a Icon
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={`ios-heart${focused ? '' : ''}`}
    />
  ),
};
// Creaet the Following stack to hold the following page
const followingStack = createStackNavigator({
  Following: Following,
});

// Specify where the page come form
followingStack.navigationOptions = {
  tabBarLabel: 'Following',
  // Add a Icon
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={`ios-jet${focused ? '' : ''}`}/>
  ),
};

// Creaet the Following stack to hold the following page
const followerStack = createStackNavigator({
  Follower: Follower,
});

// Specify where the page come form
followerStack.navigationOptions = {
  tabBarLabel: 'Follower',
  // Add a Icon
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={`ios-people${focused ? '' : ''}`}/>
  ),
};
// Create a bottom bar to include the navigations
const bottomBar = createBottomTabNavigator({
  profileStack,
  repStack,
  followingStack,
  followerStack,
},{
  tabBarOptions: {
      style: {
        backgroundColor: 'rgb(245,245,  240)',
      },
      tabStyle: {
        backgroundColor: 'rgb(245,245,  240)',
      },
    },
});

class MainTabNavigator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName:null
    };
  }
}


//Export the setting
export default bottomBar;
