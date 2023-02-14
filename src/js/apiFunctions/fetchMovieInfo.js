import { fetchId } from "./fetchId";

const API_KEY = "720d2150cf09bfa61e28a5042cd7468f";

async function fetchMovieDetails(movie_id) {
	try {
		const response = await fetch(
			`https://api.themoviedb.org/3/movie/${movie_id}?api_key=${API_KEY}&language=en-US`,
			{ mode: "cors" }
		);
		const data = await response.json();
		console.log(data);

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
		console.log(generalInfo);
	} catch (err) {
		alert(err);
	}
}

export { fetchMovieDetails };
