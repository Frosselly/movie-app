import MovieCard from "@/components/MovieCard";
import MovieSection from "@/components/MovieSection";
import { Image } from "expo-image";
import { Link } from "expo-router";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";

import {type Movie} from "@/utils/mock-data";

import { useEffect, useState } from "react";
import { Storage } from "@/utils/storage";
import { Queries } from "@/utils/queries";

import { movies as mockMovies } from "@/utils/mock-data";

export default function Index() {
  const [movies, setMovies] = useState<Movie[]>(mockMovies);

  useEffect(() => {
    Queries.getMovies().then((movies) => {
      Storage.storeData(movies);
      setMovies(movies);
    }).catch((error) => {
      console.log("Failed to fetch movies:", error);
    });
  }, [])


  return (
    <View style={styles.container}>
        <FlatList 
                data={movies}
                renderItem={({item}) => {
                    return (
                        <View style={styles.movieContainer}>
                            <MovieSection movies={movies}/>
                        </View>
                    )
                 }}
                keyExtractor={item => item.title}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#25292e",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 40,
  },
  moviesSection: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    gap: 8,
  },
  moviesCarousel: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
  },
  movieContainer: {
    margin: 10,
  },
  text: {
    color: "#fff",
  },
});