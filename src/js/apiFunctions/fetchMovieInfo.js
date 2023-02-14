import { fetchId } from "./fetchId";

const API_KEY = "720d2150cf09bfa61e28a5042cd7468f";

async function fetchMovieDetails(movie_id) {
	try {
		const response = await fetch(
			`https://api.themoviedb.org/3/movie/${movie_id}?api_key=${API_KEY}&language=en-US`,
			{ mode: "cors" }
		);
		const data = await response.json();

		const genres = data.genres.reduce((acc, val) => [...acc, val.name], []);

		const generalInfo = {
			name: data.original_title,
			summary: data.overview,
            tagline: data.tagline,
			popularity: data.popularity,
			vote_average: data.vote_average,
			vote_count: data.vote_count,
            genres: genres,
            video: data.video,
            runtime: data.runtime,
            poster_path: data.poster_path,
            backdrop_path: data.backdrop_path,

		};
		return generalInfo;
	} catch (err) {
		alert(err);
	}
}

/*
Returns an array of recommended movies with their name, id, poster_path and
backdrop_path recorded. 
If no movies are recommended, return null;
*/
async function fetchReccos(movie_id) {
    try {
        const response = await fetch(
            `https://api.themoviedb.org/3/movie/${movie_id}/recommendations?api_key=${API_KEY}&language=en-US&page=1`
        )
        const data = await response.json();

		let recMovies = {};
		if(data.results) {
			let count = 1;
			for(let movie of data.results) {
				recMovies[movie.original_title] = {
					name: movie.original_title,
					id: movie.id,
					poster_path: movie.poster_path,
					backdrop_path: movie.backdrop_path,
				}
				
				if(count === 5) {
					break;
				}
				count++;
			}
		} 
		return recMovies
    } catch(err) {
        alert(err);
    }
}

export { fetchMovieDetails, fetchReccos };
