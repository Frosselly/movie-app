// storage.ts
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Movie } from "./mock-data";
import { MovieContextType } from "./movieContext";

export class Storage {
  public static context: MovieContextType;

  static async storeTime(): Promise<void> {
    const time = new Date().getTime().toString();
    this.context.setTime(time);
    await AsyncStorage.setItem("time", time);
  }

  static async getTimeDiff(): Promise<number> {
    let time = this.context.time;
    if (time === null) {
      time = await AsyncStorage.getItem("time");
    }
    if (time === null) {
      return 0;
    }

    return new Date().getTime() - parseInt(time);
  }

  static async storeData(
    key: string,
    movies: Movie[],
    saveInCache: boolean = true
  ): Promise<void> {
    console.log("STORE DATA ", key, movies.length);
    const moviesMap = this.context.getMovies(key);
    console.log("before storeData", moviesMap.size);

    movies.forEach((movie) => {
      moviesMap.set(movie.id.toString(), movie);
    });
    this.context.setMovies(key, moviesMap);
    console.log("storeData", moviesMap.size);

    if (!saveInCache) return;

    const json = JSON.stringify(Array.from(moviesMap.entries()));
    await AsyncStorage.setItem(key, json);
  }

  static async getData(key: string): Promise<Map<string, Movie>> {
    console.log("getData called for ", key);
    let movies = this.context.getMovies(key);

    if (movies.size > 0) {
      console.log("getData returning context for ", key, movies.size);
      return movies;
    }

    const jsonValue = await AsyncStorage.getItem(key);
    if (!jsonValue) {
      console.log("getData returning empty map for ", key);
      return new Map<string, Movie>();
    }
    const parsedMovies = new Map<string, Movie>(JSON.parse(jsonValue));
    this.context.setMovies(key, parsedMovies);
    console.log("getData returning parsedMovies for ", key, parsedMovies.size);
    return parsedMovies;
  }

  static async storeAuthKey(key: string): Promise<void> {
    this.context.setAuth(key);
    console.log("session", key);

    const json = JSON.stringify(key);
    await AsyncStorage.setItem("sessionId", json);
  }

  static async getAuthKey(): Promise<string> {
    const key = this.context.authKey;
    console.log("session", key);

    if (key) {
      return "";
    }

    const jsonValue = await AsyncStorage.getItem("sessionId");
    if (!jsonValue) return "";
    const authKey = JSON.parse(jsonValue) as string;
    this.context.setAuth(authKey);
    return authKey;
  }

  static storeNextPage = async (key: string, movies: Movie[]) => {
    console.log("storeNextPage", key, movies.length);

    // Get existing movies from context
    const existingMoviesMap = this.context.getMovies(key);

    // Add new movies to the existing map
    movies.forEach((movie) => {
      existingMoviesMap.set(movie.id.toString(), movie);
    });

    // Update the specific category in context
    this.context.setMovies(key, existingMoviesMap);

    // Get existing all-movies from context
    const allMoviesMap = this.context.getMovies("all-movies");

    // Add new movies to all-movies map
    movies.forEach((movie) => {
      allMoviesMap.set(movie.id.toString(), movie);
    });

    // Update all-movies in context
    this.context.setMovies("all-movies", allMoviesMap);

    console.log(
      "updatedMovies CACHE",
      this.context.data.get(key)?.size,
      "all-movies",
      this.context.data.get("all-movies")?.size
    );

     // Store updated data in AsyncStorage
     await Storage.storeData(key, Array.from(existingMoviesMap.values()), false);
     await Storage.storeData("all-movies", Array.from(allMoviesMap.values()), false);
  };
}