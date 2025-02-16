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
//'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&primary_release_date.gte=2025-02-14&primary_release_date.lte=2025-02-14&sort_by=popularity.desc&with_original_language=en'

type movieDbQueryParams = {
    language?: string;
    page?: number;
    sort_by?: string;
    "primary_release_date.gte"?: string;
    "primary_release_date.lte"?: string;
    region?: string;
}

export const Queries = {

    //Popular movies page 1
    getMovies: async function (params : URLSearchParams): Promise<Movie[]> {
        // const url = 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc';;
        

        const url = `https://api.themoviedb.org/3/discover/movie?${params}`;

        const movies = await fetch(url, options)
        .then(response => response.json())
        .then(async json => {
            const movies = await Promise.all(
                json.results.map((movie: any) => {
                    const imageSource = movie.poster_path === null ? null : { uri: 'https://image.tmdb.org/t/p/w500' + movie.poster_path};
                return {
                    id: movie.id,
                    title: movie.original_title,
                    year: movie.release_date,
                    rating: movie.vote_average,
                    description: movie.overview,
                    imgSource: imageSource,
                    videoSource:  'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
                } as Movie;
            }));
            
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

    getPopularMovies: async function (): Promise<Movie[]> {
        const urlParams = new URLSearchParams({
            'sort_by': 'popularity.desc',
            "language": 'en-US',
            "page": '1',
            'include_adult': 'false',
        });

        return this.getMovies(urlParams);
    },

    getReleasedMovies: async function (): Promise<Movie[]> {
        const utc = new Date().toISOString().slice(0, 10)

        const urlParams = new URLSearchParams({
            'sort_by': 'primary_release_date.desc',
            "language": 'en-US',
            "page": '1',
            'include_adult': 'false',
            'primary_release_date.lte': utc
        });

        return this.getMovies(urlParams);
    },


    getUpcomingMovies: async function(): Promise<Movie[]> {
        const today = new Date()
        today.setDate(today.getDate() + 1)
        const utc = new Date(today).toISOString().slice(0, 10);


        const urlParams = new URLSearchParams({
            'sort_by': 'primary_release_date.asc',
            "language": 'en-US',
            "page": '1',
            'include_adult': 'false',
            'primary_release_date.gte': utc
        });

        return this.getMovies(urlParams);
    },

    

    getMoviebyId: async function (id : number) {
        const url = `https://api.themoviedb.org/3/movie/${id}`;

        const movie = await fetch(url, options)
        .then(response => response.json())
        .then(json => {
            const movie = {
                id: json.id,
                title: json.original_title,
                year: json.release_date,
                rating: json.vote_average,
                description: json.overview,
                imgSource: { uri: 'https://image.tmdb.org/t/p/w500' + json.poster_path },
                videoSource:  'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
            } as Movie;
            
            return movie as Movie;
        })
        .catch(error => {
            console.log(error);
            return undefined;
        });
        
        if (!movie) {
            return undefined;
        }

        let movieWithVideo: Movie = movie;
          
        const videoSource = await this.getVideo(movieWithVideo.id);
        if(!videoSource) {
            movieWithVideo.videoSource = '';
        }
        else{
            movieWithVideo.videoSource = videoSource.key;
        } 

        return movieWithVideo;
        
    },

    getMovieGenres: async function (id : number) {
        const url = `https://api.themoviedb.org/3/movie/${id}`;

        const movie = await fetch(url, options)
        .then(response => response.json())
        .then(json => {
            
            return json;
        })
        .catch(error => {
            console.log(error);
            return undefined;
        });
        return movie?.genres;
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

    getMoviesByGenres: async function (genres : number[]){
        if(!genres || genres.length === 0) {
            return undefined;
        }
        const utc = new Date().toISOString().slice(0, 10)

        const urlParams = new URLSearchParams({
            'sort_by': 'primary_release_date.desc',
            "language": 'en-US',
            "page": '1',
            'include_adult': 'false',
            'primary_release_date.lte': utc,
            'with_genres' : genres.join(',')
        });

        return this.getMovies(urlParams);
    }

}