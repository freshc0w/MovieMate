const API_KEY = "720d2150cf09bfa61e28a5042cd7468f";
/*
Fetches the the first page of the movie/show ids and return it in an array.
*/
async function fetchIds(name) {
	const query = interpretToQuery(name);
	try {
		const response = await fetch(
			`https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}&language=en-US&query=${query}&page=1`,
			{ mode: "cors" }
		);
		const data = await response.json();
		let ids = {};
		// let result = data.results;
		let result = data.results.sort((p1, p2) =>
			p1.popularity < p2.popularity ? 1 : p1.popularity > p2.popularity ? -1 : 0
		); // Sort by popularity.

		if (result.length) {
			// if (result.length > 4) {
			// 	for (let i = 0; i < 5; i++) {
			// 		ids[result[i].id] = result[i].media_type;
			// 	}
			// } else {
			// 	for (let i = 0; i < result.length; i++) {
			// 		ids[result[i].id] = result[i].media_type;
			// 	}
			// }
			for (let i = 0; i < result.length; i++) {
				ids[result[i].id] = result[i].media_type;
			}
			console.log(ids);
			return ids;
		} else {
			alert(`No results found for ${name}`);
			return;
		}
	} catch (err) {
		alert(err);
	}
}

function interpretToQuery(name) {
	return name.split(" ").join("+");
}

export { fetchIds };
