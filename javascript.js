//Get references to starter panels
const panels = document.getElementsByClassName('starter-panel');

for (let i = 0; i < panels.length; i++) {
    panels[i].addEventListener('click', function(e) {
        let info = e.target.querySelector('.starter-info');
        info.classList.toggle('do-not-display');
    })
}

function DisplayStarterInfo(e) {

}