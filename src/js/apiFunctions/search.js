const API_KEY = "720d2150cf09bfa61e28a5042cd7468f";

async function getQueryResult(input) {
    const query = interpretQueryResult(input);
	const response = await fetch(
		`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}`,
		{ mode: "cors" }
	);
    const data = await response.json();
    return data;
}

function interpretQueryResult(input) {
    return input.split(" ").join("+");
}

export { getQueryResult };
