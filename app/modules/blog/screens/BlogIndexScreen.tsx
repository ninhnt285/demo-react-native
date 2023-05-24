import React, {useEffect, useLayoutEffect, useState} from 'react';
import {Text, View, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import {useRequest} from '~/lib/request';
import Icon from 'react-native-vector-icons/Ionicons';
import {useIsFocused} from '@react-navigation/native';

type Blog = {
  id: number;
  title: string;
  content: string;
};

const BlogIndexScreen = ({navigation}: any) => {
  const fetcher = useRequest();
  const [blogs, setBlogs] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const isFocused = useIsFocused();

  async function fetchBlogs() {
    try {
      const responseData = await fetcher('/blogs');
      setBlogs(responseData.data);
    } catch (err) {
      console.log(err);
    } finally {
      setRefreshing(false);
    }
  }

  function onRefresh() {
    setRefreshing(true);
    fetchBlogs();
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('BlogAdd');
          }}>
          <Icon name="ios-add-outline" size={25} color="#007AFF" />
        </TouchableOpacity>
      ),
    });
  });

  useEffect(() => {
    if (isFocused) {
      fetchBlogs();
    }
  }, [isFocused]);

  function onPressHandler(id: string) {
    return () => {
      navigation.push('BlogView', {id});
    };
  }

  const renderItem = ({item}: {item: Blog}) => {
    return (
      <TouchableOpacity
        style={styles.container}
        onPress={onPressHandler(item.id.toString())}>
        <Text style={styles.header}>{item.title}</Text>
        <Text>
          {item.content.length > 120
            ? item.content.substring(0, 120) + '...'
            : item.content}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      ItemSeparatorComponent={() => (
        <View
          style={{backgroundColor: '#00000022', height: 1, marginLeft: 12}}
        />
      )}
      data={blogs}
      renderItem={renderItem}
      getItemLayout={(data, index) => {
        return {length: 100, offset: 101 * index, index};
      }}
      keyExtractor={item => item.id.toString()}
      onRefresh={onRefresh}
      refreshing={refreshing}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 12,
    backgroundColor: '#FFF',
    marginVertical: 4,
  },

  header: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 8,
  },
});

export default BlogIndexScreen;
