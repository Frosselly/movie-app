import type { Movie } from "@/other/mock-data";
import { Image } from "expo-image";
import { Link } from "expo-router";
import { Pressable, StyleSheet, Text } from "react-native";


export default function MovieCard(props: { movie: Movie}) {
  
  return (
    <Link href={{
      pathname: "../movie",
      params: { id: props.movie.id },
    }} style={styles.imageContainer} asChild>
      <Pressable>
        <Image source={props.movie.imgSource} style={{ width: 200, height: 200 }} />
        <Text style={styles.text}>{props.movie.title}</Text>
      </Pressable>
    </Link>
  );
}
const styles = StyleSheet.create({
  imageContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    backgroundColor: "#25292e",
    gap: 4,
  },
  text: {
    color: "#fff",
  },
});
