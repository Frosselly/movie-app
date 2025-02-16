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

export default function MovieDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const [movies, setMovies] = useState<Movie[]>([]);
  const [movie, setMovie] = useState<Movie>(fallbackMovie);

  useEffect(() => {
    Storage.getData("all-movies").then((movies) => {
      const movie = movies.find((movie: Movie) => movie.id === parseInt(id));
      setMovie(movie);

      getMovieGenres(movie.id);
    });
  }, [id]);

  const getMovieGenres = async (id: number) => {
    const genres = await Queries.getMovieGenres(id);
    if (!genres || !genres.length) return;

    const genreIds = genres.map((genre: { id: number }) => genre.id);
    const moviesByGenres = await Queries.getMoviesByGenres(genreIds);

    if (!moviesByGenres || !moviesByGenres.length) return;

    setMovies(moviesByGenres);

    const allMovies = await Storage.getData("all-movies")
    Storage.storeData("all-movies", [...allMovies, ...moviesByGenres]);

    return genres;
  };

  if (!movie) {
    return (
      <View style={styles.container}>
        <LoadingScreen />
      </View>
    );
  }

  return (
    <ScrollView
      style={{ backgroundColor: "#25292e" }}
      contentContainerStyle={styles.container}
    >
      <View style={styles.imageContainer}>
        <ImageViewer imgSource={movie?.imgSource ?? fallbackMovie.imgSource} />
      </View>
      <View>
        <View>
          <Text style={styles.title}>{movie.title}</Text>
          <Text style={styles.description}>{movie.description}</Text>
        </View>
        <View style={styles.footerContainer}>
          <Button
            href={`./player?id=${id}`}
            theme="primary"
            label="Play movie"
          />
          <Button href="./player" label="Add to library" />
        </View>
      </View>
      {movies.length > 0 && (
        <View style={styles.movieContainer}>
          <MovieSection title="Similar movies" movies={movies} />
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#25292e",
    alignItems: "center",
    gap: 20,
  },
  imageContainer: {
    marginTop: 20,
  },
  footerContainer: {
    alignItems: "center",
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
    margin: 10,
  },
});
