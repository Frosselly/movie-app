import AsyncStorage from "@react-native-async-storage/async-storage";
import { type Movie } from "./mock-data";

export const Storage = {

  storeTime: async function () {
    const time = new Date().getTime();
    await AsyncStorage.setItem('time', time.toString());
  },

  getTimeDiff: async function () {
    const time = await AsyncStorage.getItem('time');
    if (time === null) {
      return 0;
    }
    const timeDiff = new Date().getTime() - parseInt(time);
    return timeDiff;
  },

  storeData: async function (key: string, movies: Movie[]) {
    const json= JSON.stringify(movies);
    await AsyncStorage.setItem(key, json);
    
    // for (const movie of movies) {
    //   const jsonValue = JSON.stringify(movie);
    //   await AsyncStorage.setItem(movie.id.toString(), jsonValue);
    // }
  },

  getData: async function (key: string) {
    const jsonValue = await AsyncStorage.getItem(key);
    return JSON.parse(jsonValue ?? '[]');
  }

}