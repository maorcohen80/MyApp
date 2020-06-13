import React, {useState, useEffect} from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import * as Facebook from 'expo-facebook';
import * as Google from 'expo-google-app-auth';
import {LoginState} from '../Utils/AppGlobalState';
import {MaterialDialog} from "react-native-material-dialog"

const LoginScreen = (props) => {
    const {token, userInfo, android} = LoginState.state;
    const [visibleDialog, setVisibleDialog] = useState(false);

    Facebook.initializeAsync("273905787302320", "MyApp");
    
    const FBlogIn = async () => {
        try {
            await Facebook.setAutoInitEnabledAsync(true);
            const {
                type,
                token,
            } = await Facebook.logInWithReadPermissionsAsync("273905787302320",{
            permissions: ["email", "public_profile"]
            });
            console.log('type :>> ', type);
            if (type === "success") {
            // Get the user's name using Facebook's Graph API
                const response = await fetch(`https://graph.facebook.com/me?access_token=${token}&fields=id,name,email,picture`);
                let data = await response.json();
                if (data) {
                    LoginState.setState({
                        token: token,
                        userInfo: data,
                        android: false
                    });
                    setVisibleDialog(true);
                }
            } 
            else {
                alert(`Facebook Login Cancelled`);
            }
            } 
        catch (error) {
            console.log('error :>> ', error);
            alert(`Facebook Login: ${error.message}`);
        }
    };

    const Googlelogin = async () => {
        try {
            const result = await Google.logInAsync({
                androidClientId: "647189369105-tnohm9m6p69g4ikg2aann3g5qrtsmehg.apps.googleusercontent.com",
                iosClientId: "647189369105-ovsoauks2del844m0avl7v27og5fnskg.apps.googleusercontent.com",
                clientId: "647189369105-tnohm9m6p69g4ikg2aann3g5qrtsmehg.apps.googleusercontent.com", 
                scopes: ['profile', 'email'],
            });
        
            if (result.type === 'success') {
                LoginState.setState({
                    token: result.accessToken,
                    userInfo: result.user,
                    android: true
                });
                setVisibleDialog(true);
                return;
            } else {
                alert(`Google Login Cancelled result: ${result}`);
                return { cancelled: true };
            }
          } catch (e) {
                alert(`Google Login Cancelled Error: ${e}`);
                return { error: true };
          }
    } 

    return (
        <View style={styles.container}>
            <View style={styles.main}>
                <Text style={{
                    fontWeight: '600', 
                    color: '#000', 
                    fontSize: 24, 
                    justifyContent:'center', 
                    marginVertical:10,
                    textAlign: "center",
                }}>
                    Welcome Stranger!
                </Text>
                    <Image style={styles.avatar} source={require('../assets/images/avatar.jpg')} />
                <Text style={[styles.message, {lineHeight: 30}]}>
                    Please log in {`\n`} to continue to the awesonness
                </Text>
            </View>
            <View style={styles.buttonArea}>
                <TouchableOpacity
                    style={styles.fbButton}
                    onPress={FBlogIn}
                >
                    <FontAwesome name="facebook-f" size={20} color="white" />
                    <Text style={{fontSize: 14, color: "#fff", marginLeft: 10}}>Login with facebook</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.googleButton}
                    onPress={Googlelogin}
                >
                    <FontAwesome name="google" size={20} color="white" />
                    <Text style={{fontSize: 14, color: "#fff", marginLeft: 10}}>Login with google</Text>
                </TouchableOpacity>
            </View>
            {
                token ? 
                <MaterialDialog
                    visible={visibleDialog}
                    okLabel={<Text style={{fontSize: 20, color: "pink", fontWeight: "bold"}}>Take Me in</Text>}
                    cancelLabel=""
                    colorAccent={"#000"}
                    onCancel={() => {}}
                    onOk={() => {
                        setVisibleDialog(false);
                        props.navigation.navigate("Home");		
                    }}>
                    <View style={{
                        alignItems: "center"
                    }}>
                        <Text style={[styles.message, {marginBottom: 10, fontWeight: "bold"}]}>Welcome Back!</Text>
                        <Text style={styles.message}>
                            {userInfo.name}
                        </Text>
                        <Image style={styles.image} source={{uri: android ? userInfo.photoUrl : userInfo.picture.data.url}} />
                    </View>
                </MaterialDialog> : null
            }
        </View>
    );
}

export default LoginScreen;

LoginScreen.navigationOptions = {
  header: "Login Screen",
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 30,
  },
  main: {
    flex: 0.7,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20
  },
  buttonArea: {
    flex: 0.3,
    justifyContent: "center",
    flexDirection: "row", 
  },
  avatar: {
    width: 150, 
    height: 150,
    borderRadius: 75,
    marginVertical: 20,
  },
  image:{
    width: 80, 
    height: 80,
    marginTop: 35,
    borderRadius: 40
  },
  message: {
      color: '#000', 
      fontSize: 18, 
      justifyContent:'center',
      textAlign: "center" 
  },
  fbButton: {
    backgroundColor: "#3f5c9a",
    alignItems: "center",
    justifyContent: "center",
    width: "55%",
    height: 50,
    borderColor: "#3f5c9a",
    borderWidth: 1,
    flexDirection: "row",
    borderRadius: 15,
    marginHorizontal: 5
  },
  googleButton: {
    backgroundColor: "#db4921",
    alignItems: "center",
    justifyContent: "center",
    width: "55%",
    height: 50,
    borderColor: "#db4921",
    borderWidth: 1,
    flexDirection: "row",
    borderRadius: 15,
    marginHorizontal: 5
  }
});
