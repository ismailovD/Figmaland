class SideBar  {
    constructor(option) {
        this.nav = document.querySelector(option.el);
        this.menu = document.querySelector(option.menu);
        this.body = document.querySelector('body');
        this.nav.addEventListener('click', ()=> {
            this.menu.classList.add('active'); 
            document.addEventListener('mouseup', (e)=> {
                if(e.target != this.menu) {
                    this.menu.classList.remove('active');
                }
            })
        }, true)  
        window.addEventListener('resize', ()=> { 
            this.menu.classList.remove('active');
        })
    }
}

const navbar = new SideBar ({
    el: '.burger__menu',
    menu: '.header__nav-side'
})
 