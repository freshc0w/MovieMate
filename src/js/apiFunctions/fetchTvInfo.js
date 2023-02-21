const API_KEY = "720d2150cf09bfa61e28a5042cd7468f";

async function fetchTvDetails(tv_id) {
    try {
        const response = await fetch (
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
            episode_run_time: data.episode_run_time,
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
        }
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
            { mode: "cors"}
        );
        const data = response.json();

        const recTvs = {};
        if(data.results) {
            let count = 1;
            for(let tv of data.results) {
                recTvs[tv.original_name] = {
                    tName: tv.original_name,
                    id: tv.id,
                    first_air_date: tv.first_air_date,
                    poster_path: tv.poster_path,
                    backdrop_path: tv.backdrop_path,
                    vote_average: tv.vote_average,
                    vote_count: tv.vote_count,
                };
                if(count ===5) {
                    // max 5 tv shows to be recommended.
                    break;
                }
                count++;
            }
        }
        return recTvs;
    } catch {
        alert(err)
    }
}

export {
    fetchTvDetails,
    fetchTvReccos,
}