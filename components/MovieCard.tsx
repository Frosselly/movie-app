import { fallbackMovie, type Movie } from "@/utils/mock-data";
import { Image } from "expo-image";
import { Link } from "expo-router";
import { Pressable, StyleSheet, Text } from "react-native";

export default function MovieCard(props: { movie: Movie }) {
  return (
    <Link
      href={`../${props.movie.id}/movie`}
      style={styles.cardContainer}
      asChild
    >
      <Pressable>
        <Image source={props.movie.imgSource ?? fallbackMovie.imgSource} style={styles.imageContainer} />
        <Text style={styles.text}>{props.movie.title}</Text>
      </Pressable>
    </Link>
  );
}
const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    backgroundColor: "#25292e",
    gap: 4,
  },
  imageContainer: {
    width: 150,
    height: 200,
    borderRadius: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 3,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 5,
  },
  text: {
    width: 150,
    color: "#fff",
    maxHeight: 40,
  },
});
