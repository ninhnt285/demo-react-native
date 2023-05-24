import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  Image,
  Keyboard,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';

const {height} = Dimensions.get('screen');

const VisitorScreenWrapper = ({children}: any) => {
  const [marginBottom, setMarginBottom] = useState(0);

  useEffect(() => {
    if (Platform.OS === 'ios') {
      const showSubscription = Keyboard.addListener(
        'keyboardDidShow',
        _keyboardDidShow,
      );
      const hideSubscription = Keyboard.addListener(
        'keyboardDidHide',
        _keyboardDidHide,
      );

      // cleanup function
      return () => {
        showSubscription.remove();
        hideSubscription.remove();
      };
    }
  }, []);

  const _keyboardDidShow = (e: any) => {
    setMarginBottom(e.endCoordinates.height + 20);
  };

  const _keyboardDidHide = () => {
    setMarginBottom(0);
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <Image source={require('~/assets/images/bg.jpg')} style={styles.bg} />
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{flexGrow: 1}}
        style={[
          styles.scrollView,
          Platform.OS === 'ios' && marginBottom > 0
            ? {maxHeight: height - marginBottom}
            : null,
        ]}>
        <View style={styles.container}>
          <Image
            source={require('~/assets/images/logo.png')}
            style={styles.logo}
          />
          {children}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  bg: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    resizeMode: 'cover',
  },
  scrollView: {
    backgroundColor: '#00000000',
    // position:'absolute',
    // left:0,
    // right:0,
    // top:40
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    paddingHorizontal: 20,
  },

  logo: {
    width: '100%',
    maxWidth: 300,
    height: 100,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: 10,
  },
});

export default VisitorScreenWrapper;
