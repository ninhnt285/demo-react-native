import React from 'react';
import {SafeAreaView, View} from 'react-native';

interface IProps {
  children: React.ReactNode;
}

const ScreenWrapper: React.FC<IProps> = ({children}) => {
  return (
    <SafeAreaView>
      <View>{children}</View>
    </SafeAreaView>
  );
};

export default ScreenWrapper;
