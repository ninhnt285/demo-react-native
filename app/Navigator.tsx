import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import { useStore } from './store';
import { Text, View } from 'react-native';
import ScreenWrapper from './theme/screens/ScreenWrapper';

const VisitorNavigator = () => {
  return (
    <ScreenWrapper>
      <Text>Visitor Nav</Text>
    </ScreenWrapper>
  );
}

const MemberNavigator = () => {
  return (
    <ScreenWrapper>
      <Text>Member Nav</Text>
    </ScreenWrapper>
  );
}

const Navigator = () => {
  const [state, dispatch] = useStore();
  const user = state.user;
  console.log(user);

  return (
    <NavigationContainer>
      {user === null ? <VisitorNavigator /> : <MemberNavigator />}
    </NavigationContainer>
  );
};

export default Navigator;
