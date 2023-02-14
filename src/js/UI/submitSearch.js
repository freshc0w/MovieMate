import {
	applySearchResult,
	collectSearchResult,
	formatSearchResult,
} from "../DOMFunctions/inputSearch";

export default function addSubmitSearchFunction() {
	const searchBtn = document.querySelector(".search-query");
	searchBtn.addEventListener("click", async (event) => {
		event.preventDefault();
		const movieInfo = await (applySearchResult());
        const selectedMovieInfo = await collectSearchResult(movieInfo);
        formatSearchResult(selectedMovieInfo, "500");
	});
}
