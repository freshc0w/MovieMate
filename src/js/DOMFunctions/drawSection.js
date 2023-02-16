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
	const details = await getInfo(id, movie.fetchMovieDetails, "");
	const recs = await getInfo(id, movie.fetchMovieReccos, "");
	const providers = await getInfo(id, movie.fetchMovieProviders, "");
	const trailer = await getInfo(id, movie.fetchMovieTrailer, "");
	const reviews = await getInfo(id, movie.fetchMovieReviews, "");

	function drawAll() {
		addToSection(drawIntro());
	}

	function addToSection(part) {
		section.appendChild(part);
	}

	async function getInfo(id, movieFnc, tvFnc) {
		return media === "movie" ? await movieFnc(id) : "";
	}

	// Draw (if any) title, photo, tagline, and summary.
	const drawIntro = (imgSize) => {
		const introContainer = document.createElement("div");
		introContainer.classList.add("intro");

		introContainer.appendChild(createTitle());
		details.tagline ? introContainer.appendChild(writeTagline()) : "";

		const img = renderImg(imgSize);
		img ? introContainer.appendChild(img) : "";

		introContainer.appendChild(writeSummary());

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
		return introContainer;
	};

	const drawSubInfos = () => {
		const container = document.createElement("div");
		container.classList.add("subinfo-container");

		const information = [
			createSubInfo("Genres:", details.genres.join(", ")),
			createSubInfo("Runtime:", convertMinToHr(details.runtime)),
			createSubInfo("Vote Average:", details.vote_average),
			createSubInfo("Vote Count:", details.vote_count),
			createSubInfo("Popularity:", details.popularity),
		];

		information.forEach((info) => container.appendChild(info));

		function createSubInfo(category, info) {
			const subInfo = document.createElement("div");
			const categoryName = document.createElement("span");
			const categoryInfo = document.createElement("span");

			subInfo.classList.add("sub-info");
			categoryName.classList.add("category-name");
			categoryInfo.classList.add("category-info");

			categoryName.textContent = category;
			categoryInfo.textContent = info;

			[categoryName, categoryInfo].forEach((info) => subInfo.appendChild(info));
			return subInfo;
		}

		function convertMinToHr(mins) {
			const hours = mins / 60;
			const rHours = Math.floor(hours);
			const minutes = (hours - rHours) * 60;
			const rMinutes = Math.round(minutes);
			return `${rHours}h ${rMinutes}min`;
		}

		return container;
	};

	return {
		section,
		addToSection,
		drawAll,
		drawIntro,
		drawSubInfos,
	};
};

export { drawSection };
