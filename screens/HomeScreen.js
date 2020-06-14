import React, {useState, useEffect} from 'react';
import { Image, StyleSheet, View, FlatList, Dimensions, ActivityIndicator, Text} from 'react-native';
import { Button } from "native-base";

import MovieItemList from "../components/MovieItemList";

let {height} = Dimensions.get("screen");

import {LoginState} from '../Utils/AppGlobalState';

const HomeScreen = (props) => {

  const {userInfo, android} = LoginState.state;

  const [movieList, setMovieList] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [reachedMax, setReachedMax] = useState(false);

  const getMovieList = async() => {
    setLoading(true)
    let nextPage = page;
    let newMovieList = [];

    if (page > 10) {
      setReachedMax(true);
      return;
    }

    try {
      let movieListReq = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=11abecba88f28d135cab1807896da38d&language=en-US&page=${page}`);
      if (movieListReq.status === 200) {
        let data = await movieListReq.json();
        if (data) {
          newMovieList = [...data.results , ...movieList];
          setMovieList(newMovieList);
          setPage(nextPage + 1);
        }
      }
    } catch (error) {
      console.log('error :>> ', error);
    }
    setLoading(false);
  }

  const renderItem = ({item, index}) => (
      <MovieItemList 
        item={item} 
        index={index}
        cb={navigateToMovie}
      />
  )

  const navigateToMovie = (item) => {
    props.navigation.navigate("Movie Screen",{movie: item})
  }

  const renderFooter = () => {
    return (
      <View
        style={{
          paddingBottom: height * 0.4,
        }}
      >
      </View>
    )
  }

  return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Image style={styles.userImage} source={{uri: android ? userInfo.photoUrl : userInfo.picture.data.url}}/>
          <Text style={styles.userInfoTitle}>
                Hi, {userInfo.name}
          </Text>
        </View>
          <View style={styles.content}>
            <Text style={styles.text}>let's check what's most popular in the movies right now!</Text>
            <Button rounded bordered block
              style={{marginTop: 20, marginBottom: 10}} 
              onPress={!reachedMax ? getMovieList : () => {}}
            >
            {!reachedMax ?
              <Text>Press here to load {page > 1 ? "more " : null}movies</Text> :
              <Text>That's enought for today</Text>
            }
            </Button>
            <View style={{marginTop: 20}}>
            {
              loading && !reachedMax ? 
              <ActivityIndicator color="blue" size="large" /> :
              <FlatList
                data={movieList}
                keyExtractor={item => (item.id).toString()}
                renderItem={renderItem}
                ListFooterComponent={renderFooter}
              />
            }
            </View>
        </View>
      </View>
  );
}

export default HomeScreen;

HomeScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    paddingTop: 20
  },
  header: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 0,
  },
  userImage: {
    width: 50, 
    height: 50,
    borderRadius: 25
  },
  userInfoTitle: {
    fontWeight: 'bold', 
    color: '#000', 
    fontSize:30, 
    justifyContent:'center', 
    marginLeft: 10
  },
  content: {
    width: "100%",
    marginTop: 10,
  },
  text: {
    fontSize: 20,
    marginTop: 10,
    textAlign: "center"
  },
  poster: {
    width: 60, 
    height: 60, 
    padding: 1
  },
  movieItem: {
      flex: 1,
      backgroundColor: "#fff",
      height: 65,
      flexDirection: "row",
      borderRadius: 4,
      shadowColor: "#000",
      shadowOffset: {
        width: 0, height: 5 
      },
      shadowOpacity: 0.2,
      shadowRadius: 3,
      elevation: 5,
      alignItems: "center",
      paddingLeft: 2,
      paddingRight: 8,
      marginTop: 2,
      marginHorizontal: 3,
      marginBottom: 5
  },
  arrowView: {
    flex: 1, 
    flexDirection: "row",
    justifyContent: "flex-end"
  } 
});
