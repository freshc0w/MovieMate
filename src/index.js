import { getQueryResult } from "./js/apiFunctions/search";
import addSubmitSearchFunction from "./js/UI/submitSearch";
import { fetchId } from "./js/apiFunctions/fetchId";
import { fetchMovieDetails } from "./js/apiFunctions/fetchMovieInfo";



console.log("Hello World");
fetchId('IRON MAN');
fetchMovieDetails(1726);
addSubmitSearchFunction();