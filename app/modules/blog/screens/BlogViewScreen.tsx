import React, {useEffect, useLayoutEffect, useState} from 'react';
import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useRequest} from '~/lib/request';
import ScreenWrapper from '~/theme/screens/ScreenWrapper';
import {Blog} from '../types';
import Icon from 'react-native-vector-icons/Ionicons';
import {useIsFocused} from '@react-navigation/native';

const BlogViewScreen = ({navigation, route}: any) => {
  const isFocused = useIsFocused();
  const fetcher = useRequest();

  const [blog, setBlog] = useState<Blog | null>(null);
  const id = route.params.id;

  function showDeleteAlert() {
    Alert.alert('Delete a Blog', 'Confirm Delete', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'OK',
        style: 'destructive',
        onPress: async () => {
          try {
            const responseData = await fetcher(`/blogs/${id}`, {
              method: 'DELETE',
            });
            console.log(responseData);
          } finally {
            navigation.goBack();
          }
        },
      },
    ]);
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <>
          <TouchableOpacity
            style={{marginRight: 24}}
            onPress={() => {
              navigation.navigate('BlogAdd', {id});
            }}>
            <Icon name="ios-create-outline" size={25} color="#007AFF" />
          </TouchableOpacity>

          <TouchableOpacity>
            <Icon
              name="ios-trash-outline"
              size={25}
              color="#fc3d39"
              onPress={showDeleteAlert}
            />
          </TouchableOpacity>
        </>
      ),

      title: 'Blog Detail',
    });
  });

  useEffect(() => {
    async function fetchBlog() {
      try {
        const responseData = await fetcher(`/blogs/${id}`);
        setBlog(responseData.data);
      } catch (err) {
        console.log(err);
      }
    }

    fetchBlog();
  }, [id, isFocused]);

  return (
    <ScreenWrapper>
      {blog && (
        <View style={styles.container}>
          <Text style={styles.header}>{blog.title}</Text>
          <Text>{blog.content}</Text>
        </View>
      )}
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 12,
  },

  header: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 20,
    marginVertical: 6,
  },

  content: {
    marginTop: 10,
    textAlign: 'justify',
  },
});

export default BlogViewScreen;
