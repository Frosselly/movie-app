import MovieCard from "@/components/MovieCard";
import { Movie } from "@/utils/mock-data";
import { FlatList, StyleSheet, Text, View } from "react-native";


export default function MovieSection(props : {
  movies: Movie[],
  title: string
}) {
  return (
      <>
        <Text style={[styles.text, {marginLeft:10, fontSize:18}]}>{props.title}</Text>
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
