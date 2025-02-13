import AsyncStorage from "@react-native-async-storage/async-storage";
import { Movie } from "./mock-data";

export const Storage =  {

    storeData : async function (movies : Movie[]) {
    try {
      const jsonValue = JSON.stringify(movies);
      await AsyncStorage.setItem('movies', jsonValue);
    } catch (e) {
      // saving error
    }
  },

  getData  : async function () {
    try {
      const jsonValue = await AsyncStorage.getItem('movies');
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      // error reading value
    }
  }

}