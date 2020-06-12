import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const MovieItemList = ({item, index, cb}) => (
      <TouchableOpacity 
        key={index} 
        onPress={() => cb()} 
        style={styles.movieItem} 
      >
          <Image style={styles.poster} source={{uri: `http://image.tmdb.org/t/p/w154${item.poster_path}`}}/>
          <Text style={{marginLeft: 10}}>{item.original_title}</Text>
          <View style={styles.arrowView}>
            <MaterialIcons name="keyboard-arrow-right" size={24} color="#a7a7a7" />
          </View>
      </TouchableOpacity>
)

export default MovieItemList;

const styles = StyleSheet.create({
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
    poster: {
      width: 60, 
      height: 60, 
      padding: 1
    },
    arrowView: {
      flex: 1, 
      flexDirection: "row",
      justifyContent: "flex-end"
    },
    
  });
  