const API_KEY = "720d2150cf09bfa61e28a5042cd7468f";

/**
 * Fetches the relevant information details of a movie and return only the most
 * relevant information.
 * @param {Number} movie_id Identifies the movie as an integer
 * @returns {Object}
 */
async function fetchMovieDetails(movie_id) {
	try {
		const response = await fetch(
			`https://api.themoviedb.org/3/movie/${movie_id}?api_key=${API_KEY}
			&language=en-US`,
			{ mode: "cors" }
		);
		const {
			original_title,
			overview,
			tagline,
			popularity,
			vote_average,
			vote_count,
			genres,
			video,
			runtime,
			poster_path,
			backdrop_path,
			release_date,
		} = await response.json();

		const genreNames = genres.map((genre) => genre.name);

		return {
			mName: original_title,
			summary: overview,
			tagline,
			popularity,
			vote_average,
			vote_count,
			genres: genreNames,
			video,
			runtime,
			poster_path,
			backdrop_path,
			release_date,
		};
	} catch (error) {
		// Squashed
		console.error(`Failed to fetch movie details ${error.message}`);
	}
}

/**
 * Reurns movie recommendations as an object with its relevant information.
 * Maximum 5 movies can be recommended and the .
 * @param {Number} movie_id Identifies the movie as an Integer.
 * @returns {Object}		An object that has the relevant information with
 * 							it's images, title, id and relevant vote info.
 */
async function fetchMovieReccos(movie_id) {
	try {
		const response = await fetch(
			`https://api.themoviedb.org/3/movie/${movie_id}/recommendations
			?api_key=${API_KEY}&language=en-US&page=1`,
			{ mode: "cors" }
		);

		if (!response.ok) {
			throw new Error("Failed to fetch movie recommendations from API.");
		}

		const data = await response.json();

		// Only retrieve the info on the first 5 movie recommendations.
		const reccos = data.results.slice(0, 5).map((movie) => ({
			mName: movie.original_title,
			id: movie.id,
			poster_path: movie.poster_path,
			backdrop_path: movie.backdrop_path,
			release_date: movie.release_date,
			vote_count: movie.vote_count,
			vote_average: movie.vote_average,
		}));

		return reccos;
	} catch (error) {
		console.error(
			`Failed to fetch movie recommendations: ${error.message}`
		);
	}
}

/**
 * Returns the relevant information (streaming, purchase and/or rent) of the
 * movie providers.
 * @param {Number} movie_id Identifies the movie as an Integer
 * @returns {Object}
 */
async function fetchMovieProviders(movie_id) {
	const providersByCountry = {};
	try {
		const response = await fetch(
			`https://api.themoviedb.org/3/movie/${movie_id}/watch/providers
			?api_key=${API_KEY}`,
			{ mode: "cors" }
		);
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
		console.erroror(`Failed to fetch movie providers: ${error.message}`);
	}
}

/**
 * Returns the relevant information of the movie trailer. The id should also
 * be retrieved so that the user can search for the movie respectively.
 * @param {Number} movie_id Identifies the movie as an Integer.
 * @returns {Object}		Relevant info of trailer including video name, site
 * 							language and type.
 */
async function fetchMovieTrailer(movie_id) {
	try {
		const response = await fetch(
			`https://api.themoviedb.org/3/movie/${movie_id}/videos?api_key=
			${API_KEY}&mode=cors`
		);
		if (!response.ok) {
			throw new Error("Failed to fetch movie trailers from API.");
		}
		const data = await response.json();

		// Find all trailers
		const trailers = data.results.filter(
			(video) => video.type === "Trailer"
		);
		if (trailers.length === 0) return;

		// Find official trailer.OR use first trailer
		const movieTrailer =
			trailers.find((video) => video.official === true) || trailers[0];

		return {
			tName: movieTrailer.name,
			key: movieTrailer.key,
			site: movieTrailer.site,
			type: movieTrailer.type,
			lang: getLanguage(movieTrailer.iso_639_1),
		};
	} catch (error) {
		console.error(`Failed to fetch movie trailers: ${error.message}`);
	}
}

/**
 * Returns the first 5 reviews with their ratings, author information and links.
 * @param {Number} movie_id Identifies the movie as an Integer
 * @returns {Object}		Review information including the content, author,
 * 							links and ratings.
 */
async function fetchMovieReviews(movie_id) {
	try {
		let reviews = [];
		const response = await fetch(
			`https://api.themoviedb.org/3/movie/${movie_id}/reviews?api_key=
			${API_KEY}&language=en-US&page=1`,
			{ mode: "cors" }
		);
		const data = await response.json();
		if (data.results.length === 0) return false;

		data.results.forEach((review) => {
			reviews.push({
				author: review.author,
				rating: review.author_details.rating,
				pic_path: review.author_details.avatar_path,
				content: review.content,
				url: review.url,
				last_updated: review.updated_at,
			});
		});
		return reviews.slice(0, 5); // First 5 reviews returned
	} catch (error) {
		console.error(`Fail to fetch movie reviews: ${error.message}`);
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
	fetchMovieDetails,
	fetchMovieReccos,
	fetchMovieProviders,
	fetchMovieTrailer,
	fetchMovieReviews,
	getCountryName,
};
