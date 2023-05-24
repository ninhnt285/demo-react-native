import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useLayoutEffect, useState} from 'react';
import {Button} from 'react-native';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import {useRequest} from '~/lib/request';
import ScreenWrapper from '~/theme/screens/ScreenWrapper';

const defaultError = {title: '', content: ''};

const BlogAddScreen = ({route}: any) => {
  const navigation = useNavigation();
  const fetcher = useRequest();
  const [input, setInput] = useState({title: '', content: ''});
  const [error, setError] = useState(defaultError);
  const [loading, setLoading] = useState(false);

  const id = route && route.params && route.params.id;

  async function onSubmit() {
    try {
      setError(defaultError);
      setLoading(true);

      const url = id ? `/blogs/${id}` : '/blogs';
      const method = id ? 'PUT' : 'POST';

      const responseData = await fetcher(url, {
        method,
        body: JSON.stringify(input),
      });

      if (!responseData.success) {
        setError(responseData.data);
      } else {
        // Success
        navigation.goBack();
      }
    } catch (err: any) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button disabled={loading} title="Submit" onPress={onSubmit} />
      ),
      title: id ? 'Edit Blog' : 'Add Blog',
    });
  });

  useEffect(() => {
    async function fetchBlog() {
      if (id) {
        try {
          const responseData = await fetcher(`/blogs/${id}`);
          setInput({
            title: responseData.data.title,
            content: responseData.data.content,
          });
        } catch (err) {
          console.log(err);
        }
      }
    }
    fetchBlog();
  }, [id]);

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <TextInput
          value={input.title}
          // keyboardType="email-address"
          onChangeText={val => setInput({...input, title: val})}
          style={styles.input}
          placeholder="Title"
          autoComplete="off"
          autoCorrect={false}
        />
        {error && error.title && (
          <Text style={styles.errorMessage}>{error.title}</Text>
        )}

        <TextInput
          value={input.content}
          // keyboardType="email-address"
          onChangeText={val => setInput({...input, content: val})}
          style={[styles.input, {height: 160}]}
          placeholder="Content"
          autoComplete="off"
          autoCorrect={false}
          multiline
          numberOfLines={6}
          editable
        />
        {error && error.content && (
          <Text style={styles.errorMessage}>{error.content}</Text>
        )}
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 0,
    // flexDirection: 'column',
    width: '100%',
    padding: 12,
  },

  input: {
    borderWidth: 1,
    borderColor: '#888888',
    backgroundColor: 'white',
    padding: 12,
    marginTop: 12,
    fontSize: 16,
    color: 'black',
  },

  errorMessage: {
    color: 'red',
    fontSize: 12,
    marginTop: 4,
  },
});

export default BlogAddScreen;
