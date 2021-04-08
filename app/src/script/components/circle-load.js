const   circle = document.querySelector('.progress__ring-circle'),
        loadPercent = document.querySelector('.progress__load-percent'), 
        loadProgress = document.querySelector('.progress__load'), 
        body = document.querySelector('body'),
        nav = document.querySelector('.header__nav'),
        radius = circle.r.baseVal.value,
        circleC = Math.round(2 * Math.PI * radius); 
circle.style.strokeDasharray = `${circleC} ${circleC}`; 
circle.style.strokeDashoffset = circleC ; 

loadProgress.addEventListener('click', ()=> { 
    
})

document.addEventListener('scroll' , ()=> {   
    let windowScroll = pageYOffset,
        windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight,
        percent = Math.round(windowScroll / windowHeight * 100);
    if(pageYOffset == 0 ){
        loadProgress.style.display = "none" 
    } else  loadProgress.style.display = "flex" 
    loadPercent.innerHTML =  percent  == 0 ? "" : `${ percent}%`;
    circleLoad(percent);
})
    
 function circleLoad(percent) {
     let part = circleC - percent / 100 * circleC;
     circle.style.strokeDashoffset = part ;
   }
 



 