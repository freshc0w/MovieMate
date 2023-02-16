/*
Collect and Interpret search result.
*/

export default function collectSearchQuery() {
	let input = document.getElementById("input-search").value;
	return input ? interpretToQuery(input) : "";
}

function interpretToQuery(name) {
	return name.split(" ").join("+");
}
