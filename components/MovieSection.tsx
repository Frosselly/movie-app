import MovieCard from "@/components/MovieCard";
import {type Movie } from "@/utils/mock-data";
import { useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";


export default function MovieSection(props : {
  movies: Movie[],
  title: string,
  addPage: (page:number) => void
}) {
  const [offset, setOffset] = useState(props.movies.length * 150 * 0.5);
  const [page, setPage] = useState(1);

  return (
      <>
        <Text style={[styles.text, {fontSize:18}]}>{props.title}</Text>
          <FlatList
          scrollEventThrottle={1000}
          onScroll ={ (event) => {
            const scrollOffset = event.nativeEvent.contentOffset.x;
            if(scrollOffset > offset){
              console.log("Reached scroll", offset);
              console.log("movie len", props.movies.length);
              
              setOffset(scrollOffset + offset);
              props.addPage(page + 1);
              setPage(page + 1);
            }
                
          }}
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
