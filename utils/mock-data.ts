import { ImageSource } from "expo-image";

export type Movie = {
    id: number;
    title: string;
    year: number;
    rating: number;
    description: string;
    imgSource: ImageSource;
};


export const movies: Movie[] = [
    {
        id: 1,
        title: "The Shawshank Redemption",
        year: 1994,
        rating: 9.3,
        description: "Two imprisoned",
        imgSource: {uri : "https://image.tmdb.org/t/p/w500/1E5baAaEse26fej7uHcjOgEE2t2.jpg"},
    },
    {
        id: 2,
        title: "The Shawshank 2",
        year: 2000,
        rating: 3.3,
        description: "Two imprisonedTwo imprisonedTwo imprisoned",
        imgSource: {uri : "https://image.tmdb.org/t/p/w500/1E5baAaEse26fej7uHcjOgEE2t2.jpg"},
    },
    {
        id: 3,
        title: "Shawshank Final",
        year: 2010,
        rating: 1.3,
        description: "Two imprisonedTwo imprisonedTwo imprisoned",
        imgSource: {uri : "https://image.tmdb.org/t/p/w500/1E5baAaEse26fej7uHcjOgEE2t2.jpg"},
    }
]