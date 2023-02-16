(()=>{"use strict";const t="720d2150cf09bfa61e28a5042cd7468f",e="720d2150cf09bfa61e28a5042cd7468f";async function a(t){try{const a=await fetch(`https://api.themoviedb.org/3/movie/${t}?api_key=${e}&language=en-US`,{mode:"cors"}),n=await a.json(),o=n.genres.reduce(((t,e)=>[...t,e.name]),[]);return{mName:n.original_title,summary:n.overview,tagline:n.tagline,popularity:n.popularity,vote_average:n.vote_average,vote_count:n.vote_count,genres:o,video:n.video,runtime:n.runtime,poster_path:n.poster_path,backdrop_path:n.backdrop_path}}catch(t){alert(t)}}async function n(t){try{const a=await fetch(`https://api.themoviedb.org/3/movie/${t}/recommendations?api_key=${e}&language=en-US&page=1`,{mode:"cors"}),n=await a.json(),o={};if(n.results){let t=1;for(let e of n.results){if(o[e.original_title]={mName:e.original_title,id:e.id,poster_path:e.poster_path,backdrop_path:e.backdrop_path},5===t)break;t++}}return o}catch(t){alert(t)}}async function o(t){const a={};try{const o=await fetch(`https://api.themoviedb.org/3/movie/${t}/watch/providers?api_key=${e}`,{mode:"cors"}),r=await o.json();for(const t in r.results){const e=(n=t,new Intl.DisplayNames(["en"],{type:"region"}).of(n));a[e]={stream:[],rent:[],buy:[]};const o=(t,e)=>{t&&t.forEach((t=>{const a={provider_name:t.provider_name,provider_logo_path:t.logo_path};e.push(a)}))};o(r.results[t].flatrate,a[e].stream),o(r.results[t].rent,a[e].rent),o(r.results[t].buy,a[e].buy)}return a}catch(t){alert(t)}var n}async function r(t){try{let n;const o=await fetch(`https://api.themoviedb.org/3/movie/${t}/videos?api_key=${e}`,{mode:"cors"}),r=(await o.json()).results.filter((t=>"Trailer"===t.type));if(0===r.length)return!1;const i=r.filter((t=>{t.official}));return n=0!==i.length?i[0]:r[0],{mName:n.name,key:n.key,site:n.site,type:n.type,lang:(a=n.iso_639_1,new Intl.DisplayNames(["en"],{type:"language"}).of(a))}}catch(t){alert(t)}var a}async function i(t){try{let a=[];const n=await fetch(`https://api.themoviedb.org/3/movie/${t}/reviews?api_key=${e}&language=en-US&page=1`,{mode:"cors"}),o=await n.json();if(console.log(o),0===o.results.length)return!1;let r=1;return o.results.forEach((t=>{a.push({author:t.author,rating:t.author_details.rating,pic_path:t.author_details.avatar_path,content:t.content,url:t.url,last_updated:t.updated_at}),r++})),a.slice(0,5)}catch(t){alert(t)}}const c=async(t,e)=>{const c=document.createElement("section"),s=await u(t,a);function l(t){c.appendChild(t)}async function u(t,a,n){return"movie"===e?await a(t):""}await u(t,n),await u(t,o),await u(t,r),await u(t,i);const d=t=>{const e=document.createElement("div");e.classList.add("intro"),e.appendChild(function(){const t=document.createElement("h1");return t.textContent=s.mName,t.classList.add("title"),t}()),s.tagline&&e.appendChild(function(){const t=document.createElement("p");return t.textContent=s.tagline,t.classList.add("tagline"),t}());const a=function(t=""){const e=document.createElement("img"),a="https://image.tmdb.org/t/p";let n;if(e.classList.add("poster"),s.poster_path)n=s.poster_path;else{if(!s.backdrop_path)return;n=s.backdrop_path}return e.src=t?`${a}/w${t}/${n}`:`${a}/original/${n}`,e.alt="Movie picture poster",e}(t);return a&&e.appendChild(a),e.appendChild(function(){const t=document.createElement("p");return t.textContent=s.summary,t.classList.add("summary"),t}()),e};return{section:c,addToSection:l,drawAll:function(){l(d())},drawIntro:d,drawSubInfos:()=>{const t=document.createElement("div");function e(t,e){const a=document.createElement("div"),n=document.createElement("span"),o=document.createElement("span");return a.classList.add("sub-info"),n.classList.add("category-name"),o.classList.add("category-info"),n.textContent=t,o.textContent=e,[n,o].forEach((t=>a.appendChild(t))),a}return t.classList.add("subinfo-container"),[e("Genres:",s.genres.join(", ")),e("Runtime:",function(t){const e=t/60,a=Math.floor(e),n=60*(e-a);return`${a}h ${Math.round(n)}min`}(s.runtime)),e("Vote Average:",s.vote_average),e("Vote Count:",s.vote_count),e("Popularity:",s.popularity)].forEach((e=>t.appendChild(e))),t}}};async function s(e){const a=await async function(e){const a=function(t){return t.split(" ").join("+")}(e);try{const n=await fetch(`https://api.themoviedb.org/3/search/multi?api_key=${t}&language=en-US&query=${a}&page=1`,{mode:"cors"}),o=await n.json();let r={},i=o.results;if(i.length){if(i.length>4)for(let t=0;t<5;t++)r[i[t].id]=i[t].media_type;else for(let t=0;t<i.length;t++)r[i[t].id]=i[t].media_type;return console.log(r),r}return void alert(`No results found for ${e}`)}catch(t){alert(t)}}(e),n=document.querySelector(".main-container");let o=[];for(let t in a)"movie"===a[t]&&o.push([t,a[t]]);async function r(t,e){const a=await c(t,e);return a.addToSection(a.drawIntro("300")),a.addToSection(a.drawSubInfos()),n.appendChild(a.section),r}o.forEach((async t=>await r(t[0],t[1])))}console.log("Hello World"),async function(){document.querySelector(".search-query").addEventListener("click",(async t=>{t.preventDefault();const e=document.getElementById("input-search").value.split(" ").join("+");e?(document.querySelector(".main-container").innerHTML="",await s(e),document.querySelector(".search-query").value=""):alert("Please enter a valid movie/tv show")}))}(),s("iron man")})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LGlCQUNJb0YsU0FBU3dELGNBQWMsaUJBQy9CRyxpQkFBaUIsU0FBUy9JLE1BQU9nSixJQUMxQ0EsRUFBRUMsaUJBQ0YsTUFBTWIsRUFBeUJoRCxTQUFTOEQsZUFBZSxnQkFBZ0JDLE1BVXpEZCxNQUFNLEtBQUtaLEtBQUssS0FUMUJXLEdGd0JRaEQsU0FBU3dELGNBQWMsbUJBQy9CUSxVQUFZLFNFdkJWbEIsRUFBYUUsR0FFbkJoRCxTQUFTd0QsY0FBYyxpQkFBaUJPLE1BQVEsSUFKcEN6SCxNQUFNLHFDQUlnQyxHQUVwRCxDRGVBMkgsR0FDQW5CLEVBQWEsVyIsInNvdXJjZXMiOlsid2VicGFjazovL21vdmllbWF0ZS8uL3NyYy9qcy9hcGlGdW5jdGlvbnMvZmV0Y2hJZC5qcyIsIndlYnBhY2s6Ly9tb3ZpZW1hdGUvLi9zcmMvanMvYXBpRnVuY3Rpb25zL2ZldGNoTW92aWVJbmZvLmpzIiwid2VicGFjazovL21vdmllbWF0ZS8uL3NyYy9qcy9ET01GdW5jdGlvbnMvZHJhd1NlY3Rpb24uanMiLCJ3ZWJwYWNrOi8vbW92aWVtYXRlLy4vc3JjL2pzL0RPTUZ1bmN0aW9ucy9kcmF3U2VjdGlvbnMuanMiLCJ3ZWJwYWNrOi8vbW92aWVtYXRlLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovL21vdmllbWF0ZS8uL3NyYy9qcy9VSS9zdWJtaXRTZWFyY2guanMiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgQVBJX0tFWSA9IFwiNzIwZDIxNTBjZjA5YmZhNjFlMjhhNTA0MmNkNzQ2OGZcIjtcbi8qXG5GZXRjaGVzIHRoZSBmaXJzdCA1IG1vdmllL3Nob3cgaWRzIGFuZCByZXR1cm4gaXQgaW4gYW4gYXJyYXkuXG4qL1xuYXN5bmMgZnVuY3Rpb24gZmV0Y2hJZHMobmFtZSkge1xuXHRjb25zdCBxdWVyeSA9IGludGVycHJldFRvUXVlcnkobmFtZSk7XG5cdHRyeSB7XG5cdFx0Y29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChcblx0XHRcdGBodHRwczovL2FwaS50aGVtb3ZpZWRiLm9yZy8zL3NlYXJjaC9tdWx0aT9hcGlfa2V5PSR7QVBJX0tFWX0mbGFuZ3VhZ2U9ZW4tVVMmcXVlcnk9JHtxdWVyeX0mcGFnZT0xYCxcblx0XHRcdHsgbW9kZTogXCJjb3JzXCIgfVxuXHRcdCk7XG5cdFx0Y29uc3QgZGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcblx0XHRsZXQgaWRzID0ge307XG5cdFx0bGV0IHJlc3VsdCA9IGRhdGEucmVzdWx0cztcblx0XHRpZiAocmVzdWx0Lmxlbmd0aCkge1xuXHRcdFx0aWYgKHJlc3VsdC5sZW5ndGggPiA0KSB7XG5cdFx0XHRcdGZvciAobGV0IGkgPSAwOyBpIDwgNTsgaSsrKSB7XG5cdFx0XHRcdFx0aWRzW3Jlc3VsdFtpXS5pZF0gPSByZXN1bHRbaV0ubWVkaWFfdHlwZTtcblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCByZXN1bHQubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0XHRpZHNbcmVzdWx0W2ldLmlkXSA9IHJlc3VsdFtpXS5tZWRpYV90eXBlO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRjb25zb2xlLmxvZyhpZHMpO1xuXHRcdFx0cmV0dXJuIGlkcztcblx0XHR9IGVsc2Uge1xuXHRcdFx0YWxlcnQoYE5vIHJlc3VsdHMgZm91bmQgZm9yICR7bmFtZX1gKTtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cdH0gY2F0Y2ggKGVycikge1xuXHRcdGFsZXJ0KGVycik7XG5cdH1cbn1cblxuZnVuY3Rpb24gaW50ZXJwcmV0VG9RdWVyeShuYW1lKSB7XG5cdHJldHVybiBuYW1lLnNwbGl0KFwiIFwiKS5qb2luKFwiK1wiKTtcbn1cblxuZXhwb3J0IHsgZmV0Y2hJZHMgfTtcbiIsIlxuY29uc3QgQVBJX0tFWSA9IFwiNzIwZDIxNTBjZjA5YmZhNjFlMjhhNTA0MmNkNzQ2OGZcIjtcblxuYXN5bmMgZnVuY3Rpb24gZmV0Y2hNb3ZpZURldGFpbHMobW92aWVfaWQpIHtcblx0dHJ5IHtcblx0XHRjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKFxuXHRcdFx0YGh0dHBzOi8vYXBpLnRoZW1vdmllZGIub3JnLzMvbW92aWUvJHttb3ZpZV9pZH0/YXBpX2tleT0ke0FQSV9LRVl9Jmxhbmd1YWdlPWVuLVVTYCxcblx0XHRcdHsgbW9kZTogXCJjb3JzXCIgfVxuXHRcdCk7XG5cdFx0Y29uc3QgZGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcblxuXHRcdGNvbnN0IGdlbnJlcyA9IGRhdGEuZ2VucmVzLnJlZHVjZSgoYWNjLCB2YWwpID0+IFsuLi5hY2MsIHZhbC5uYW1lXSwgW10pO1xuXG5cdFx0Y29uc3QgZ2VuZXJhbEluZm8gPSB7XG5cdFx0XHRtTmFtZTogZGF0YS5vcmlnaW5hbF90aXRsZSxcblx0XHRcdHN1bW1hcnk6IGRhdGEub3ZlcnZpZXcsXG5cdFx0XHR0YWdsaW5lOiBkYXRhLnRhZ2xpbmUsXG5cdFx0XHRwb3B1bGFyaXR5OiBkYXRhLnBvcHVsYXJpdHksXG5cdFx0XHR2b3RlX2F2ZXJhZ2U6IGRhdGEudm90ZV9hdmVyYWdlLFxuXHRcdFx0dm90ZV9jb3VudDogZGF0YS52b3RlX2NvdW50LFxuXHRcdFx0Z2VucmVzOiBnZW5yZXMsXG5cdFx0XHR2aWRlbzogZGF0YS52aWRlbyxcblx0XHRcdHJ1bnRpbWU6IGRhdGEucnVudGltZSxcblx0XHRcdHBvc3Rlcl9wYXRoOiBkYXRhLnBvc3Rlcl9wYXRoLFxuXHRcdFx0YmFja2Ryb3BfcGF0aDogZGF0YS5iYWNrZHJvcF9wYXRoLFxuXHRcdH07XG5cdFx0cmV0dXJuIGdlbmVyYWxJbmZvO1xuXHR9IGNhdGNoIChlcnIpIHtcblx0XHRhbGVydChlcnIpO1xuXHR9XG59XG5cbi8qXG5SZXR1cm5zIGFuIGFycmF5IG9mIHJlY29tbWVuZGVkIG1vdmllcyB3aXRoIHRoZWlyIG5hbWUsIGlkLCBwb3N0ZXJfcGF0aCBhbmRcbmJhY2tkcm9wX3BhdGggcmVjb3JkZWQuIFxuSWYgbm8gbW92aWVzIGFyZSByZWNvbW1lbmRlZCwgcmV0dXJuIG51bGw7XG4qL1xuYXN5bmMgZnVuY3Rpb24gZmV0Y2hNb3ZpZVJlY2Nvcyhtb3ZpZV9pZCkge1xuXHR0cnkge1xuXHRcdGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goXG5cdFx0XHRgaHR0cHM6Ly9hcGkudGhlbW92aWVkYi5vcmcvMy9tb3ZpZS8ke21vdmllX2lkfS9yZWNvbW1lbmRhdGlvbnM/YXBpX2tleT0ke0FQSV9LRVl9Jmxhbmd1YWdlPWVuLVVTJnBhZ2U9MWAsXG5cdFx0XHR7IG1vZGU6IFwiY29yc1wiIH1cblx0XHQpO1xuXHRcdGNvbnN0IGRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG5cblx0XHRjb25zdCByZWNNb3ZpZXMgPSB7fTtcblx0XHRpZiAoZGF0YS5yZXN1bHRzKSB7XG5cdFx0XHRsZXQgY291bnQgPSAxO1xuXHRcdFx0Zm9yIChsZXQgbW92aWUgb2YgZGF0YS5yZXN1bHRzKSB7XG5cdFx0XHRcdHJlY01vdmllc1ttb3ZpZS5vcmlnaW5hbF90aXRsZV0gPSB7XG5cdFx0XHRcdFx0bU5hbWU6IG1vdmllLm9yaWdpbmFsX3RpdGxlLFxuXHRcdFx0XHRcdGlkOiBtb3ZpZS5pZCxcblx0XHRcdFx0XHRwb3N0ZXJfcGF0aDogbW92aWUucG9zdGVyX3BhdGgsXG5cdFx0XHRcdFx0YmFja2Ryb3BfcGF0aDogbW92aWUuYmFja2Ryb3BfcGF0aCxcblx0XHRcdFx0fTtcblx0XHRcdFx0aWYgKGNvdW50ID09PSA1KSB7XG5cdFx0XHRcdFx0Ly8gTWF4IDUgbW92aWVzIHRvIGJlIHJlY29tbWVuZGVkXG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdH1cblx0XHRcdFx0Y291bnQrKztcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIHJlY01vdmllcztcblx0fSBjYXRjaCAoZXJyKSB7XG5cdFx0YWxlcnQoZXJyKTtcblx0fVxufVxuXG4vKlxuUmV0dXJucyBhbiBvYmplY3Qgd2l0aCBjb3VudHJpZXMgYW5kIHRoZSBhdmFpbGFibGUgc3RyZWFtaW5nIHNlcnZpY2VzLCBidXlcbm9yIHJlbnQgaXQgY29tZXMgd2l0aCBFQUNIIGluZGl2aWR1YWwgY291bnRyeS5cbiovXG5hc3luYyBmdW5jdGlvbiBmZXRjaE1vdmllUHJvdmlkZXJzKG1vdmllX2lkKSB7XG5cdGNvbnN0IHByb3ZpZGVyc0J5Q291bnRyeSA9IHt9O1xuXHR0cnkge1xuXHRcdGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goXG5cdFx0XHRgaHR0cHM6Ly9hcGkudGhlbW92aWVkYi5vcmcvMy9tb3ZpZS8ke21vdmllX2lkfS93YXRjaC9wcm92aWRlcnM/YXBpX2tleT0ke0FQSV9LRVl9YCxcblx0XHRcdHsgbW9kZTogXCJjb3JzXCIgfVxuXHRcdCk7XG5cdFx0Y29uc3QgZGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcblxuXHRcdGZvciAoY29uc3QgY291bnRyeUNvZGUgaW4gZGF0YS5yZXN1bHRzKSB7XG5cdFx0XHRjb25zdCBjb3VudHJ5ID0gZ2V0Q291bnRyeU5hbWUoY291bnRyeUNvZGUpO1xuXHRcdFx0cHJvdmlkZXJzQnlDb3VudHJ5W2NvdW50cnldID0ge1xuXHRcdFx0XHRzdHJlYW06IFtdLFxuXHRcdFx0XHRyZW50OiBbXSxcblx0XHRcdFx0YnV5OiBbXSxcblx0XHRcdH07XG5cblx0XHRcdC8qXG5cdFx0XHRTb3J0cyBwcm92aWRlcnMgYmFzZWQgb24gY291bnRyeSBhbmQgc2VydmljZXMgdGhleSBwcm92aWRlLlxuXG5cdFx0XHRUYWtlcyBpbiB0eXBlIG9mIHNlcnZpY2VzIGFzIHBhcmFtID0+IFtcImZsYXRyYXRlIChzdHJlYW1pbmcpXCIsIFxuXHRcdFx0XCJyZW50XCIsIFwiYnV5XCJdIGFuZCBhbiBhcnJheSB0byBhcHBlbmQgaXQgdG8uXG5cdFx0XHQqL1xuXHRcdFx0Y29uc3Qgc29ydFByb3ZpZGVycyA9IChzZXJ2aWNlcywgY29sbGVjdGlvbikgPT4ge1xuXHRcdFx0XHRpZiAoc2VydmljZXMpIHtcblx0XHRcdFx0XHRzZXJ2aWNlcy5mb3JFYWNoKChzZXJ2aWNlKSA9PiB7XG5cdFx0XHRcdFx0XHRjb25zdCBwcm92aWRlckluZm8gPSB7XG5cdFx0XHRcdFx0XHRcdHByb3ZpZGVyX25hbWU6IHNlcnZpY2UucHJvdmlkZXJfbmFtZSxcblx0XHRcdFx0XHRcdFx0cHJvdmlkZXJfbG9nb19wYXRoOiBzZXJ2aWNlLmxvZ29fcGF0aCxcblx0XHRcdFx0XHRcdH07XG5cdFx0XHRcdFx0XHRjb2xsZWN0aW9uLnB1c2gocHJvdmlkZXJJbmZvKTtcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0fVxuXHRcdFx0fTtcblxuXHRcdFx0Ly8gQWRkIHN0cmVhbWluZyBzZXJ2aWNlcyBmb3Igc3BlY2lmaWVkIG1vdmllIGluIGVhY2ggY291bnRyeS5cblx0XHRcdHNvcnRQcm92aWRlcnMoXG5cdFx0XHRcdGRhdGEucmVzdWx0c1tjb3VudHJ5Q29kZV0uZmxhdHJhdGUsXG5cdFx0XHRcdHByb3ZpZGVyc0J5Q291bnRyeVtjb3VudHJ5XS5zdHJlYW1cblx0XHRcdCk7XG5cblx0XHRcdC8vIEFkZCByZW50aW5nIHNlcnZpY2VzIGZvciBzcGVpY2lmaWVkIG1vdmllIGluIGVhY2ggY291bnRyeS5cblx0XHRcdHNvcnRQcm92aWRlcnMoXG5cdFx0XHRcdGRhdGEucmVzdWx0c1tjb3VudHJ5Q29kZV0ucmVudCxcblx0XHRcdFx0cHJvdmlkZXJzQnlDb3VudHJ5W2NvdW50cnldLnJlbnRcblx0XHRcdCk7XG5cblx0XHRcdC8vIEFkZCBidXlpbmcgc2VydmljZXMgZm9yIHNwZWNpZmllZCBtb3ZpZSBpbiBlYWNoIGNvdW50cnkuXG5cdFx0XHRzb3J0UHJvdmlkZXJzKFxuXHRcdFx0XHRkYXRhLnJlc3VsdHNbY291bnRyeUNvZGVdLmJ1eSxcblx0XHRcdFx0cHJvdmlkZXJzQnlDb3VudHJ5W2NvdW50cnldLmJ1eVxuXHRcdFx0KTtcblx0XHR9XG5cdFx0cmV0dXJuIHByb3ZpZGVyc0J5Q291bnRyeTtcblx0fSBjYXRjaCAoZXJyKSB7XG5cdFx0YWxlcnQoZXJyKTtcblx0fVxufVxuXG4vLyBGaW5kIG1vdmllIHRyYWlsZXIgYW5kIHJldHVybiBmYWxzZSBpZiBub25lIGNhbiBiZSBmb3VuZC5cbi8vIE9mZmljaWFsIHRyYWlsZXIgd2lsbCBiZSBwcmlvcml0aXNlZC5cbmFzeW5jIGZ1bmN0aW9uIGZldGNoTW92aWVUcmFpbGVyKG1vdmllX2lkKSB7XG5cdHRyeSB7XG5cdFx0bGV0IG1vdmllVHJhaWxlcjtcblx0XHRjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKFxuXHRcdFx0YGh0dHBzOi8vYXBpLnRoZW1vdmllZGIub3JnLzMvbW92aWUvJHttb3ZpZV9pZH0vdmlkZW9zP2FwaV9rZXk9JHtBUElfS0VZfWAsXG5cdFx0XHR7IG1vZGU6IFwiY29yc1wiIH1cblx0XHQpO1xuXHRcdGNvbnN0IGRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG5cblx0XHRjb25zdCB0cmFpbGVycyA9IGRhdGEucmVzdWx0cy5maWx0ZXIoKHZpZGVvKSA9PiB2aWRlby50eXBlID09PSBcIlRyYWlsZXJcIik7XG5cblx0XHRpZiAodHJhaWxlcnMubGVuZ3RoID09PSAwKSByZXR1cm4gZmFsc2U7XG5cdFx0Ly8gRmluZCBvZmZpY2lhbCB0cmFpbGVyLlxuXHRcdGNvbnN0IG9mZmljaWFsID0gdHJhaWxlcnMuZmlsdGVyKCh2aWRlbykgPT4ge1xuXHRcdFx0dmlkZW8ub2ZmaWNpYWwgPT09IHRydWU7XG5cdFx0fSk7XG5cblx0XHRvZmZpY2lhbC5sZW5ndGggIT09IDBcblx0XHRcdD8gKG1vdmllVHJhaWxlciA9IG9mZmljaWFsWzBdKVxuXHRcdFx0OiAobW92aWVUcmFpbGVyID0gdHJhaWxlcnNbMF0pO1xuXG5cdFx0cmV0dXJuIHtcblx0XHRcdG1OYW1lOiBtb3ZpZVRyYWlsZXIubmFtZSxcblx0XHRcdGtleTogbW92aWVUcmFpbGVyLmtleSxcblx0XHRcdHNpdGU6IG1vdmllVHJhaWxlci5zaXRlLFxuXHRcdFx0dHlwZTogbW92aWVUcmFpbGVyLnR5cGUsXG5cdFx0XHRsYW5nOiBnZXRMYW5ndWFnZShtb3ZpZVRyYWlsZXIuaXNvXzYzOV8xKSxcblx0XHR9O1xuXHR9IGNhdGNoIChlcnIpIHtcblx0XHRhbGVydChlcnIpO1xuXHR9XG59XG5cbi8vIFJldHVybnMgYW4gYXJyIG9mIGEgbWF4aW11bSBvZiA1IHJldmlld3MgYmFzZWQgb24gdGhlIG1vdmllIGZyb20gcmFuZG9tIHNvdXJjZXMuXG4vLyBJZiBubyByZXZpZXdzIGFyZSBmb3VuZCwgdGhpcyBmbmMgcmV0dXJucyBmYWxzZS5cbmFzeW5jIGZ1bmN0aW9uIGZldGNoTW92aWVSZXZpZXdzKG1vdmllX2lkKSB7XG5cdHRyeSB7XG5cdFx0bGV0IHJldmlld3MgPSBbXTtcblx0XHRjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKFxuXHRcdFx0YGh0dHBzOi8vYXBpLnRoZW1vdmllZGIub3JnLzMvbW92aWUvJHttb3ZpZV9pZH0vcmV2aWV3cz9hcGlfa2V5PSR7QVBJX0tFWX0mbGFuZ3VhZ2U9ZW4tVVMmcGFnZT0xYCxcblx0XHRcdHsgbW9kZTogXCJjb3JzXCIgfVxuXHRcdCk7XG5cdFx0Y29uc3QgZGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcblx0XHRjb25zb2xlLmxvZyhkYXRhKTtcblx0XHRpZiAoZGF0YS5yZXN1bHRzLmxlbmd0aCA9PT0gMCkgcmV0dXJuIGZhbHNlO1xuXG5cdFx0bGV0IGNvdW50ID0gMTtcblx0XHRkYXRhLnJlc3VsdHMuZm9yRWFjaCgocmV2aWV3KSA9PiB7XG5cdFx0XHRyZXZpZXdzLnB1c2goe1xuXHRcdFx0XHRhdXRob3I6IHJldmlldy5hdXRob3IsXG5cdFx0XHRcdHJhdGluZzogcmV2aWV3LmF1dGhvcl9kZXRhaWxzLnJhdGluZyxcblx0XHRcdFx0cGljX3BhdGg6IHJldmlldy5hdXRob3JfZGV0YWlscy5hdmF0YXJfcGF0aCxcblx0XHRcdFx0Y29udGVudDogcmV2aWV3LmNvbnRlbnQsXG5cdFx0XHRcdHVybDogcmV2aWV3LnVybCxcblx0XHRcdFx0bGFzdF91cGRhdGVkOiByZXZpZXcudXBkYXRlZF9hdCxcblx0XHRcdH0pO1xuXHRcdFx0Y291bnQrKztcblx0XHR9KTtcblx0XHRyZXR1cm4gcmV2aWV3cy5zbGljZSgwLCA1KTs7XG5cdH0gY2F0Y2ggKGVycikge1xuXHRcdGFsZXJ0KGVycik7XG5cdH1cbn1cblxuZnVuY3Rpb24gZ2V0Q291bnRyeU5hbWUoY29kZSkge1xuXHRsZXQgcmVnaW9uTmFtZXMgPSBuZXcgSW50bC5EaXNwbGF5TmFtZXMoW1wiZW5cIl0sIHsgdHlwZTogXCJyZWdpb25cIiB9KTtcblx0cmV0dXJuIHJlZ2lvbk5hbWVzLm9mKGNvZGUpO1xufVxuXG5mdW5jdGlvbiBnZXRMYW5ndWFnZShjb2RlKSB7XG5cdGNvbnN0IGxhbmcgPSBuZXcgSW50bC5EaXNwbGF5TmFtZXMoW1wiZW5cIl0sIHsgdHlwZTogXCJsYW5ndWFnZVwiIH0pO1xuXHRyZXR1cm4gbGFuZy5vZihjb2RlKTtcbn1cbmV4cG9ydCB7XG5cdGZldGNoTW92aWVEZXRhaWxzLFxuXHRmZXRjaE1vdmllUmVjY29zLFxuXHRmZXRjaE1vdmllUHJvdmlkZXJzLFxuXHRmZXRjaE1vdmllVHJhaWxlcixcblx0ZmV0Y2hNb3ZpZVJldmlld3MsXG59O1xuIiwiaW1wb3J0ICogYXMgbW92aWUgZnJvbSBcIi4uL2FwaUZ1bmN0aW9ucy9mZXRjaE1vdmllSW5mb1wiO1xuXG4vKlxuRHJhdyBhbiBpbmRpdmlkdWFsIHNlY3Rpb24gYmFzZWQgb24gdXNlciBpbnB1dCBxdWVyeS5cblRoaXMgc2VjdGlvbiB3aWxsIGNvbnN0cyBvZiB0aGUgb3ZlcmFsbCBtb3ZpZS90didzIFxuICAgIC0gRGV0YWlscyxcbiAgICAtIFRoZSB3YXRjaCBwcm92aWRlcnMgYmFzZWQgb24gc3BlY2lmaWMgY291bnRyaWVzXG4gICAgLSBBdmFpbGFibGUgdHJhaWxlcnMsXG4gICAgLSBPdGhlciByZWNvbW1lbmRhdGlvbnMuXG4gICAgLSBSZXZpZXdzIGJ5IGVzdGFibGlzaGVkIGF1dGhvcnMgYmFzZWQgZnJvbSByYW5kb20gc291cmNlcy5cbiovXG5cbmNvbnN0IGRyYXdTZWN0aW9uID0gYXN5bmMgKGlkLCBtZWRpYSkgPT4ge1xuXHRjb25zdCBzZWN0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNlY3Rpb25cIik7XG5cdGNvbnN0IGRldGFpbHMgPSBhd2FpdCBnZXRJbmZvKGlkLCBtb3ZpZS5mZXRjaE1vdmllRGV0YWlscywgXCJcIik7XG5cdGNvbnN0IHJlY3MgPSBhd2FpdCBnZXRJbmZvKGlkLCBtb3ZpZS5mZXRjaE1vdmllUmVjY29zLCBcIlwiKTtcblx0Y29uc3QgcHJvdmlkZXJzID0gYXdhaXQgZ2V0SW5mbyhpZCwgbW92aWUuZmV0Y2hNb3ZpZVByb3ZpZGVycywgXCJcIik7XG5cdGNvbnN0IHRyYWlsZXIgPSBhd2FpdCBnZXRJbmZvKGlkLCBtb3ZpZS5mZXRjaE1vdmllVHJhaWxlciwgXCJcIik7XG5cdGNvbnN0IHJldmlld3MgPSBhd2FpdCBnZXRJbmZvKGlkLCBtb3ZpZS5mZXRjaE1vdmllUmV2aWV3cywgXCJcIik7XG5cblx0ZnVuY3Rpb24gZHJhd0FsbCgpIHtcblx0XHRhZGRUb1NlY3Rpb24oZHJhd0ludHJvKCkpO1xuXHR9XG5cblx0ZnVuY3Rpb24gYWRkVG9TZWN0aW9uKHBhcnQpIHtcblx0XHRzZWN0aW9uLmFwcGVuZENoaWxkKHBhcnQpO1xuXHR9XG5cblx0YXN5bmMgZnVuY3Rpb24gZ2V0SW5mbyhpZCwgbW92aWVGbmMsIHR2Rm5jKSB7XG5cdFx0cmV0dXJuIG1lZGlhID09PSBcIm1vdmllXCIgPyBhd2FpdCBtb3ZpZUZuYyhpZCkgOiBcIlwiO1xuXHR9XG5cblx0Ly8gRHJhdyAoaWYgYW55KSB0aXRsZSwgcGhvdG8sIHRhZ2xpbmUsIGFuZCBzdW1tYXJ5LlxuXHRjb25zdCBkcmF3SW50cm8gPSAoaW1nU2l6ZSkgPT4ge1xuXHRcdGNvbnN0IGludHJvQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcblx0XHRpbnRyb0NvbnRhaW5lci5jbGFzc0xpc3QuYWRkKFwiaW50cm9cIik7XG5cblx0XHRpbnRyb0NvbnRhaW5lci5hcHBlbmRDaGlsZChjcmVhdGVUaXRsZSgpKTtcblx0XHRkZXRhaWxzLnRhZ2xpbmUgPyBpbnRyb0NvbnRhaW5lci5hcHBlbmRDaGlsZCh3cml0ZVRhZ2xpbmUoKSkgOiBcIlwiO1xuXG5cdFx0Y29uc3QgaW1nID0gcmVuZGVySW1nKGltZ1NpemUpO1xuXHRcdGltZyA/IGludHJvQ29udGFpbmVyLmFwcGVuZENoaWxkKGltZykgOiBcIlwiO1xuXG5cdFx0aW50cm9Db250YWluZXIuYXBwZW5kQ2hpbGQod3JpdGVTdW1tYXJ5KCkpO1xuXG5cdFx0ZnVuY3Rpb24gY3JlYXRlVGl0bGUoKSB7XG5cdFx0XHRjb25zdCB0aXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMVwiKTtcblx0XHRcdHRpdGxlLnRleHRDb250ZW50ID0gZGV0YWlscy5tTmFtZTtcblx0XHRcdHRpdGxlLmNsYXNzTGlzdC5hZGQoXCJ0aXRsZVwiKTtcblx0XHRcdHJldHVybiB0aXRsZTtcblx0XHR9XG5cblx0XHRmdW5jdGlvbiByZW5kZXJJbWcoaW1nU2l6ZSA9IFwiXCIpIHtcblx0XHRcdGNvbnN0IHBvc3RlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbWdcIik7XG5cdFx0XHRjb25zdCBiYXNlSW1nVXJsID0gXCJodHRwczovL2ltYWdlLnRtZGIub3JnL3QvcFwiO1xuXHRcdFx0bGV0IGltZ19wYXRoO1xuXHRcdFx0cG9zdGVyLmNsYXNzTGlzdC5hZGQoXCJwb3N0ZXJcIik7XG5cblx0XHRcdGlmIChkZXRhaWxzLnBvc3Rlcl9wYXRoKSB7XG5cdFx0XHRcdGltZ19wYXRoID0gZGV0YWlscy5wb3N0ZXJfcGF0aDtcblx0XHRcdH0gZWxzZSBpZiAoZGV0YWlscy5iYWNrZHJvcF9wYXRoKSB7XG5cdFx0XHRcdGltZ19wYXRoID0gZGV0YWlscy5iYWNrZHJvcF9wYXRoO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXHRcdFx0IWltZ1NpemVcblx0XHRcdFx0PyAocG9zdGVyLnNyYyA9IGAke2Jhc2VJbWdVcmx9L29yaWdpbmFsLyR7aW1nX3BhdGh9YClcblx0XHRcdFx0OiAocG9zdGVyLnNyYyA9IGAke2Jhc2VJbWdVcmx9L3cke2ltZ1NpemV9LyR7aW1nX3BhdGh9YCk7XG5cdFx0XHRwb3N0ZXIuYWx0ID0gXCJNb3ZpZSBwaWN0dXJlIHBvc3RlclwiO1xuXHRcdFx0cmV0dXJuIHBvc3Rlcjtcblx0XHR9XG5cblx0XHRmdW5jdGlvbiB3cml0ZVRhZ2xpbmUoKSB7XG5cdFx0XHRjb25zdCB0YWdQYXJhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XG5cdFx0XHR0YWdQYXJhLnRleHRDb250ZW50ID0gZGV0YWlscy50YWdsaW5lO1xuXHRcdFx0dGFnUGFyYS5jbGFzc0xpc3QuYWRkKFwidGFnbGluZVwiKTtcblx0XHRcdHJldHVybiB0YWdQYXJhO1xuXHRcdH1cblxuXHRcdGZ1bmN0aW9uIHdyaXRlU3VtbWFyeSgpIHtcblx0XHRcdGNvbnN0IHBhcmEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKTtcblx0XHRcdHBhcmEudGV4dENvbnRlbnQgPSBkZXRhaWxzLnN1bW1hcnk7XG5cdFx0XHRwYXJhLmNsYXNzTGlzdC5hZGQoXCJzdW1tYXJ5XCIpO1xuXHRcdFx0cmV0dXJuIHBhcmE7XG5cdFx0fVxuXHRcdHJldHVybiBpbnRyb0NvbnRhaW5lcjtcblx0fTtcblxuXHRjb25zdCBkcmF3U3ViSW5mb3MgPSAoKSA9PiB7XG5cdFx0Y29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcblx0XHRjb250YWluZXIuY2xhc3NMaXN0LmFkZChcInN1YmluZm8tY29udGFpbmVyXCIpO1xuXG5cdFx0Y29uc3QgaW5mb3JtYXRpb24gPSBbXG5cdFx0XHRjcmVhdGVTdWJJbmZvKFwiR2VucmVzOlwiLCBkZXRhaWxzLmdlbnJlcy5qb2luKCcsICcpKSxcblx0XHRcdGNyZWF0ZVN1YkluZm8oXCJSdW50aW1lOlwiLCBjb252ZXJ0TWluVG9IcihkZXRhaWxzLnJ1bnRpbWUpKSxcblx0XHRcdGNyZWF0ZVN1YkluZm8oXCJWb3RlIEF2ZXJhZ2U6XCIsIGRldGFpbHMudm90ZV9hdmVyYWdlKSxcblx0XHRcdGNyZWF0ZVN1YkluZm8oXCJWb3RlIENvdW50OlwiLCBkZXRhaWxzLnZvdGVfY291bnQpLFxuXHRcdFx0Y3JlYXRlU3ViSW5mbyhcIlBvcHVsYXJpdHk6XCIsIGRldGFpbHMucG9wdWxhcml0eSksXG5cdFx0XTtcblxuXHRcdGluZm9ybWF0aW9uLmZvckVhY2goaW5mbyA9PiBjb250YWluZXIuYXBwZW5kQ2hpbGQoaW5mbykpO1xuXG5cdFx0ZnVuY3Rpb24gY3JlYXRlU3ViSW5mbyhjYXRlZ29yeSwgaW5mbykge1xuXHRcdFx0Y29uc3Qgc3ViSW5mbyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG5cdFx0XHRjb25zdCBjYXRlZ29yeU5hbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcblx0XHRcdGNvbnN0IGNhdGVnb3J5SW5mbyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xuXG5cdFx0XHRzdWJJbmZvLmNsYXNzTGlzdC5hZGQoXCJzdWItaW5mb1wiKTtcblx0XHRcdGNhdGVnb3J5TmFtZS5jbGFzc0xpc3QuYWRkKFwiY2F0ZWdvcnktbmFtZVwiKTtcblx0XHRcdGNhdGVnb3J5SW5mby5jbGFzc0xpc3QuYWRkKFwiY2F0ZWdvcnktaW5mb1wiKTtcblxuXHRcdFx0Y2F0ZWdvcnlOYW1lLnRleHRDb250ZW50ID0gY2F0ZWdvcnk7XG5cdFx0XHRjYXRlZ29yeUluZm8udGV4dENvbnRlbnQgPSBpbmZvO1xuXG5cdFx0XHRbY2F0ZWdvcnlOYW1lLCBjYXRlZ29yeUluZm9dLmZvckVhY2goKGluZm8pID0+IHN1YkluZm8uYXBwZW5kQ2hpbGQoaW5mbykpO1xuXHRcdFx0cmV0dXJuIHN1YkluZm87XG5cdFx0fVxuXG5cdFx0ZnVuY3Rpb24gY29udmVydE1pblRvSHIobWlucykge1xuXHRcdFx0Y29uc3QgaG91cnMgPSBtaW5zIC8gNjA7XG5cdFx0XHRjb25zdCBySG91cnMgPSBNYXRoLmZsb29yKGhvdXJzKTtcblx0XHRcdGNvbnN0IG1pbnV0ZXMgPSAoaG91cnMgLSBySG91cnMpICogNjA7XG5cdFx0XHRjb25zdCByTWludXRlcyA9IE1hdGgucm91bmQobWludXRlcyk7XG5cdFx0XHRyZXR1cm4gYCR7ckhvdXJzfWggJHtyTWludXRlc31taW5gO1xuXHRcdH1cblxuXHRcdHJldHVybiBjb250YWluZXI7XG5cdH07XG5cblx0cmV0dXJuIHtcblx0XHRzZWN0aW9uLFxuXHRcdGFkZFRvU2VjdGlvbixcblx0XHRkcmF3QWxsLFxuXHRcdGRyYXdJbnRybyxcblx0XHRkcmF3U3ViSW5mb3MsXG5cdH07XG59O1xuXG5leHBvcnQgeyBkcmF3U2VjdGlvbiB9O1xuIiwiaW1wb3J0IGNvbGxlY3RTZWFyY2hRdWVyeSBmcm9tIFwiLi9zZWFyY2hcIjtcbmltcG9ydCB7IGZldGNoSWRzIH0gZnJvbSBcIi4uL2FwaUZ1bmN0aW9ucy9mZXRjaElkXCI7XG5pbXBvcnQgKiBhcyBtb3ZpZSBmcm9tIFwiLi4vYXBpRnVuY3Rpb25zL2ZldGNoTW92aWVJbmZvXCI7XG5pbXBvcnQgeyBkcmF3U2VjdGlvbiB9IGZyb20gXCIuL2RyYXdTZWN0aW9uXCI7XG5cbmFzeW5jIGZ1bmN0aW9uIGRyYXdTZWN0aW9ucyh0aXRsZSkge1xuXHRjb25zdCBpZHMgPSBhd2FpdCBmZXRjaElkcyh0aXRsZSk7XG5cdGNvbnN0IG1haW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm1haW4tY29udGFpbmVyXCIpO1xuXHRsZXQgc2VjdGlvbnMgPSBbXTtcblxuXHQvLyBNYWtlIGFuIGFyciB3LyBlbGVtcyBvZiBbaWQsIG1lZGlhXVxuXHRmb3IgKGxldCBpZCBpbiBpZHMpIHtcblx0XHQvLyBUZW1wIG1ha2UgaXQgc28gdGhhdCBpdCBvbmx5IGFjY2VwdHMgbW92aWVzXG5cblx0XHRpZHNbaWRdID09PSBcIm1vdmllXCIgPyBzZWN0aW9ucy5wdXNoKFtpZCwgaWRzW2lkXV0pIDogXCJcIjtcblx0fVxuXG5cdHNlY3Rpb25zLmZvckVhY2goXG5cdFx0YXN5bmMgKHNlY3Rpb24pID0+IGF3YWl0IHJlbmRlclNlY3Rpb24oc2VjdGlvblswXSwgc2VjdGlvblsxXSlcblx0KTtcblxuXHRhc3luYyBmdW5jdGlvbiByZW5kZXJTZWN0aW9uKGlkLCBtZWRpYSkge1xuXHRcdGNvbnN0IHNlY3Rpb24gPSBhd2FpdCBkcmF3U2VjdGlvbihpZCwgbWVkaWEpO1xuXHRcdHNlY3Rpb24uYWRkVG9TZWN0aW9uKHNlY3Rpb24uZHJhd0ludHJvKFwiMzAwXCIpKTtcblx0XHRzZWN0aW9uLmFkZFRvU2VjdGlvbihzZWN0aW9uLmRyYXdTdWJJbmZvcygpKTtcblx0XHRtYWluLmFwcGVuZENoaWxkKHNlY3Rpb24uc2VjdGlvbik7XG5cdFx0cmV0dXJuIHJlbmRlclNlY3Rpb247XG5cdH1cbn1cblxuZnVuY3Rpb24gY2xlYXJTZWN0aW9ucygpIHtcblx0Y29uc3QgbWFpbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubWFpbi1jb250YWluZXJcIik7XG5cdG1haW4uaW5uZXJIVE1MID0gXCJcIjtcbn1cblxuZXhwb3J0IHsgZHJhd1NlY3Rpb25zLCBjbGVhclNlY3Rpb25zIH07XG4iLCJpbXBvcnQge2RyYXdTZWN0aW9uc30gZnJvbSBcIi4vanMvRE9NRnVuY3Rpb25zL2RyYXdTZWN0aW9uc1wiO1xuaW1wb3J0IGFkZFN1Ym1pdFNlYXJjaEZuYyBmcm9tIFwiLi9qcy9VSS9zdWJtaXRTZWFyY2hcIlxuXG5cblxuY29uc29sZS5sb2coXCJIZWxsbyBXb3JsZFwiKTtcbi8vIGZldGNoSWRzKCdJUk9OIE1BTicpO1xuXG4vLyBmZXRjaE1vdmllRHVtbXkoMTcyNik7XG4vLyBmZXRjaE1vdmllRHVtbXkoMzA5Nyk7IC8vIGZhaWwgdG8gZmV0Y2ggYmVjYXVzZSBpdHMgdHYuXG4vLyBmZXRjaE1vdmllRHVtbXkoMTAxMzgpO1xuLy8gZmV0Y2hNb3ZpZUR1bW15KDY4NzIxKTtcblxuLy8gYXN5bmMgZnVuY3Rpb24gZmV0Y2hNb3ZpZUR1bW15KGlkKSB7XG4vLyAgICAgY29uc3QgbW92aWVEZXRhaWxzID0gYXdhaXQgbW92aWUuZmV0Y2hNb3ZpZURldGFpbHMoaWQpO1xuLy8gICAgIGNvbnN0IG1vdmllUmVjY29zID0gYXdhaXQgbW92aWUuZmV0Y2hNb3ZpZVJlY2NvcyhpZCk7XG4vLyAgICAgY29uc3QgbW92aWVQcm92aWRlcnMgPSBhd2FpdCBtb3ZpZS5mZXRjaE1vdmllUHJvdmlkZXJzKGlkKTtcbi8vICAgICBjb25zdCBtb3ZpZVRyYWlsZXIgPSBhd2FpdCBtb3ZpZS5mZXRjaE1vdmllVHJhaWxlcihpZCk7XG4vLyAgICAgY29uc3QgbW92aWVSZXZpZXdzID0gYXdhaXQgbW92aWUuZmV0Y2hNb3ZpZVJldmlld3MoaWQpO1xuLy8gICAgIGNvbnNvbGUubG9nKG1vdmllRGV0YWlscyk7XG4vLyAgICAgY29uc29sZS5sb2cobW92aWVSZWNjb3MpO1xuLy8gICAgIGNvbnNvbGUubG9nKG1vdmllUHJvdmlkZXJzKTtcbi8vICAgICBjb25zb2xlLmxvZyhtb3ZpZVRyYWlsZXIpO1xuLy8gICAgIGNvbnNvbGUubG9nKG1vdmllUmV2aWV3cyk7XG4vLyB9XG5cbi8vIGFkZFN1Ym1pdFNlYXJjaEZ1bmN0aW9uKCk7XG5cbmFkZFN1Ym1pdFNlYXJjaEZuYygpO1xuZHJhd1NlY3Rpb25zKFwiaXJvbiBtYW5cIik7IiwiaW1wb3J0IHsgZHJhd1NlY3Rpb25zLCBjbGVhclNlY3Rpb25zIH0gZnJvbSAnLi4vRE9NRnVuY3Rpb25zL2RyYXdTZWN0aW9ucyc7XG5cbmV4cG9ydCBkZWZhdWx0IGFzeW5jIGZ1bmN0aW9uIGFkZFN1Ym1pdFNlYXJjaEZuYygpIHtcblx0Y29uc3Qgc2VhcmNoQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zZWFyY2gtcXVlcnlcIik7XG5cdHNlYXJjaEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgYXN5bmMgKGUpID0+IHtcblx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0Y29uc3QgcXVlcnkgPSBpbnRlcnByZXRUb1F1ZXJ5KGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdpbnB1dC1zZWFyY2gnKS52YWx1ZSk7XG5cdFx0aWYoIXF1ZXJ5KSB7YWxlcnQoJ1BsZWFzZSBlbnRlciBhIHZhbGlkIG1vdmllL3R2IHNob3cnKTsgcmV0dXJuO31cblx0XHRjbGVhclNlY3Rpb25zKCk7XG5cdFx0YXdhaXQgZHJhd1NlY3Rpb25zKHF1ZXJ5KTtcblx0XHRcblx0XHRkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2VhcmNoLXF1ZXJ5JykudmFsdWUgPSBcIlwiO1xuXHR9KVxufVxuXG5mdW5jdGlvbiBpbnRlcnByZXRUb1F1ZXJ5KG5hbWUpIHtcbiAgICByZXR1cm4gbmFtZS5zcGxpdChcIiBcIikuam9pbihcIitcIik7XG59XG5cbiJdLCJuYW1lcyI6WyJBUElfS0VZIiwiYXN5bmMiLCJmZXRjaE1vdmllRGV0YWlscyIsIm1vdmllX2lkIiwicmVzcG9uc2UiLCJmZXRjaCIsIm1vZGUiLCJkYXRhIiwianNvbiIsImdlbnJlcyIsInJlZHVjZSIsImFjYyIsInZhbCIsIm5hbWUiLCJtTmFtZSIsIm9yaWdpbmFsX3RpdGxlIiwic3VtbWFyeSIsIm92ZXJ2aWV3IiwidGFnbGluZSIsInBvcHVsYXJpdHkiLCJ2b3RlX2F2ZXJhZ2UiLCJ2b3RlX2NvdW50IiwidmlkZW8iLCJydW50aW1lIiwicG9zdGVyX3BhdGgiLCJiYWNrZHJvcF9wYXRoIiwiZXJyIiwiYWxlcnQiLCJmZXRjaE1vdmllUmVjY29zIiwicmVjTW92aWVzIiwicmVzdWx0cyIsImNvdW50IiwibW92aWUiLCJpZCIsImZldGNoTW92aWVQcm92aWRlcnMiLCJwcm92aWRlcnNCeUNvdW50cnkiLCJjb3VudHJ5Q29kZSIsImNvdW50cnkiLCJjb2RlIiwiSW50bCIsIkRpc3BsYXlOYW1lcyIsInR5cGUiLCJvZiIsInN0cmVhbSIsInJlbnQiLCJidXkiLCJzb3J0UHJvdmlkZXJzIiwic2VydmljZXMiLCJjb2xsZWN0aW9uIiwiZm9yRWFjaCIsInNlcnZpY2UiLCJwcm92aWRlckluZm8iLCJwcm92aWRlcl9uYW1lIiwicHJvdmlkZXJfbG9nb19wYXRoIiwibG9nb19wYXRoIiwicHVzaCIsImZsYXRyYXRlIiwiZmV0Y2hNb3ZpZVRyYWlsZXIiLCJtb3ZpZVRyYWlsZXIiLCJ0cmFpbGVycyIsImZpbHRlciIsImxlbmd0aCIsIm9mZmljaWFsIiwia2V5Iiwic2l0ZSIsImxhbmciLCJpc29fNjM5XzEiLCJmZXRjaE1vdmllUmV2aWV3cyIsInJldmlld3MiLCJjb25zb2xlIiwibG9nIiwicmV2aWV3IiwiYXV0aG9yIiwicmF0aW5nIiwiYXV0aG9yX2RldGFpbHMiLCJwaWNfcGF0aCIsImF2YXRhcl9wYXRoIiwiY29udGVudCIsInVybCIsImxhc3RfdXBkYXRlZCIsInVwZGF0ZWRfYXQiLCJzbGljZSIsImRyYXdTZWN0aW9uIiwibWVkaWEiLCJzZWN0aW9uIiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50IiwiZGV0YWlscyIsImdldEluZm8iLCJhZGRUb1NlY3Rpb24iLCJwYXJ0IiwiYXBwZW5kQ2hpbGQiLCJtb3ZpZUZuYyIsInR2Rm5jIiwiZHJhd0ludHJvIiwiaW1nU2l6ZSIsImludHJvQ29udGFpbmVyIiwiY2xhc3NMaXN0IiwiYWRkIiwidGl0bGUiLCJ0ZXh0Q29udGVudCIsImNyZWF0ZVRpdGxlIiwidGFnUGFyYSIsIndyaXRlVGFnbGluZSIsImltZyIsInBvc3RlciIsImJhc2VJbWdVcmwiLCJpbWdfcGF0aCIsInNyYyIsImFsdCIsInJlbmRlckltZyIsInBhcmEiLCJ3cml0ZVN1bW1hcnkiLCJkcmF3QWxsIiwiZHJhd1N1YkluZm9zIiwiY29udGFpbmVyIiwiY3JlYXRlU3ViSW5mbyIsImNhdGVnb3J5IiwiaW5mbyIsInN1YkluZm8iLCJjYXRlZ29yeU5hbWUiLCJjYXRlZ29yeUluZm8iLCJqb2luIiwibWlucyIsImhvdXJzIiwickhvdXJzIiwiTWF0aCIsImZsb29yIiwibWludXRlcyIsInJvdW5kIiwiY29udmVydE1pblRvSHIiLCJkcmF3U2VjdGlvbnMiLCJpZHMiLCJxdWVyeSIsInNwbGl0IiwiaW50ZXJwcmV0VG9RdWVyeSIsInJlc3VsdCIsImkiLCJtZWRpYV90eXBlIiwiZmV0Y2hJZHMiLCJtYWluIiwicXVlcnlTZWxlY3RvciIsInNlY3Rpb25zIiwicmVuZGVyU2VjdGlvbiIsImFkZEV2ZW50TGlzdGVuZXIiLCJlIiwicHJldmVudERlZmF1bHQiLCJnZXRFbGVtZW50QnlJZCIsInZhbHVlIiwiaW5uZXJIVE1MIiwiYWRkU3VibWl0U2VhcmNoRm5jIl0sInNvdXJjZVJvb3QiOiIifQ==