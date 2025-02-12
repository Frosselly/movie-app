import MovieCard from "@/components/MovieCard";
import { FlatList, StyleSheet, Text, View } from "react-native";


export default function MovieSection() {
  return (
      <View style={styles.moviesSection}>
        <Text style={[styles.text, {marginLeft:10, fontSize:18}]}>Category Title</Text>
        <FlatList
        horizontal={true}
        data={movies}
        renderItem={({item}) => {
            return (
                <View style={styles.movieContainer}>
                    <MovieCard movie={item} />
                </View>
            )
         }}
        keyExtractor={item => item.title}
      />
      </View>
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

const movies = [
  {
    title: "The Shawshank Redemption",
    year: 1994,
    rating: 9.3,
  },
  {
    title: "The Godfather",
    year: 1972,
    rating: 9.2,
  },
  {
    title: "The Dark Knight",
    year: 2008,
    rating: 9.0,
  },
];
