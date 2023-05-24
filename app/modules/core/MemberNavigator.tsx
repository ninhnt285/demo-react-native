import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import BlogNavigator from '../blog/screens/BlogNavigator';
import SettingsScreen from '../user/screens/SettingsScreen';

const MainTab = createBottomTabNavigator();

const MeberNavigator = () => {
  return (
    <MainTab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          switch (route.name) {
            case 'Home':
              iconName = focused ? 'ios-newspaper' : 'ios-newspaper-outline';
              break;
            case 'Settings':
              iconName = focused ? 'ios-cog' : 'ios-cog-outline';
              break;
            default:
              iconName = focused ? 'ios-newspaper' : 'ios-newspaper-outline';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
      })}>
      <MainTab.Screen
        name="Home"
        component={BlogNavigator}
        options={{headerShown: false}}
      />
      <MainTab.Screen name="Settings" component={SettingsScreen} />
    </MainTab.Navigator>
  );
};

export default MeberNavigator;
