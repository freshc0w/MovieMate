import { getQueryResult } from "./js/apiFunctions/search";
import addSubmitSearchFunction from "./js/UI/submitSearch";
import { fetchId } from "./js/apiFunctions/fetchId";
import * as movie from "./js/apiFunctions/fetchMovieInfo";



console.log("Hello World");
fetchId('IRON MAN');

fetchMovieDummy(1726);
// fetchMovieDummy(3097); // fail to fetch because its tv.
// fetchMovieDummy(10138);
// fetchMovieDummy(68721);

async function fetchMovieDummy(id) {
    const movieDetails = await movie.fetchMovieDetails(id);
    const movieReccos = await movie.fetchMovieReccos(id);
    const movieProviders = await movie.fetchMovieProviders(id);
    const movieTrailer = await movie.fetchMovieTrailer(id);
    const movieReviews = await movie.fetchMovieReviews(id);
    console.log(movieDetails);
    console.log(movieReccos);
    console.log(movieProviders);
    console.log(movieTrailer);
    console.log(movieReviews);
}
addSubmitSearchFunction();