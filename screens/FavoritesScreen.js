import React, {useState} from 'react';
import {StyleSheet, View, FlatList, Dimensions, Text } from 'react-native';
import {Favorites} from '../Utils/AppGlobalState';
import MovieItemList from "../components/MovieItemList";

let {height} = Dimensions.get("screen");

const FavoriteScreen = (props) => {

  const {list} = Favorites.state;

  const [movieList] = useState(list);

  const renderItem = ({item, index}) => (
    <MovieItemList 
        item={item} 
        index={index}
        cb={() => props.navigation.navigate("Movie Screen",{movie: item})}
    />
  )

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
          <Text style={styles.userInfoTitle}>
               FAVORITES
          </Text>
        </View>
          <View style={styles.content}>
            <FlatList
                data={movieList}
                keyExtractor={item => (item.id).toString()}
                renderItem={renderItem}
                ListFooterComponent={renderFooter}
            />
        </View>
      </View>
  );
}

export default FavoriteScreen;

FavoriteScreen.navigationOptions = {
  header: null
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
  },
  
});
