(()=>{"use strict";const e="720d2150cf09bfa61e28a5042cd7468f";const t="720d2150cf09bfa61e28a5042cd7468f";async function o(e){const o=await async function(e){try{const o=await fetch(`https://api.themoviedb.org/3/movie/${e}?api_key=${t}&language=en-US`,{mode:"cors"}),a=await o.json(),n=a.genres.reduce(((e,t)=>[...e,t.name]),[]);return{name:a.original_title,summary:a.overview,tagline:a.tagline,popularity:a.popularity,vote_average:a.vote_average,vote_count:a.vote_count,genres:n,video:a.video,runtime:a.runtime,poster_path:a.poster_path,backdrop_path:a.backdrop_path}}catch(e){alert(e)}}(e),a=await async function(e){try{const o=await fetch(`https://api.themoviedb.org/3/movie/${e}/recommendations?api_key=${t}&language=en-US&page=1`,{mode:"cors"}),a=await o.json(),n={};if(a.results){let e=1;for(let t of a.results){if(n[t.original_title]={name:t.original_title,id:t.id,poster_path:t.poster_path,backdrop_path:t.backdrop_path},5===e)break;e++}}return n}catch(e){alert(e)}}(e),n=await async function(e){const o={};try{const n=await fetch(`https://api.themoviedb.org/3/movie/${e}/watch/providers?api_key=${t}`,{mode:"cors"}),r=await n.json();for(const e in r.results){const t=(a=e,new Intl.DisplayNames(["en"],{type:"region"}).of(a));o[t]={stream:[],rent:[],buy:[]};const n=(e,t)=>{e&&e.forEach((e=>{const o={provider_name:e.provider_name,provider_logo_path:e.logo_path};t.push(o)}))};n(r.results[e].flatrate,o[t].stream),n(r.results[e].rent,o[t].rent),n(r.results[e].buy,o[t].buy)}return o}catch(e){alert(e)}var a}(e);console.log(o),console.log(a),console.log(n)}console.log("Hello World"),async function(e){const t=function(e){return e.split(" ").join("+")}(e);try{const o=await fetch(`https://api.themoviedb.org/3/search/multi?api_key=720d2150cf09bfa61e28a5042cd7468f&language=en-US&query=${t}&page=1`,{mode:"cors"}),a=await o.json();let n={},r=a.results;if(r.length){if(r.length>4)for(let e=0;e<5;e++)n[r[e].id]=r[e].media_type;else for(let e=0;e<r.length;e++)n[r[e].id]=r[e].media_type;return console.log(n),n}alert(`No results found for ${e}`)}catch(e){alert(e)}}("IRON MAN"),o(1726),o(10138),o(68721),document.querySelector(".search-query").addEventListener("click",(async t=>{t.preventDefault();const o=await async function(){const t=document.getElementById("search").value;if(!t)return;const o=await async function(t){const o=function(e){return e.split(" ").join("+")}(t),a=await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${e}&query=${o}`,{mode:"cors"});return await a.json()}(t);return console.log(o),o}();!function(e,t=""){const o=document.querySelector(".info");for(let t in e){const a=document.createElement("p");a.textContent=`${t}: ${e[t]}`,o.appendChild(a)}const a="https://image.tmdb.org/t/p";document.querySelector(".poster").src=t?`${a}/w${t}/${e.img_path}`:`${a}/original/${e.img_path}`}(await async function(e){const t=e.results[0];return{title:t.original_title,lang:t.original_language,release_date:t.releasedate,overview:t.overview,img_path:t.backdrop_path}}(o),"500")}))})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LElBQzNDLE1BQU1DLEVBQWdCYixTQUFTQyxjQUFjLFNBQzdDLElBQUssSUFBSWEsS0FBVUgsRUFBTSxDQUN4QixNQUFNSSxFQUFPZixTQUFTZ0IsY0FBYyxLQUNwQ0QsRUFBS0UsWUFBYyxHQUFHSCxNQUFXSCxFQUFLRyxLQUN0Q0QsRUFBY0ssWUFBWUgsRUFDM0IsQ0FDQSxNQUFNSSxFQUFhLDZCQUtmbkIsU0FBU0MsY0FDVixXQUNFbUIsSUFOSlIsRUFNVSxHQUFHTyxNQUFlUCxLQUFXRCxFQUFLVSxXQUhsQyxHQUFHRixjQUF1QlIsRUFBS1UsVUFJM0MsQ0R6QlFDLE9DRlIxRixlQUFtQ1EsR0FDbEMsTUFBTXNCLEVBQVV0QixFQUFLc0IsUUFBUSxHQVE3QixNQVBhLENBQ1o2RCxNQUFPN0QsRUFBUWYsZUFDZjZFLEtBQU05RCxFQUFRK0Qsa0JBQ2RDLGFBQWNoRSxFQUFRaUUsWUFDdEI5RSxTQUFVYSxFQUFRYixTQUNsQndFLFNBQVUzRCxFQUFRTCxjQUdwQixDRFR3Q3VFLENBQW9CdkIsR0FDZCxNQUFNLEciLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9tb3ZpZW1hdGUvLi9zcmMvanMvYXBpRnVuY3Rpb25zL3NlYXJjaC5qcyIsIndlYnBhY2s6Ly9tb3ZpZW1hdGUvLi9zcmMvanMvYXBpRnVuY3Rpb25zL2ZldGNoSWQuanMiLCJ3ZWJwYWNrOi8vbW92aWVtYXRlLy4vc3JjL2pzL2FwaUZ1bmN0aW9ucy9mZXRjaE1vdmllSW5mby5qcyIsIndlYnBhY2s6Ly9tb3ZpZW1hdGUvLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vbW92aWVtYXRlLy4vc3JjL2pzL1VJL3N1Ym1pdFNlYXJjaC5qcyIsIndlYnBhY2s6Ly9tb3ZpZW1hdGUvLi9zcmMvanMvRE9NRnVuY3Rpb25zL2lucHV0U2VhcmNoLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IEFQSV9LRVkgPSBcIjcyMGQyMTUwY2YwOWJmYTYxZTI4YTUwNDJjZDc0NjhmXCI7XG5cbmFzeW5jIGZ1bmN0aW9uIGdldFF1ZXJ5UmVzdWx0KGlucHV0KSB7XG4gICAgY29uc3QgcXVlcnkgPSBpbnRlcnByZXRRdWVyeVJlc3VsdChpbnB1dCk7XG5cdGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goXG5cdFx0YGh0dHBzOi8vYXBpLnRoZW1vdmllZGIub3JnLzMvc2VhcmNoL21vdmllP2FwaV9rZXk9JHtBUElfS0VZfSZxdWVyeT0ke3F1ZXJ5fWAsXG5cdFx0eyBtb2RlOiBcImNvcnNcIiB9XG5cdCk7XG4gICAgY29uc3QgZGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcbiAgICByZXR1cm4gZGF0YTtcbn1cblxuZnVuY3Rpb24gaW50ZXJwcmV0UXVlcnlSZXN1bHQoaW5wdXQpIHtcbiAgICByZXR1cm4gaW5wdXQuc3BsaXQoXCIgXCIpLmpvaW4oXCIrXCIpO1xufVxuXG5leHBvcnQgeyBnZXRRdWVyeVJlc3VsdCB9O1xuIiwiY29uc3QgQVBJX0tFWSA9IFwiNzIwZDIxNTBjZjA5YmZhNjFlMjhhNTA0MmNkNzQ2OGZcIjtcbi8qXG5GZXRjaGVzIHRoZSBmaXJzdCA1IG1vdmllL3Nob3cgaWRzIGFuZCByZXR1cm4gaXQgaW4gYW4gYXJyYXkuXG4qL1xuYXN5bmMgZnVuY3Rpb24gZmV0Y2hJZChuYW1lKSB7XG5cdGNvbnN0IHF1ZXJ5ID0gaW50ZXJwcmV0VG9RdWVyeShuYW1lKTtcblx0dHJ5IHtcblx0XHRjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKFxuXHRcdFx0YGh0dHBzOi8vYXBpLnRoZW1vdmllZGIub3JnLzMvc2VhcmNoL211bHRpP2FwaV9rZXk9JHtBUElfS0VZfSZsYW5ndWFnZT1lbi1VUyZxdWVyeT0ke3F1ZXJ5fSZwYWdlPTFgLFxuXHRcdFx0eyBtb2RlOiBcImNvcnNcIiB9XG5cdFx0KTtcblx0XHRjb25zdCBkYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuXHRcdGxldCBpZHMgPSB7fTtcblx0XHRsZXQgcmVzdWx0ID0gZGF0YS5yZXN1bHRzO1xuXHRcdGlmIChyZXN1bHQubGVuZ3RoKSB7XG5cdFx0XHRpZiAocmVzdWx0Lmxlbmd0aCA+IDQpIHtcblx0XHRcdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCA1OyBpKyspIHtcblx0XHRcdFx0XHRpZHNbcmVzdWx0W2ldLmlkXSA9IHJlc3VsdFtpXS5tZWRpYV90eXBlO1xuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRmb3IgKGxldCBpID0gMDsgaSA8IHJlc3VsdC5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRcdGlkc1tyZXN1bHRbaV0uaWRdID0gcmVzdWx0W2ldLm1lZGlhX3R5cGU7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdGNvbnNvbGUubG9nKGlkcyk7XG5cdFx0XHRyZXR1cm4gaWRzO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRhbGVydChgTm8gcmVzdWx0cyBmb3VuZCBmb3IgJHtuYW1lfWApO1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblx0fSBjYXRjaCAoZXJyKSB7XG5cdFx0YWxlcnQoZXJyKTtcblx0fVxufVxuXG5mdW5jdGlvbiBpbnRlcnByZXRUb1F1ZXJ5KG5hbWUpIHtcblx0cmV0dXJuIG5hbWUuc3BsaXQoXCIgXCIpLmpvaW4oXCIrXCIpO1xufVxuXG5leHBvcnQgeyBmZXRjaElkIH07XG4iLCJpbXBvcnQgeyBmZXRjaElkIH0gZnJvbSBcIi4vZmV0Y2hJZFwiO1xuXG5jb25zdCBBUElfS0VZID0gXCI3MjBkMjE1MGNmMDliZmE2MWUyOGE1MDQyY2Q3NDY4ZlwiO1xuXG5hc3luYyBmdW5jdGlvbiBmZXRjaE1vdmllRGV0YWlscyhtb3ZpZV9pZCkge1xuXHR0cnkge1xuXHRcdGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goXG5cdFx0XHRgaHR0cHM6Ly9hcGkudGhlbW92aWVkYi5vcmcvMy9tb3ZpZS8ke21vdmllX2lkfT9hcGlfa2V5PSR7QVBJX0tFWX0mbGFuZ3VhZ2U9ZW4tVVNgLFxuXHRcdFx0eyBtb2RlOiBcImNvcnNcIiB9XG5cdFx0KTtcblx0XHRjb25zdCBkYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuXG5cdFx0Y29uc3QgZ2VucmVzID0gZGF0YS5nZW5yZXMucmVkdWNlKChhY2MsIHZhbCkgPT4gWy4uLmFjYywgdmFsLm5hbWVdLCBbXSk7XG5cblx0XHRjb25zdCBnZW5lcmFsSW5mbyA9IHtcblx0XHRcdG5hbWU6IGRhdGEub3JpZ2luYWxfdGl0bGUsXG5cdFx0XHRzdW1tYXJ5OiBkYXRhLm92ZXJ2aWV3LFxuXHRcdFx0dGFnbGluZTogZGF0YS50YWdsaW5lLFxuXHRcdFx0cG9wdWxhcml0eTogZGF0YS5wb3B1bGFyaXR5LFxuXHRcdFx0dm90ZV9hdmVyYWdlOiBkYXRhLnZvdGVfYXZlcmFnZSxcblx0XHRcdHZvdGVfY291bnQ6IGRhdGEudm90ZV9jb3VudCxcblx0XHRcdGdlbnJlczogZ2VucmVzLFxuXHRcdFx0dmlkZW86IGRhdGEudmlkZW8sXG5cdFx0XHRydW50aW1lOiBkYXRhLnJ1bnRpbWUsXG5cdFx0XHRwb3N0ZXJfcGF0aDogZGF0YS5wb3N0ZXJfcGF0aCxcblx0XHRcdGJhY2tkcm9wX3BhdGg6IGRhdGEuYmFja2Ryb3BfcGF0aCxcblx0XHR9O1xuXHRcdHJldHVybiBnZW5lcmFsSW5mbztcblx0fSBjYXRjaCAoZXJyKSB7XG5cdFx0YWxlcnQoZXJyKTtcblx0fVxufVxuXG4vKlxuUmV0dXJucyBhbiBhcnJheSBvZiByZWNvbW1lbmRlZCBtb3ZpZXMgd2l0aCB0aGVpciBuYW1lLCBpZCwgcG9zdGVyX3BhdGggYW5kXG5iYWNrZHJvcF9wYXRoIHJlY29yZGVkLiBcbklmIG5vIG1vdmllcyBhcmUgcmVjb21tZW5kZWQsIHJldHVybiBudWxsO1xuKi9cbmFzeW5jIGZ1bmN0aW9uIGZldGNoTW92aWVSZWNjb3MobW92aWVfaWQpIHtcblx0dHJ5IHtcblx0XHRjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKFxuXHRcdFx0YGh0dHBzOi8vYXBpLnRoZW1vdmllZGIub3JnLzMvbW92aWUvJHttb3ZpZV9pZH0vcmVjb21tZW5kYXRpb25zP2FwaV9rZXk9JHtBUElfS0VZfSZsYW5ndWFnZT1lbi1VUyZwYWdlPTFgLFxuXHRcdFx0eyBtb2RlOiBcImNvcnNcIiB9XG5cdFx0KTtcblx0XHRjb25zdCBkYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuXG5cdFx0Y29uc3QgcmVjTW92aWVzID0ge307XG5cdFx0aWYgKGRhdGEucmVzdWx0cykge1xuXHRcdFx0bGV0IGNvdW50ID0gMTtcblx0XHRcdGZvciAobGV0IG1vdmllIG9mIGRhdGEucmVzdWx0cykge1xuXHRcdFx0XHRyZWNNb3ZpZXNbbW92aWUub3JpZ2luYWxfdGl0bGVdID0ge1xuXHRcdFx0XHRcdG5hbWU6IG1vdmllLm9yaWdpbmFsX3RpdGxlLFxuXHRcdFx0XHRcdGlkOiBtb3ZpZS5pZCxcblx0XHRcdFx0XHRwb3N0ZXJfcGF0aDogbW92aWUucG9zdGVyX3BhdGgsXG5cdFx0XHRcdFx0YmFja2Ryb3BfcGF0aDogbW92aWUuYmFja2Ryb3BfcGF0aCxcblx0XHRcdFx0fTtcblx0XHRcdFx0aWYgKGNvdW50ID09PSA1KSB7IC8vIE1heCA1IG1vdmllcyB0byBiZSByZWNvbW1lbmRlZFxuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGNvdW50Kys7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiByZWNNb3ZpZXM7XG5cdH0gY2F0Y2ggKGVycikge1xuXHRcdGFsZXJ0KGVycik7XG5cdH1cbn1cblxuLypcblJldHVybnMgYW4gb2JqZWN0IHdpdGggY291bnRyaWVzIGFuZCB0aGUgYXZhaWxhYmxlIHN0cmVhbWluZyBzZXJ2aWNlcywgYnV5XG5vciByZW50IGl0IGNvbWVzIHdpdGggRUFDSCBpbmRpdmlkdWFsIGNvdW50cnkuXG4qL1xuYXN5bmMgZnVuY3Rpb24gZmV0Y2hNb3ZpZVByb3ZpZGVycyhtb3ZpZV9pZCkge1xuXHRjb25zdCBwcm92aWRlcnNCeUNvdW50cnkgPSB7fTtcblx0dHJ5IHtcblx0XHRjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKFxuXHRcdFx0YGh0dHBzOi8vYXBpLnRoZW1vdmllZGIub3JnLzMvbW92aWUvJHttb3ZpZV9pZH0vd2F0Y2gvcHJvdmlkZXJzP2FwaV9rZXk9JHtBUElfS0VZfWAsXG5cdFx0XHR7IG1vZGU6IFwiY29yc1wiIH1cblx0XHQpO1xuXHRcdGNvbnN0IGRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG5cblx0XHRmb3IgKGNvbnN0IGNvdW50cnlDb2RlIGluIGRhdGEucmVzdWx0cykge1xuXHRcdFx0Y29uc3QgY291bnRyeSA9IGNvZGVUb0NvdW50cnlOYW1lKGNvdW50cnlDb2RlKTtcblx0XHRcdHByb3ZpZGVyc0J5Q291bnRyeVtjb3VudHJ5XSA9IHtcblx0XHRcdFx0c3RyZWFtOiBbXSxcblx0XHRcdFx0cmVudDogW10sXG5cdFx0XHRcdGJ1eTogW10sXG5cdFx0XHR9O1xuXG5cdFx0XHQvKlxuXHRcdFx0U29ydHMgcHJvdmlkZXJzIGJhc2VkIG9uIGNvdW50cnkgYW5kIHNlcnZpY2VzIHRoZXkgcHJvdmlkZS5cblxuXHRcdFx0VGFrZXMgaW4gdHlwZSBvZiBzZXJ2aWNlcyBhcyBwYXJhbSA9PiBbXCJmbGF0cmF0ZSAoc3RyZWFtaW5nKVwiLCBcblx0XHRcdFwicmVudFwiLCBcImJ1eVwiXSBhbmQgYW4gYXJyYXkgdG8gYXBwZW5kIGl0IHRvLlxuXHRcdFx0Ki9cblx0XHRcdGNvbnN0IHNvcnRQcm92aWRlcnMgPSAoc2VydmljZXMsIGNvbGxlY3Rpb24pID0+IHtcblx0XHRcdFx0aWYgKHNlcnZpY2VzKSB7XG5cdFx0XHRcdFx0c2VydmljZXMuZm9yRWFjaCgoc2VydmljZSkgPT4ge1xuXHRcdFx0XHRcdFx0Y29uc3QgcHJvdmlkZXJJbmZvID0ge1xuXHRcdFx0XHRcdFx0XHRwcm92aWRlcl9uYW1lOiBzZXJ2aWNlLnByb3ZpZGVyX25hbWUsXG5cdFx0XHRcdFx0XHRcdHByb3ZpZGVyX2xvZ29fcGF0aDogc2VydmljZS5sb2dvX3BhdGgsXG5cdFx0XHRcdFx0XHR9O1xuXHRcdFx0XHRcdFx0Y29sbGVjdGlvbi5wdXNoKHByb3ZpZGVySW5mbyk7XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH1cblx0XHRcdH07XG5cblx0XHRcdC8vIEFkZCBzdHJlYW1pbmcgc2VydmljZXMgZm9yIHNwZWNpZmllZCBtb3ZpZSBpbiBlYWNoIGNvdW50cnkuXG5cdFx0XHRzb3J0UHJvdmlkZXJzKFxuXHRcdFx0XHRkYXRhLnJlc3VsdHNbY291bnRyeUNvZGVdLmZsYXRyYXRlLFxuXHRcdFx0XHRwcm92aWRlcnNCeUNvdW50cnlbY291bnRyeV0uc3RyZWFtXG5cdFx0XHQpO1xuXG5cdFx0XHQvLyBBZGQgcmVudGluZyBzZXJ2aWNlcyBmb3Igc3BlaWNpZmllZCBtb3ZpZSBpbiBlYWNoIGNvdW50cnkuXG5cdFx0XHRzb3J0UHJvdmlkZXJzKFxuXHRcdFx0XHRkYXRhLnJlc3VsdHNbY291bnRyeUNvZGVdLnJlbnQsXG5cdFx0XHRcdHByb3ZpZGVyc0J5Q291bnRyeVtjb3VudHJ5XS5yZW50XG5cdFx0XHQpO1xuXG5cdFx0XHQvLyBBZGQgYnV5aW5nIHNlcnZpY2VzIGZvciBzcGVjaWZpZWQgbW92aWUgaW4gZWFjaCBjb3VudHJ5LlxuXHRcdFx0c29ydFByb3ZpZGVycyhcblx0XHRcdFx0ZGF0YS5yZXN1bHRzW2NvdW50cnlDb2RlXS5idXksXG5cdFx0XHRcdHByb3ZpZGVyc0J5Q291bnRyeVtjb3VudHJ5XS5idXlcblx0XHRcdCk7XG5cdFx0fVxuXHRcdHJldHVybiBwcm92aWRlcnNCeUNvdW50cnk7XG5cdH0gY2F0Y2ggKGVycikge1xuXHRcdGFsZXJ0KGVycik7XG5cdH1cbn1cblxuZnVuY3Rpb24gY29kZVRvQ291bnRyeU5hbWUoY29kZSkge1xuXHRsZXQgcmVnaW9uTmFtZXMgPSBuZXcgSW50bC5EaXNwbGF5TmFtZXMoW1wiZW5cIl0sIHsgdHlwZTogXCJyZWdpb25cIiB9KTtcblx0cmV0dXJuIHJlZ2lvbk5hbWVzLm9mKGNvZGUpO1xufVxuZXhwb3J0IHsgZmV0Y2hNb3ZpZURldGFpbHMsIGZldGNoTW92aWVSZWNjb3MsIGZldGNoTW92aWVQcm92aWRlcnMgfTtcbiIsImltcG9ydCB7IGdldFF1ZXJ5UmVzdWx0IH0gZnJvbSBcIi4vanMvYXBpRnVuY3Rpb25zL3NlYXJjaFwiO1xuaW1wb3J0IGFkZFN1Ym1pdFNlYXJjaEZ1bmN0aW9uIGZyb20gXCIuL2pzL1VJL3N1Ym1pdFNlYXJjaFwiO1xuaW1wb3J0IHsgZmV0Y2hJZCB9IGZyb20gXCIuL2pzL2FwaUZ1bmN0aW9ucy9mZXRjaElkXCI7XG5pbXBvcnQgKiBhcyBtb3ZpZSBmcm9tIFwiLi9qcy9hcGlGdW5jdGlvbnMvZmV0Y2hNb3ZpZUluZm9cIjtcblxuXG5cbmNvbnNvbGUubG9nKFwiSGVsbG8gV29ybGRcIik7XG5mZXRjaElkKCdJUk9OIE1BTicpO1xuXG5mZXRjaE1vdmllRHVtbXkoMTcyNik7XG4vLyBmZXRjaE1vdmllRHVtbXkoMzA5Nyk7IC8vIGZhaWwgdG8gZmV0Y2ggYmVjYXVzZSBpdHMgdHYuXG5mZXRjaE1vdmllRHVtbXkoMTAxMzgpO1xuZmV0Y2hNb3ZpZUR1bW15KDY4NzIxKTtcblxuYXN5bmMgZnVuY3Rpb24gZmV0Y2hNb3ZpZUR1bW15KGlkKSB7XG4gICAgY29uc3QgbW92aWVEZXRhaWxzID0gYXdhaXQgbW92aWUuZmV0Y2hNb3ZpZURldGFpbHMoaWQpO1xuICAgIGNvbnN0IG1vdmllUmVjY29zID0gYXdhaXQgbW92aWUuZmV0Y2hNb3ZpZVJlY2NvcyhpZCk7XG4gICAgY29uc3QgbW92aWVQcm92aWRlcnMgPSBhd2FpdCBtb3ZpZS5mZXRjaE1vdmllUHJvdmlkZXJzKGlkKTtcbiAgICBjb25zb2xlLmxvZyhtb3ZpZURldGFpbHMpO1xuICAgIGNvbnNvbGUubG9nKG1vdmllUmVjY29zKTtcbiAgICBjb25zb2xlLmxvZyhtb3ZpZVByb3ZpZGVycyk7XG59XG5hZGRTdWJtaXRTZWFyY2hGdW5jdGlvbigpOyIsImltcG9ydCB7XG5cdGFwcGx5U2VhcmNoUmVzdWx0LFxuXHRjb2xsZWN0U2VhcmNoUmVzdWx0LFxuXHRmb3JtYXRTZWFyY2hSZXN1bHQsXG59IGZyb20gXCIuLi9ET01GdW5jdGlvbnMvaW5wdXRTZWFyY2hcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYWRkU3VibWl0U2VhcmNoRnVuY3Rpb24oKSB7XG5cdGNvbnN0IHNlYXJjaEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2VhcmNoLXF1ZXJ5XCIpO1xuXHRzZWFyY2hCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGFzeW5jIChldmVudCkgPT4ge1xuXHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cdFx0Y29uc3QgbW92aWVJbmZvID0gYXdhaXQgKGFwcGx5U2VhcmNoUmVzdWx0KCkpO1xuICAgICAgICBjb25zdCBzZWxlY3RlZE1vdmllSW5mbyA9IGF3YWl0IGNvbGxlY3RTZWFyY2hSZXN1bHQobW92aWVJbmZvKTtcbiAgICAgICAgZm9ybWF0U2VhcmNoUmVzdWx0KHNlbGVjdGVkTW92aWVJbmZvLCBcIjUwMFwiKTtcblx0fSk7XG59XG4iLCJpbXBvcnQgeyBnZXRRdWVyeVJlc3VsdCB9IGZyb20gXCIuLi9hcGlGdW5jdGlvbnMvc2VhcmNoXCI7XG5cbmFzeW5jIGZ1bmN0aW9uIGFwcGx5U2VhcmNoUmVzdWx0KCkge1xuXHRjb25zdCByZXN1bHQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNlYXJjaFwiKS52YWx1ZTtcblx0aWYgKCFyZXN1bHQpIHJldHVybjtcblx0Y29uc3QgZGF0YSA9IGF3YWl0IGdldFF1ZXJ5UmVzdWx0KHJlc3VsdCk7XG5cdGNvbnNvbGUubG9nKGRhdGEpO1xuXHRyZXR1cm4gZGF0YTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gY29sbGVjdFNlYXJjaFJlc3VsdChkYXRhKSB7XG5cdGNvbnN0IHJlc3VsdHMgPSBkYXRhLnJlc3VsdHNbMF07XG5cdGNvbnN0IGluZm8gPSB7XG5cdFx0dGl0bGU6IHJlc3VsdHMub3JpZ2luYWxfdGl0bGUsXG5cdFx0bGFuZzogcmVzdWx0cy5vcmlnaW5hbF9sYW5ndWFnZSxcblx0XHRyZWxlYXNlX2RhdGU6IHJlc3VsdHMucmVsZWFzZWRhdGUsXG5cdFx0b3ZlcnZpZXc6IHJlc3VsdHMub3ZlcnZpZXcsXG5cdFx0aW1nX3BhdGg6IHJlc3VsdHMuYmFja2Ryb3BfcGF0aCxcblx0fTtcblx0cmV0dXJuIGluZm87XG59XG5cbmZ1bmN0aW9uIGZvcm1hdFNlYXJjaFJlc3VsdChpbmZvLCBpbWdTaXplID0gXCJcIikge1xuXHRjb25zdCBwYXJhQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5pbmZvXCIpO1xuXHRmb3IgKGxldCBkZXRhaWwgaW4gaW5mbykge1xuXHRcdGNvbnN0IHBhcmEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKTtcblx0XHRwYXJhLnRleHRDb250ZW50ID0gYCR7ZGV0YWlsfTogJHtpbmZvW2RldGFpbF19YDtcblx0XHRwYXJhQ29udGFpbmVyLmFwcGVuZENoaWxkKHBhcmEpOyBcblx0fVxuXHRjb25zdCBiYXNlSW1nVXJsID0gXCJodHRwczovL2ltYWdlLnRtZGIub3JnL3QvcFwiO1xuXHQhaW1nU2l6ZVxuXHRcdD8gKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG5cdFx0XHRcdFwiLnBvc3RlclwiXG5cdFx0ICApLnNyYyA9IGAke2Jhc2VJbWdVcmx9L29yaWdpbmFsLyR7aW5mby5pbWdfcGF0aH1gKVxuXHRcdDogKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG5cdFx0XHRcdFwiLnBvc3RlclwiXG5cdFx0ICApLnNyYyA9IGAke2Jhc2VJbWdVcmx9L3cke2ltZ1NpemV9LyR7aW5mby5pbWdfcGF0aH1gKTtcbn1cblxuZXhwb3J0IHsgYXBwbHlTZWFyY2hSZXN1bHQsIGNvbGxlY3RTZWFyY2hSZXN1bHQsIGZvcm1hdFNlYXJjaFJlc3VsdCB9O1xuIl0sIm5hbWVzIjpbIkFQSV9LRVkiLCJhc3luYyIsImZldGNoTW92aWVEdW1teSIsImlkIiwibW92aWVEZXRhaWxzIiwibW92aWVfaWQiLCJyZXNwb25zZSIsImZldGNoIiwibW9kZSIsImRhdGEiLCJqc29uIiwiZ2VucmVzIiwicmVkdWNlIiwiYWNjIiwidmFsIiwibmFtZSIsIm9yaWdpbmFsX3RpdGxlIiwic3VtbWFyeSIsIm92ZXJ2aWV3IiwidGFnbGluZSIsInBvcHVsYXJpdHkiLCJ2b3RlX2F2ZXJhZ2UiLCJ2b3RlX2NvdW50IiwidmlkZW8iLCJydW50aW1lIiwicG9zdGVyX3BhdGgiLCJiYWNrZHJvcF9wYXRoIiwiZXJyIiwiYWxlcnQiLCJtb3ZpZVJlY2NvcyIsInJlY01vdmllcyIsInJlc3VsdHMiLCJjb3VudCIsIm1vdmllIiwibW92aWVQcm92aWRlcnMiLCJwcm92aWRlcnNCeUNvdW50cnkiLCJjb3VudHJ5Q29kZSIsImNvdW50cnkiLCJjb2RlIiwiSW50bCIsIkRpc3BsYXlOYW1lcyIsInR5cGUiLCJvZiIsInN0cmVhbSIsInJlbnQiLCJidXkiLCJzb3J0UHJvdmlkZXJzIiwic2VydmljZXMiLCJjb2xsZWN0aW9uIiwiZm9yRWFjaCIsInNlcnZpY2UiLCJwcm92aWRlckluZm8iLCJwcm92aWRlcl9uYW1lIiwicHJvdmlkZXJfbG9nb19wYXRoIiwibG9nb19wYXRoIiwicHVzaCIsImZsYXRyYXRlIiwiY29uc29sZSIsImxvZyIsInF1ZXJ5Iiwic3BsaXQiLCJqb2luIiwiaW50ZXJwcmV0VG9RdWVyeSIsImlkcyIsInJlc3VsdCIsImxlbmd0aCIsImkiLCJtZWRpYV90eXBlIiwiZmV0Y2hJZCIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsImFkZEV2ZW50TGlzdGVuZXIiLCJldmVudCIsInByZXZlbnREZWZhdWx0IiwibW92aWVJbmZvIiwiZ2V0RWxlbWVudEJ5SWQiLCJ2YWx1ZSIsImlucHV0IiwiaW50ZXJwcmV0UXVlcnlSZXN1bHQiLCJnZXRRdWVyeVJlc3VsdCIsImluZm8iLCJpbWdTaXplIiwicGFyYUNvbnRhaW5lciIsImRldGFpbCIsInBhcmEiLCJjcmVhdGVFbGVtZW50IiwidGV4dENvbnRlbnQiLCJhcHBlbmRDaGlsZCIsImJhc2VJbWdVcmwiLCJzcmMiLCJpbWdfcGF0aCIsImZvcm1hdFNlYXJjaFJlc3VsdCIsInRpdGxlIiwibGFuZyIsIm9yaWdpbmFsX2xhbmd1YWdlIiwicmVsZWFzZV9kYXRlIiwicmVsZWFzZWRhdGUiLCJjb2xsZWN0U2VhcmNoUmVzdWx0Il0sInNvdXJjZVJvb3QiOiIifQ==