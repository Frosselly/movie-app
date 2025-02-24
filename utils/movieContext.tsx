// movieContext.tsx
import { createContext, useContext, useState } from "react";
import { ReactNode } from "react";

import { Movie } from "./mock-data";

export interface MovieContextType {
  data: Map<string, Map<string, Movie>>;
  setData: (data: Map<string, Map<string, Movie> >) => void;
  getMovies: (key: string) => Map<string, Movie> ;
  setMovies: (key: string, movies: Map<string, Movie> ) => void;
  authKey: string | null;
  setAuth: (key: string) => void;
  time: string | null;
  setTime: (time: string) => void;
}

const MovieContext = createContext<MovieContextType | undefined>(undefined);

export function MovieProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<Map<string, Map<string, Movie>>>(new Map());
  const [time, setTime] = useState<string | null>(null);
  const [authKey, setAuthKey] = useState<string | null>(null);

  const getMovies = (key: string): Map<string, Movie> => {
    console.log("getMovies CALL", data.get(key));
    return data.get(key) || new Map<string, Movie>();
  };

  const setMovies = (key: string, movies: Map<string, Movie> ) => {
    const newData = new Map(data);
    newData.set(key, movies);
    setData(newData);
  };

  const setAuth = (key: string) => {
    setAuthKey(key);
  };



  const value = {
    data,
    setData,
    getMovies,
    setMovies,
    authKey,
    setAuth,
    time,
    setTime,
  };

  return (
    <MovieContext.Provider value={value}>
      {children}
    </MovieContext.Provider>
  );
}

export const useMovieContext = () => {
  const context = useContext(MovieContext);
  if (!context) {
    throw new Error('useMovieContext must be used within a MovieProvider');
  }
  return context;
};

// const Context = {

//   set: function (key: string, movies: Movie[]){
//     const { setData } = useMovieContext();
//     setData((prevData: Map<string, Movie[]>) => {
//       const newData = new Map<string, Movie[]>(prevData);
//       newData.set(key, movies);
//       return newData;
//     });
  
//   },
//   get: function (key: string){
//     const { data } = useMovieContext();
//     return data.get(key) ?? [];
//   },

//   setTime: function (key: string, movies: Movie[]) {
//     const time = new Date().getTime();
//     const { setData } = useMovieContext();
//     setData((prevData: Map<string, Movie[]>) => {
//       const newData = new Map<string, Movie[]>(prevData);
//       newData.set('time', time as any);
//       return newData;
//     });
//   },

//   getTime: function () {
//     const { data } = useMovieContext();
//     const time = data.get('time');
//     if (time === null) {
//       return 0;
//     }
//   },

// }