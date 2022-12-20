import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import PostsScreen from "../Screens/mainScreen/PostsScreen";
import CreatePostsScreen from "../Screens/mainScreen/CreatePostsScreen";
import ProfileScreen from "../Screens/mainScreen/ProfileScreen";
import { Ionicons, AntDesign, Feather } from "@expo/vector-icons";


const MainTab = createBottomTabNavigator();

export default function Home({ navigation }) {
  return (
    <>
      <MainTab.Navigator screenOptions={{ tabBarShowLabel: false }}>
        <MainTab.Screen
          options={{
            headerShown: false,
            tabBarIcon: ({ color }) => (
              <Ionicons name="grid-outline" size={24} color={color} />
            ),
          }}
          name="Post"
          component={PostsScreen}
        />
        <MainTab.Screen
          options={{
            headerShown: false,
            tabBarIcon: ({ color }) => (
              <AntDesign name="plus" size={35} color={color} />
            ),
          }}
          name="Create"
          component={CreatePostsScreen}
        />
        <MainTab.Screen
          options={{
            headerShown: false,
            tabBarIcon: ({ color }) => (
              <Feather name="user" size={24} color={color} />
            ),
          }}
          name="Profile"
          component={ProfileScreen}
        />
      </MainTab.Navigator>
    </>
  );
}
