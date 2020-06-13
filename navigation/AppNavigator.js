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

const movieOptions = {
      headerShown: true, 
      headerBackTitle: "Back", 
      headerBackTitleStyle: {color: "#000", marginLeft: 5},
}

const favoritesOptions = {
      headerShown: true, 
      headerTitle: null, 
      headerBackTitle: "Back", 
      headerBackTitleStyle: {color: "#000", marginLeft: 5},
}

const AppStack = () => {
	return (
		<Stack.Navigator>
            <Stack.Screen name="Login" component={LoginScreen} options={options}/>
            <Stack.Screen name="Home" component={HomeScreen} options={options}/>
            <Stack.Screen name="Movie Screen" component={MovieScreen} options={movieOptions}/>
            <Stack.Screen name="Favorites" component={FavoritesScreen} options={favoritesOptions}/>
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