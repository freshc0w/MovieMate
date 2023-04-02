const API_KEY = "720d2150cf09bfa61e28a5042cd7468f";

/**
 * Returns the relevant information of a tv show based on its id.
 * @param {Number} tv_id Identifies tv show by an integer
 * @returns {Object}	 Relevant information of TV SHOW. i.e. name and number
 * 						 seasons
 */
async function fetchTvDetails(tv_id) {
	try {
		const response = await fetch(
			`https://api.themoviedb.org/3/tv/${tv_id}?api_key=${API_KEY}
			&language=en-US`,
			{ mode: "cors" }
		);

		if (!response.ok) {
			throw new Error("Failed to fetch TV details from API.");
		}

		const data = await response.json();

		const genres = data.genres.reduce((acc, val) => [...acc, val.name], []);

		const generalInfo = {
			tName: data.original_name,
			tagline: data.tagline,
			language: data.original_language,
			summary: data.overview,
			episode_run_time: data.episode_run_time[0],
			origin_country: data.origin_country,
			vote_average: data.vote_average,
			vote_count: data.vote_count,
			status: data.status,
			seasons: data.seasons,
			number_of_seasons: data.number_of_seasons,
			first_air_date: data.first_air_date,
			last_air_date: data.last_air_date,
			backdrop_path: data.backdrop_path,
			poster_path: data.poster_path,
			popularity: data.popularity,
			genres: genres,
		};
		return generalInfo;
	} catch (error) {
		console.error(
			`Failed to fetch relevant information for TV SHOW: ${error.message}`
		);
	}
}

/*
Returns an array of recommended tv shows with their name, id, poster_path and
backdrop_path recorded. 
If no movies are recommended, return null;
*/
/**
 * Returns, at most 5, recommendation based on the specified TV SHOW. The
 * most relevant information for each recco is returned as an object.
 * @param {Number} tv_id Identifies the specified TV show by an Integer
 * @returns {Object} 	 Max 5 recommendations with its relevant information
 * 						 as an object.
 */
async function fetchTvReccos(tv_id) {
	try {
		const response = await fetch(
			`https://api.themoviedb.org/3/tv/${tv_id}/recommendations?api_key=${API_KEY}&language=en-US&page=1`,
			{ mode: "cors" }
		);
		if (!response.ok) {
			throw new Error("Failed to fetch TV recommendations from API.");
		}
		const data = await response.json();

		const recTvs = data.results?.slice(0, 5).reduce((acc, tv) => {
			acc[tv.original_name] = {
				tName: tv.original_name,
				id: tv.id,
				first_air_date: tv.first_air_date,
				poster_path: tv.poster_path,
				backdrop_path: tv.backdrop_path,
				vote_average: tv.vote_average,
				vote_count: tv.vote_count,
			};
			return acc;
		}, {});

		return recTvs || {};
	} catch (error) {
		console.error(`Failed to fetch TV recommendations: ${error.message}`);
	}
}

/**
 * Returns relevant TV providers based on the selected TV show.
 * @param {Number} tv_id Identifies the specified TV show by an Integer
 * @returns {Object}	 TV providers for streaming, purchase and/or rent
 * 						 for the specified TV show.
 */
async function fetchTvProviders(tv_id) {
	const providersByCountry = {};
	try {
		const response = await fetch(
			`https://api.themoviedb.org/3/tv/${tv_id}/watch/providers?api_key=${API_KEY}`,
			{ mode: "cors" }
		);

		if (!response.ok) {
			throw new Error(`Failed to fetch TV show providers from API.`);
		}
		const data = await response.json();

		for (const countryCode in data.results) {
			const country = getCountryName(countryCode);
			providersByCountry[country] = {
				stream: [],
				rent: [],
				buy: [],
				countryCode: countryCode,
			};

			/*
			Sorts providers based on country and services they provide.

			Takes in type of services as param => ["flatrate (streaming)", 
			"rent", "buy"] and an array to append it to.
			*/
			const sortProviders = (services, collection) => {
				if (services) {
					services.forEach((service) => {
						const providerInfo = {
							provider_name: service.provider_name,
							provider_logo_path: service.logo_path,
						};
						collection.push(providerInfo);
					});
				}
			};

			// Add streaming services for specified movie in each country.
			sortProviders(
				data.results[countryCode].flatrate,
				providersByCountry[country].stream
			);

			// Add renting services for speicified movie in each country.
			sortProviders(
				data.results[countryCode].rent,
				providersByCountry[country].rent
			);

			// Add buying services for specified movie in each country.
			sortProviders(
				data.results[countryCode].buy,
				providersByCountry[country].buy
			);
		}
		return providersByCountry;
	} catch (error) {
		console.error(`Failed to fetch TV providers: ${error.message}`);
	}
}

/**
 * Returns the relevant information of the tv trailer. The id should also
 * be retrieved so that the user can search for the tv respectively.
 * @param {Number} tv_id Identifies the tv show as an Integer.
 * @returns {Object}	 Relevant info of trailer including video name, site
 * 						 language and type.
 */
async function fetchTvTrailer(tv_id) {
	try {
		const response = await fetch(
			`https://api.themoviedb.org/3/tv/${tv_id}/videos?api_key=${API_KEY}`,
			{ mode: "cors" }
		);
		if (!response.ok) {
			throw new Error("Failed to fetch TV trailer from API.");
		}
		const data = await response.json();

		const trailers = data.results.filter(
			(video) => video.type === "Trailer"
		);

		if (trailers.length === 0) return;

		// Find official trailer or use the first trailer.
		const tvTrailer =
			trailers.find((video) => video.official === true) || trailers[0];

		return {
			tName: tvTrailer.name,
			key: tvTrailer.key,
			site: tvTrailer.site,
			type: tvTrailer.type,
			lang: getLanguage(tvTrailer.iso_639_1),
		};
	} catch (error) {
		console.error(`Failed to fetch TV trailer: ${error.message}`);
	}
}

/**
 * Returns the first 5 reviews with their ratings, author information and links.
 * @param {Number} movie_id Identifies the TV show as an Integer
 * @returns {Object}		Review information including the content, author,
 * 							links and ratings.
 */
async function fetchTvReviews(tv_id) {
	try {
		const response = await fetch(
			`https://api.themoviedb.org/3/tv/${tv_id}/reviews?api_key=
			${API_KEY}&language=en-US&page=1`,
			{ mode: "cors" }
		);
		if (!response.ok) {
			throw new Error("Failed to fetch TV reviews from API.");
		}
		const data = await response.json();
		if (data.results.length === 0) return false;

		// Only return the first 5 reviews maximum.
		const reviews = data.results
			.map((review) => ({
				author: review.author,
				rating: review.author_details?.rating,
				pic_path: review.author_details?.avatar_path,
				content: review.content,
				url: review.url,
				last_updated: review.updated_at,
			}))
			.slice(0, 5);

		return reviews;
	} catch (error) {
		console.error(`Failed to fetch TV reviews: ${error.message}`);
	}
}

// Helper fncs
function getCountryName(code) {
	let regionNames = new Intl.DisplayNames(["en"], { type: "region" });
	return regionNames.of(code);
}

function getLanguage(code) {
	const lang = new Intl.DisplayNames(["en"], { type: "language" });
	return lang.of(code);
}
export {
	fetchTvDetails,
	fetchTvReccos,
	fetchTvProviders,
	fetchTvTrailer,
	fetchTvReviews,
};
