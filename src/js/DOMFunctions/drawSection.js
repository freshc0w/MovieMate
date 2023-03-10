import * as movie from "../apiFunctions/fetchMovieInfo";
import * as tv from "../apiFunctions/fetchTvInfo";
import * as page from "./drawSections";

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
	const details = await getInfo(id, movie.fetchMovieDetails, tv.fetchTvDetails);
	const recs = await getInfo(id, movie.fetchMovieReccos, tv.fetchTvReccos);
	const providers = await getInfo(
		id,
		movie.fetchMovieProviders,
		tv.fetchTvProviders
	);
	const trailer = await getInfo(id, movie.fetchMovieTrailer, tv.fetchTvTrailer);
	const reviews = await getInfo(id, movie.fetchMovieReviews, tv.fetchTvReviews);

	section.classList.add("section-container");
	function drawAll() {
		addToSection(drawIntro());
	}

	function addToSection(part) {
		part ? section.appendChild(part) : "";
	}

	function renderElement(tag, className) {
		const container = document.createElement(tag);
		container.classList.add(className);
		return container;
	}

	async function getInfo(id, movieFnc, tvFnc) {
		return media === "movie" ? await movieFnc(id) : await tvFnc(id);
	}

	// Draw (if any) title, photo, tagline, and summary.
	const drawIntro = (imgSize) => {
		const introContainer = document.createElement("div");
		introContainer.classList.add("intro");

		introContainer.appendChild(createTitle());
		details.tagline ? introContainer.appendChild(writeTagline()) : "";

		const img = renderImg(imgSize);
		img ? introContainer.appendChild(img) : "";

		function createTitle() {
			const title = document.createElement("h1");
			title.textContent = details.mName ? details.mName : details.tName;
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
			poster.setAttribute("loading", "lazy");
			return poster;
		}

		function writeTagline() {
			const tagPara = document.createElement("em");
			tagPara.textContent = `"${details.tagline}"`;
			tagPara.classList.add("tagline");
			return tagPara;
		}
		return introContainer;
	};

	const drawSubInfos = () => {
		const container = document.createElement("div");
		container.classList.add("subinfo-container");

		// Release date for movies and first aired for tv show.
		let date, lastAired;
		if (details.release_date) {
			date = createSubInfo(
				"Release Date:",
				details.release_date.split("-").reverse().join("/")
			);
			lastAired = "";
		} else if (details.first_air_date) {
			date = createSubInfo(
				"First Aired: ",
				details.first_air_date.split("-").reverse().join("/")
			);
			lastAired = createSubInfo(
				"Last Aired: ",
				details.last_air_date.split("-").reverse().join("/")
			);
		} else {
			date = "";
		}
		let runtime = details.runtime ? convertMinToHr(details.runtime) : "";

		const information = [
			date,
			lastAired,
			createSubInfo("Show status:", details.status),
			createSubInfo("Runtime: ", runtime),
			createSubInfo("Genres: ", details.genres.join(", ")),
			createSubInfo("Number of seasons: ", details.number_of_seasons),
			createSubInfo("Est Avg Episode Runtime: ", details.episode_run_time),
			createSubInfo("Country of Origin: ", details.origin_country),

			createSubInfo("Vote Average: ", details.vote_average),
			createSubInfo("Vote Count: ", details.vote_count),
			createSubInfo("Popularity: ", details.popularity),
		];

		information.forEach((info) => (info ? container.appendChild(info) : ""));

		function createSubInfo(category, info) {
			// Ignores tv subinfo to be displayed if it's a movie and
			// viceversa
			if (!info) return;
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

	const drawSummaryHeading = () => {
		const heading = document.createElement("h2");
		heading.textContent = "Synopsis: ";
		return heading;
	};
	const drawSummary = () => {
		const para = document.createElement("p");
		para.textContent = details.summary;
		para.classList.add("summary");
		return para;
	};

	const drawProviders = () => {
		let availProviders; // Boolean that indicates if there are any watch
		// providers for this show.

		// Houses the btn that opens the modal and overlay, and the available providers for 'streaming', 'rent' and 'purchase'.
		const providerContainer = renderElement("div", "provider-container");
		const countryBtn = renderElement("button", "country-btn");
		const houseContainer = renderElement("div", "house-provider-container");
		[countryBtn, houseContainer].forEach((elem) => {
			providerContainer.appendChild(elem);
		});

		// Search for default country "Australia". If none found. Draw the first country's provider.
		if (Object.keys(providers).length) {
			availProviders = true;
			if (Object.keys(providers).includes("Australia")) {
				// Draw Aus flag in btn.
				const flag = renderElement("img", "country-flag");
				flag.setAttribute("crossorigin", "anonymous");
				flag.src = `https://countryflagsapi.com/png/Australia`;
				flag.alt = `Australia flag`;
				flag.classList.add("btn-country-flag");
				drawProvider("Australia");
				countryBtn.textContent = "Australia";
				countryBtn.appendChild(flag);
			} else {
				// Draw first country's flag in btn.
				const firstProvider = Object.keys(providers)[0];
				try {
					const flag = renderElement("img", "country-flag");
					flag.setAttribute("crossorigin", "anonymous");
					flag.src = `https://countryflagsapi.com/png/${firstProvider}`;
					flag.alt = `${firstProvider} flag`;
					flag.classList.add("btn-country-flag");
					countryBtn.appendChild(flag);
				} catch (err) {
					console.log(err);
				}
				drawProvider(firstProvider);
				countryBtn.textContent = `${firstProvider}`;
			}
		} else {
			availProviders = false;
			countryBtn.textContent =
				"No countries offer this tv/movie at the moment.";
			countryBtn.classList.add("lost-providers");
			const lostGif = renderElement("img", "lost-gif");
			lostGif.src = "./img/lost-gif.gif";
			lostGif.alt = "Prover cannot be found picture.";
			houseContainer.style.display = "flex";
			houseContainer.style.justifyContent = "center";
			houseContainer.appendChild(lostGif);
		}
		// render down arrow.
		const downArrow = renderElement("i", "fas");
		downArrow.classList.add("fa-angle-down");
		countryBtn.appendChild(downArrow);

		// availProviders ? renderCountriesModal(countryBtn.textContent) : ""; // temp
		// Add btn event click listener to open modal
		countryBtn.addEventListener("click", (e) => {
			e.preventDefault();
			if (availProviders) {
				renderCountriesModal(countryBtn.textContent);
				highlightCurrCountry(countryBtn.textContent);
				// add country event here
				applyChooseCountryFncs();
			}
		});
		function applyChooseCountryFncs() {
			const countries = document.querySelectorAll(".country-container");
			countries.forEach((country) =>
				country.addEventListener("click", (e) => {
					e.preventDefault();
					if (country.lastChild.textContent) {
						const selectedCountry = country.lastChild.textContent;
						clearProvider();
						drawProvider(selectedCountry);
					}
					document.querySelector(".modal-country-container").remove();
					document.querySelector(".face-mask").style.display = "none";
				})
			);
		}

		return providerContainer;

		function drawProvider(countryName = "Australia") {
			// Change text of btn to countryName
			countryBtn.textContent = countryName;

			// Add arrows and flags into btn after every selection.
			try {
				const flag = renderElement("img", "country-flag");
				flag.setAttribute("crossorigin", "anonymous");
				flag.src = `https://countryflagsapi.com/png/${countryName}`;
				flag.alt = `${countryName} flag`;
				flag.classList.add("btn-country-flag");
				countryBtn.appendChild(flag);
			} catch (err) {
				console.log(err);
			}
			const downArrow = renderElement("i", "fas");
			downArrow.classList.add("fa-angle-down");
			countryBtn.appendChild(downArrow);

			const streamInfo = providers[countryName].stream;
			const buyInfo = providers[countryName].buy;
			const rentInfo = providers[countryName].rent;

			const serviceNames = ["Stream at:", "Purchase at:", "Rent at:"];
			// To assign names for each sevice providers.
			// This increments as providers are listed for each service.
			let idx = 0;

			[streamInfo, buyInfo, rentInfo].forEach((info) => {
				const serviceContainer = renderElement("div", "service-container");
				const serviceName = renderElement("div", "service-name");
				const serviceNameBold = renderElement("h2", "service-name-bold");
				const providerServiceContainer = renderElement(
					"div",
					"provider-service-container"
				);

				info.forEach((provider) => {
					const providerService = renderElement("div", "provider-service");
					// Add img and name of provider.
					const providerImg = renderElement("img", "provider-img");
					const providerName = renderElement("span", "provider-name");

					if (provider.provider_logo_path) {
						providerImg.src = `https://image.tmdb.org/t/p/original/${provider.provider_logo_path}`;
						providerImg.alt = `${provider.provider_name} picture.`;
						providerImg.setAttribute("loading", "lazy");
						providerName.textContent = provider.provider_name;
					}

					[providerImg, providerName].forEach((elem) => {
						providerService.appendChild(elem);
					});
					providerServiceContainer.appendChild(providerService);
				});

				if (info.length) {
					serviceNameBold.textContent = `${serviceNames[idx]}`;
					serviceName.appendChild(serviceNameBold);
				}
				idx++;
				serviceContainer.appendChild(serviceName);
				serviceContainer.appendChild(providerServiceContainer);
				houseContainer.appendChild(serviceContainer);
			});
		}
		function clearProvider() {
			houseContainer.innerHTML = "";
		}
	};

	const drawReviews = () => {
		if (!reviews) return;
		const reviewContainer = renderElement("div", "review-container");
		const title = renderElement("h2", "review-title");
		title.textContent = "Reviews:";
		reviewContainer.appendChild(title);

		reviews.forEach((review) => drawReview(review, reviewContainer));
		return reviewContainer;
	};

	const drawReview = (review, container) => {
		const renderReviewHeading = () => {
			const reviewHeading = renderElement("div", "review-heading");
			// Render author's profile pic if any.
			if (review.pic_path) {
				const authorPic = renderElement("img", "author-pic");
				if (review.pic_path.slice(1, 5) !== "http") {
					authorPic.src = `https://image.tmdb.org/t/p/w300/${review.pic_path}`;
				} else {
					authorPic.src = review.pic_path.slice(1);
				}

				authorPic.alt = `${review.author} profile picture.`;
				reviewHeading.appendChild(authorPic);
			}

			addRevInfo(review.author, reviewHeading, "h3", "review-author");

			addRevInfo(review.rating, reviewHeading, "span", "review-rating");

			return reviewHeading;
		};

		const renderReviewBody = () => {
			const reviewContent = renderElement("p", "review-content");
			reviewContent.textContent = `"${review.content}"`;
			return reviewContent;
		};

		const renderReviewFooter = () => {
			const reviewFooter = renderElement("div", "review-footer");
			const reviewUrl = renderElement("a", "review-link");
			const reviewUpdated = renderElement("span", "review-updated");

			reviewUrl.setAttribute("href", `${review.url}`);
			reviewUrl.setAttribute("target", "_blank");
			reviewUrl.textContent = "Click for review link";

			reviewUpdated.textContent = `Last updated: ${formatRevDate(
				review.last_updated
			)}`;

			reviewFooter.appendChild(reviewUrl);
			reviewFooter.appendChild(reviewUpdated);

			return reviewFooter;
			function formatRevDate(date) {
				date = date.split("-");
				date[2] = date[2].slice(0, 2) + "/";
				return date[2].concat(date.slice(0, 2).reverse().join("/"));
			}
		};

		container.appendChild(renderReviewHeading());
		container.appendChild(renderReviewBody());
		container.appendChild(renderReviewFooter());

		// Helper fnc that collects corresponding info and
		// creates a span/div container if info exists. Otherwise, return;
		function addRevInfo(info, container, tag, className) {
			const infoContainer = renderElement(tag, className);
			if (info) {
				infoContainer.textContent = info;
			}

			// Reviews out of 10
			if (info === review.rating) {
				infoContainer.textContent = review.rating ? `${info}/10` : "Rating not provided..";
			}
			container.appendChild(infoContainer);
		}
	};

	const drawTrailer = () => {
		const trailerContainer = renderElement("div", "trailer-container");
		const trailerHeading = renderElement("div", "trailer-heading");

		if (trailer) {
			renderTrailerHeading().forEach((elem) =>
				trailerHeading.appendChild(elem)
			);
			trailerContainer.appendChild(trailerHeading);
			const videoWrapper = renderElement("div", "video-wrapper");
			videoWrapper.appendChild(addVideo(trailer.key, trailer.site));
			trailerContainer.appendChild(videoWrapper);
		}
		return trailerContainer;

		function renderTrailerHeading() {
			const trailerName = renderElement("h2", "trailer-name");
			const trailerLanguage = renderElement("h3", "trailer-lang");
			trailerName.textContent = `${trailer.tName}`;
			trailerLanguage.textContent = `Language: ${trailer.lang}`;

			return [trailerName, trailerLanguage];
		}

		function addVideo(key, site) {
			const frame = renderElement("iframe", "trailer-video");
			const attributes = {
				loading: "lazy",
				width: "560",
				height: "315",
				src: `https://youtube.com/embed/${key}`,
				title: `${site} video player`,
				frameborder: "0",
				allow:
					"accelerometer; autoplay; clipboard-write; encrypted media; gyroscope; picture-in-picture; web-share",
			};
			for (let attr in attributes) {
				frame.setAttribute(attr, attributes[attr]);
				frame.setAttribute("allowfullscreen", true);
			}
			return frame;
		}
	};
	const drawRecs = () => {
		const recsContainer = renderElement("div", "recs-container");
		if (Object.keys(recs).length === 0) {
			const noneMsg = renderElement("h4", "no-review-msg");
			noneMsg.textContent = "No recommendations found.";
			recsContainer.appendChild(noneMsg);
			recsContainer.style = "display: flex; justify-content: center;"
			return recsContainer;
		}
		for (let rec in recs) {
			recsContainer.appendChild(drawRec(recs[rec]));
		}
		return recsContainer;
	};

	const drawRec = (rec) => {
		const recContainer = renderElement("div", "rec-container");
		const recPoster = renderElement("img", "rec-poster");
		const info = renderElement("div", "rec-info");

		recPoster.src = `https://image.tmdb.org/t/p/w300/${rec.poster_path}`;

		recContainer.appendChild(recPoster);
		renderInfo(rec).forEach((subInfo) => info.appendChild(subInfo));

		const recLink = renderElement("a", "rec-link");
		const mediaType = rec.tName ? "TV Show" : "Movie";
		recLink.textContent = `Search for this ${mediaType} -> `;
		recLink.addEventListener("click", async (e) => {
			e.preventDefault();
			page.clearSections();
			rec.tName
				? await page.drawSections(rec.tName)
				: await page.drawSections(rec.mName);
		});

		info.appendChild(recLink);
		recContainer.appendChild(info);
		return recContainer;

		function renderInfo(subInfo) {
			if (subInfo) {
				// If info exists.
				const recName = renderElement("p", "rec-name");
				const recDate = renderElement("p", "rec-date");
				const voteCount = renderElement("p", "rec-vote-count");
				const voteAvg = renderElement("p", "rec-vote-avg");

				recName.textContent = subInfo.tName
					? `Name: ${subInfo.tName}`
					: `Name: ${subInfo.mName}`;
				recDate.textContent = subInfo.first_air_date
					? `First Air Date: ${subInfo.first_air_date}`
					: `Release Date: ${subInfo.release_date}`;
				voteCount.textContent = `Vote Count: ${subInfo.vote_count}`;
				voteAvg.textContent = `Vote Avg: ${subInfo.vote_average}`;

				return [recName, recDate, voteCount, voteAvg];
			}
		}
	};

	function renderCountriesModal(currCountryName) {
		// Country names
		const providerCountries = Object.keys(providers);
		// Sort by country name and codes into an obj.
		let countries = {};
		let currCountryCode;
		providerCountries.forEach((country) => {
			countries[country] = providers[country].countryCode;

			// Find current country code.
			if (currCountryName === country) {
				currCountryCode = providers[country].countryCode;
			}
		});

		const modalContainer = renderElement("form", "modal-country-container");
		const modalHeader = renderElement("div", "modal-header");

		const modalBody = renderElement("div", "modal-body");
		const modalCurrentCountry = renderElement("div", "modal-current-country");
		const modalInputSearch = renderElement("input", "modal-input-search");
		const modalListCountries = renderElement("ul", "modal-list-countries");

		const modalCloseBtn = renderElement("button", "modal-close-btn");

		const renderHeading = () => {
			// Heading that displays current country selected.
			const heading = document.createElement("h2");
			heading.textContent = "Countries";

			const currCountry = document.createElement("h3");
			const searchLabel = document.createElement("label");

			const searchAttributes = {
				id: "modal-input-search",
				type: "search",
				placeholder: "???? Search for countries...",
				title: "Type in a country name",
				role: "search",
			};

			for (let i in searchAttributes) {
				modalInputSearch.setAttribute(i, searchAttributes[i]);
			}
			modalInputSearch.addEventListener("keyup", filterResults);
			modalInputSearch.addEventListener("submit", (e) => {
				e.preventDefault();
			});

			// Find current country name and code.
			const currCountryFlag = renderCountryFlag(
				currCountryCode,
				currCountryName
			);
			currCountry.textContent = currCountryName;

			modalCurrentCountry.appendChild(currCountryFlag);
			modalCurrentCountry.appendChild(currCountry);

			searchLabel.htmlFor = `${modalInputSearch.id}`;

			[heading, modalCurrentCountry, searchLabel, modalInputSearch].forEach(
				(formElem) => {
					modalHeader.appendChild(formElem);
				}
			);
		};

		const renderBody = () => {
			modalListCountries.id = "countries-list";
			for (let country in countries) {
				let countryCode = countries[country];

				const countryContainer = renderElement("li", "country-container");
				const countryFlag = renderCountryFlag(countryCode, country);
				const countryName = renderElement("a", "country-name");

				countryName.textContent = country;
				countryName.setAttribute("href", "#");

				[countryFlag, countryName].forEach((countryElem) => {
					countryContainer.appendChild(countryElem);
				});

				modalListCountries.appendChild(countryContainer);
			}

			[modalListCountries].forEach((formElem) => {
				modalBody.appendChild(formElem);
			});
		};

		const renderCloseBtn = (closeFnc) => {
			const closeSymb = renderElement("i", "fa");
			closeSymb.classList.add("fa-close");
			modalCloseBtn.appendChild(closeSymb);
			closeFnc();
		};
		const addCloseFnc = () => {
			modalCloseBtn.addEventListener("click", (e) => {
				e.preventDefault();
				const currentForm = document.querySelector(".modal-country-container");
				document.querySelector(".face-mask").style.display = "none";

				setTimeout(setInvisible, 100);
				function setInvisible() {
					currentForm.style.transform = "translateY(-125%)";
				}
				setTimeout(removeModal, 750);
				function removeModal() {
					currentForm.style.opacity = 0;
					currentForm.style.visibility = "hidden";
					currentForm.remove();
				}
				// currentForm.remove();
			});
		};

		// Render sections of the form.
		renderHeading();
		renderBody();
		renderCloseBtn(addCloseFnc);

		[modalHeader, modalBody, modalCloseBtn].forEach((modalElem) =>
			modalContainer.appendChild(modalElem)
		);

		setTimeout(makeVisible, 100);
		function makeVisible() {
			// Set styling to visible for animation fade in effect.
			modalContainer.style.visibility = "visible";
			modalContainer.style.opacity = 1;
			modalContainer.style.transform = "translateY(0%)";
		}

		const bodyDocument = document.querySelector("body");
		bodyDocument.append(modalContainer);
		document.querySelector(".face-mask").style.display = "block";

		function renderCountryFlag(countryCode, countryName) {
			const flag = renderElement("img", "country-flag");
			flag.setAttribute("crossorigin", "anonymous");
			flag.src = `https://countryflagsapi.com/png/${countryCode}`;
			flag.alt = `${countryName} flag`;
			return flag;
		}

		function filterResults() {
			let input, filter, ul, li, a, i, txtValue;
			input = document.getElementById("modal-input-search");
			filter = input.value.toUpperCase();
			ul = document.getElementById("countries-list");
			li = ul.getElementsByTagName("li");

			// Logic that filters the countries based on input.
			for (i = 0; i < li.length; i++) {
				a = li[i].getElementsByTagName("a")[0];
				txtValue = a.textContent || a.innerText;
				if (txtValue.toUpperCase().indexOf(filter) > -1) {
					li[i].style.display = "";
				} else {
					li[i].style.display = "none";
				}
			}
		}
	}
	function highlightCurrCountry(countryName) {
		// Highlight selected current country in the list of countries when
		// modal is opened. Add a tick icon simultaneously

		let ul, li, i, a, txtValue;
		ul = document.getElementById("countries-list");
		li = ul.getElementsByTagName("li");
		for (i = 0; i < li.length; i++) {
			a = li[i].getElementsByTagName("a")[0];
			txtValue = a.textContent || a.innerText;
			if (txtValue === countryName) {
				li[i].style.backgroundColor = "rgba(25, 150, 150, 0.5)";
				li[i].style.transform = "scale(1.025)";
				const tickIcon = renderElement("i", "fa");
				tickIcon.classList.add("fa-check");
				li[i].append(tickIcon);
			}
		}
	}
	return {
		section,
		addToSection,
		drawAll,
		drawIntro,
		drawSubInfos,
		drawSummaryHeading,
		drawSummary,
		drawProviders,
		drawReviews,
		drawTrailer,
		drawRecs,
	};
};

export { drawSection };
