import MovieCard from "@/components/MovieCard";
import { Movie } from "@/utils/mock-data";
import { Queries } from "@/utils/queries";
import { Storage } from "@/utils/storage";
import { useCallback, useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, RefreshControl } from "react-native";

const Library = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    getSavedMovies();
  }, []);

  const getSavedMovies = async () => {
    const sessionId = await Storage.getAuthKey();
    console.log("Session ID ", sessionId);
    if (!sessionId) return;
    const movies = await Queries.getSavedMovies(sessionId);
    const allMovies = await Storage.getData("all-movies")
    
    Storage.storeData("all-movies", [...Array.from<Movie>(allMovies.values()), ...movies]);
    setMovies(movies);
  };

  const onRefresh = useCallback(() => {
      getSavedMovies();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
      refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
        numColumns={2}
        data={movies}
        renderItem={({ item: movie }) => {
          return (
            <View style={styles.movieContainer}>
              <MovieCard movie={movie} />
            </View>
          );
        }}
        keyExtractor={(movie) => movie.id.toString()}
      />
    </View>
  );
};

export default Library;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "#25292e",
    
    paddingLeft: 20,
    paddingVertical: 20,
  },
  movieContainer: {
    marginRight: 18,
    marginBottom: 18,
  },
  text: {
    color: "#fff",
    // fontWeight: "bold",
  },
});
