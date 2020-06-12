import { createStackNavigator } from '@react-navigation/stack';

import React from 'react';
import {StatusBar, SafeAreaView, Platform} from 'react-native';
import {
	Root, 
	Container, 
} from "native-base";

import AppNavigator from './navigation/AppNavigator';


const Stack = createStackNavigator();

const AppStatusBar = (props) => {
	if (Platform.OS === "ios") {
		return (
			<SafeAreaView forceInset={{
				top: "never" 
			}} style={{
				flex: 0,
				backgroundColor: "#fff",
				
			}} >
				<StatusBar barStyle="dark-content" />
			</SafeAreaView>
		);
  }
  return (
		<StatusBar barStyle="dark-content"/>
	);
};

const App = () => {
    return (
      <Root>
				<Container style={{
					flex: 1,
					backgroundColor: "#fff"
				}}>
					<AppStatusBar />
					<AppNavigator />
				</Container>
		</Root>		
    )
  }

export default App;

