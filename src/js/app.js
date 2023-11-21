document.TIMEOUT = []

window.onscroll = ()=>{
    clearTimeout(document.TIMEOUT.scroll)
    document.TIMEOUT.scroll = setTimeout(()=>{
        
        Array.from(document.querySelectorAll("main>section"))
        .forEach((e,i)=>{            
            if (Math.abs(e.offsetTop - window.scrollY ) <= e.offsetHeight / 2) {
                window.scrollTo( {
                    top:e.offsetTop
                })                   
                e.classList.add("inview")     
                document.getElementById("bg").style.backgroundColor = ["#000000","rgb(255, 94, 0)",""][i]
            }else{
                e.classList.remove("inview")  
            }
        })
    },100)
}