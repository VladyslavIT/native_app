import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import CameraScreen from '../nestedScreen/CameraScreen';
import InfoScreen from '../nestedScreen/InfoScreen';

const NestedScreen = createStackNavigator();

export default function CreatePostsScreen() {
	return(
		<NestedScreen.Navigator>
			<NestedScreen.Screen name="Camera" options={{ headerShown: false }} component={CameraScreen}/>
			<NestedScreen.Screen name="Info" component={InfoScreen}/>
		</NestedScreen.Navigator>
	)
}
