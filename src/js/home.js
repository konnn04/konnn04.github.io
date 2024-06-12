const bgHome = document.querySelector("#home")
const slide = bgHome.querySelector(".slide")
const scope = slide.querySelector(".scope")
window.onload = () =>{
    updateSize()
    window.onscroll = (e)=>{
        const max = Math.max(window.innerWidth,window.innerHeight)
        const w = (max*(slide.offsetTop / (bgHome.offsetHeight - slide.offsetHeight))) + 300
        scope.style.borderRadius = slide.offsetTop / (bgHome.offsetHeight - slide.offsetHeight) >0.9? '0%' : '50%';
        scope.style.width = w + "px"
        
        
    }
}

window.onresize  = updateSize()

function updateSize(){
    const video = document.querySelector("#home .slide .scope .bg video")
    if (window.innerWidth / window.innerHeight > 16/9) {        
        video.style.width = "100vw"
        video.style.height = "unset"
    }else{
        video.style.width = "unset"
        video.style.height = "100vh"
    }
}