import type { Movie } from "@/utils/mock-data";
import { Image } from "expo-image";
import { Link } from "expo-router";
import { Pressable, StyleSheet, Text } from "react-native";

export default function MovieCard(props: { movie: Movie}) {
  
  return (
    <Link href={`../${props.movie.id}/movie`} style={styles.imageContainer} asChild>
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
    width: 200,
    color: "#fff",
    maxHeight: 40,
  },
});
