import { Text, View, StyleSheet} from "react-native";


import Button from "@/components/Button";
import { Link } from "expo-router";

export default function HomePage() {

  return (
    <View style={styles.contentContainer}>
        <View>
            <Text>
                Flexn Presents
            </Text>
        </View>
        <View style={styles.footerContainer}>
            <Button href={'/(tabs)'} theme="primary" label='Movies'/>
            <Button href="./movies" label='Login'/>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 50,
  },
  video: {
    width: 350,
    height: 275,
  },
  footerContainer: {
    flex: 1/3,
    alignItems: 'center',
  },
});
