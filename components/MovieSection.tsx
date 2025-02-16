import MovieCard from "@/components/MovieCard";
import { Movie } from "@/utils/mock-data";
import { FlatList, StyleSheet, Text, View } from "react-native";


export default function MovieSection(props : {
  movies: Movie[],
  title: string
}) {
  return (
      <>
        <Text style={[styles.text, {fontSize:18}]}>{props.title}</Text>
          <FlatList
          horizontal={true}
          data={props.movies}
          renderItem={({item: movie}) => {
              return (
                  <View style={styles.movieContainer}>
                      <MovieCard movie={movie} />
                  </View>
              )
          }}
          keyExtractor={movie => movie.id.toString()}
        />
      </>
        
  );
}

const styles = StyleSheet.create({
  moviesSection: {
    gap: 8,
  },
  movieContainer: {
    marginRight: 18,
  },
  text: {
    color: "#fff",
    // fontWeight: "bold",
  },
});
