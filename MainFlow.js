import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";


import Home from "./screens/Home";
import SaveImage from "./screens/SaveImage";
import AllFiles from "./screens/AllFiles";

const Stack = createStackNavigator();

const MainNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SaveImage"
          component={SaveImage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AllFiles"
          component={AllFiles}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

function Mainflow() {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "black",
      }}
    >
        <Text>gagan</Text>
      <MainNavigator />
    </View>
  );
}

export default Mainflow;
