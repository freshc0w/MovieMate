import { API_KEY } from "./constant";
/**
 * Fetches the first page of the movie/show ids and returns it as an object with
 * the movie/tv show id and it's media type as key-value pairs.
 * @param {String} 	name	The specific name of the movie/TV show.
 * @return {Object}			The list of ids and their respective media type as
 * 							key-value pairs.
 */
async function fetchIds(name) {
	const query = interpretToQuery(name);
	try {
		const response = await fetch(
			`https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}
			&language=en-US&query=${query}&page=1`,
			{ mode: "cors" }
		);
		const data = await response.json();
		let ids = data.results.reduce((acc, result) => {
			acc[result.id] = result.media_type;
			return acc;
		}, {});

		// Sort movie/show by popularity.
		let result = data.results.sort(
			(p1, p2) => p2.popularity - p1.popularity
		);

		if (result.length) {
			return ids;
		} else {
			alert(
				`No results found for "${name}".\nPlease check your spelling.`
			);
			return;
		}
	} catch (err) {
		throw err;
	}
}

function interpretToQuery(name) {
	return name.split(" ").join("+");
}

export { fetchIds };
