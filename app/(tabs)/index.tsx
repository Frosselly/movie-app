import { useCallback, useEffect, useState } from "react";
import { Storage } from "@/utils/storage";
import { Queries } from "@/utils/queries";
import { type Movie } from "@/utils/mock-data";
import LoadingScreen from "@/components/LoadingScreen";
import { SafeAreaView } from "react-native-safe-area-context";
import { useMovieContext } from "@/utils/movieContext";
import Button from "@/components/Button";
import MovieSection from "@/components/MovieSection";
import {
  RefreshControl,
  StyleSheet,
  View,
  ScrollView,
  Text,
} from "react-native";
import { useLocalSearchParams } from "expo-router";

export default function Index() {
  const [movies, setMovies] = useState<Map<string, Map<string, Movie>>>(
    new Map()
  );
  const [refreshing, setRefreshing] = useState(false);
  Storage.context = useMovieContext();

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
      Storage.storeAuthKey(sessionId.session_id);
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
    console.log("FETCHING movies");
    const [popular, upcoming, released] = await Promise.all([
      Queries.getPopularMovies(1),
      Queries.getUpcomingMovies(1),
      Queries.getReleasedMovies(1),
    ]);
    const fetchedMovies = [popular, upcoming, released];
    const moviesMap = new Map<string, Map<string, Movie>>();
    moviesMap.set(
      "popular",
      new Map(popular.map((movie) => [`${movie.id}`, movie]))
    );
    moviesMap.set(
      "upcoming",
      new Map(upcoming.map((movie) => [`${movie.id}`, movie]))
    );
    moviesMap.set(
      "released",
      new Map(released.map((movie) => [`${movie.id}`, movie]))
    );
    setMovies(moviesMap);

    Storage.storeTime();
    Storage.storeData("popular", fetchedMovies[0]);
    Storage.storeData("upcoming", fetchedMovies[1]);
    Storage.storeData("released", fetchedMovies[2]);
    Storage.storeData("all-movies", fetchedMovies.flat());
    console.log("FETCHING movies Finished");
    console.log("fetched and stored movies: ", await Storage.getData("popular"));
  };

  const getSavedMovies = async () => {
    console.log("GETTING SAVED MOVIES");
    const [popular, upcoming, released] = await Promise.all([
      Storage.getData("popular"),
      Storage.getData("upcoming"),
      Storage.getData("released"),
    ]);
    const moviesMap = new Map<string, Map<string, Movie>>();
    moviesMap.set("popular", new Map(popular));
    moviesMap.set("upcoming", new Map(upcoming));
    moviesMap.set("released", new Map(released));
    setMovies(moviesMap);
    console.log("GETTING SAVED MOVIES FINISHED");
  };

  const onRefresh = useCallback(() => {
    fetchMovies();
  }, []);

  const nextPage = async (key: string, page: number) => {
    console.log(`nextPage called for ${key} page ${page}`);
    let queryMovies: Movie[] = [];
    if (key === "popular") {
      queryMovies = await Queries.getPopularMovies(page);
    } else if (key === "upcoming") {
      queryMovies = await Queries.getUpcomingMovies(page);
    } else if (key === "released") {
      queryMovies = await Queries.getReleasedMovies(page);
    }
  
    if (queryMovies.length > 0) {
      await Storage.storeNextPage(key, queryMovies);
  
      // Update local state after storing
      setMovies((prevMovies) => {
        const updatedMoviesMap = new Map(prevMovies); // Copy existing movies
        const categoryMovies = new Map(updatedMoviesMap.get(key)); // Get existing category movies
        queryMovies.forEach(movie => {
          categoryMovies.set(movie.id.toString(), movie); // Add new movies to category
        });
        updatedMoviesMap.set(key, categoryMovies); // Update specific category
        return updatedMoviesMap;
      });
  
      console.log(`nextPage setMovies called for ${key} page ${page}`);
    }
  };

  if (!movies || !movies.size) {
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
        <Button onPress={onRefresh} label="Refresh" href="./" />
        <Text style={styles.header}>Discover</Text>
        <View style={styles.moviesSection}>
          <View style={styles.movieContainer}>
            <MovieSection
              title="Popular"
              movies={movies.get("popular") || new Map()}
              addPage={(page) => nextPage("popular", page)}
            />
          </View>
          <View style={styles.movieContainer}>
            <MovieSection
              title="Upcoming"
              movies={movies.get("upcoming") || new Map()}
              addPage={(page) => nextPage("upcoming", page)}
            />
          </View>
          <View style={styles.movieContainer}>
            <MovieSection
              title="Released"
              movies={movies.get("released") || new Map()}
              addPage={(page) => nextPage("released", page)}
            />
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