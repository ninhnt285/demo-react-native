import VisitorScreenWrapper from '~/theme/screens/VisitorScreenWrapper';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useState} from 'react';
import {Button} from '@rneui/themed';
import {setToken} from '~/lib/token';
import {useDispatch} from '~/store';
import {useRequest} from '~/lib/request';

const defaultError = {email: '', password: ''};

const LoginScreen = ({navigation}: any) => {
  const [input, setInput] = useState({email: '', password: ''});
  const [error, setError] = useState(defaultError);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const fetcher = useRequest();

  const onLoginSubmit = async () => {
    try {
      setError(defaultError);
      setLoading(true);

      const responseData = await fetcher('/login', {
        method: 'POST',
        body: JSON.stringify(input),
      });
      if (!responseData.success) {
        console.log(responseData.data);

        setError(responseData.data);
      } else {
        const newUser = responseData.data;
        // Save token
        await setToken(newUser);
        // Set user in store
        dispatch({type: 'SET_USER', payload: newUser});
      }
    } catch (err: any) {
      // setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <VisitorScreenWrapper>
      <View style={styles.container}>
        <View style={[styles.boxWrapper]}>
          <Text style={styles.boxHeader}>Login</Text>
          <Text style={styles.welcomeText}>
            If you're already a member, please login with your username/email
            and password.
          </Text>

          <TextInput
            value={input.email}
            keyboardType="email-address"
            onChangeText={val => setInput({...input, email: val})}
            style={styles.input}
            autoCapitalize="none"
            placeholder="Email"
            autoComplete="off"
            autoCorrect={false}
          />
          {!loading && error.email && (
            <Text style={styles.errorMessage}>{error.email}</Text>
          )}

          <TextInput
            value={input.password}
            onChangeText={val => setInput({...input, password: val})}
            style={styles.input}
            autoCapitalize="none"
            placeholder="Password"
            secureTextEntry={true}
            autoComplete="off"
            autoCorrect={false}
          />
          {!loading && error.password && (
            <Text style={styles.errorMessage}>{error.password}</Text>
          )}

          <Button
            onPress={onLoginSubmit}
            title="Sign In"
            style={{backgroundColor: 'green'}}
            containerStyle={{width: 130, marginTop: 10}}
            titleStyle={{textTransform: 'uppercase'}}
            disabled={loading}
          />
        </View>

        <View style={[styles.boxWrapper, {marginBottom: 0}]}>
          <Text style={styles.boxHeader}>Register</Text>
          <Text style={styles.welcomeText}>
            Don't have an account? Create new one.
          </Text>
          <Button
            onPress={() => {
              navigation.navigate('Register');
            }}
            title="Register"
            buttonStyle={{backgroundColor: 'green'}}
            containerStyle={{width: 130}}
            titleStyle={{textTransform: 'uppercase'}}
          />
        </View>
      </View>
    </VisitorScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 0,
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    paddingBottom: 40,
  },

  boxWrapper: {
    maxWidth: 400,
    width: '100%',
    backgroundColor: '#FFFFFF',
    padding: 15,
    marginBottom: 40,
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowRadius: 1,
    elevation: 1,
  },

  boxHeader: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 15,
  },

  welcomeText: {
    fontSize: 16,
    marginBottom: 15,
  },

  errorMessage: {
    color: 'red',
    fontSize: 12,
    marginTop: 4,
  },

  input: {
    borderWidth: 1,
    borderColor: '#888888',
    backgroundColor: 'white',
    padding: 10,
    marginTop: 15,
    fontSize: 18,
  },
});

export default LoginScreen;
