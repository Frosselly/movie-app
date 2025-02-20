import MovieCard from "@/components/MovieCard";
import MovieSection from "@/components/MovieSection";
import { Image } from "expo-image";
import { Link, useLocalSearchParams } from "expo-router";
import {
  RefreshControl,
  StyleSheet,
  View,
  ScrollView,
  ActivityIndicator,
  Text,
} from "react-native";

import { type Movie } from "@/utils/mock-data";

import { useCallback, useEffect, useState } from "react";
import { Storage } from "@/utils/storage";
import { Queries } from "@/utils/queries";

import { movies as mockMovies } from "@/utils/mock-data";
import LoadingScreen from "@/components/LoadingScreen";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const [movies, setMovies] = useState<Movie[][]>([]);
  const [refreshing, setRefreshing] = useState(false);


  const params = useLocalSearchParams();

  const getSessionId = async (reqToken: string) => {
    const sessionReq = await fetch(
      `https://api.themoviedb.org/3/authentication/session/new?api_key=${process.env.EXPO_PUBLIC_MOVIEDB_API_KEY}`,
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          request_token: `${reqToken}`,
        }),
      }
    );
    const sessionId = await sessionReq.json();
    if (sessionId.success) {
      console.log("Session ID ", sessionId.session_id);
      Storage.storeData("sessionId", sessionId.session_id);
    }
  };

  useEffect(() => {
    const timeForRefresh = 1000 * 60 * 60; // 1 hour
    Storage.getTimeDiff().then((timeDiff) => {
      if (timeDiff > timeForRefresh) {
        console.log("Fetching movies...");
        fetchMovies();
      } else {
        getSavedMovies();
      }
    });

    if (params) {
      if (params.denied) {
        console.log("denied access");
      }
      if (params.approved) {
        console.log("approved access");
        getSessionId(params.request_token as string);
      }
    }
  }, []);

  const fetchMovies = async () => {
    const [popular, upcoming, released] = await Promise.all([
      Queries.getPopularMovies(1),
      Queries.getUpcomingMovies(1),
      Queries.getReleasedMovies(1),
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
  };

  const onRefresh = useCallback(() => {
    fetchMovies();
  }, []);

  const nextPagePopular = async (page: number) => {
    console.log("next page ", page);
    if(page > 2) return;
    const populars = await Queries.getPopularMovies(page)
    const merged = [...movies[0], ...populars]
    Storage.storeData("popular", merged);
    setMovies([merged, ...movies.slice(1)]);
    
  };
  const nextPageUpcoming =  async (page: number) => {
    console.log("next page");
  };
  const nextPageReleased = async  (page: number) => {
    console.log("next page");
  };

  if (!movies || !movies.length) {
    return (
      <View style={styles.container}>
        <LoadingScreen />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <Text style={styles.header}>Discover</Text>
        <View style={styles.moviesSection}>
          <View style={styles.movieContainer}>
            <MovieSection title="Popular" movies={movies[0]} addPage={(page) => nextPagePopular(page)}/>
          </View>
          <View style={styles.movieContainer}>
            <MovieSection title="Upcoming" movies={movies[1]} addPage={(page) => nextPageUpcoming(page)}/>
          </View>
          <View style={styles.movieContainer}>
            <MovieSection title="Released" movies={movies[2]} addPage={(page) => nextPageReleased(page)}/>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#25292e",

    paddingLeft: 20,
    paddingVertical: 20,
  },
  moviesSection: {
    gap: 10,
  },
  moviesCarousel: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
  },
  movieContainer: {
    gap: 12,
  },
  header: {
    color: "#fff",
    fontSize: 24,
    textDecorationLine: "underline",
    marginBottom: 32,
  },
});
