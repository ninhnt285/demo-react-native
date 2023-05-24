import VisitorScreenWrapper from '~/theme/screens/VisitorScreenWrapper';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {Button} from '@rneui/themed';
import {useDispatch} from '~/store';
import {useRequest} from '~/lib/request';
import {setToken} from '~/lib/token';

const defaultError = {name: '', email: '', password: '', c_password: ''};

const RegisterScreen = ({navigation}: any) => {
  const [input, setInput] = useState({
    name: '',
    email: '',
    password: '',
    c_password: '',
  });
  const [error, setError] = useState(defaultError);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const fetcher = useRequest();

  const onRegisterSubmit = async () => {
    try {
      setError(defaultError);
      setLoading(true);

      const responseData = await fetcher('/register', {
        method: 'POST',
        body: JSON.stringify(input),
      });
      if (!responseData.success) {
        console.log(responseData.data);

        setError(responseData.data);
      } else {
        const newUser = responseData.data;
        await setToken(newUser);
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
        <View style={styles.boxWrapper}>
          <Text style={styles.boxHeader}>Register</Text>

          <TextInput
            style={styles.input}
            placeholder="Full Name"
            value={input.name}
            onChangeText={val => {
              setInput({...input, name: val});
            }}
            autoComplete="off"
            autoCorrect={false}
          />
          {!loading && error.name && (
            <Text style={styles.errorMessage}>{error.name}</Text>
          )}

          <TextInput
            style={styles.input}
            placeholder="Email"
            value={input.email}
            keyboardType="email-address"
            onChangeText={val => {
              setInput({...input, email: val});
            }}
            autoCapitalize="none"
            autoComplete="email"
            autoCorrect={false}
          />
          {!loading && error.email && (
            <Text style={styles.errorMessage}>{error.email}</Text>
          )}

          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry={true}
            value={input.password}
            onChangeText={val => {
              setInput({...input, password: val});
            }}
            autoCapitalize="none"
            autoComplete="password"
            autoCorrect={false}
          />
          {!loading && error.password && (
            <Text style={styles.errorMessage}>{error.password}</Text>
          )}

          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            secureTextEntry={true}
            value={input.c_password}
            onChangeText={val => {
              setInput({...input, c_password: val});
            }}
            autoCapitalize="none"
            autoComplete="password"
            autoCorrect={false}
          />
          {!loading && error.c_password && (
            <Text style={styles.errorMessage}>{error.c_password}</Text>
          )}

          <View style={styles.buttons}>
            <Button
              title="Register"
              onPress={onRegisterSubmit}
              buttonStyle={{backgroundColor: 'green'}}
              containerStyle={{width: 130, marginTop: 10}}
            />
            <TouchableOpacity
              style={{alignSelf: 'flex-end'}}
              onPress={() => {
                navigation.navigate('Login');
              }}>
              <Text style={{fontSize: 12, textAlign: 'right', color: 'green'}}>
                Back to Login
              </Text>
            </TouchableOpacity>
          </View>
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

  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default RegisterScreen;
