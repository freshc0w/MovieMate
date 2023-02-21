const API_KEY = "720d2150cf09bfa61e28a5042cd7468f";

async function fetchTvDetails(tv_id) {
	try {
		const response = await fetch(
			`https://api.themoviedb.org/3/tv/${tv_id}?api_key=${API_KEY}&language=en-US`,
			{ mode: "cors" }
		);
		const data = await response.json();
		console.log(data);

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
	} catch (err) {
		alert(err);
	}
}

/*
Returns an array of recommended tv shows with their name, id, poster_path and
backdrop_path recorded. 
If no movies are recommended, return null;
*/
async function fetchTvReccos(tv_id) {
	try {
		const response = await fetch(
			`https://api.themoviedb.org/3/tv/${tv_id}/recommendations?api_key=${API_KEY}&language=en-US&page=1`,
			{ mode: "cors" }
		);
		const data = response.json();

		const recTvs = {};
		if (data.results) {
			let count = 1;
			for (let tv of data.results) {
				recTvs[tv.original_name] = {
					tName: tv.original_name,
					id: tv.id,
					first_air_date: tv.first_air_date,
					poster_path: tv.poster_path,
					backdrop_path: tv.backdrop_path,
					vote_average: tv.vote_average,
					vote_count: tv.vote_count,
				};
				if (count === 5) {
					// max 5 tv shows to be recommended.
					break;
				}
				count++;
			}
		}
		return recTvs;
	} catch {
		alert(err);
	}
}

/* 
Returns an obj with countries and available streaming services, buy or rent
for specified tv show in EACH country.
*/
async function fetchTvProviders(tv_id) {
	const providersByCountry = {};
	try {
		const response = await fetch(
			`https://api.themoviedb.org/3/tv/${tv_id}/watch/providers?api_key=${API_KEY}`,
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
		alert(err);
	}
}

// Find tv trailer
async function fetchTvTrailer(tv_id) {
	try {
		let movieTrailer;
		const response = await fetch(
			`https://api.themoviedb.org/3/tv/${tv_id}/videos?api_key=${API_KEY}`,
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
		alert(err);
	}
}

// Returns an arr of a maximum of 5 reviews based on the tv show from
// random sources. If no reviews are found, this fnc returns false.
async function fetchTvReviews(tv_id) {
	try {
		let reviews = [];
		const response = await fetch(
			`https://api.themoviedb.org/3/tv/${tv_id}/reviews?api_key=${API_KEY}&language=en-US&page=1`,
			{ mode: "cors" }
		);
		const data = await response.json();
		if (data.results.length === 0) return false;

		let count = 1;
		data.results.forEach((review) => {
			reviews.push({
				author: review.author,
				rating: review.author_details.rating,
				pic_path: review.author_details.avatar_path,
				content: review.content,
				url: review.url,
				last_updated: review.updated_at,
			});
			count++;
		});
		return reviews.slice(0, 5);
	} catch (err) {
		alert(err);
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
