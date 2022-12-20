import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import InnerPostsScreen from '../secondScreen/InnerPostsScreen';
import CommentsScreen from '../secondScreen/CommentsScreen';
import MapScreen from '../secondScreen/MapScreen';

const SecondScreen = createStackNavigator();

export default function PostsScreen(){
	return(
		<SecondScreen.Navigator>
			<SecondScreen.Screen name="InnerPosts" options={{ headerShown: false }} component={InnerPostsScreen}/>
			<SecondScreen.Screen name="Map" component={MapScreen}/>
			<SecondScreen.Screen name="Comment" component={CommentsScreen}/>
		</SecondScreen.Navigator>
	)
}
    