import React from "react";
import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";

import LoginScreen from "../screens/LoginScreen";
import HomeScreen from "../screens/HomeScreen";
import MovieScreen from "../screens/MovieScreen";
import FavoritesScreen from "../screens/FavoritesScreen";

const Stack = createStackNavigator();

const options = {
	headerShown: false,
	animationEnabled: true,
};

const AppStack = () => {
	return (
		<Stack.Navigator>
            <Stack.Screen name="Login" component={LoginScreen} options={options}/>
            <Stack.Screen name="Home" component={HomeScreen} options={options}/>
            <Stack.Screen name="Movie Screen" component={MovieScreen} options={{headerShown: true}}/>
            <Stack.Screen name="Favorites" component={FavoritesScreen} options={{headerShown: true}}/>
          </Stack.Navigator>
    )
}

const AppNavigator = () => {
	return (
        <NavigationContainer>
	        <AppStack />
        </NavigationContainer>
	);
};

export default AppNavigator;