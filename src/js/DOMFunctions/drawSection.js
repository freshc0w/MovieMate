import * as movie from "../apiFunctions/fetchMovieInfo";

/*
Draw an individual section based on user input query.
This section will consts of the overall movie/tv's 
    - Details,
    - The watch providers based on specific countries
    - Available trailers,
    - Other recommendations.
    - Reviews by established authors based from random sources.
*/

const drawSection = async (id, media) => {
	const section = document.createElement("section");
	const details = await getDetails(id);

	function drawAll() {
		addToSection(drawIntro());
	}

	function addToSection(part) {
		section.appendChild(part);
	}

	async function getDetails(id) {
		return media === "movie" ? await movie.fetchMovieDetails(id) : "";
	}

	// Draw (if any) title, photo, tagline, and summary.
	const drawIntro = (imgSize) => {
		const container = document.createElement("div");
		container.classList.add("intro");

		container.appendChild(createTitle());
		details.tagline ? container.appendChild(writeTagline()) : "";

		const img = renderImg(imgSize);
		img ? container.appendChild(img) : "";

		container.appendChild(writeSummary());

		function createTitle() {
			const title = document.createElement("h1");
			title.textContent = details.mName;
			title.classList.add("title");
			return title;
		}

		function renderImg(imgSize = "") {
			const poster = document.createElement("img");
			const baseImgUrl = "https://image.tmdb.org/t/p";
			let img_path;
			poster.classList.add("poster");

			if (details.poster_path) {
				img_path = details.poster_path;
			} else if (details.backdrop_path) {
				img_path = details.backdrop_path;
			} else {
				return;
			}
			!imgSize
				? (poster.src = `${baseImgUrl}/original/${img_path}`)
				: (poster.src = `${baseImgUrl}/w${imgSize}/${img_path}`);
			poster.alt = "Movie picture poster";
			return poster;
		}

		function writeTagline() {
			const tagPara = document.createElement("p");
			tagPara.textContent = details.tagline;
			tagPara.classList.add("tagline");
			return tagPara;
		}

		function writeSummary() {
			const para = document.createElement("p");
			para.textContent = details.summary;
			para.classList.add("summary");
			return para;
		}
		return container;
	};

	return {
		section,
		addToSection,
		drawAll,
		drawIntro,
	};
};

export { drawSection };
