import {Text} from '@rneui/base';
import React from 'react';
import {Button} from 'react-native';
import {StyleSheet, View} from 'react-native';
import {removeToken} from '~/lib/token';
import {useDispatch, useStore} from '~/store';
import ScreenWrapper from '~/theme/screens/ScreenWrapper';

const SettingsScreen = () => {
  const state = useStore();
  const dispatch = useDispatch();

  async function logoutHandler() {
    await removeToken();
    dispatch({type: 'SET_USER', payload: null});
  }

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        {state.user && (
          <>
            <Text style={{textAlign: 'center'}}>
              Full Name: {state.user.name}
            </Text>
            <Text style={{textAlign: 'center'}}>Email: {state.user.email}</Text>
            <Button title="Log out" onPress={logoutHandler} />
          </>
        )}
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 12,
  },
});

export default SettingsScreen;
