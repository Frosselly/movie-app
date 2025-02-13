import MovieCard from "@/components/MovieCard";
import MovieSection from "@/components/MovieSection";
import { Image } from "expo-image";
import { Link } from "expo-router";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";

import { movies } from "@/other/mock-data";

export default function Index() {
  

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