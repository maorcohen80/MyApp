import React from 'react';
import {StatusBar, SafeAreaView, Platform, I18nManager} from 'react-native';
import {
	Root, 
	Container, 
} from "native-base";

import AppNavigator from './navigation/AppNavigator';

const AppStatusBar = () => {
	if (Platform.OS === "ios") {
		return (
			<SafeAreaView forceInset={{
				top: "never" 
			}} style={{
				flex: 0,
				backgroundColor: "#fff",
				
			}} >
				<StatusBar backgroundColor="#fff" barStyle="dark-content" />
			</SafeAreaView>
		);
  }
  return (
		<StatusBar barStyle="dark-content"/>
	);
};

const App = () => {
	I18nManager.allowRTL(false);
	console.disableYellowBox = true;

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

