import { getQueryResult } from "../apiFunctions/search";

async function applySearchResult() {
	const result = document.getElementById("search").value;
	if (!result) return;
	const data = await getQueryResult(result);
	console.log(data);
	return data;
}

async function collectSearchResult(data) {
	const results = data.results[0];
	const info = {
		title: results.original_title,
		lang: results.original_language,
		release_date: results.releasedate,
		overview: results.overview,
		img_path: results.backdrop_path,
	};
	return info;
}

function formatSearchResult(info, imgSize = "") {
	const paraContainer = document.querySelector(".info");
	for (let detail in info) {
		const para = document.createElement("p");
		para.textContent = `${detail}: ${info[detail]}`;
		paraContainer.appendChild(para); 
	}
	const baseImgUrl = "https://image.tmdb.org/t/p";
	!imgSize
		? (document.querySelector(
				".poster"
		  ).src = `${baseImgUrl}/original/${info.img_path}`)
		: (document.querySelector(
				".poster"
		  ).src = `${baseImgUrl}/w${imgSize}/${info.img_path}`);
}

export { applySearchResult, collectSearchResult, formatSearchResult };
