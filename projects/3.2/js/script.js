let myPicturesArray = [];
let selectedThumb;
let currentAlbum = 0;
let startIdx = 0;

// Add 20 landscape images
for (let i=1; i<=20; i++) {
    let imageObject = {};
    imageObject.albumId = 1;
    imageObject.id = i;
    imageObject.title = "Landscape Image " + i;
    imageObject.url = "img/landscape/" + i + ".jpg";
    imageObject.thumbnailUrl = "img/landscape/thumb/" + i + ".jpg";
    myPicturesArray.push(imageObject);
}
// Add 5 nature images
for (let i=1; i<=5; i++) {
    let imageObject = {};
    imageObject.albumId = 2;
    imageObject.id = i;
    imageObject.title = "Nature Image " + i;
    imageObject.url = "img/nature/" + i + ".jpg";
    imageObject.thumbnailUrl = "img/nature/thumb/" + i + ".jpg";
    myPicturesArray.push(imageObject);
}
// Add 10 space images
for (let i=1; i<=10; i++) {
    let imageObject = {};
    imageObject.albumId = 3;
    imageObject.id = i;
    imageObject.title = "Space Image " + i;
    imageObject.url = "img/space/" + i + ".jpg";
    imageObject.thumbnailUrl = "img/space/thumb/" + i + ".jpg";
    myPicturesArray.push(imageObject);
}

window.onload = init;

function init() {
    displayThumbs(currentAlbum);
    setSelectedThumb(0);
    window.addEventListener("resize", setBG);
    let albums = document.querySelectorAll("li");
    for (let i=0; i<albums.length; i++) {
        albums[i].addEventListener("click", changeAlbum);
    }
}

// Display picures
function displayThumbs(currentAlbum) {
    let idx = 0;
    let startIdxSet = false;
    let scrollDiv = document.querySelector("#scrollDiv");
    myPicturesArray.forEach(function(currentImage) {
        if (currentAlbum == 0 || currentImage.albumId == currentAlbum) {
            if (!startIdxSet) {
                startIdx = idx;
                startIdxSet = true;
            }
            let div = document.createElement("div");
            div.className = "imageDiv";
            div.setAttribute("data-idx", idx);
            let image = document.createElement("img");
            image.src = currentImage.thumbnailUrl;
            image.alt = currentImage.title;
            div.appendChild(image);
            let text = document.createElement("p");
            text.innerHTML = image.alt;
            div.appendChild(text);
            scrollDiv.appendChild(div);
            div.addEventListener("click", setSelected);
        }
        idx++;
    });
    selectedThumb = 0;
    setSelectedThumb(startIdx);
    let imageDiv = document.querySelectorAll(".imageDiv");
    scrollDiv.style.width = String(294 * imageDiv.length) + "px";
    document.querySelector("#thumbBar").scrollLeft = 0;
}

function setSelectedThumb(idx) {
    selectedThumb = idx - startIdx;
    let selectedDiv = document.querySelectorAll(".imageDiv")[idx - startIdx];
    selectedDiv.id = "thumbSelected";
    setBgImage(idx);
}

function setSelected(evt) {
    document.querySelectorAll(".imageDiv")[selectedThumb].id = "";
    setSelectedThumb(evt.currentTarget.getAttribute("data-idx"));
}

function setBgImage(idx) {
    let lgImage = document.querySelector("#largeImage");
    let bgImage = "url('" + myPicturesArray[idx].url + "')";
    lgImage.style.backgroundImage = bgImage;
    lgImage.style.height = String(window.innerHeight - 120) + "px";
}

function setBG() {
    setBgImage(selectedThumb);
}

function changeAlbum(evt) {
    document.querySelectorAll(".imageDiv")[selectedThumb].id = "";
    document.querySelectorAll("li")[currentAlbum].removeAttribute("id");
    evt.target.id = "selectedAlbum";
    document.querySelector("#scrollDiv").innerHTML = "";
    let idx = evt.target.getAttribute("data-idx");
    currentAlbum = idx;
    displayThumbs(idx);
}