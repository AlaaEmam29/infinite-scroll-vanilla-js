"use strict"
let count = 5;
let photosArray =[]
let ready =false;
let imagesLoaded = 0, totalImages = 0;

const loading = document.querySelector(".loading")
const gallery = document.querySelector(".gallery")
const api_key = 'g06X4qwmUWEYDS5-Gcj7LFbKmE6n1ryE-8CNuiYxQJU'
let API_URL = `https://api.unsplash.com/photos/random/?client_id=${api_key}&count=${count}`;
  const fetchApiPhoto = async () =>
{
try
{
const response = await fetch(API_URL)
photosArray = await response.json()
return photosArray
}
catch (err)
{
gallery.innerHTML = `<p>Rate Limit Exceeded</p>`

}
}
const setAttributes = (element, attributes) =>{
    for (const key in attributes) {
      element.setAttribute(key, attributes[key]);
    }
  }
  const imgLoaded = ()=>
  {
imagesLoaded++;
if(imagesLoaded === totalImages)
{
    ready =true;
    loading.hidden = true;
    count = 30
}
  }
const displayPhotos = async () =>
{
const photos =await fetchApiPhoto()
imagesLoaded = 0;
totalImages = photos.length
 photos.forEach(photo=>{
        
    const item = document.createElement('a');
    setAttributes(item, {
      href: photo.links.html,
      target: '_blank',
    });
    const img = document.createElement('img');
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
      class : "img-gallery"
    });
    img.addEventListener("load",imgLoaded);
    item.appendChild(img);
    gallery.appendChild(item);


    })
}
window.addEventListener("DOMContentLoaded",displayPhotos)
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready === true) {
        ready = false
        displayPhotos()
    }
  });
  