import { ImageSource } from "expo-image";
import { VideoSource } from "expo-video";

export type Movie = {
    id: number;
    title: string;
    year: string;
    rating: number;
    description: string;
    imgSource: ImageSource;
    videoSource: string;
    genres?: number[];
};

export const fallbackMovie: Movie = {
    id: 0,
    title: "Movie Title",
    imgSource: require("@/assets/images/Image-not-found.png"),
    description: "Description",
    year: "2021",
    rating: 0,
    videoSource: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
  };


export const movies: Movie[] = [
    {
        id: 1,
        title: "The Shawshank Redemption",
        year: "1994",
        rating: 9.3,
        description: "Two imprisoned",
        imgSource: {uri : "https://image.tmdb.org/t/p/w500/1E5baAaEse26fej7uHcjOgEE2t2.jpg"},
        videoSource:  'https://www.youtube.com/watch?v=dQw4w9WgXcQ' 
    },
    {
        id: 2,
        title: "The Shawshank 2",
        year: "2000",
        rating: 3.3,
        description: "Two imprisonedTwo imprisonedTwo imprisoned",
        imgSource: {uri : "https://image.tmdb.org/t/p/w500/1E5baAaEse26fej7uHcjOgEE2t2.jpg"},
        videoSource: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' 
    },
    {
        id: 3,
        title: "Shawshank Final",
        year: "2010",
        rating: 1.3,
        description: "Two imprisonedTwo imprisonedTwo imprisoned",
        imgSource: {uri : "https://image.tmdb.org/t/p/w500/1E5baAaEse26fej7uHcjOgEE2t2.jpg"},
        videoSource:  'https://www.youtube.com/watch?v=dQw4w9WgXcQ' 
    }
]