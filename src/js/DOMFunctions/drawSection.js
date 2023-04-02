import * as movie from "../apiFunctions/fetchMovieInfo";
import * as tv from "../apiFunctions/fetchTvInfo";
import * as page from "./drawSections";

/**
 * Draw an individual section based on user input query.
 * This section will consts of the overall movie/tv's
 * 	- Details,
 * 	- The watch providers based on specific countries
 * 	- Available trailers,
 * 	- Other recommendations.
 * 	- Reviews by established authors based from random sources.
 * @param {Number} id An integer representing the selected movie or TV show
 * @param {String} media The specified media type of the movie / TV show
 * @returns {Object}	 Functions that draws all relevant information in a
 * 						 as a section.
 */
const drawSection = async (id, media) => {
	const section = document.createElement("section");
	const details = await getInfo(
		id,
		movie.fetchMovieDetails,
		tv.fetchTvDetails
	);
	const recs = await getInfo(id, movie.fetchMovieReccos, tv.fetchTvReccos);
	const providers = await getInfo(
		id,
		movie.fetchMovieProviders,
		tv.fetchTvProviders
	);
	const trailer = await getInfo(
		id,
		movie.fetchMovieTrailer,
		tv.fetchTvTrailer
	);
	const reviews = await getInfo(
		id,
		movie.fetchMovieReviews,
		tv.fetchTvReviews
	);

	section.classList.add("section-container");
	function drawAll() {
		addToSection(drawIntro());
	}

	// If certain info exists, i.e. reviews, append, draw the relevant
	// information and add it to the section.
	function addToSection(info) {
		info && section.appendChild(info);
	}

	// Helper function to render an element and add a corresponding class name.
	function renderElement(tag, className) {
		const container = document.createElement(tag);
		container.classList.add(className);
		return container;
	}

	/**
	 * Fetch information using movie or TV show function based on media type.
	 * @param {Number} id Movie/TV show id
	 * @param {Function} movieFnc Fetch movie function if applicable
	 * @param {Function} tvFnc Fetch TV function if applicable.
	 * @returns {void}
	 */
	async function getInfo(id, movieFnc, tvFnc) {
		return media === "movie" ? await movieFnc(id) : await tvFnc(id);
	}

	/**
	 * Draw (if any) title, photo, tagline and summary.
	 * @param {Number} imgSize  An integer displaying the desired poster size
	 * 							width.
	 * @returns {Node}			Node container consisting of elements with most
	 * 							relevant information of specified movie/TV show.
	 */
	const drawIntro = (imgSize) => {
		const introContainer = document.createElement("div");
		introContainer.classList.add("intro");

		introContainer.appendChild(createTitle());
		introContainer.appendChild(writeTagline());

		const img = renderImg(imgSize);
		img && introContainer.appendChild(img);

		/**
		 * Displays the title of the movie/TV show.
		 * @returns {Node}	Title of the movie/TV show
		 */
		function createTitle() {
			const title = renderElement("h1", "title");
			title.textContent = details.mName ? details.mName : details.tName;
			return title;
		}

		/**
		 * Renders poster image based on img size.
		 * @param {Number} imgSize Desired width of the poster image.
		 * @returns {Node}         Element consisting the image poster.
		 */
		function renderImg(imgSize = "") {
			const poster = document.createElement("img");
			const baseImgUrl = "https://image.tmdb.org/t/p";

			// Draw poster by default. If none exists, use backdrop photo.
			const imgPath = details.poster_path || details.backdrop_path;

			if (!imgPath) {
				return null;
			}

			poster.classList.add("poster");

			// If img size is specified, alter image to the respective size.
			// Otherwise, use original size.
			poster.src = imgSize
				? `${baseImgUrl}/w${imgSize}/${imgPath}`
				: `${baseImgUrl}/original/${imgPath}`;
			poster.alt = "Movie picture poster";
			poster.setAttribute("loading", "lazy");

			return poster;
		}

		function writeTagline() {
			const tagPara = renderElement("em", "tagline");
			tagPara.textContent = `"${details.tagline}"`;
			return tagPara;
		}
		return introContainer;
	};

	/**
	 * Draws all relevant subinfo (when available):
	 * 	- Release date
	 * 	- First aired
	 * 	- Last aired
	 * 	- Show status
	 * 	- Runtime
	 * 	- Genres
	 * 	- Number of seasons
	 * 	- Est Avg Episode runtime
	 * 	- Country of origin
	 * 	- Vote average
	 * 	- Vote count
	 * 	- Popularity
	 * @returns {Node}
	 */
	const drawSubInfos = () => {
		const container = renderElement("div", "subinfo-container");

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
			createSubInfo(
				"Est Avg Episode Runtime: ",
				details.episode_run_time
			),
			createSubInfo("Country of Origin: ", details.origin_country),
			createSubInfo("Vote Average: ", details.vote_average),
			createSubInfo("Vote Count: ", details.vote_count),
			createSubInfo("Popularity: ", details.popularity),
		];

		information.forEach((info) =>
			info ? container.appendChild(info) : ""
		);

		/**
		 * Create a subinfo container based on the category and fetched data.
		 * @param {String} category String representation of info category
		 * @param {String} info 	Fetched info based on category
		 * @returns {Node}
		 */
		function createSubInfo(category, info) {
			// Ignores tv subinfo to be displayed if it's a movie and
			// viceversa
			if (!info) return null;

			const subInfo = renderElement("div", "sub-info");
			const categoryName = renderElement("span", "category-name");
			const categoryInfo = renderElement("span", "category-info");

			categoryName.textContent = category;
			categoryInfo.textContent = info;

			[categoryName, categoryInfo].forEach((info) =>
				subInfo.appendChild(info)
			);
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

	/**
	 * Draw summary heading (Synopsis)
	 * @returns {Void}
	 */
	const drawSummaryHeading = () => {
		const heading = document.createElement("h2");
		heading.textContent = "Synopsis: ";
		return heading;
	};
	/**
	 * Draw summary of specified movie / TV show.
	 * @returns {Void}
	 */
	const drawSummary = () => {
		const para = renderElement("p", "summary");
		para.textContent = details.summary;
		return para;
	};

	/**
	 * Draw, if any, avaiable providers (streaming, purchase, rent).
	 * @returns {Void}
	 */
	const drawProviders = () => {
		// Boolean that indicates if there are any watch providers for
		// this show.
		let availProviders;

		// Houses the btn that opens the modal and overlay, and the available
		// providers for 'streaming', 'rent' and 'purchase'.
		const providerContainer = renderElement("div", "provider-container");
		const countryBtn = renderElement("button", "country-btn");
		const houseContainer = renderElement("div", "house-provider-container");
		[countryBtn, houseContainer].forEach((elem) => {
			providerContainer.appendChild(elem);
		});

		// Search for default country "Australia". If none found. Draw the
		// first country's provider.
		if (Object.keys(providers).length) {
			availProviders = true;
			if (Object.keys(providers).includes("Australia")) {
				// Draw Aus flag in btn.
				const flag = renderElement("img", "country-flag");
				// flag.setAttribute("crossorigin", "anonymous");
				flag.src = `https://flagsapi.com/AU/shiny/64.png`;
				flag.alt = `Australia flag`;
				flag.classList.add("btn-country-flag");
				drawProvider("Australia");
				countryBtn.textContent = "Australia";
				countryBtn.appendChild(flag);
			} else {
				// Draw first country's flag in btn.
				const firstProvider = Object.keys(providers)[0];
				console.log(firstProvider);
				const flag = renderElement("img", "country-flag");
				flag.src = `https://flagsapi.com/${providers[firstProvider].countryCode}/shiny/64.png`;
				flag.alt = `${firstProvider} flag`;
				flag.classList.add("btn-country-flag");
				drawProvider(firstProvider);
				countryBtn.textContent = `${firstProvider}`;
				countryBtn.appendChild(flag);
			}
		} else {
			availProviders = false;
			countryBtn.textContent =
				"No countries offer this tv/movie at the moment.";
			countryBtn.classList.add("lost-providers");

			// Insert lost gif and message if no providers are available.
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

		/**
		 * Function that applys a click event listener on every country in
		 * the modal list. Changes the available providers based on the selected
		 * country and hides modal.
		 * @returns {Void}
		 */
		function applyChooseCountryFncs() {
			const countries = document.querySelectorAll(".country-container");

			function handleClick(e) {
				e.preventDefault();
				const selectedCountry = this.lastChild.textContent.trim();

				if (selectedCountry) {
					clearProvider();
					drawProvider(selectedCountry);
				}

				// Remove modal and mask overlay.
				document.querySelector(".modal-country-container").remove();
				document.querySelector(".face-mask").style.display = "none";
			}

			// Apply handleClick to all country-selectors.
			countries.forEach((country) => {
				country.addEventListener("click", handleClick);
			});
		}

		return providerContainer;

		/**
		 * Draws the availble providers and update the text content of the
		 * button-selector based on the selected country.
		 * @param {String} countryName Current country in which the available
		 * 							   providers are displayed.
		 */
		function drawProvider(countryName = "Australia") {
			// Change text of btn to countryName
			countryBtn.textContent = countryName;

			// Add arrows and flags into btn after every selection.
			try {
				const flag = renderElement("img", "country-flag");
				// flag.setAttribute("crossorigin", "anonymous");
				flag.src = `https://flagsapi.com/${providers[countryName].countryCode}/shiny/64.png`;
				flag.alt = `${countryName} flag`;
				flag.classList.add("btn-country-flag");
				countryBtn.appendChild(flag);
			} catch (error) {
				console.error("Failed to retrieve flag", error.message);
			}
			const downArrow = renderElement("i", "fas");
			downArrow.classList.add("fa-angle-down");
			countryBtn.appendChild(downArrow);

			const streamInfo = providers[countryName].stream;
			const buyInfo = providers[countryName].buy;
			const rentInfo = providers[countryName].rent;

			const serviceNames = ["Stream at:", "Purchase at:", "Rent at:"];

			// idx assign position/names for each sevice providers.
			// This increments as providers are listed for each service.
			let idx = 0;

			[streamInfo, buyInfo, rentInfo].forEach((info) => {
				const serviceContainer = renderElement(
					"div",
					"service-container"
				);
				const serviceName = renderElement("div", "service-name");
				const serviceNameBold = renderElement(
					"h2",
					"service-name-bold"
				);
				const providerServiceContainer = renderElement(
					"div",
					"provider-service-container"
				);

				info.forEach((provider) => {
					const providerService = renderElement(
						"div",
						"provider-service"
					);
					// Add img and name of provider.
					const providerImg = renderElement("img", "provider-img");
					const providerName = renderElement("span", "provider-name");

					if (provider.provider_logo_path) {
						providerImg.src = `https://image.tmdb.org/t/p/original/
						${provider.provider_logo_path}`;
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
				idx++; // Increment idx to go to the next type of service.
				serviceContainer.appendChild(serviceName);
				serviceContainer.appendChild(providerServiceContainer);
				houseContainer.appendChild(serviceContainer);
			});
		}
		function clearProvider() {
			while (houseContainer.firstChild) {
				houseContainer.removeChild(houseContainer.lastChild);
			}
		}
	};

	/**
	 * Draws a maximum of 5 reviews based on the searched movie / TV SHOW.
	 * @returns {Node}
	 */
	const drawReviews = () => {
		if (!reviews) return;
		const reviewContainer = renderElement("div", "review-container");
		const title = renderElement("h2", "review-title");
		title.textContent = "Reviews:";
		reviewContainer.appendChild(title);

		reviews.forEach((review) => drawReview(review, reviewContainer));
		return reviewContainer;
	};

	/**
	 * Draws a singular review and displays all the relevant information:
	 * 	- Author's name
	 * 	- Author's profile pic
	 *  - Rating of the movie / TV show.
	 * @param {Object} review Review information
	 * @param {Node} reviewContainer reviewContainer that houses all the
	 * 								 reviews.
	 */
	const drawReview = (review, reviewContainer) => {
		// Heading includes author name, rating and their respective profile
		// pic.
		const renderReviewHeading = () => {
			const reviewHeading = renderElement("div", "review-heading");

			// Render author's profile pic if any.
			try {
				if (review.pic_path) {
					const authorPic = renderElement("img", "author-pic");
					authorPic.src =
						// Api gives two different types of url link. Need to
						// differentiate between them to retrieve src url.
						review.pic_path.slice(1, 5) !== "http"
							? `https://image.tmdb.org/t/p/w300/${review.pic_path}`
							: review.pic_path.slice(1);
					authorPic.alt = `${review.author} profile picture.`;
					reviewHeading.appendChild(authorPic);
				}
			} catch (error) {
				console.error(
					"Cannot fetch author profile pictures:",
					error.message
				);
			}

			addRevInfo(review.author, reviewHeading, "h3", "review-author");
			addRevInfo(review.rating, reviewHeading, "span", "review-rating");

			return reviewHeading;
		};

		// Draw review content.
		const renderReviewBody = () => {
			const reviewContent = renderElement("p", "review-content");
			reviewContent.textContent = `"${review.content}"`;
			return reviewContent;
		};

		// Draw review footer containing link url and last date updated.
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
			/**
			 *
			 * @param {String} date date formatted dd-mm-yyyy
			 * @returns {String} 	date formatted dd/mm/yyyy
			 */
			function formatRevDate(date) {
				const [year, month, day] = date.split("-");
				return `${day.slice(0, 2)}/${month}/${year}`;
			}
		};

		// Add to review housing container
		reviewContainer.appendChild(renderReviewHeading());
		reviewContainer.appendChild(renderReviewBody());
		reviewContainer.appendChild(renderReviewFooter());

		// Helper fnc that collects corresponding info and
		// creates a span/div container if info exists. Otherwise, return;
		function addRevInfo(info, container, tag, className) {
			const infoContainer = renderElement(tag, className);
			if (info) {
				infoContainer.textContent = info;
			}

			// Render review rating out of 10. If none provided, render message.
			if (info === review.rating) {
				infoContainer.textContent = review.rating
					? `${info}/10`
					: "Rating not provided..";
			}
			container.appendChild(infoContainer);
		}
	};

	/**
	 * Add trailer video to section
	 * @returns {Node}	Container that houses the trailer with its respective
	 * 					heading
	 */
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

		/**
		 * Render trailer heading and display language of the video.
		 * @returns {Array}	Array containing Node elems of trailer's name
		 * 					and language.
		 */
		function renderTrailerHeading() {
			const trailerName = renderElement("h2", "trailer-name");
			const trailerLanguage = renderElement("h3", "trailer-lang");
			trailerName.textContent = `${trailer.tName}`;
			trailerLanguage.textContent = `Language: ${trailer.lang}`;

			return [trailerName, trailerLanguage];
		}

		/**
		 * Returns the trailer video to add to the  the trailer container Node.
		 * Also adds all the relevant attributes to the node elem.
		 * @param {Number} key 	Key that uniquely identifies the trailer video
		 * @param {String} site Name of web player
		 * @returns {Node} 		Element that frames the playable video
		 */
		function addVideo(key, site) {
			const frame = renderElement("iframe", "trailer-video");
			const attributes = {
				loading: "lazy",
				width: "560",
				height: "315",
				src: `https://youtube.com/embed/${key}`,
				title: `${site} video player`,
				frameborder: "0",
				allow: "accelerometer; autoplay; clipboard-write; encrypted media; gyroscope; picture-in-picture; web-share",
			};
			for (let attr in attributes) {
				frame.setAttribute(attr, attributes[attr]);
				frame.setAttribute("allowfullscreen", true);
			}
			return frame;
		}
	};

	/**
	 * Returns a node element that draws the recommendations.
	 * @returns {Node}	Serves as a housing container for all the
	 * 					recommendations.
	 */
	const drawRecs = () => {
		const recsContainer = renderElement("div", "recs-container");
		if (Object.keys(recs).length === 0) {
			const noneMsg = renderElement("h4", "no-review-msg");
			noneMsg.textContent = "No recommendations found.";
			recsContainer.appendChild(noneMsg);
			recsContainer.style = "display: flex; justify-content: center;";
			return recsContainer;
		}
		for (let rec in recs) {
			recsContainer.appendChild(drawRec(recs[rec]));
		}
		return recsContainer;
	};

	/**
	 * Returns a node element that contains all the relevant information of a
	 * recommendation based on the specific movie/TV show.
	 * @param {Object} rec  Specific recommendation's relevant information.
	 * @returns {Node} 		A node element that houses a singular recco.
	 * 						Contains all the relevant information and posters.
	 */
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

		/**
		 * Returns an Array with nodes with  relevant information on the
		 * specified recommendation.
		 * @param {Object} subInfo  All the relevant information needed for a
		 * 							recommendation.
		 * @returns {Array}			All <p> nodes containing the information.
		 */
		function renderInfo(subInfo) {
			if (subInfo) {
				// If info exists.
				const recName = renderElement("p", "rec-name");
				const recDate = renderElement("p", "rec-date");
				const voteCount = renderElement("p", "rec-vote-count");
				const voteAvg = renderElement("p", "rec-vote-avg");

				// Sort text content of nodes based on the media type.
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

	/**
	 * Draw countries modal that appears when country-selector btn is clicked
	 * on. The form structure is formatted by two parts:
	 *  - Heading
	 * 	- Body.
	 * The event listener for the country-selector btn is also attached.
	 * @param {String} currCountryName  Current name of the country
	 * 									e.g. "Australia"
	 */
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

		// Initialise container nodes
		const modalContainer = renderElement("form", "modal-country-container");
		const modalHeader = renderElement("div", "modal-header");
		const modalBody = renderElement("div", "modal-body");
		const modalCurrentCountry = renderElement(
			"div",
			"modal-current-country"
		);
		const modalInputSearch = renderElement("input", "modal-input-search");
		const modalListCountries = renderElement("ul", "modal-list-countries");
		const modalCloseBtn = renderElement("button", "modal-close-btn");

		/**
		 * Draws modal heading and add it to the modal form container.
		 * Should include:
		 * 		- Search bar that filters different country results.
		 */
		const renderHeading = () => {
			// Heading that displays current country selected.
			const heading = document.createElement("h2");
			heading.textContent = "Countries";

			const currCountry = document.createElement("h3");
			const searchLabel = document.createElement("label");

			// Add respective attributes to search bar node.
			const searchAttributes = {
				id: "modal-input-search",
				type: "search",
				placeholder: "🔍 Search for countries...",
				title: "Type in a country name",
				role: "search",
			};

			for (let i in searchAttributes) {
				modalInputSearch.setAttribute(i, searchAttributes[i]);
			}

			// Filter countries based on value after each keyup event using
			// the filterResults fnc.
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

			// Have the current country with its flag as a title for the modal.
			modalCurrentCountry.appendChild(currCountryFlag);
			modalCurrentCountry.appendChild(currCountry);

			searchLabel.htmlFor = `${modalInputSearch.id}`;

			[
				heading,
				modalCurrentCountry,
				searchLabel,
				modalInputSearch,
			].forEach((formElem) => {
				modalHeader.appendChild(formElem);
			});
		};

		/**
		 * For every country where a watch provider exists for the movie/TV
		 * show, render the name and country flag as an option in a list format.
		 */
		const renderBody = () => {
			modalListCountries.id = "countries-list";

			Object.entries(countries).forEach(([country, countryCode]) => {
				const countryContainer = renderElement(
					"li",
					"country-container"
				);
				const countryFlag = renderCountryFlag(countryCode, country);
				const countryName = renderElement("a", "country-name");

				countryName.textContent = country;
				countryName.href = "#";

				[countryFlag, countryName].forEach((countryElem) => {
					countryContainer.appendChild(countryElem);
				});

				modalListCountries.appendChild(countryContainer);
			});

			[modalListCountries].forEach((formElem) => {
				modalBody.appendChild(formElem);
			});
		};

		/**
		 * Draw close btn that appears top-right of form.
		 * @param {Function} closeFnc Function that closes the form.
		 */
		const renderCloseBtn = (closeFnc) => {
			const closeSymb = renderElement("i", "fa");
			closeSymb.classList.add("fa-close");
			modalCloseBtn.appendChild(closeSymb);
			closeFnc();
		};
		const addCloseFnc = () => {
			modalCloseBtn.addEventListener("click", (e) => {
				e.preventDefault();
				const currentForm = document.querySelector(
					".modal-country-container"
				);
				document.querySelector(".face-mask").style.display = "none";

				setTimeout(setInvisible, 100); // delay for animation to happen
				function setInvisible() {
					currentForm.style.transform = "translateY(-125%)";
				}
				setTimeout(removeModal, 750); // delay for animation.
				function removeModal() {
					currentForm.style.opacity = 0;
					currentForm.style.visibility = "hidden";
					currentForm.remove();
				}
			});
		};

		// Render sections of the form to their respective containers.
		renderHeading();
		renderBody();
		renderCloseBtn(addCloseFnc);

		// Add each housing container to the overall modal container.
		[modalHeader, modalBody, modalCloseBtn].forEach((modalElem) =>
			modalContainer.appendChild(modalElem)
		);

		setTimeout(makeVisible, 100); // delay for animation.

		function makeVisible() {
			// Set styling to visible for animation fade in effect.
			modalContainer.style.visibility = "visible";
			modalContainer.style.opacity = 1;
			modalContainer.style.transform = "translateY(0%)";
		}

		const bodyDocument = document.querySelector("body");
		bodyDocument.append(modalContainer);
		document.querySelector(".face-mask").style.display = "block";

		/**
		 * 
		 * @param {String} countryCode  Country code in a 2 letter format.
		 * 								e.g. "AU"
		 * @param {*} countryName 		Full country name i.e. "Australia"
		 * @returns {Node}				Img Node with flag.
		 */
		function renderCountryFlag(countryCode, countryName) {
			const flag = renderElement("img", "country-flag");
			// flag.setAttribute("crossorigin", "anonymous");
			try {
				flag.src = `https://flagsapi.com/${providers[countryName]
							.countryCode}/shiny/64.png`;
			} catch(error) {
				console.error(`Failed to retrieve flag for: ${countryName}`);
			}
			flag.alt = `${countryName} flag`;
			return flag;
		}

		/**
		 * Filter country names based on the value of the search bar in the 
		 * form modal.
		 */
		function filterResults() {
			let input, filter, ul, li, a, i, txtValue;
			input = document.getElementById("modal-input-search");
			filter = input.value.toUpperCase();
			ul = document.getElementById("countries-list");
			li = ul.getElementsByTagName("li");

			// Logic that filters the countries based on input.
			for (i = 0; i < li.length; i++) {

				// Specific country identified in the iteration.
				a = li[i].getElementsByTagName("a")[0];
				txtValue = a.textContent || a.innerText;

				// Attempts to find the text value of the search's value. If
				// found, don't change display styling. Otherwise, set the
				// display of the country-container to none.
				if (txtValue.toUpperCase().indexOf(filter) > -1) {
					li[i].style.display = "";
				} else {
					li[i].style.display = "none";
				}
			}
		}
	}

	/**
	 * Similiar logic to filterResults().
	 * Function attempts to find the specific country based on countryName param
	 * . If found, highlight the specified country's appearance in the modal.
	 * @param {String} countryName Full country name e.g. "Australia"
	 */
	function highlightCurrCountry(countryName) {
		// Highlight selected current country in the list of countries when
		// modal is opened. Add a tick icon simultaneously

		let ul, li, i, a, txtValue;
		ul = document.getElementById("countries-list");
		li = ul.getElementsByTagName("li");
		for (i = 0; i < li.length; i++) {
			a = li[i].getElementsByTagName("a")[0];
			txtValue = a.textContent || a.innerText;

			// Condition that matches the text value and its country name.
			// If met, change styling to highlight.
			if (txtValue === countryName) {
				li[i].style.backgroundColor = "rgba(25, 150, 150, 0.5)";
				li[i].style.transform = "scale(1.025)";

				// Add tick icon to selected country-container
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
