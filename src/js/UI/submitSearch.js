import { drawSections, clearSections } from '../DOMFunctions/drawSections';

export default async function addSubmitSearchFnc() {
	const searchBtn = document.querySelector(".search-query");
	searchBtn.addEventListener("click", async (e) => {
		e.preventDefault();
		const query = interpretToQuery(document.getElementById('input-search').value);
		console.log(query);
		if(!query) {alert('Please enter a movie/tv show'); return;}
		clearSections();
		await drawSections(query);
		
		document.querySelector('.search-query').value = "";
	})
}

function interpretToQuery(name) {
    return name.split(" ").join("+");
}

