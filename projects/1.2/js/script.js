function changeHeader() {
    var header = document.querySelector("h1");
    header.innerHTML += "<br>Hello from Javascript";
}
function changeParagraph() {
    var paragraph = document.querySelector("p");
    paragraph.style.color = "maroon";
    paragraph.style.backgroundColor = "bisque";
    paragraph.style.border = "5px dashed purple";
    paragraph.style.padding = "10px";
}
function changeParagraphs() {
    var paragraph = document.querySelectorAll("p");
    for (var i=0; i<paragraph.length; i++) {
        paragraph[i].style.color = "cyan";
        paragraph[i].style.backgroundColor = "brown";
        paragraph[i].style.border = "5px dashed yellow";
        paragraph[i].style.padding = "10px";
        paragraph[i].style.borderRadius = "15px";
    }
}