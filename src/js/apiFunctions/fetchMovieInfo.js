const API_KEY = "720d2150cf09bfa61e28a5042cd7468f";

async function fetchMovieDetails(movie_id) {
	try {
		const response = await fetch(
			`https://api.themoviedb.org/3/movie/${movie_id}?api_key=${API_KEY}&language=en-US`,
			{ mode: "cors" }
		);
		const data = await response.json();

		const genres = data.genres.reduce((acc, val) => [...acc, val.name], []);

		const generalInfo = {
			mName: data.original_title,
			summary: data.overview,
			tagline: data.tagline,
			popularity: data.popularity,
			vote_average: data.vote_average,
			vote_count: data.vote_count,
			genres: genres,
			video: data.video,
			runtime: data.runtime,
			poster_path: data.poster_path,
			backdrop_path: data.backdrop_path,
			release_date: data.release_date,
		};
		return generalInfo;
	} catch (err) {
		console.log(err);
	}
}

/*
Returns an array of recommended movies with their name, id, poster_path and
backdrop_path recorded. 
If no movies are recommended, return null;
*/
async function fetchMovieReccos(movie_id) {
	try {
		const response = await fetch(
			`https://api.themoviedb.org/3/movie/${movie_id}/recommendations?api_key=${API_KEY}&language=en-US&page=1`,
			{ mode: "cors" }
		);
		const data = await response.json();

		const recMovies = {};
		if (data.results) {
			let count = 1;
			for (let movie of data.results) {
				recMovies[movie.original_title] = {
					mName: movie.original_title,
					id: movie.id,
					poster_path: movie.poster_path,
					backdrop_path: movie.backdrop_path,
					release_date: movie.release_date,
					vote_count: movie.vote_count,
					vote_average: movie.vote_average,
				};
				if (count === 5) {
					// Max 5 movies to be recommended
					break;
				}
				count++;
			}
		}
		return recMovies;
	} catch (err) {
		console.log(err);
	}
}

/*
Returns an object with countries and the available streaming services, buy
or rent it comes with EACH individual country.
*/
async function fetchMovieProviders(movie_id) {
	const providersByCountry = {};
	try {
		const response = await fetch(
			`https://api.themoviedb.org/3/movie/${movie_id}/watch/providers?api_key=${API_KEY}`,
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
	} catch (err) {
		console.log(err);
	}
}

// Find movie trailer and return false if none can be found.
// Official trailer will be prioritised.
async function fetchMovieTrailer(movie_id) {
	try {
		let movieTrailer;
		const response = await fetch(
			`https://api.themoviedb.org/3/movie/${movie_id}/videos?api_key=${API_KEY}`,
			{ mode: "cors" }
		);
		const data = await response.json();

		const trailers = data.results.filter((video) => video.type === "Trailer");

		if (trailers.length === 0) return false;
		// Find official trailer.
		const official = trailers.filter((video) => {
			video.official === true;
		});

		official.length !== 0
			? (movieTrailer = official[0])
			: (movieTrailer = trailers[0]);

		return {
			tName: movieTrailer.name,
			key: movieTrailer.key,
			site: movieTrailer.site,
			type: movieTrailer.type,
			lang: getLanguage(movieTrailer.iso_639_1),
		};
	} catch (err) {
		console.log(err);
	}
}

// Returns an arr of a maximum of 5 reviews based on the movie from random sources.
// If no reviews are found, this fnc returns false.
async function fetchMovieReviews(movie_id) {
	try {
		let reviews = [];
		const response = await fetch(
			`https://api.themoviedb.org/3/movie/${movie_id}/reviews?api_key=${API_KEY}&language=en-US&page=1`,
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
	} catch (err) {
		console.log(err);
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
