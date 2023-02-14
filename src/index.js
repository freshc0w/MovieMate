import { getQueryResult } from "./js/apiFunctions/search";
import addSubmitSearchFunction from "./js/UI/submitSearch";
import { fetchId } from "./js/apiFunctions/fetchId";
import * as movie from "./js/apiFunctions/fetchMovieInfo";



console.log("Hello World");
fetchId('IRON MAN');

fetchDummy();

async function fetchDummy() {
    const movieDetails = await movie.fetchMovieDetails(1726);
    console.log(movieDetails);
    const movieReccos = await movie.fetchReccos(1726);
    console.log(movieReccos);
}
addSubmitSearchFunction();