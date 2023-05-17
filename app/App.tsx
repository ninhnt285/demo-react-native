/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import Store from './store';
import Navigator from './Navigator';

function App(): JSX.Element {
  return (
    <Store>
      <Navigator/>
    </Store>
  );
}

export default App;
