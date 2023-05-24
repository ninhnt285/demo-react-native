import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {useDispatch, useStore} from './store';
import VisitorNavigator from './modules/core/VisitorNavigator';
import MemberNavigator from './modules/core/MemberNavigator';
import {useRequest} from './lib/request';
import ScreenWrapper from './theme/screens/ScreenWrapper';
import {View} from 'react-native';

const SplashScreen = () => {
  return (
    <ScreenWrapper>
      <View />
    </ScreenWrapper>
  );
};

const Navigator = () => {
  const [loading, setLoading] = useState(true);
  const state = useStore();
  const dispatch = useDispatch();
  const fetcher = useRequest();

  useEffect(() => {
    async function fetchUser() {
      try {
        setLoading(true);
        const user = await fetcher('/user');
        dispatch({type: 'SET_USER', payload: user});
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, []);

  return (
    <NavigationContainer>
      {loading ? (
        <SplashScreen />
      ) : state.user === null ? (
        <VisitorNavigator />
      ) : (
        <MemberNavigator />
      )}
    </NavigationContainer>
  );
};

export default Navigator;
