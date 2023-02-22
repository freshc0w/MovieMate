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

		sections.push([id, ids[id]])
	}

	sections.forEach(
		async (section) => await renderSection(section[0], section[1])
	);

	
	async function renderSection(id, media) {
		const section = await drawSection(id, media);

		// Add wrapper divs for layout.
		const introSubInfo = document.createElement('div');
		introSubInfo.classList.add("intro-sub-info");
		introSubInfo.appendChild(section.drawIntro("300"));
		introSubInfo.appendChild(section.drawSubInfos());
		
		const synopsisWatchPvders = document.createElement('div');
		synopsisWatchPvders.classList.add("synopsis-watch-providers");
		synopsisWatchPvders.appendChild(section.drawSummaryHeading());
		synopsisWatchPvders.appendChild(section.drawSummary());
		synopsisWatchPvders.appendChild(section.drawProviders()); 
		
		const recHeading = document.createElement('h2');
		recHeading.classList.add('rec-heading');
		recHeading.textContent = 'RECOMMENDATIONS:'
		
		// section.addToSection(section.drawIntro("300"));
		// section.addToSection(section.drawSubInfos());
		// section.addToSection(section.drawSummary());
		// section.addToSection(section.drawProviders());
		section.addToSection(introSubInfo);
		section.addToSection(synopsisWatchPvders);
		section.addToSection(section.drawReviews());
		section.addToSection(section.drawTrailer());
		section.addToSection(recHeading);
		section.addToSection(section.drawRecs());
		main.appendChild(section.section);
		return renderSection;
	}
}

function clearSections() {
	const main = document.querySelector(".main-container");
	main.innerHTML = "";
}

export { drawSections, clearSections };
