const API_KEY = "720d2150cf09bfa61e28a5042cd7468f";
/*
Fetches the first 5 movie/show ids and return it in an array.
*/
async function fetchId(name) {
	const query = interpretToQuery(name);
	try {
		const response = await fetch(
			`https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}&language=en-US&query=${query}&page=1`,
			{ mode: "cors" }
		);
		const data = await response.json();
		console.log(data);
		let ids = {};
		let result = data.results;
		if (result.length) {
			if (result.length > 4) {
				for (let i = 0; i < 5; i++) {
					console.log(result[i].id);
					ids[result[i].id] = result[i].media_type;
				}
			} else {
				for (let i = 0; i < result.length; i++) {
					ids[result[i].id] = result[i].media_type;
				}
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

export { fetchId };
