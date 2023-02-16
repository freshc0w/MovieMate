(()=>{"use strict";const t="720d2150cf09bfa61e28a5042cd7468f",e="720d2150cf09bfa61e28a5042cd7468f";async function a(t){try{const a=await fetch(`https://api.themoviedb.org/3/movie/${t}?api_key=${e}&language=en-US`,{mode:"cors"}),n=await a.json(),o=n.genres.reduce(((t,e)=>[...t,e.name]),[]);return{mName:n.original_title,summary:n.overview,tagline:n.tagline,popularity:n.popularity,vote_average:n.vote_average,vote_count:n.vote_count,genres:o,video:n.video,runtime:n.runtime,poster_path:n.poster_path,backdrop_path:n.backdrop_path}}catch(t){alert(t)}}async function n(t){try{const a=await fetch(`https://api.themoviedb.org/3/movie/${t}/recommendations?api_key=${e}&language=en-US&page=1`,{mode:"cors"}),n=await a.json(),o={};if(n.results){let t=1;for(let e of n.results){if(o[e.original_title]={mName:e.original_title,id:e.id,poster_path:e.poster_path,backdrop_path:e.backdrop_path},5===t)break;t++}}return o}catch(t){alert(t)}}async function o(t){const a={};try{const o=await fetch(`https://api.themoviedb.org/3/movie/${t}/watch/providers?api_key=${e}`,{mode:"cors"}),r=await o.json();for(const t in r.results){const e=(n=t,new Intl.DisplayNames(["en"],{type:"region"}).of(n));a[e]={stream:[],rent:[],buy:[]};const o=(t,e)=>{t&&t.forEach((t=>{const a={provider_name:t.provider_name,provider_logo_path:t.logo_path};e.push(a)}))};o(r.results[t].flatrate,a[e].stream),o(r.results[t].rent,a[e].rent),o(r.results[t].buy,a[e].buy)}return a}catch(t){alert(t)}var n}async function r(t){try{let n;const o=await fetch(`https://api.themoviedb.org/3/movie/${t}/videos?api_key=${e}`,{mode:"cors"}),r=(await o.json()).results.filter((t=>"Trailer"===t.type));if(0===r.length)return!1;const i=r.filter((t=>{t.official}));return n=0!==i.length?i[0]:r[0],{mName:n.name,key:n.key,site:n.site,type:n.type,lang:(a=n.iso_639_1,new Intl.DisplayNames(["en"],{type:"language"}).of(a))}}catch(t){alert(t)}var a}async function i(t){try{let a=[];const n=await fetch(`https://api.themoviedb.org/3/movie/${t}/reviews?api_key=${e}&language=en-US&page=1`,{mode:"cors"}),o=await n.json();if(console.log(o),0===o.results.length)return!1;let r=1;return o.results.forEach((t=>{a.push({author:t.author,rating:t.author_details.rating,pic_path:t.author_details.avatar_path,content:t.content,url:t.url,last_updated:t.updated_at}),r++})),a.slice(0,5)}catch(t){alert(t)}}const c=async(t,e)=>{const c=document.createElement("section"),s=await u(t,a);function l(t){c.appendChild(t)}async function u(t,a,n){return"movie"===e?await a(t):""}await u(t,n),await u(t,o),await u(t,r),await u(t,i);const d=t=>{const e=document.createElement("div");e.classList.add("intro"),e.appendChild(function(){const t=document.createElement("h1");return t.textContent=s.mName,t.classList.add("title"),t}()),s.tagline&&e.appendChild(function(){const t=document.createElement("p");return t.textContent=s.tagline,t.classList.add("tagline"),t}());const a=function(t=""){const e=document.createElement("img"),a="https://image.tmdb.org/t/p";let n;if(e.classList.add("poster"),s.poster_path)n=s.poster_path;else{if(!s.backdrop_path)return;n=s.backdrop_path}return e.src=t?`${a}/w${t}/${n}`:`${a}/original/${n}`,e.alt="Movie picture poster",e}(t);return a&&e.appendChild(a),e.appendChild(function(){const t=document.createElement("p");return t.textContent=s.summary,t.classList.add("summary"),t}()),e};return{section:c,addToSection:l,drawAll:function(){l(d())},drawIntro:d,drawSubInfos:()=>{s.genres,s.runtime,s.vote_average,s.vote_count,s.popularity;const t=document.createElement("div");function e(t,e){const a=document.createElement("div"),n=document.createElement("span"),o=document.createElement("span");return a.classList.add("sub-info"),n.classList.add("category-name"),o.classList.add("category-info"),n.textContent=t,o.textContent=e,[n,o].forEach((t=>a.appendChild(t))),a}return t.classList.add("subinfo-container"),[e("Genres:",s.genres.join(", ")),e("Runtime:",function(t){const e=t/60,a=Math.floor(e),n=60*(e-a);return`${a}h ${Math.round(n)}min`}(s.runtime)),e("Vote Average:",s.vote_average),e("Vote Count:",s.vote_count),e("Popularity:",s.popularity)].forEach((e=>t.appendChild(e))),t}}};async function s(e){const a=await async function(e){const a=function(t){return t.split(" ").join("+")}(e);try{const n=await fetch(`https://api.themoviedb.org/3/search/multi?api_key=${t}&language=en-US&query=${a}&page=1`,{mode:"cors"}),o=await n.json();let r={},i=o.results;if(i.length){if(i.length>4)for(let t=0;t<5;t++)r[i[t].id]=i[t].media_type;else for(let t=0;t<i.length;t++)r[i[t].id]=i[t].media_type;return console.log(r),r}return void alert(`No results found for ${e}`)}catch(t){alert(t)}}(e),n=document.querySelector(".main-container");let o=[];for(let t in a)"movie"===a[t]&&o.push([t,a[t]]);async function r(t,e){const a=await c(t,e);return a.addToSection(a.drawIntro("300")),a.addToSection(a.drawSubInfos()),n.appendChild(a.section),r}o.forEach((async t=>await r(t[0],t[1])))}console.log("Hello World"),async function(){document.querySelector(".search-query").addEventListener("click",(async t=>{t.preventDefault();const e=document.getElementById("input-search").value.split(" ").join("+");e?(document.querySelector(".main-container").innerHTML="",await s(e),document.querySelector(".search-query").value=""):alert("Please enter a valid movie/tv show")}))}(),s("iron man")})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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aEQsTUFBT21GLFNBQWtCMkQsRUFBYzNELEVBQVEsR0FBSUEsRUFBUSxLQVU3RCxDQ3ZCQWYsUUFBUUMsSUFBSSxlQ0hHckUsaUJBQ0lvRixTQUFTd0QsY0FBYyxpQkFDL0JHLGlCQUFpQixTQUFTL0ksTUFBT2dKLElBQzFDQSxFQUFFQyxpQkFDRixNQUFNYixFQUF5QmhELFNBQVM4RCxlQUFlLGdCQUFnQkMsTUFVekRkLE1BQU0sS0FBS1osS0FBSyxLQVQxQlcsR0Z3QlFoRCxTQUFTd0QsY0FBYyxtQkFDL0JRLFVBQVksU0V2QlZsQixFQUFhRSxHQUVuQmhELFNBQVN3RCxjQUFjLGlCQUFpQk8sTUFBUSxJQUpwQ3pILE1BQU0scUNBSWdDLEdBRXBELENEZUEySCxHQUNBbkIsRUFBYSxXIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbW92aWVtYXRlLy4vc3JjL2pzL2FwaUZ1bmN0aW9ucy9mZXRjaElkLmpzIiwid2VicGFjazovL21vdmllbWF0ZS8uL3NyYy9qcy9hcGlGdW5jdGlvbnMvZmV0Y2hNb3ZpZUluZm8uanMiLCJ3ZWJwYWNrOi8vbW92aWVtYXRlLy4vc3JjL2pzL0RPTUZ1bmN0aW9ucy9kcmF3U2VjdGlvbi5qcyIsIndlYnBhY2s6Ly9tb3ZpZW1hdGUvLi9zcmMvanMvRE9NRnVuY3Rpb25zL2RyYXdTZWN0aW9ucy5qcyIsIndlYnBhY2s6Ly9tb3ZpZW1hdGUvLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vbW92aWVtYXRlLy4vc3JjL2pzL1VJL3N1Ym1pdFNlYXJjaC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBBUElfS0VZID0gXCI3MjBkMjE1MGNmMDliZmE2MWUyOGE1MDQyY2Q3NDY4ZlwiO1xuLypcbkZldGNoZXMgdGhlIGZpcnN0IDUgbW92aWUvc2hvdyBpZHMgYW5kIHJldHVybiBpdCBpbiBhbiBhcnJheS5cbiovXG5hc3luYyBmdW5jdGlvbiBmZXRjaElkcyhuYW1lKSB7XG5cdGNvbnN0IHF1ZXJ5ID0gaW50ZXJwcmV0VG9RdWVyeShuYW1lKTtcblx0dHJ5IHtcblx0XHRjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKFxuXHRcdFx0YGh0dHBzOi8vYXBpLnRoZW1vdmllZGIub3JnLzMvc2VhcmNoL211bHRpP2FwaV9rZXk9JHtBUElfS0VZfSZsYW5ndWFnZT1lbi1VUyZxdWVyeT0ke3F1ZXJ5fSZwYWdlPTFgLFxuXHRcdFx0eyBtb2RlOiBcImNvcnNcIiB9XG5cdFx0KTtcblx0XHRjb25zdCBkYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuXHRcdGxldCBpZHMgPSB7fTtcblx0XHRsZXQgcmVzdWx0ID0gZGF0YS5yZXN1bHRzO1xuXHRcdGlmIChyZXN1bHQubGVuZ3RoKSB7XG5cdFx0XHRpZiAocmVzdWx0Lmxlbmd0aCA+IDQpIHtcblx0XHRcdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCA1OyBpKyspIHtcblx0XHRcdFx0XHRpZHNbcmVzdWx0W2ldLmlkXSA9IHJlc3VsdFtpXS5tZWRpYV90eXBlO1xuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRmb3IgKGxldCBpID0gMDsgaSA8IHJlc3VsdC5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRcdGlkc1tyZXN1bHRbaV0uaWRdID0gcmVzdWx0W2ldLm1lZGlhX3R5cGU7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdGNvbnNvbGUubG9nKGlkcyk7XG5cdFx0XHRyZXR1cm4gaWRzO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRhbGVydChgTm8gcmVzdWx0cyBmb3VuZCBmb3IgJHtuYW1lfWApO1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblx0fSBjYXRjaCAoZXJyKSB7XG5cdFx0YWxlcnQoZXJyKTtcblx0fVxufVxuXG5mdW5jdGlvbiBpbnRlcnByZXRUb1F1ZXJ5KG5hbWUpIHtcblx0cmV0dXJuIG5hbWUuc3BsaXQoXCIgXCIpLmpvaW4oXCIrXCIpO1xufVxuXG5leHBvcnQgeyBmZXRjaElkcyB9O1xuIiwiXG5jb25zdCBBUElfS0VZID0gXCI3MjBkMjE1MGNmMDliZmE2MWUyOGE1MDQyY2Q3NDY4ZlwiO1xuXG5hc3luYyBmdW5jdGlvbiBmZXRjaE1vdmllRGV0YWlscyhtb3ZpZV9pZCkge1xuXHR0cnkge1xuXHRcdGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goXG5cdFx0XHRgaHR0cHM6Ly9hcGkudGhlbW92aWVkYi5vcmcvMy9tb3ZpZS8ke21vdmllX2lkfT9hcGlfa2V5PSR7QVBJX0tFWX0mbGFuZ3VhZ2U9ZW4tVVNgLFxuXHRcdFx0eyBtb2RlOiBcImNvcnNcIiB9XG5cdFx0KTtcblx0XHRjb25zdCBkYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuXG5cdFx0Y29uc3QgZ2VucmVzID0gZGF0YS5nZW5yZXMucmVkdWNlKChhY2MsIHZhbCkgPT4gWy4uLmFjYywgdmFsLm5hbWVdLCBbXSk7XG5cblx0XHRjb25zdCBnZW5lcmFsSW5mbyA9IHtcblx0XHRcdG1OYW1lOiBkYXRhLm9yaWdpbmFsX3RpdGxlLFxuXHRcdFx0c3VtbWFyeTogZGF0YS5vdmVydmlldyxcblx0XHRcdHRhZ2xpbmU6IGRhdGEudGFnbGluZSxcblx0XHRcdHBvcHVsYXJpdHk6IGRhdGEucG9wdWxhcml0eSxcblx0XHRcdHZvdGVfYXZlcmFnZTogZGF0YS52b3RlX2F2ZXJhZ2UsXG5cdFx0XHR2b3RlX2NvdW50OiBkYXRhLnZvdGVfY291bnQsXG5cdFx0XHRnZW5yZXM6IGdlbnJlcyxcblx0XHRcdHZpZGVvOiBkYXRhLnZpZGVvLFxuXHRcdFx0cnVudGltZTogZGF0YS5ydW50aW1lLFxuXHRcdFx0cG9zdGVyX3BhdGg6IGRhdGEucG9zdGVyX3BhdGgsXG5cdFx0XHRiYWNrZHJvcF9wYXRoOiBkYXRhLmJhY2tkcm9wX3BhdGgsXG5cdFx0fTtcblx0XHRyZXR1cm4gZ2VuZXJhbEluZm87XG5cdH0gY2F0Y2ggKGVycikge1xuXHRcdGFsZXJ0KGVycik7XG5cdH1cbn1cblxuLypcblJldHVybnMgYW4gYXJyYXkgb2YgcmVjb21tZW5kZWQgbW92aWVzIHdpdGggdGhlaXIgbmFtZSwgaWQsIHBvc3Rlcl9wYXRoIGFuZFxuYmFja2Ryb3BfcGF0aCByZWNvcmRlZC4gXG5JZiBubyBtb3ZpZXMgYXJlIHJlY29tbWVuZGVkLCByZXR1cm4gbnVsbDtcbiovXG5hc3luYyBmdW5jdGlvbiBmZXRjaE1vdmllUmVjY29zKG1vdmllX2lkKSB7XG5cdHRyeSB7XG5cdFx0Y29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChcblx0XHRcdGBodHRwczovL2FwaS50aGVtb3ZpZWRiLm9yZy8zL21vdmllLyR7bW92aWVfaWR9L3JlY29tbWVuZGF0aW9ucz9hcGlfa2V5PSR7QVBJX0tFWX0mbGFuZ3VhZ2U9ZW4tVVMmcGFnZT0xYCxcblx0XHRcdHsgbW9kZTogXCJjb3JzXCIgfVxuXHRcdCk7XG5cdFx0Y29uc3QgZGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcblxuXHRcdGNvbnN0IHJlY01vdmllcyA9IHt9O1xuXHRcdGlmIChkYXRhLnJlc3VsdHMpIHtcblx0XHRcdGxldCBjb3VudCA9IDE7XG5cdFx0XHRmb3IgKGxldCBtb3ZpZSBvZiBkYXRhLnJlc3VsdHMpIHtcblx0XHRcdFx0cmVjTW92aWVzW21vdmllLm9yaWdpbmFsX3RpdGxlXSA9IHtcblx0XHRcdFx0XHRtTmFtZTogbW92aWUub3JpZ2luYWxfdGl0bGUsXG5cdFx0XHRcdFx0aWQ6IG1vdmllLmlkLFxuXHRcdFx0XHRcdHBvc3Rlcl9wYXRoOiBtb3ZpZS5wb3N0ZXJfcGF0aCxcblx0XHRcdFx0XHRiYWNrZHJvcF9wYXRoOiBtb3ZpZS5iYWNrZHJvcF9wYXRoLFxuXHRcdFx0XHR9O1xuXHRcdFx0XHRpZiAoY291bnQgPT09IDUpIHtcblx0XHRcdFx0XHQvLyBNYXggNSBtb3ZpZXMgdG8gYmUgcmVjb21tZW5kZWRcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0fVxuXHRcdFx0XHRjb3VudCsrO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gcmVjTW92aWVzO1xuXHR9IGNhdGNoIChlcnIpIHtcblx0XHRhbGVydChlcnIpO1xuXHR9XG59XG5cbi8qXG5SZXR1cm5zIGFuIG9iamVjdCB3aXRoIGNvdW50cmllcyBhbmQgdGhlIGF2YWlsYWJsZSBzdHJlYW1pbmcgc2VydmljZXMsIGJ1eVxub3IgcmVudCBpdCBjb21lcyB3aXRoIEVBQ0ggaW5kaXZpZHVhbCBjb3VudHJ5LlxuKi9cbmFzeW5jIGZ1bmN0aW9uIGZldGNoTW92aWVQcm92aWRlcnMobW92aWVfaWQpIHtcblx0Y29uc3QgcHJvdmlkZXJzQnlDb3VudHJ5ID0ge307XG5cdHRyeSB7XG5cdFx0Y29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChcblx0XHRcdGBodHRwczovL2FwaS50aGVtb3ZpZWRiLm9yZy8zL21vdmllLyR7bW92aWVfaWR9L3dhdGNoL3Byb3ZpZGVycz9hcGlfa2V5PSR7QVBJX0tFWX1gLFxuXHRcdFx0eyBtb2RlOiBcImNvcnNcIiB9XG5cdFx0KTtcblx0XHRjb25zdCBkYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuXG5cdFx0Zm9yIChjb25zdCBjb3VudHJ5Q29kZSBpbiBkYXRhLnJlc3VsdHMpIHtcblx0XHRcdGNvbnN0IGNvdW50cnkgPSBnZXRDb3VudHJ5TmFtZShjb3VudHJ5Q29kZSk7XG5cdFx0XHRwcm92aWRlcnNCeUNvdW50cnlbY291bnRyeV0gPSB7XG5cdFx0XHRcdHN0cmVhbTogW10sXG5cdFx0XHRcdHJlbnQ6IFtdLFxuXHRcdFx0XHRidXk6IFtdLFxuXHRcdFx0fTtcblxuXHRcdFx0Lypcblx0XHRcdFNvcnRzIHByb3ZpZGVycyBiYXNlZCBvbiBjb3VudHJ5IGFuZCBzZXJ2aWNlcyB0aGV5IHByb3ZpZGUuXG5cblx0XHRcdFRha2VzIGluIHR5cGUgb2Ygc2VydmljZXMgYXMgcGFyYW0gPT4gW1wiZmxhdHJhdGUgKHN0cmVhbWluZylcIiwgXG5cdFx0XHRcInJlbnRcIiwgXCJidXlcIl0gYW5kIGFuIGFycmF5IHRvIGFwcGVuZCBpdCB0by5cblx0XHRcdCovXG5cdFx0XHRjb25zdCBzb3J0UHJvdmlkZXJzID0gKHNlcnZpY2VzLCBjb2xsZWN0aW9uKSA9PiB7XG5cdFx0XHRcdGlmIChzZXJ2aWNlcykge1xuXHRcdFx0XHRcdHNlcnZpY2VzLmZvckVhY2goKHNlcnZpY2UpID0+IHtcblx0XHRcdFx0XHRcdGNvbnN0IHByb3ZpZGVySW5mbyA9IHtcblx0XHRcdFx0XHRcdFx0cHJvdmlkZXJfbmFtZTogc2VydmljZS5wcm92aWRlcl9uYW1lLFxuXHRcdFx0XHRcdFx0XHRwcm92aWRlcl9sb2dvX3BhdGg6IHNlcnZpY2UubG9nb19wYXRoLFxuXHRcdFx0XHRcdFx0fTtcblx0XHRcdFx0XHRcdGNvbGxlY3Rpb24ucHVzaChwcm92aWRlckluZm8pO1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9XG5cdFx0XHR9O1xuXG5cdFx0XHQvLyBBZGQgc3RyZWFtaW5nIHNlcnZpY2VzIGZvciBzcGVjaWZpZWQgbW92aWUgaW4gZWFjaCBjb3VudHJ5LlxuXHRcdFx0c29ydFByb3ZpZGVycyhcblx0XHRcdFx0ZGF0YS5yZXN1bHRzW2NvdW50cnlDb2RlXS5mbGF0cmF0ZSxcblx0XHRcdFx0cHJvdmlkZXJzQnlDb3VudHJ5W2NvdW50cnldLnN0cmVhbVxuXHRcdFx0KTtcblxuXHRcdFx0Ly8gQWRkIHJlbnRpbmcgc2VydmljZXMgZm9yIHNwZWljaWZpZWQgbW92aWUgaW4gZWFjaCBjb3VudHJ5LlxuXHRcdFx0c29ydFByb3ZpZGVycyhcblx0XHRcdFx0ZGF0YS5yZXN1bHRzW2NvdW50cnlDb2RlXS5yZW50LFxuXHRcdFx0XHRwcm92aWRlcnNCeUNvdW50cnlbY291bnRyeV0ucmVudFxuXHRcdFx0KTtcblxuXHRcdFx0Ly8gQWRkIGJ1eWluZyBzZXJ2aWNlcyBmb3Igc3BlY2lmaWVkIG1vdmllIGluIGVhY2ggY291bnRyeS5cblx0XHRcdHNvcnRQcm92aWRlcnMoXG5cdFx0XHRcdGRhdGEucmVzdWx0c1tjb3VudHJ5Q29kZV0uYnV5LFxuXHRcdFx0XHRwcm92aWRlcnNCeUNvdW50cnlbY291bnRyeV0uYnV5XG5cdFx0XHQpO1xuXHRcdH1cblx0XHRyZXR1cm4gcHJvdmlkZXJzQnlDb3VudHJ5O1xuXHR9IGNhdGNoIChlcnIpIHtcblx0XHRhbGVydChlcnIpO1xuXHR9XG59XG5cbi8vIEZpbmQgbW92aWUgdHJhaWxlciBhbmQgcmV0dXJuIGZhbHNlIGlmIG5vbmUgY2FuIGJlIGZvdW5kLlxuLy8gT2ZmaWNpYWwgdHJhaWxlciB3aWxsIGJlIHByaW9yaXRpc2VkLlxuYXN5bmMgZnVuY3Rpb24gZmV0Y2hNb3ZpZVRyYWlsZXIobW92aWVfaWQpIHtcblx0dHJ5IHtcblx0XHRsZXQgbW92aWVUcmFpbGVyO1xuXHRcdGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goXG5cdFx0XHRgaHR0cHM6Ly9hcGkudGhlbW92aWVkYi5vcmcvMy9tb3ZpZS8ke21vdmllX2lkfS92aWRlb3M/YXBpX2tleT0ke0FQSV9LRVl9YCxcblx0XHRcdHsgbW9kZTogXCJjb3JzXCIgfVxuXHRcdCk7XG5cdFx0Y29uc3QgZGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcblxuXHRcdGNvbnN0IHRyYWlsZXJzID0gZGF0YS5yZXN1bHRzLmZpbHRlcigodmlkZW8pID0+IHZpZGVvLnR5cGUgPT09IFwiVHJhaWxlclwiKTtcblxuXHRcdGlmICh0cmFpbGVycy5sZW5ndGggPT09IDApIHJldHVybiBmYWxzZTtcblx0XHQvLyBGaW5kIG9mZmljaWFsIHRyYWlsZXIuXG5cdFx0Y29uc3Qgb2ZmaWNpYWwgPSB0cmFpbGVycy5maWx0ZXIoKHZpZGVvKSA9PiB7XG5cdFx0XHR2aWRlby5vZmZpY2lhbCA9PT0gdHJ1ZTtcblx0XHR9KTtcblxuXHRcdG9mZmljaWFsLmxlbmd0aCAhPT0gMFxuXHRcdFx0PyAobW92aWVUcmFpbGVyID0gb2ZmaWNpYWxbMF0pXG5cdFx0XHQ6IChtb3ZpZVRyYWlsZXIgPSB0cmFpbGVyc1swXSk7XG5cblx0XHRyZXR1cm4ge1xuXHRcdFx0bU5hbWU6IG1vdmllVHJhaWxlci5uYW1lLFxuXHRcdFx0a2V5OiBtb3ZpZVRyYWlsZXIua2V5LFxuXHRcdFx0c2l0ZTogbW92aWVUcmFpbGVyLnNpdGUsXG5cdFx0XHR0eXBlOiBtb3ZpZVRyYWlsZXIudHlwZSxcblx0XHRcdGxhbmc6IGdldExhbmd1YWdlKG1vdmllVHJhaWxlci5pc29fNjM5XzEpLFxuXHRcdH07XG5cdH0gY2F0Y2ggKGVycikge1xuXHRcdGFsZXJ0KGVycik7XG5cdH1cbn1cblxuLy8gUmV0dXJucyBhbiBhcnIgb2YgYSBtYXhpbXVtIG9mIDUgcmV2aWV3cyBiYXNlZCBvbiB0aGUgbW92aWUgZnJvbSByYW5kb20gc291cmNlcy5cbi8vIElmIG5vIHJldmlld3MgYXJlIGZvdW5kLCB0aGlzIGZuYyByZXR1cm5zIGZhbHNlLlxuYXN5bmMgZnVuY3Rpb24gZmV0Y2hNb3ZpZVJldmlld3MobW92aWVfaWQpIHtcblx0dHJ5IHtcblx0XHRsZXQgcmV2aWV3cyA9IFtdO1xuXHRcdGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goXG5cdFx0XHRgaHR0cHM6Ly9hcGkudGhlbW92aWVkYi5vcmcvMy9tb3ZpZS8ke21vdmllX2lkfS9yZXZpZXdzP2FwaV9rZXk9JHtBUElfS0VZfSZsYW5ndWFnZT1lbi1VUyZwYWdlPTFgLFxuXHRcdFx0eyBtb2RlOiBcImNvcnNcIiB9XG5cdFx0KTtcblx0XHRjb25zdCBkYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuXHRcdGNvbnNvbGUubG9nKGRhdGEpO1xuXHRcdGlmIChkYXRhLnJlc3VsdHMubGVuZ3RoID09PSAwKSByZXR1cm4gZmFsc2U7XG5cblx0XHRsZXQgY291bnQgPSAxO1xuXHRcdGRhdGEucmVzdWx0cy5mb3JFYWNoKChyZXZpZXcpID0+IHtcblx0XHRcdHJldmlld3MucHVzaCh7XG5cdFx0XHRcdGF1dGhvcjogcmV2aWV3LmF1dGhvcixcblx0XHRcdFx0cmF0aW5nOiByZXZpZXcuYXV0aG9yX2RldGFpbHMucmF0aW5nLFxuXHRcdFx0XHRwaWNfcGF0aDogcmV2aWV3LmF1dGhvcl9kZXRhaWxzLmF2YXRhcl9wYXRoLFxuXHRcdFx0XHRjb250ZW50OiByZXZpZXcuY29udGVudCxcblx0XHRcdFx0dXJsOiByZXZpZXcudXJsLFxuXHRcdFx0XHRsYXN0X3VwZGF0ZWQ6IHJldmlldy51cGRhdGVkX2F0LFxuXHRcdFx0fSk7XG5cdFx0XHRjb3VudCsrO1xuXHRcdH0pO1xuXHRcdHJldHVybiByZXZpZXdzLnNsaWNlKDAsIDUpOztcblx0fSBjYXRjaCAoZXJyKSB7XG5cdFx0YWxlcnQoZXJyKTtcblx0fVxufVxuXG5mdW5jdGlvbiBnZXRDb3VudHJ5TmFtZShjb2RlKSB7XG5cdGxldCByZWdpb25OYW1lcyA9IG5ldyBJbnRsLkRpc3BsYXlOYW1lcyhbXCJlblwiXSwgeyB0eXBlOiBcInJlZ2lvblwiIH0pO1xuXHRyZXR1cm4gcmVnaW9uTmFtZXMub2YoY29kZSk7XG59XG5cbmZ1bmN0aW9uIGdldExhbmd1YWdlKGNvZGUpIHtcblx0Y29uc3QgbGFuZyA9IG5ldyBJbnRsLkRpc3BsYXlOYW1lcyhbXCJlblwiXSwgeyB0eXBlOiBcImxhbmd1YWdlXCIgfSk7XG5cdHJldHVybiBsYW5nLm9mKGNvZGUpO1xufVxuZXhwb3J0IHtcblx0ZmV0Y2hNb3ZpZURldGFpbHMsXG5cdGZldGNoTW92aWVSZWNjb3MsXG5cdGZldGNoTW92aWVQcm92aWRlcnMsXG5cdGZldGNoTW92aWVUcmFpbGVyLFxuXHRmZXRjaE1vdmllUmV2aWV3cyxcbn07XG4iLCJpbXBvcnQgKiBhcyBtb3ZpZSBmcm9tIFwiLi4vYXBpRnVuY3Rpb25zL2ZldGNoTW92aWVJbmZvXCI7XG5cbi8qXG5EcmF3IGFuIGluZGl2aWR1YWwgc2VjdGlvbiBiYXNlZCBvbiB1c2VyIGlucHV0IHF1ZXJ5LlxuVGhpcyBzZWN0aW9uIHdpbGwgY29uc3RzIG9mIHRoZSBvdmVyYWxsIG1vdmllL3R2J3MgXG4gICAgLSBEZXRhaWxzLFxuICAgIC0gVGhlIHdhdGNoIHByb3ZpZGVycyBiYXNlZCBvbiBzcGVjaWZpYyBjb3VudHJpZXNcbiAgICAtIEF2YWlsYWJsZSB0cmFpbGVycyxcbiAgICAtIE90aGVyIHJlY29tbWVuZGF0aW9ucy5cbiAgICAtIFJldmlld3MgYnkgZXN0YWJsaXNoZWQgYXV0aG9ycyBiYXNlZCBmcm9tIHJhbmRvbSBzb3VyY2VzLlxuKi9cblxuY29uc3QgZHJhd1NlY3Rpb24gPSBhc3luYyAoaWQsIG1lZGlhKSA9PiB7XG5cdGNvbnN0IHNlY3Rpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2VjdGlvblwiKTtcblx0Y29uc3QgZGV0YWlscyA9IGF3YWl0IGdldEluZm8oaWQsIG1vdmllLmZldGNoTW92aWVEZXRhaWxzLCBcIlwiKTtcblx0Y29uc3QgcmVjcyA9IGF3YWl0IGdldEluZm8oaWQsIG1vdmllLmZldGNoTW92aWVSZWNjb3MsIFwiXCIpO1xuXHRjb25zdCBwcm92aWRlcnMgPSBhd2FpdCBnZXRJbmZvKGlkLCBtb3ZpZS5mZXRjaE1vdmllUHJvdmlkZXJzLCBcIlwiKTtcblx0Y29uc3QgdHJhaWxlciA9IGF3YWl0IGdldEluZm8oaWQsIG1vdmllLmZldGNoTW92aWVUcmFpbGVyLCBcIlwiKTtcblx0Y29uc3QgcmV2aWV3cyA9IGF3YWl0IGdldEluZm8oaWQsIG1vdmllLmZldGNoTW92aWVSZXZpZXdzLCBcIlwiKTtcblxuXHRmdW5jdGlvbiBkcmF3QWxsKCkge1xuXHRcdGFkZFRvU2VjdGlvbihkcmF3SW50cm8oKSk7XG5cdH1cblxuXHRmdW5jdGlvbiBhZGRUb1NlY3Rpb24ocGFydCkge1xuXHRcdHNlY3Rpb24uYXBwZW5kQ2hpbGQocGFydCk7XG5cdH1cblxuXHRhc3luYyBmdW5jdGlvbiBnZXRJbmZvKGlkLCBtb3ZpZUZuYywgdHZGbmMpIHtcblx0XHRyZXR1cm4gbWVkaWEgPT09IFwibW92aWVcIiA/IGF3YWl0IG1vdmllRm5jKGlkKSA6IFwiXCI7XG5cdH1cblxuXHQvLyBEcmF3IChpZiBhbnkpIHRpdGxlLCBwaG90bywgdGFnbGluZSwgYW5kIHN1bW1hcnkuXG5cdGNvbnN0IGRyYXdJbnRybyA9IChpbWdTaXplKSA9PiB7XG5cdFx0Y29uc3QgaW50cm9Db250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuXHRcdGludHJvQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoXCJpbnRyb1wiKTtcblxuXHRcdGludHJvQ29udGFpbmVyLmFwcGVuZENoaWxkKGNyZWF0ZVRpdGxlKCkpO1xuXHRcdGRldGFpbHMudGFnbGluZSA/IGludHJvQ29udGFpbmVyLmFwcGVuZENoaWxkKHdyaXRlVGFnbGluZSgpKSA6IFwiXCI7XG5cblx0XHRjb25zdCBpbWcgPSByZW5kZXJJbWcoaW1nU2l6ZSk7XG5cdFx0aW1nID8gaW50cm9Db250YWluZXIuYXBwZW5kQ2hpbGQoaW1nKSA6IFwiXCI7XG5cblx0XHRpbnRyb0NvbnRhaW5lci5hcHBlbmRDaGlsZCh3cml0ZVN1bW1hcnkoKSk7XG5cblx0XHRmdW5jdGlvbiBjcmVhdGVUaXRsZSgpIHtcblx0XHRcdGNvbnN0IHRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgxXCIpO1xuXHRcdFx0dGl0bGUudGV4dENvbnRlbnQgPSBkZXRhaWxzLm1OYW1lO1xuXHRcdFx0dGl0bGUuY2xhc3NMaXN0LmFkZChcInRpdGxlXCIpO1xuXHRcdFx0cmV0dXJuIHRpdGxlO1xuXHRcdH1cblxuXHRcdGZ1bmN0aW9uIHJlbmRlckltZyhpbWdTaXplID0gXCJcIikge1xuXHRcdFx0Y29uc3QgcG9zdGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImltZ1wiKTtcblx0XHRcdGNvbnN0IGJhc2VJbWdVcmwgPSBcImh0dHBzOi8vaW1hZ2UudG1kYi5vcmcvdC9wXCI7XG5cdFx0XHRsZXQgaW1nX3BhdGg7XG5cdFx0XHRwb3N0ZXIuY2xhc3NMaXN0LmFkZChcInBvc3RlclwiKTtcblxuXHRcdFx0aWYgKGRldGFpbHMucG9zdGVyX3BhdGgpIHtcblx0XHRcdFx0aW1nX3BhdGggPSBkZXRhaWxzLnBvc3Rlcl9wYXRoO1xuXHRcdFx0fSBlbHNlIGlmIChkZXRhaWxzLmJhY2tkcm9wX3BhdGgpIHtcblx0XHRcdFx0aW1nX3BhdGggPSBkZXRhaWxzLmJhY2tkcm9wX3BhdGg7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cdFx0XHQhaW1nU2l6ZVxuXHRcdFx0XHQ/IChwb3N0ZXIuc3JjID0gYCR7YmFzZUltZ1VybH0vb3JpZ2luYWwvJHtpbWdfcGF0aH1gKVxuXHRcdFx0XHQ6IChwb3N0ZXIuc3JjID0gYCR7YmFzZUltZ1VybH0vdyR7aW1nU2l6ZX0vJHtpbWdfcGF0aH1gKTtcblx0XHRcdHBvc3Rlci5hbHQgPSBcIk1vdmllIHBpY3R1cmUgcG9zdGVyXCI7XG5cdFx0XHRyZXR1cm4gcG9zdGVyO1xuXHRcdH1cblxuXHRcdGZ1bmN0aW9uIHdyaXRlVGFnbGluZSgpIHtcblx0XHRcdGNvbnN0IHRhZ1BhcmEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKTtcblx0XHRcdHRhZ1BhcmEudGV4dENvbnRlbnQgPSBkZXRhaWxzLnRhZ2xpbmU7XG5cdFx0XHR0YWdQYXJhLmNsYXNzTGlzdC5hZGQoXCJ0YWdsaW5lXCIpO1xuXHRcdFx0cmV0dXJuIHRhZ1BhcmE7XG5cdFx0fVxuXG5cdFx0ZnVuY3Rpb24gd3JpdGVTdW1tYXJ5KCkge1xuXHRcdFx0Y29uc3QgcGFyYSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xuXHRcdFx0cGFyYS50ZXh0Q29udGVudCA9IGRldGFpbHMuc3VtbWFyeTtcblx0XHRcdHBhcmEuY2xhc3NMaXN0LmFkZChcInN1bW1hcnlcIik7XG5cdFx0XHRyZXR1cm4gcGFyYTtcblx0XHR9XG5cdFx0cmV0dXJuIGludHJvQ29udGFpbmVyO1xuXHR9O1xuXG5cdGNvbnN0IGRyYXdTdWJJbmZvcyA9ICgpID0+IHtcblx0XHRsZXQgc3ViSW5mb3MgPSB7XG5cdFx0XHRnZW5yZXM6IGRldGFpbHMuZ2VucmVzLFxuXHRcdFx0cnVudGltZTogZGV0YWlscy5ydW50aW1lLFxuXHRcdFx0dm90ZV9hdmVyYWdlOiBkZXRhaWxzLnZvdGVfYXZlcmFnZSxcblx0XHRcdHZvdGVfY291bnQ6IGRldGFpbHMudm90ZV9jb3VudCxcblx0XHRcdHBvcHVsYXJpdHk6IGRldGFpbHMucG9wdWxhcml0eSxcblx0XHR9O1xuXG5cdFx0Y29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcblx0XHRjb250YWluZXIuY2xhc3NMaXN0LmFkZChcInN1YmluZm8tY29udGFpbmVyXCIpO1xuXG5cdFx0Y29uc3QgaW5mb3JtYXRpb24gPSBbXG5cdFx0XHRjcmVhdGVTdWJJbmZvKFwiR2VucmVzOlwiLCBkZXRhaWxzLmdlbnJlcy5qb2luKCcsICcpKSxcblx0XHRcdGNyZWF0ZVN1YkluZm8oXCJSdW50aW1lOlwiLCBjb252ZXJ0TWluVG9IcihkZXRhaWxzLnJ1bnRpbWUpKSxcblx0XHRcdGNyZWF0ZVN1YkluZm8oXCJWb3RlIEF2ZXJhZ2U6XCIsIGRldGFpbHMudm90ZV9hdmVyYWdlKSxcblx0XHRcdGNyZWF0ZVN1YkluZm8oXCJWb3RlIENvdW50OlwiLCBkZXRhaWxzLnZvdGVfY291bnQpLFxuXHRcdFx0Y3JlYXRlU3ViSW5mbyhcIlBvcHVsYXJpdHk6XCIsIGRldGFpbHMucG9wdWxhcml0eSksXG5cdFx0XTtcblxuXHRcdGluZm9ybWF0aW9uLmZvckVhY2goaW5mbyA9PiBjb250YWluZXIuYXBwZW5kQ2hpbGQoaW5mbykpO1xuXG5cdFx0ZnVuY3Rpb24gY3JlYXRlU3ViSW5mbyhjYXRlZ29yeSwgaW5mbykge1xuXHRcdFx0Y29uc3Qgc3ViSW5mbyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG5cdFx0XHRjb25zdCBjYXRlZ29yeU5hbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcblx0XHRcdGNvbnN0IGNhdGVnb3J5SW5mbyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xuXG5cdFx0XHRzdWJJbmZvLmNsYXNzTGlzdC5hZGQoXCJzdWItaW5mb1wiKTtcblx0XHRcdGNhdGVnb3J5TmFtZS5jbGFzc0xpc3QuYWRkKFwiY2F0ZWdvcnktbmFtZVwiKTtcblx0XHRcdGNhdGVnb3J5SW5mby5jbGFzc0xpc3QuYWRkKFwiY2F0ZWdvcnktaW5mb1wiKTtcblxuXHRcdFx0Y2F0ZWdvcnlOYW1lLnRleHRDb250ZW50ID0gY2F0ZWdvcnk7XG5cdFx0XHRjYXRlZ29yeUluZm8udGV4dENvbnRlbnQgPSBpbmZvO1xuXG5cdFx0XHRbY2F0ZWdvcnlOYW1lLCBjYXRlZ29yeUluZm9dLmZvckVhY2goKGluZm8pID0+IHN1YkluZm8uYXBwZW5kQ2hpbGQoaW5mbykpO1xuXHRcdFx0cmV0dXJuIHN1YkluZm87XG5cdFx0fVxuXG5cdFx0ZnVuY3Rpb24gY29udmVydE1pblRvSHIobWlucykge1xuXHRcdFx0Y29uc3QgaG91cnMgPSBtaW5zIC8gNjA7XG5cdFx0XHRjb25zdCBySG91cnMgPSBNYXRoLmZsb29yKGhvdXJzKTtcblx0XHRcdGNvbnN0IG1pbnV0ZXMgPSAoaG91cnMgLSBySG91cnMpICogNjA7XG5cdFx0XHRjb25zdCByTWludXRlcyA9IE1hdGgucm91bmQobWludXRlcyk7XG5cdFx0XHRyZXR1cm4gYCR7ckhvdXJzfWggJHtyTWludXRlc31taW5gO1xuXHRcdH1cblxuXHRcdHJldHVybiBjb250YWluZXI7XG5cdH07XG5cblx0cmV0dXJuIHtcblx0XHRzZWN0aW9uLFxuXHRcdGFkZFRvU2VjdGlvbixcblx0XHRkcmF3QWxsLFxuXHRcdGRyYXdJbnRybyxcblx0XHRkcmF3U3ViSW5mb3MsXG5cdH07XG59O1xuXG5leHBvcnQgeyBkcmF3U2VjdGlvbiB9O1xuIiwiaW1wb3J0IGNvbGxlY3RTZWFyY2hRdWVyeSBmcm9tIFwiLi9zZWFyY2hcIjtcbmltcG9ydCB7IGZldGNoSWRzIH0gZnJvbSBcIi4uL2FwaUZ1bmN0aW9ucy9mZXRjaElkXCI7XG5pbXBvcnQgKiBhcyBtb3ZpZSBmcm9tIFwiLi4vYXBpRnVuY3Rpb25zL2ZldGNoTW92aWVJbmZvXCI7XG5pbXBvcnQgeyBkcmF3U2VjdGlvbiB9IGZyb20gXCIuL2RyYXdTZWN0aW9uXCI7XG5cbmFzeW5jIGZ1bmN0aW9uIGRyYXdTZWN0aW9ucyh0aXRsZSkge1xuXHRjb25zdCBpZHMgPSBhd2FpdCBmZXRjaElkcyh0aXRsZSk7XG5cdGNvbnN0IG1haW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm1haW4tY29udGFpbmVyXCIpO1xuXHRsZXQgc2VjdGlvbnMgPSBbXTtcblxuXHQvLyBNYWtlIGFuIGFyciB3LyBlbGVtcyBvZiBbaWQsIG1lZGlhXVxuXHRmb3IgKGxldCBpZCBpbiBpZHMpIHtcblx0XHQvLyBUZW1wIG1ha2UgaXQgc28gdGhhdCBpdCBvbmx5IGFjY2VwdHMgbW92aWVzXG5cblx0XHRpZHNbaWRdID09PSBcIm1vdmllXCIgPyBzZWN0aW9ucy5wdXNoKFtpZCwgaWRzW2lkXV0pIDogXCJcIjtcblx0fVxuXG5cdHNlY3Rpb25zLmZvckVhY2goXG5cdFx0YXN5bmMgKHNlY3Rpb24pID0+IGF3YWl0IHJlbmRlclNlY3Rpb24oc2VjdGlvblswXSwgc2VjdGlvblsxXSlcblx0KTtcblxuXHRhc3luYyBmdW5jdGlvbiByZW5kZXJTZWN0aW9uKGlkLCBtZWRpYSkge1xuXHRcdGNvbnN0IHNlY3Rpb24gPSBhd2FpdCBkcmF3U2VjdGlvbihpZCwgbWVkaWEpO1xuXHRcdHNlY3Rpb24uYWRkVG9TZWN0aW9uKHNlY3Rpb24uZHJhd0ludHJvKFwiMzAwXCIpKTtcblx0XHRzZWN0aW9uLmFkZFRvU2VjdGlvbihzZWN0aW9uLmRyYXdTdWJJbmZvcygpKTtcblx0XHRtYWluLmFwcGVuZENoaWxkKHNlY3Rpb24uc2VjdGlvbik7XG5cdFx0cmV0dXJuIHJlbmRlclNlY3Rpb247XG5cdH1cbn1cblxuZnVuY3Rpb24gY2xlYXJTZWN0aW9ucygpIHtcblx0Y29uc3QgbWFpbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubWFpbi1jb250YWluZXJcIik7XG5cdG1haW4uaW5uZXJIVE1MID0gXCJcIjtcbn1cblxuZXhwb3J0IHsgZHJhd1NlY3Rpb25zLCBjbGVhclNlY3Rpb25zIH07XG4iLCJpbXBvcnQge2RyYXdTZWN0aW9uc30gZnJvbSBcIi4vanMvRE9NRnVuY3Rpb25zL2RyYXdTZWN0aW9uc1wiO1xuaW1wb3J0IGFkZFN1Ym1pdFNlYXJjaEZuYyBmcm9tIFwiLi9qcy9VSS9zdWJtaXRTZWFyY2hcIlxuXG5cblxuY29uc29sZS5sb2coXCJIZWxsbyBXb3JsZFwiKTtcbi8vIGZldGNoSWRzKCdJUk9OIE1BTicpO1xuXG4vLyBmZXRjaE1vdmllRHVtbXkoMTcyNik7XG4vLyBmZXRjaE1vdmllRHVtbXkoMzA5Nyk7IC8vIGZhaWwgdG8gZmV0Y2ggYmVjYXVzZSBpdHMgdHYuXG4vLyBmZXRjaE1vdmllRHVtbXkoMTAxMzgpO1xuLy8gZmV0Y2hNb3ZpZUR1bW15KDY4NzIxKTtcblxuLy8gYXN5bmMgZnVuY3Rpb24gZmV0Y2hNb3ZpZUR1bW15KGlkKSB7XG4vLyAgICAgY29uc3QgbW92aWVEZXRhaWxzID0gYXdhaXQgbW92aWUuZmV0Y2hNb3ZpZURldGFpbHMoaWQpO1xuLy8gICAgIGNvbnN0IG1vdmllUmVjY29zID0gYXdhaXQgbW92aWUuZmV0Y2hNb3ZpZVJlY2NvcyhpZCk7XG4vLyAgICAgY29uc3QgbW92aWVQcm92aWRlcnMgPSBhd2FpdCBtb3ZpZS5mZXRjaE1vdmllUHJvdmlkZXJzKGlkKTtcbi8vICAgICBjb25zdCBtb3ZpZVRyYWlsZXIgPSBhd2FpdCBtb3ZpZS5mZXRjaE1vdmllVHJhaWxlcihpZCk7XG4vLyAgICAgY29uc3QgbW92aWVSZXZpZXdzID0gYXdhaXQgbW92aWUuZmV0Y2hNb3ZpZVJldmlld3MoaWQpO1xuLy8gICAgIGNvbnNvbGUubG9nKG1vdmllRGV0YWlscyk7XG4vLyAgICAgY29uc29sZS5sb2cobW92aWVSZWNjb3MpO1xuLy8gICAgIGNvbnNvbGUubG9nKG1vdmllUHJvdmlkZXJzKTtcbi8vICAgICBjb25zb2xlLmxvZyhtb3ZpZVRyYWlsZXIpO1xuLy8gICAgIGNvbnNvbGUubG9nKG1vdmllUmV2aWV3cyk7XG4vLyB9XG5cbi8vIGFkZFN1Ym1pdFNlYXJjaEZ1bmN0aW9uKCk7XG5cbmFkZFN1Ym1pdFNlYXJjaEZuYygpO1xuZHJhd1NlY3Rpb25zKFwiaXJvbiBtYW5cIik7IiwiaW1wb3J0IHsgZHJhd1NlY3Rpb25zLCBjbGVhclNlY3Rpb25zIH0gZnJvbSAnLi4vRE9NRnVuY3Rpb25zL2RyYXdTZWN0aW9ucyc7XG5cbmV4cG9ydCBkZWZhdWx0IGFzeW5jIGZ1bmN0aW9uIGFkZFN1Ym1pdFNlYXJjaEZuYygpIHtcblx0Y29uc3Qgc2VhcmNoQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zZWFyY2gtcXVlcnlcIik7XG5cdHNlYXJjaEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgYXN5bmMgKGUpID0+IHtcblx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0Y29uc3QgcXVlcnkgPSBpbnRlcnByZXRUb1F1ZXJ5KGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdpbnB1dC1zZWFyY2gnKS52YWx1ZSk7XG5cdFx0aWYoIXF1ZXJ5KSB7YWxlcnQoJ1BsZWFzZSBlbnRlciBhIHZhbGlkIG1vdmllL3R2IHNob3cnKTsgcmV0dXJuO31cblx0XHRjbGVhclNlY3Rpb25zKCk7XG5cdFx0YXdhaXQgZHJhd1NlY3Rpb25zKHF1ZXJ5KTtcblx0XHRcblx0XHRkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2VhcmNoLXF1ZXJ5JykudmFsdWUgPSBcIlwiO1xuXHR9KVxufVxuXG5mdW5jdGlvbiBpbnRlcnByZXRUb1F1ZXJ5KG5hbWUpIHtcbiAgICByZXR1cm4gbmFtZS5zcGxpdChcIiBcIikuam9pbihcIitcIik7XG59XG5cbiJdLCJuYW1lcyI6WyJBUElfS0VZIiwiYXN5bmMiLCJmZXRjaE1vdmllRGV0YWlscyIsIm1vdmllX2lkIiwicmVzcG9uc2UiLCJmZXRjaCIsIm1vZGUiLCJkYXRhIiwianNvbiIsImdlbnJlcyIsInJlZHVjZSIsImFjYyIsInZhbCIsIm5hbWUiLCJtTmFtZSIsIm9yaWdpbmFsX3RpdGxlIiwic3VtbWFyeSIsIm92ZXJ2aWV3IiwidGFnbGluZSIsInBvcHVsYXJpdHkiLCJ2b3RlX2F2ZXJhZ2UiLCJ2b3RlX2NvdW50IiwidmlkZW8iLCJydW50aW1lIiwicG9zdGVyX3BhdGgiLCJiYWNrZHJvcF9wYXRoIiwiZXJyIiwiYWxlcnQiLCJmZXRjaE1vdmllUmVjY29zIiwicmVjTW92aWVzIiwicmVzdWx0cyIsImNvdW50IiwibW92aWUiLCJpZCIsImZldGNoTW92aWVQcm92aWRlcnMiLCJwcm92aWRlcnNCeUNvdW50cnkiLCJjb3VudHJ5Q29kZSIsImNvdW50cnkiLCJjb2RlIiwiSW50bCIsIkRpc3BsYXlOYW1lcyIsInR5cGUiLCJvZiIsInN0cmVhbSIsInJlbnQiLCJidXkiLCJzb3J0UHJvdmlkZXJzIiwic2VydmljZXMiLCJjb2xsZWN0aW9uIiwiZm9yRWFjaCIsInNlcnZpY2UiLCJwcm92aWRlckluZm8iLCJwcm92aWRlcl9uYW1lIiwicHJvdmlkZXJfbG9nb19wYXRoIiwibG9nb19wYXRoIiwicHVzaCIsImZsYXRyYXRlIiwiZmV0Y2hNb3ZpZVRyYWlsZXIiLCJtb3ZpZVRyYWlsZXIiLCJ0cmFpbGVycyIsImZpbHRlciIsImxlbmd0aCIsIm9mZmljaWFsIiwia2V5Iiwic2l0ZSIsImxhbmciLCJpc29fNjM5XzEiLCJmZXRjaE1vdmllUmV2aWV3cyIsInJldmlld3MiLCJjb25zb2xlIiwibG9nIiwicmV2aWV3IiwiYXV0aG9yIiwicmF0aW5nIiwiYXV0aG9yX2RldGFpbHMiLCJwaWNfcGF0aCIsImF2YXRhcl9wYXRoIiwiY29udGVudCIsInVybCIsImxhc3RfdXBkYXRlZCIsInVwZGF0ZWRfYXQiLCJzbGljZSIsImRyYXdTZWN0aW9uIiwibWVkaWEiLCJzZWN0aW9uIiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50IiwiZGV0YWlscyIsImdldEluZm8iLCJhZGRUb1NlY3Rpb24iLCJwYXJ0IiwiYXBwZW5kQ2hpbGQiLCJtb3ZpZUZuYyIsInR2Rm5jIiwiZHJhd0ludHJvIiwiaW1nU2l6ZSIsImludHJvQ29udGFpbmVyIiwiY2xhc3NMaXN0IiwiYWRkIiwidGl0bGUiLCJ0ZXh0Q29udGVudCIsImNyZWF0ZVRpdGxlIiwidGFnUGFyYSIsIndyaXRlVGFnbGluZSIsImltZyIsInBvc3RlciIsImJhc2VJbWdVcmwiLCJpbWdfcGF0aCIsInNyYyIsImFsdCIsInJlbmRlckltZyIsInBhcmEiLCJ3cml0ZVN1bW1hcnkiLCJkcmF3QWxsIiwiZHJhd1N1YkluZm9zIiwiY29udGFpbmVyIiwiY3JlYXRlU3ViSW5mbyIsImNhdGVnb3J5IiwiaW5mbyIsInN1YkluZm8iLCJjYXRlZ29yeU5hbWUiLCJjYXRlZ29yeUluZm8iLCJqb2luIiwibWlucyIsImhvdXJzIiwickhvdXJzIiwiTWF0aCIsImZsb29yIiwibWludXRlcyIsInJvdW5kIiwiY29udmVydE1pblRvSHIiLCJkcmF3U2VjdGlvbnMiLCJpZHMiLCJxdWVyeSIsInNwbGl0IiwiaW50ZXJwcmV0VG9RdWVyeSIsInJlc3VsdCIsImkiLCJtZWRpYV90eXBlIiwiZmV0Y2hJZHMiLCJtYWluIiwicXVlcnlTZWxlY3RvciIsInNlY3Rpb25zIiwicmVuZGVyU2VjdGlvbiIsImFkZEV2ZW50TGlzdGVuZXIiLCJlIiwicHJldmVudERlZmF1bHQiLCJnZXRFbGVtZW50QnlJZCIsInZhbHVlIiwiaW5uZXJIVE1MIiwiYWRkU3VibWl0U2VhcmNoRm5jIl0sInNvdXJjZVJvb3QiOiIifQ==