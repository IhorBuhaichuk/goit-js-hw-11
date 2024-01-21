import{S as u,i as l}from"./assets/vendor-5b791d57.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const n of o.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&a(n)}).observe(document,{childList:!0,subtree:!0});function s(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function a(e){if(e.ep)return;e.ep=!0;const o=s(e);fetch(e.href,o)}})();const m="41949985-8da78252305a4c2e980ced1f3",f=document.querySelector(".search-form"),d=document.querySelector(".gallery"),p=document.querySelector(".search-input"),g=new u(".gallery a",{captionsData:"alt",captionDelay:250}),c=document.querySelector(".loader");c.style.display="none";f.addEventListener("submit",h);async function h(t){t.preventDefault();const r=p.value.trim();if(!r){L("Please enter image name!");return}w(),c.style.display="block";const s=new URLSearchParams({key:m,q:r,image_type:"photo",orientation:"horizontal",safesearch:!0});try{const a=await fetch(`https://pixabay.com/api/?${s}`);if(c.style.display="none",!a.ok)throw new Error(a.status);const e=await a.json();if(e.hits.length===0){i("No images found. Please try again!");return}y(e.hits),g.refresh()}catch(a){console.error("Error fetching images:",a),i("Failed to fetch images. Please try again later.")}}function y(t){const r=document.createDocumentFragment();t.forEach(s=>{const a=b(s);r.appendChild(a)}),d.appendChild(r)}function b(t){const r=document.createElement("div");return r.classList.add("card"),r.innerHTML=`
    <a class="gallery-link" href="${t.largeImageURL}">
        <img class="card-image" src="${t.webformatURL}" alt="${t.tags}" loading="lazy">
      </a>
      <div class="card-info">
        <p class="card-text"><b>Likes:</b> ${t.likes}</p>
        <p class="card-text"><b>Views:</b> ${t.views}</p>
        <p class="card-text"><b>Comments:</b> ${t.comments}</p>
        <p class="card-text"><b>Downloads:</b> ${t.downloads}</p>
      </div>
    `,r}function w(){d.innerHTML=""}function L(t){l.warning({title:"Warning!",message:t,position:"topRight"})}function i(t){l.error({message:t,position:"topRight"})}
//# sourceMappingURL=commonHelpers.js.map
