import { Link, useLocalSearchParams } from "expo-router";
import { Text, View, StyleSheet, ScrollView } from "react-native";
import { Image, ImageSource } from "expo-image";

import ImageViewer from "@/components/ImageViewer";
import Button from "@/components/Button";
import MovieSection from "@/components/MovieSection";

import type { Movie } from "@/utils/mock-data";
import { Storage } from "@/utils/storage";
import { useEffect, useState } from "react";

const fallbackMovie: Movie = {
  id: 0,
  title: "Movie Title",
  imgSource: require("@/assets/images/icon.png"),
  description: "Description",
  year: 2021,
  rating: 0,
};

export default function MovieDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const [movies, setMovies] = useState<Movie[]>([]);
  const [movie, setMovie] = useState<Movie>(fallbackMovie);

  useEffect(() => {
    Storage.getData().then((data) => {
      setMovies(data);
      const foundMovie = data.find((movie: Movie) => movie.id === parseInt(id));
      setMovie(foundMovie);
    });
  }, [id]);

  return (
    <ScrollView style={{backgroundColor: "#25292e"}} contentContainerStyle={styles.container}>
      <View style={styles.imageContainer}>
        <ImageViewer imgSource={movie.imgSource} />
      </View>
      <View>
        <View>
          <Text style={styles.title}>{movie.title}</Text>
          <Text style={styles.description}>{movie.description}</Text>
        </View>
        <View style={styles.footerContainer}>
          <Button href="./player" theme="primary" label="Play movie" />
          <Button href="./player" label="Add to library" />
        </View>
      </View>
      {movies.length > 0 && (
        <View style={styles.movieContainer}>
          <MovieSection movies={movies} />
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
