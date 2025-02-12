import { Image } from "expo-image";
import { Link } from "expo-router";
import { Pressable, StyleSheet, Text } from "react-native";

const PlaceholderImage = require("@/assets/images/background-image.png");

type Props = {
    movie?: {
        title: string;
        year: number;
        rating: number;
    };
};

export default function MovieCard({ movie }: Props) {
  return (
    <Link href="../movie" style={styles.imageContainer} asChild>
      <Pressable>
        <Image source={PlaceholderImage} style={{ width: 200, height: 200 }} />
        <Text style={styles.text}>Go to About screen</Text>
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
