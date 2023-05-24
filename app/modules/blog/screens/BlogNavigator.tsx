import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import BlogIndexScreen from './BlogIndexScreen';
import BlogViewScreen from './BlogViewScreen';
import BlogAddScreen from './BlogAddScreen';

const BlogNavigator = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="BlogIndex"
        component={BlogIndexScreen}
        options={{title: 'All Blogs'}}
      />
      <Stack.Screen name="BlogView" component={BlogViewScreen} />
      <Stack.Screen
        name="BlogAdd"
        component={BlogAddScreen}
        options={{title: 'Add Blog'}}
      />
    </Stack.Navigator>
  );
};

export default BlogNavigator;
