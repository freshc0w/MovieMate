import { drawSections, clearSections } from "../DOMFunctions/drawSections";

export default async function addSubmitSearchFnc() {
	const searchBtn = document.querySelector(".search-query");
	searchBtn.addEventListener("click", async (e) => {
		e.preventDefault();
		const query = interpretToQuery(
			document.getElementById("input-search").value
		);
		if (!query) {
			alert("Please enter a valid movie/tv show");
			return;
		}

		// Remove title pages elems if any.
		document.getElementById("title-page")
			? document.getElementById("title-page").remove()
			: "";
		
		document.querySelector(".intro-container2")
			? document.querySelector(".intro-container2").remove()
			: "";

		clearSections();
		await drawSections(query);

	});
}

function interpretToQuery(name) {
	return name.split(" ").join("+");
}
