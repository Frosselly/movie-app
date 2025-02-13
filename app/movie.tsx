import { Link } from "expo-router";
import { Text, View, StyleSheet, ScrollView } from "react-native";
import { Image, ImageSource } from "expo-image";

import ImageViewer from "@/components/ImageViewer";
import Button from "@/components/Button";
import MovieSection from "@/components/MovieSection";


import { movies, type Movie } from "@/other/mock-data";

export default function MovieDetails(props : {movie: Movie}) {
  console.log(props.movie.imgSource); 
  return (
    <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.imageContainer}>
          <ImageViewer imgSource={props.movie.imgSource} />
        </View>
        <View>
          <View>
            <Text style={styles.title}>Movie Title</Text>
            <Text style={styles.description}>
              DescriptionDescriptionDescriptionDescriptionDescription
              DescriptionDescriptionDescriptionDescriptionDescription
              DescriptionDescriptionDescriptionDescriptionDescription
              DescriptionDescriptionDescriptionDescriptionDescription
            </Text>
          </View>
          <View style={styles.footerContainer}>
            <Button href="./player" theme="primary" label="Play movie" />
            <Button href="./player" label="Add to library" />
          </View>
        </View>
        <View style={styles.movieContainer}>
          <MovieSection movies={movies}/>
        </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#25292e",
    alignItems: "center",
    gap: 20  
  },
  imageContainer: {
    marginTop: 20,
  },
  footerContainer: {
    alignItems: "center",
  },
  title:{
    color: "#fff",
    fontSize: 20,
    marginBottom: 10
  },
  description:{
    height: 100,
    color: "#fff"
  },

  movieContainer: {
    margin: 10,
  },
});
