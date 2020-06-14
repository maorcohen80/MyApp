import React, {useState, useEffect} from 'react';
import { Image, StyleSheet, View, Text ,Dimensions } from 'react-native';
import {
	Button, 
} from "native-base";
import { Rating } from 'react-native-elements';

let {width} = Dimensions.get("screen");

import {Favorites} from '../Utils/AppGlobalState';
import { ScrollView } from 'react-native-gesture-handler';

const MovieScreen = ({navigation, route}) => {
    let {movie} = route.params;
    let {state} = Favorites;
    let year = movie.release_date.split("-");

    const [added, setAdded] = useState(false);

    useEffect(() => {
        checkIfInList();
    });

    const addToFav = (movie) => {
        let counter = state.counter;
        let favList = [...state.list];
        favList.push(movie);
        Favorites.setState({
            counter: counter + 1,
            list: favList
        });
        setAdded(true)
    }

    const removeFav = () => {
        let counter = state.counter;
        let favList = [...state.list];
        if (counter > 0){
            let newList = favList.filter((item) => {
                return item.id !== movie.id
            });
            Favorites.setState({
                list: newList,
                counter: counter - 1
            });
            setAdded(false);
        }
    }

    const checkIfInList = () => {
        let result = state.list.includes(movie);
        if (result){
            setAdded(true);
        } else {
            setAdded(false);
        }
        return result;
    }

    return (
        <ScrollView style={styles.container}>
            <Image style={styles.poster} source={{uri: `http://image.tmdb.org/t/p/w342${movie.poster_path}`}}/>
            <View style={styles.titleContainer}>
                <View style={styles.wrapper}>
                    <View style={{flex: 0.7}}>
                        <Text style={styles.title}>{movie.title} ({year[0]})</Text>
                    </View>
                    <View style={{flex: 0.4}}>
                        <Button rounded small info
                            onPress={() => navigation.navigate("Favorites")}
                            style={{justifyContent: "center", width: "100%"}}
                        >
                            <Text>Favorites ({state.counter})</Text>
                        </Button>
                    </View>
                </View>
                <View style={{width: "100%",alignItems: "center", flexDirection: "row",}}>
                    <View style={{flex: 0.4 , flexDirection: "row",}}>
                        <Rating 
                            imageSize={20} 
                            readonly 
                            ratingCount={5} 
                            startingValue={movie.vote_average / 2}
                        />
                        <Text style={{marginTop: 2, marginLeft: 5, color: "#b3abab"}}>({movie.vote_count})</Text>
                    </View>
                    <View style={{flex: 0.6, justifyContent: "flex-end", flexDirection: "row", alignItems: "center"}}>
                        {!added ? 
                            <Button rounded small bordered
                                onPress={() => {
                                    addToFav(movie)
                                }} 
                                style={{alignItems: "flex-end", justifyContent: "center", height: 30, padding: 10}}>
                                    <Text>Add to favourite</Text>
                            </Button> :
                            <Button rounded small bordered danger
                                style={{height: 30, justifyContent: "center",padding: 10}} onPress={removeFav}>
                                <Text>Remove from Favorites</Text>
                            </Button>
                        }
                    </View>
                </View>
            </View>
            <View style={{marginBottom: 50}}>
                <Text style={{paddingHorizontal: 12, marginTop: 10}}>{movie.overview}</Text>
            </View>
        </ScrollView>
    )
}

export default MovieScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        backgroundColor: "#fff", 
        paddingTop: 5,
    },
    title: {
        fontSize: 18,
        fontWeight: "700"
    },
    titleContainer: {
        height: 90, 
        width: "100%", 
        backgroundColor: "#ebebeb",
        justifyContent: "space-around",
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        alignItems: "flex-start"
    },
    wrapper: {
        width: "100%", 
        flexDirection: "row", 
        justifyContent: "space-between", 
        alignItems: "center"
    },
    poster: {
        width: width, 
        height: 550,
    }
})
