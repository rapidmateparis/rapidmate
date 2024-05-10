import {View, Text, Image} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from './HomeScreen';
import Pickup2 from './Pickup2';

const Bottom = createBottomTabNavigator();
const BottomNavigator = () => {
  return (
    <Bottom.Navigator>
      <Bottom.Screen
        key="HomeScreen"
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarIcon: tabInfo => {
            return (
              <Image
                source={require('../image/checkbox.png')}
                style={{
                  width: 20,
                  height: 20,
                  tintColor: tabInfo.focused ? 'purple' : 'black',
                }}
              />
            );
          },
        }}
      />
      <Bottom.Screen
        key="Pickup2"
        name="Pickup"
        component={Pickup2}
        options={{
          headerShown: false,
          tabBarIcon: tabInfo => {
            return (
              <Image
                source={require('../image/checkbox.png')}
                style={{
                  width: 20,
                  height: 20,
                  tintColor: tabInfo.focused ? 'purple' : 'black',
                }}
              />
            );
          },
        }}
      />
    </Bottom.Navigator>
  );
};

export default BottomNavigator;
