import { Text, View, StyleSheet, Pressable} from "react-native";
import { MovieProvider } from "@/utils/movieContext";

import Button from "@/components/Button";
import * as Linking from 'expo-linking';
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomePage() {

  const login = async () => {
    const request = await fetch(`https://api.themoviedb.org/3/authentication/token/new?api_key=${process.env.EXPO_PUBLIC_MOVIEDB_API_KEY}`)
    const response = await request.json()
    const reqToken = response.request_token
    console.log("reqToken ", response.request_token)
    const url = Linking.createURL(`./(tabs)`);
    console.log("URL ", url)
   
    Linking.openURL(`https://www.themoviedb.org/authenticate/${reqToken}?redirect_to=${url}`)
    // const accessReq = await fetch(`https://api.themoviedb.org/3/authentication/session/new?api_key=${process.env.EXPO_PUBLIC_MOVIEDB_API_KEY}&request_token=${reqToken}`)
    // const accessRes = await accessReq.json()
    // console.log("Access response ", accessRes)

    
  }

  return (
    
    <SafeAreaView style={styles.container}>
        <View>
            <Text style={styles.title}>
                Flexn Presents
            </Text>
        </View>
        <View style={styles.buttons}>
            <Button href='./(tabs)' theme="primary" label='Movies'/>
            <Button href='./index' label='Login' onPress={login}/>
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
    justifyContent: 'space-between'
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
