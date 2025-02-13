import AsyncStorage from "@react-native-async-storage/async-storage";
import {type Movie } from "./mock-data";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";


const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer ' + process.env.EXPO_PUBLIC_MOVIEDB_RAT,
     }
};
//const url = 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc';
//https://www.youtube.com/watch?v=

export const Queries = {

    //Popular movies page 1
    getMovies: async function (): Promise<Movie[]> {
        const url = 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc';;

        const movies = await fetch(url, options)
        .then(response => response.json())
        .then(json => {
            const movies = json.results.map(async (movie: any) => {
                
                return {
                    id: movie.id,
                    title: movie.original_title,
                    year: movie.release_date,
                    rating: movie.vote_average,
                    description: movie.overview,
                    imgSource: { uri: 'https://image.tmdb.org/t/p/w500' + movie.poster_path },
                    videoSource:  'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
                } as Movie;
            });

            
            
            
            return movies as Movie[];
        })
        .catch(error => {
            console.log(error);
            return [];
        });
        
        const resolved = await Promise.all(movies);
        
        const moviesWithVideo = await Promise.all(
            resolved.map(async (movie: Movie) => {
            const videoSource = await this.getVideo(movie.id);
            if(!videoSource) {
                movie.videoSource = '';
                return movie;
            }
            movie.videoSource = videoSource.key;
            return movie;
        }))
        return moviesWithVideo;
       

        
    },

    getMoviebyId: async function (): Promise<Movie> {

    },

    getVideo: async function (id : number) {
        const url = `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`;

        return fetch(url, options)
        .then(response => response.json())
        .then(json => {
            const video = json.results
            .find((videoSource: any) => 
                videoSource.site === "YouTube" && 
                (videoSource.type === "Teaser" || videoSource.type === "Trailer"));

            if(!video) {
                return json.results[0];
            }
            
            return video;
        })
        .catch(error => {
            console.log(error);
            return;
        });
    },

    getMoviesByCategory: async function (): Promise<Movie[]> {

    }

}