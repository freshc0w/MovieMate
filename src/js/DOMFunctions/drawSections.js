import collectSearchQuery from "./search";
import { fetchIds } from "../apiFunctions/fetchId";
import * as movie from "../apiFunctions/fetchMovieInfo";
import { drawSection } from "./drawSection";

async function drawSections(title) {
	const ids = await fetchIds(title);
	const main = document.querySelector(".main-container");
	let sections = [];

	// Make an arr w/ elems of [id, media]
	for (let id in ids) {
		// Temp make it so that it only accepts movies

		ids[id] === "movie" ? sections.push([id, ids[id]]) : "";
	}

	sections.forEach(
		async (section) => await renderSection(section[0], section[1])
	);

	async function renderSection(id, media) {
		const section = await drawSection(id, media);
		section.addToSection(section.drawIntro("300"));
		section.addToSection(section.drawSubInfos());
		section.addToSection(section.drawSummary());
		section.addToSection(section.drawProviders());
		main.appendChild(section.section);
		return renderSection;
	}
}

function clearSections() {
	const main = document.querySelector(".main-container");
	main.innerHTML = "";
}

export { drawSections, clearSections };
