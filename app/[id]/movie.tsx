import { Link, useLocalSearchParams } from "expo-router";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { Image, ImageSource } from "expo-image";

import ImageViewer from "@/components/ImageViewer";
import Button from "@/components/Button";
import MovieSection from "@/components/MovieSection";

import { fallbackMovie, type Movie } from "@/utils/mock-data";
import { Storage } from "@/utils/storage";
import { useEffect, useState } from "react";
import { Queries } from "@/utils/queries";
import LoadingScreen from "@/components/LoadingScreen";
import { SafeAreaView } from "react-native-safe-area-context";

export default function MovieDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const [movies, setMovies] = useState<Map<string, Movie>>(new Map());
  const [movie, setMovie] = useState<Movie>(fallbackMovie);
  const [inLibrary, setInLibrary] = useState(false);

  useEffect(() => {
    console.log("movie id ", id);
    Storage.getData("all-movies").then((movies) => {
      const movie = movies.get(id);
      if (!movie) throw new Error("Movie not found");
      setMovie(movie);

      console.log(movie);

      getMovieGenres(movie.id);
      checkIfInLibrary(movie.id);
    });
  }, [id]);

  const checkIfInLibrary = async (movieId: number) => {
    const sessionId = await Storage.getAuthKey();
    if (sessionId) {
      const isInWatchlist = await Queries.checkWatchlist(sessionId, movieId);
      setInLibrary(isInWatchlist);
      console.log("isInWatchlist ", isInWatchlist);
    }
  };

  const getMovieGenres = async (id: number) => {
    const genres = await Queries.getMovieGenres(id);
    if (!genres || !genres.length) return;

    const genreIds = genres.map((genre: { id: number }) => genre.id);
    const moviesByGenres = await Queries.getMoviesByGenres(genreIds);

    if (!moviesByGenres || !moviesByGenres.length) return;
    const mapMoviesByGenres = new Map(moviesByGenres.map((movie) => [`${movie.id}`, movie]));

    setMovies(mapMoviesByGenres);

    const allMovies = await Storage.getData("all-movies");

    Storage.storeData("all-movies", [...Array.from<Movie>(allMovies.values()), ...moviesByGenres]);

    return genres;
  };

  const addToLibrary = async () => {
    const sessionId = await Storage.getAuthKey();
    if (sessionId) {
      const req = await Queries.addToLibrary(sessionId, movie.id);
      checkIfInLibrary(movie.id);
      console.log("addToLibrary request ", req);
    }
  };

  const removeFromLibrary = async () => {
    const sessionId = await Storage.getAuthKey();
    if (sessionId) {
      const req = await Queries.removeFromLibrary(sessionId, movie.id);
      checkIfInLibrary(movie.id);
      console.log("removeFromLibrary request ", req);
    }
  };

  //! Not working correctlly
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
        const updatedMoviesMap = new Map(prevMovies); // Copy existing movies// Get existing category movies
        queryMovies.forEach(movie => {
          updatedMoviesMap.set(movie.id.toString(), movie); // Add new movies to category
        }); // Update specific category
        return updatedMoviesMap;
      });
  
      console.log(`nextPage setMovies called for ${key} page ${page}`);
    }
  };

  if (!movie) {
    return (
      <View style={styles.container}>
        <LoadingScreen />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
    <ScrollView
      style={{ backgroundColor: "#25292e" }}
    >
      <View style={styles.content}>
        <View style={styles.imageContainer}>
          <ImageViewer
            imgSource={movie?.imgSource ?? fallbackMovie.imgSource}
          />
        </View>
        <View>
          <Text style={styles.title}>{movie.title}</Text>
          <Text style={styles.description}>{movie.description}</Text>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            href={`./player?id=${id}`}
            theme="primary"
            label="Watch trailer"
          />
          {inLibrary ? (
            <Button
              href={`./movie`}
              label="Remove from library"
              onPress={removeFromLibrary}
            />
          ) : (
            <Button
              href={`./movie`}
              label="Add to library"
              onPress={addToLibrary}
            />
          )}
        </View>
      </View>
      {movies.size > 0 && (
        <View style={styles.movieContainer}>
          <MovieSection
            title="Similar movies"
            movies={movies}
            addPage={(page) => nextPage("popular", page)}
          />
        </View>
      )}
    </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#25292e",
    // alignItems: "center",
    gap: 20,
    paddingLeft: 20,
    paddingVertical: 20,
  },
  content: {
    marginRight: 20,
    gap: 25,
  },
  imageContainer: {},
  buttonContainer: {
    alignItems: "center",
    gap: 10,
    marginBottom: 20,
  },
  title: {
    color: "#fff",
    fontSize: 20,
    marginBottom: 10,
  },
  description: {
    height: 100,
    color: "#fff",
  },

  movieContainer: {
    gap: 12,
  },
});
