class NavStick {
    constructor(select) {
        this.nav = document.querySelector(select.el);
        this.rect = this.nav.getBoundingClientRect();
        this.top = this.rect.top;
        
        window.addEventListener('scroll', ()=> { 
            if(pageYOffset > 0 ) {
                this.nav.classList.add('fixed') 
            } else {
                this.nav.classList.remove('fixed')
            }
        })   
    }
}

const navl = new NavStick ({
    el: '.header__nav'
})
 
 