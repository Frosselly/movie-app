import MovieCard from "@/components/MovieCard";
import MovieSection from "@/components/MovieSection";
import { Image } from "expo-image";
import { Link } from "expo-router";
import {
  RefreshControl,
  StyleSheet,
  View,
  ScrollView,
  ActivityIndicator
} from "react-native";

import { type Movie } from "@/utils/mock-data";

import { useCallback, useEffect, useState } from "react";
import { Storage } from "@/utils/storage";
import { Queries } from "@/utils/queries";

import { movies as mockMovies } from "@/utils/mock-data";
import LoadingScreen from "@/components/LoadingScreen";

export default function Index() {
  const [movies, setMovies] = useState<Movie[][]>([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    const timeForRefresh = 1000 * 60 * 60; // 1 hour
    Storage.getTimeDiff().then((timeDiff) => {
      if (timeDiff > timeForRefresh) {
        console.log("Fetching movies...");
        fetchMovies();
      }
      else {
        getSavedMovies();
      }
    });
  }, []);

  const fetchMovies = async () => {
    const [popular, upcoming, released] = await Promise.all([
      Queries.getPopularMovies(),
      Queries.getUpcomingMovies(),
      Queries.getReleasedMovies(),
    ]);
    const fetchedMovies = [popular, upcoming, released];
    setMovies(fetchedMovies);

    Storage.storeTime();
    Storage.storeData("popular", fetchedMovies[0]);
    Storage.storeData("upcoming", fetchedMovies[1]);
    Storage.storeData("released", fetchedMovies[2]);
    Storage.storeData("all-movies", fetchedMovies.flat());
  };

  const getSavedMovies = async () => {
    const [popular, upcoming, released] = await Promise.all([
      Storage.getData("popular"),
      Storage.getData("upcoming"),
      Storage.getData("released"),
    ]);
    setMovies([popular, upcoming, released]);
    
  }

  const onRefresh = useCallback(() => {
    fetchMovies();
  }, []);

  if(!movies || !movies.length) {
      return(
        <View style={styles.container}>
          <LoadingScreen />
        </View>
      )
    }
    
  return (
    <View style={styles.container}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.movieContainer}>
          <MovieSection title="Popular" movies={movies[0]} />
        </View>
        <View style={styles.movieContainer}>
          <MovieSection title="Upcoming" movies={movies[1]} />
        </View>
        <View style={styles.movieContainer}>
          <MovieSection title="Released" movies={movies[2]} />
        </View>
      </ScrollView>
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
