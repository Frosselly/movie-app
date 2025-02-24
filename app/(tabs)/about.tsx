import { Text, View, StyleSheet, Pressable} from "react-native";


import Button from "@/components/Button";
import * as Linking from 'expo-linking';
import { SafeAreaView } from "react-native-safe-area-context";
import { Storage } from "@/utils/storage";

export default function HomePage() {

  const clearMovies = async () => {
        Storage.storeData("popular", []);
        Storage.storeData("upcoming", []);
        Storage.storeData("released", []);
        Storage.storeData("all-movies", []);
  }

  const clearLogin = async () => {
    Storage.storeAuthKey('');
}

  return (
    <SafeAreaView style={styles.container}>
        
        <View style={styles.buttons}>
            <Button href='./about' theme="primary" label='Remove local data' onPress={clearMovies}/>
            <Button href='./index' label='Sign out' onPress={clearLogin}/>
            {/* <Button href="./movies" label='Login'/> */}
        </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#25292e",
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
    paddingTop: 120,
    justifyContent: 'center'
  },
  buttons: {
    gap:10,
    marginBottom: 40,
  },
  title: {
    color: "#fff",
    fontSize: 32,
    fontWeight: 'bold',
    
    textAlign: 'center'
  },
});
