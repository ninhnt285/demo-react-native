/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import React from 'react';
import Store from './store';
import Navigator from './Navigator';

function App(): JSX.Element {
  return (
    <Store>
      <SafeAreaProvider>
        <Navigator />
      </SafeAreaProvider>
    </Store>
  );
}

export default App;
