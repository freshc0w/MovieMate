(()=>{"use strict";const e="720d2150cf09bfa61e28a5042cd7468f";const t="720d2150cf09bfa61e28a5042cd7468f";console.log("Hello World"),async function(e){const t=function(e){return e.split(" ").join("+")}(e);try{const a=await fetch(`https://api.themoviedb.org/3/search/multi?api_key=720d2150cf09bfa61e28a5042cd7468f&language=en-US&query=${t}&page=1`,{mode:"cors"}),o=await a.json();let n={},r=o.results;if(r.length){if(r.length>4)for(let e=0;e<5;e++)n[r[e].id]=r[e].media_type;else for(let e=0;e<r.length;e++)n[r[e].id]=r[e].media_type;return console.log(n),n}alert(`No results found for ${e}`)}catch(e){alert(e)}}("IRON MAN"),async function(){const e=await async function(e){try{const e=await fetch(`https://api.themoviedb.org/3/movie/1726?api_key=${t}&language=en-US`,{mode:"cors"}),a=await e.json(),o=a.genres.reduce(((e,t)=>[...e,t.name]),[]);return{name:a.original_title,summary:a.overview,tagline:a.tagline,popularity:a.popularity,vote_average:a.vote_average,vote_count:a.vote_count,genres:o,video:a.video,runtime:a.runtime,poster_path:a.poster_path,backdrop_path:a.backdrop_path}}catch(e){alert(e)}}();console.log(e);const a=await async function(e){try{const e=await fetch(`https://api.themoviedb.org/3/movie/1726/recommendations?api_key=${t}&language=en-US&page=1`),a=await e.json();let o={};if(a.results){let e=1;for(let t of a.results){if(o[t.original_title]={name:t.original_title,id:t.id,poster_path:t.poster_path,backdrop_path:t.backdrop_path},5===e)break;e++}}return o}catch(e){alert(e)}}();console.log(a)}(),document.querySelector(".search-query").addEventListener("click",(async t=>{t.preventDefault();const a=await async function(){const t=document.getElementById("search").value;if(!t)return;const a=await async function(t){const a=function(e){return e.split(" ").join("+")}(t),o=await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${e}&query=${a}`,{mode:"cors"});return await o.json()}(t);return console.log(a),a}();!function(e,t=""){const a=document.querySelector(".info");for(let t in e){const o=document.createElement("p");o.textContent=`${t}: ${e[t]}`,a.appendChild(o)}const o="https://image.tmdb.org/t/p";document.querySelector(".poster").src=t?`${o}/w${t}/${e.img_path}`:`${o}/original/${e.img_path}`}(await async function(e){const t=e.results[0];return{title:t.original_title,lang:t.original_language,release_date:t.releasedate,overview:t.overview,img_path:t.backdrop_path}}(a),"500")}))})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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dEUsQ0FBRU0sS0FBTSxTQUdOLGFBRG1CRixFQUFTSSxNQUVoQyxDS0xvQjJDLENBQWV6QyxHQUVsQyxPQURBZCxRQUFRQyxJQUFJVSxHQUNMQSxDQUNSLENERTBCLElDWTFCLFNBQTRCNkMsRUFBTUMsRUFBVSxJQUMzQyxNQUFNQyxFQUFnQmIsU0FBU0MsY0FBYyxTQUM3QyxJQUFLLElBQUlhLEtBQVVILEVBQU0sQ0FDeEIsTUFBTUksRUFBT2YsU0FBU2dCLGNBQWMsS0FDcENELEVBQUtFLFlBQWMsR0FBR0gsTUFBV0gsRUFBS0csS0FDdENELEVBQWNLLFlBQVlILEVBQzNCLENBQ0EsTUFBTUksRUFBYSw2QkFLZm5CLFNBQVNDLGNBQ1YsV0FDRW1CLElBTkpSLEVBTVUsR0FBR08sTUFBZVAsS0FBV0QsRUFBS1UsV0FIbEMsR0FBR0YsY0FBdUJSLEVBQUtVLFVBSTNDLENEekJRQyxPQ0ZSakUsZUFBbUNTLEdBQ2xDLE1BQU1JLEVBQVVKLEVBQUtJLFFBQVEsR0FRN0IsTUFQYSxDQUNacUQsTUFBT3JELEVBQVFjLGVBQ2Z3QyxLQUFNdEQsRUFBUXVELGtCQUNkQyxhQUFjeEQsRUFBUXlELFlBQ3RCekMsU0FBVWhCLEVBQVFnQixTQUNsQm1DLFNBQVVuRCxFQUFRd0IsY0FHcEIsQ0RUd0NrQyxDQUFvQnZCLEdBQ2QsTUFBTSxHIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbW92aWVtYXRlLy4vc3JjL2pzL2FwaUZ1bmN0aW9ucy9zZWFyY2guanMiLCJ3ZWJwYWNrOi8vbW92aWVtYXRlLy4vc3JjL2pzL2FwaUZ1bmN0aW9ucy9mZXRjaElkLmpzIiwid2VicGFjazovL21vdmllbWF0ZS8uL3NyYy9qcy9hcGlGdW5jdGlvbnMvZmV0Y2hNb3ZpZUluZm8uanMiLCJ3ZWJwYWNrOi8vbW92aWVtYXRlLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovL21vdmllbWF0ZS8uL3NyYy9qcy9VSS9zdWJtaXRTZWFyY2guanMiLCJ3ZWJwYWNrOi8vbW92aWVtYXRlLy4vc3JjL2pzL0RPTUZ1bmN0aW9ucy9pbnB1dFNlYXJjaC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBBUElfS0VZID0gXCI3MjBkMjE1MGNmMDliZmE2MWUyOGE1MDQyY2Q3NDY4ZlwiO1xuXG5hc3luYyBmdW5jdGlvbiBnZXRRdWVyeVJlc3VsdChpbnB1dCkge1xuICAgIGNvbnN0IHF1ZXJ5ID0gaW50ZXJwcmV0UXVlcnlSZXN1bHQoaW5wdXQpO1xuXHRjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKFxuXHRcdGBodHRwczovL2FwaS50aGVtb3ZpZWRiLm9yZy8zL3NlYXJjaC9tb3ZpZT9hcGlfa2V5PSR7QVBJX0tFWX0mcXVlcnk9JHtxdWVyeX1gLFxuXHRcdHsgbW9kZTogXCJjb3JzXCIgfVxuXHQpO1xuICAgIGNvbnN0IGRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG4gICAgcmV0dXJuIGRhdGE7XG59XG5cbmZ1bmN0aW9uIGludGVycHJldFF1ZXJ5UmVzdWx0KGlucHV0KSB7XG4gICAgcmV0dXJuIGlucHV0LnNwbGl0KFwiIFwiKS5qb2luKFwiK1wiKTtcbn1cblxuZXhwb3J0IHsgZ2V0UXVlcnlSZXN1bHQgfTtcbiIsImNvbnN0IEFQSV9LRVkgPSBcIjcyMGQyMTUwY2YwOWJmYTYxZTI4YTUwNDJjZDc0NjhmXCI7XG4vKlxuRmV0Y2hlcyB0aGUgZmlyc3QgNSBtb3ZpZS9zaG93IGlkcyBhbmQgcmV0dXJuIGl0IGluIGFuIGFycmF5LlxuKi9cbmFzeW5jIGZ1bmN0aW9uIGZldGNoSWQobmFtZSkge1xuXHRjb25zdCBxdWVyeSA9IGludGVycHJldFRvUXVlcnkobmFtZSk7XG5cdHRyeSB7XG5cdFx0Y29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChcblx0XHRcdGBodHRwczovL2FwaS50aGVtb3ZpZWRiLm9yZy8zL3NlYXJjaC9tdWx0aT9hcGlfa2V5PSR7QVBJX0tFWX0mbGFuZ3VhZ2U9ZW4tVVMmcXVlcnk9JHtxdWVyeX0mcGFnZT0xYCxcblx0XHRcdHsgbW9kZTogXCJjb3JzXCIgfVxuXHRcdCk7XG5cdFx0Y29uc3QgZGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcblx0XHRsZXQgaWRzID0ge307XG5cdFx0bGV0IHJlc3VsdCA9IGRhdGEucmVzdWx0cztcblx0XHRpZiAocmVzdWx0Lmxlbmd0aCkge1xuXHRcdFx0aWYgKHJlc3VsdC5sZW5ndGggPiA0KSB7XG5cdFx0XHRcdGZvciAobGV0IGkgPSAwOyBpIDwgNTsgaSsrKSB7XG5cdFx0XHRcdFx0aWRzW3Jlc3VsdFtpXS5pZF0gPSByZXN1bHRbaV0ubWVkaWFfdHlwZTtcblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCByZXN1bHQubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0XHRpZHNbcmVzdWx0W2ldLmlkXSA9IHJlc3VsdFtpXS5tZWRpYV90eXBlO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRjb25zb2xlLmxvZyhpZHMpO1xuXHRcdFx0cmV0dXJuIGlkcztcblx0XHR9IGVsc2Uge1xuXHRcdFx0YWxlcnQoYE5vIHJlc3VsdHMgZm91bmQgZm9yICR7bmFtZX1gKTtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cdH0gY2F0Y2ggKGVycikge1xuXHRcdGFsZXJ0KGVycik7XG5cdH1cbn1cblxuZnVuY3Rpb24gaW50ZXJwcmV0VG9RdWVyeShuYW1lKSB7XG5cdHJldHVybiBuYW1lLnNwbGl0KFwiIFwiKS5qb2luKFwiK1wiKTtcbn1cblxuZXhwb3J0IHsgZmV0Y2hJZCB9O1xuIiwiaW1wb3J0IHsgZmV0Y2hJZCB9IGZyb20gXCIuL2ZldGNoSWRcIjtcblxuY29uc3QgQVBJX0tFWSA9IFwiNzIwZDIxNTBjZjA5YmZhNjFlMjhhNTA0MmNkNzQ2OGZcIjtcblxuYXN5bmMgZnVuY3Rpb24gZmV0Y2hNb3ZpZURldGFpbHMobW92aWVfaWQpIHtcblx0dHJ5IHtcblx0XHRjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKFxuXHRcdFx0YGh0dHBzOi8vYXBpLnRoZW1vdmllZGIub3JnLzMvbW92aWUvJHttb3ZpZV9pZH0/YXBpX2tleT0ke0FQSV9LRVl9Jmxhbmd1YWdlPWVuLVVTYCxcblx0XHRcdHsgbW9kZTogXCJjb3JzXCIgfVxuXHRcdCk7XG5cdFx0Y29uc3QgZGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcblxuXHRcdGNvbnN0IGdlbnJlcyA9IGRhdGEuZ2VucmVzLnJlZHVjZSgoYWNjLCB2YWwpID0+IFsuLi5hY2MsIHZhbC5uYW1lXSwgW10pO1xuXG5cdFx0Y29uc3QgZ2VuZXJhbEluZm8gPSB7XG5cdFx0XHRuYW1lOiBkYXRhLm9yaWdpbmFsX3RpdGxlLFxuXHRcdFx0c3VtbWFyeTogZGF0YS5vdmVydmlldyxcbiAgICAgICAgICAgIHRhZ2xpbmU6IGRhdGEudGFnbGluZSxcblx0XHRcdHBvcHVsYXJpdHk6IGRhdGEucG9wdWxhcml0eSxcblx0XHRcdHZvdGVfYXZlcmFnZTogZGF0YS52b3RlX2F2ZXJhZ2UsXG5cdFx0XHR2b3RlX2NvdW50OiBkYXRhLnZvdGVfY291bnQsXG4gICAgICAgICAgICBnZW5yZXM6IGdlbnJlcyxcbiAgICAgICAgICAgIHZpZGVvOiBkYXRhLnZpZGVvLFxuICAgICAgICAgICAgcnVudGltZTogZGF0YS5ydW50aW1lLFxuICAgICAgICAgICAgcG9zdGVyX3BhdGg6IGRhdGEucG9zdGVyX3BhdGgsXG4gICAgICAgICAgICBiYWNrZHJvcF9wYXRoOiBkYXRhLmJhY2tkcm9wX3BhdGgsXG5cblx0XHR9O1xuXHRcdHJldHVybiBnZW5lcmFsSW5mbztcblx0fSBjYXRjaCAoZXJyKSB7XG5cdFx0YWxlcnQoZXJyKTtcblx0fVxufVxuXG4vKlxuUmV0dXJucyBhbiBhcnJheSBvZiByZWNvbW1lbmRlZCBtb3ZpZXMgd2l0aCB0aGVpciBuYW1lLCBpZCwgcG9zdGVyX3BhdGggYW5kXG5iYWNrZHJvcF9wYXRoIHJlY29yZGVkLiBcbklmIG5vIG1vdmllcyBhcmUgcmVjb21tZW5kZWQsIHJldHVybiBudWxsO1xuKi9cbmFzeW5jIGZ1bmN0aW9uIGZldGNoUmVjY29zKG1vdmllX2lkKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChcbiAgICAgICAgICAgIGBodHRwczovL2FwaS50aGVtb3ZpZWRiLm9yZy8zL21vdmllLyR7bW92aWVfaWR9L3JlY29tbWVuZGF0aW9ucz9hcGlfa2V5PSR7QVBJX0tFWX0mbGFuZ3VhZ2U9ZW4tVVMmcGFnZT0xYFxuICAgICAgICApXG4gICAgICAgIGNvbnN0IGRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG5cblx0XHRsZXQgcmVjTW92aWVzID0ge307XG5cdFx0aWYoZGF0YS5yZXN1bHRzKSB7XG5cdFx0XHRsZXQgY291bnQgPSAxO1xuXHRcdFx0Zm9yKGxldCBtb3ZpZSBvZiBkYXRhLnJlc3VsdHMpIHtcblx0XHRcdFx0cmVjTW92aWVzW21vdmllLm9yaWdpbmFsX3RpdGxlXSA9IHtcblx0XHRcdFx0XHRuYW1lOiBtb3ZpZS5vcmlnaW5hbF90aXRsZSxcblx0XHRcdFx0XHRpZDogbW92aWUuaWQsXG5cdFx0XHRcdFx0cG9zdGVyX3BhdGg6IG1vdmllLnBvc3Rlcl9wYXRoLFxuXHRcdFx0XHRcdGJhY2tkcm9wX3BhdGg6IG1vdmllLmJhY2tkcm9wX3BhdGgsXG5cdFx0XHRcdH1cblx0XHRcdFx0XG5cdFx0XHRcdGlmKGNvdW50ID09PSA1KSB7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdH1cblx0XHRcdFx0Y291bnQrKztcblx0XHRcdH1cblx0XHR9IFxuXHRcdHJldHVybiByZWNNb3ZpZXNcbiAgICB9IGNhdGNoKGVycikge1xuICAgICAgICBhbGVydChlcnIpO1xuICAgIH1cbn1cblxuZXhwb3J0IHsgZmV0Y2hNb3ZpZURldGFpbHMsIGZldGNoUmVjY29zIH07XG4iLCJpbXBvcnQgeyBnZXRRdWVyeVJlc3VsdCB9IGZyb20gXCIuL2pzL2FwaUZ1bmN0aW9ucy9zZWFyY2hcIjtcbmltcG9ydCBhZGRTdWJtaXRTZWFyY2hGdW5jdGlvbiBmcm9tIFwiLi9qcy9VSS9zdWJtaXRTZWFyY2hcIjtcbmltcG9ydCB7IGZldGNoSWQgfSBmcm9tIFwiLi9qcy9hcGlGdW5jdGlvbnMvZmV0Y2hJZFwiO1xuaW1wb3J0ICogYXMgbW92aWUgZnJvbSBcIi4vanMvYXBpRnVuY3Rpb25zL2ZldGNoTW92aWVJbmZvXCI7XG5cblxuXG5jb25zb2xlLmxvZyhcIkhlbGxvIFdvcmxkXCIpO1xuZmV0Y2hJZCgnSVJPTiBNQU4nKTtcblxuZmV0Y2hEdW1teSgpO1xuXG5hc3luYyBmdW5jdGlvbiBmZXRjaER1bW15KCkge1xuICAgIGNvbnN0IG1vdmllRGV0YWlscyA9IGF3YWl0IG1vdmllLmZldGNoTW92aWVEZXRhaWxzKDE3MjYpO1xuICAgIGNvbnNvbGUubG9nKG1vdmllRGV0YWlscyk7XG4gICAgY29uc3QgbW92aWVSZWNjb3MgPSBhd2FpdCBtb3ZpZS5mZXRjaFJlY2NvcygxNzI2KTtcbiAgICBjb25zb2xlLmxvZyhtb3ZpZVJlY2Nvcyk7XG59XG5hZGRTdWJtaXRTZWFyY2hGdW5jdGlvbigpOyIsImltcG9ydCB7XG5cdGFwcGx5U2VhcmNoUmVzdWx0LFxuXHRjb2xsZWN0U2VhcmNoUmVzdWx0LFxuXHRmb3JtYXRTZWFyY2hSZXN1bHQsXG59IGZyb20gXCIuLi9ET01GdW5jdGlvbnMvaW5wdXRTZWFyY2hcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYWRkU3VibWl0U2VhcmNoRnVuY3Rpb24oKSB7XG5cdGNvbnN0IHNlYXJjaEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2VhcmNoLXF1ZXJ5XCIpO1xuXHRzZWFyY2hCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGFzeW5jIChldmVudCkgPT4ge1xuXHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cdFx0Y29uc3QgbW92aWVJbmZvID0gYXdhaXQgKGFwcGx5U2VhcmNoUmVzdWx0KCkpO1xuICAgICAgICBjb25zdCBzZWxlY3RlZE1vdmllSW5mbyA9IGF3YWl0IGNvbGxlY3RTZWFyY2hSZXN1bHQobW92aWVJbmZvKTtcbiAgICAgICAgZm9ybWF0U2VhcmNoUmVzdWx0KHNlbGVjdGVkTW92aWVJbmZvLCBcIjUwMFwiKTtcblx0fSk7XG59XG4iLCJpbXBvcnQgeyBnZXRRdWVyeVJlc3VsdCB9IGZyb20gXCIuLi9hcGlGdW5jdGlvbnMvc2VhcmNoXCI7XG5cbmFzeW5jIGZ1bmN0aW9uIGFwcGx5U2VhcmNoUmVzdWx0KCkge1xuXHRjb25zdCByZXN1bHQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNlYXJjaFwiKS52YWx1ZTtcblx0aWYgKCFyZXN1bHQpIHJldHVybjtcblx0Y29uc3QgZGF0YSA9IGF3YWl0IGdldFF1ZXJ5UmVzdWx0KHJlc3VsdCk7XG5cdGNvbnNvbGUubG9nKGRhdGEpO1xuXHRyZXR1cm4gZGF0YTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gY29sbGVjdFNlYXJjaFJlc3VsdChkYXRhKSB7XG5cdGNvbnN0IHJlc3VsdHMgPSBkYXRhLnJlc3VsdHNbMF07XG5cdGNvbnN0IGluZm8gPSB7XG5cdFx0dGl0bGU6IHJlc3VsdHMub3JpZ2luYWxfdGl0bGUsXG5cdFx0bGFuZzogcmVzdWx0cy5vcmlnaW5hbF9sYW5ndWFnZSxcblx0XHRyZWxlYXNlX2RhdGU6IHJlc3VsdHMucmVsZWFzZWRhdGUsXG5cdFx0b3ZlcnZpZXc6IHJlc3VsdHMub3ZlcnZpZXcsXG5cdFx0aW1nX3BhdGg6IHJlc3VsdHMuYmFja2Ryb3BfcGF0aCxcblx0fTtcblx0cmV0dXJuIGluZm87XG59XG5cbmZ1bmN0aW9uIGZvcm1hdFNlYXJjaFJlc3VsdChpbmZvLCBpbWdTaXplID0gXCJcIikge1xuXHRjb25zdCBwYXJhQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5pbmZvXCIpO1xuXHRmb3IgKGxldCBkZXRhaWwgaW4gaW5mbykge1xuXHRcdGNvbnN0IHBhcmEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKTtcblx0XHRwYXJhLnRleHRDb250ZW50ID0gYCR7ZGV0YWlsfTogJHtpbmZvW2RldGFpbF19YDtcblx0XHRwYXJhQ29udGFpbmVyLmFwcGVuZENoaWxkKHBhcmEpOyBcblx0fVxuXHRjb25zdCBiYXNlSW1nVXJsID0gXCJodHRwczovL2ltYWdlLnRtZGIub3JnL3QvcFwiO1xuXHQhaW1nU2l6ZVxuXHRcdD8gKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG5cdFx0XHRcdFwiLnBvc3RlclwiXG5cdFx0ICApLnNyYyA9IGAke2Jhc2VJbWdVcmx9L29yaWdpbmFsLyR7aW5mby5pbWdfcGF0aH1gKVxuXHRcdDogKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG5cdFx0XHRcdFwiLnBvc3RlclwiXG5cdFx0ICApLnNyYyA9IGAke2Jhc2VJbWdVcmx9L3cke2ltZ1NpemV9LyR7aW5mby5pbWdfcGF0aH1gKTtcbn1cblxuZXhwb3J0IHsgYXBwbHlTZWFyY2hSZXN1bHQsIGNvbGxlY3RTZWFyY2hSZXN1bHQsIGZvcm1hdFNlYXJjaFJlc3VsdCB9O1xuIl0sIm5hbWVzIjpbIkFQSV9LRVkiLCJjb25zb2xlIiwibG9nIiwiYXN5bmMiLCJuYW1lIiwicXVlcnkiLCJzcGxpdCIsImpvaW4iLCJpbnRlcnByZXRUb1F1ZXJ5IiwicmVzcG9uc2UiLCJmZXRjaCIsIm1vZGUiLCJkYXRhIiwianNvbiIsImlkcyIsInJlc3VsdCIsInJlc3VsdHMiLCJsZW5ndGgiLCJpIiwiaWQiLCJtZWRpYV90eXBlIiwiYWxlcnQiLCJlcnIiLCJmZXRjaElkIiwibW92aWVEZXRhaWxzIiwibW92aWVfaWQiLCJnZW5yZXMiLCJyZWR1Y2UiLCJhY2MiLCJ2YWwiLCJvcmlnaW5hbF90aXRsZSIsInN1bW1hcnkiLCJvdmVydmlldyIsInRhZ2xpbmUiLCJwb3B1bGFyaXR5Iiwidm90ZV9hdmVyYWdlIiwidm90ZV9jb3VudCIsInZpZGVvIiwicnVudGltZSIsInBvc3Rlcl9wYXRoIiwiYmFja2Ryb3BfcGF0aCIsIm1vdmllUmVjY29zIiwicmVjTW92aWVzIiwiY291bnQiLCJtb3ZpZSIsImZldGNoRHVtbXkiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJhZGRFdmVudExpc3RlbmVyIiwiZXZlbnQiLCJwcmV2ZW50RGVmYXVsdCIsIm1vdmllSW5mbyIsImdldEVsZW1lbnRCeUlkIiwidmFsdWUiLCJpbnB1dCIsImludGVycHJldFF1ZXJ5UmVzdWx0IiwiZ2V0UXVlcnlSZXN1bHQiLCJpbmZvIiwiaW1nU2l6ZSIsInBhcmFDb250YWluZXIiLCJkZXRhaWwiLCJwYXJhIiwiY3JlYXRlRWxlbWVudCIsInRleHRDb250ZW50IiwiYXBwZW5kQ2hpbGQiLCJiYXNlSW1nVXJsIiwic3JjIiwiaW1nX3BhdGgiLCJmb3JtYXRTZWFyY2hSZXN1bHQiLCJ0aXRsZSIsImxhbmciLCJvcmlnaW5hbF9sYW5ndWFnZSIsInJlbGVhc2VfZGF0ZSIsInJlbGVhc2VkYXRlIiwiY29sbGVjdFNlYXJjaFJlc3VsdCJdLCJzb3VyY2VSb290IjoiIn0=