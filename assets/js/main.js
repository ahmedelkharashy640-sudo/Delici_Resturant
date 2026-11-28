let loading =  document.querySelector(".preloader"),
    navEle = document.querySelector("nav.navbar"),
    navLinks=document.querySelectorAll(".main-nav-link"),
    burger=document.querySelector(".burger"),
    carousel=document.querySelector("#carouselExampleIndicators"),
    slideSound = document.getElementById("slideSound"),
    sections=document.querySelectorAll("section,header"),
    popupBoxes=document.querySelectorAll('.popup .box'),
    registerForm = document.querySelector("#Booking form"),
    contactForm = document.querySelector("#Contact form"),
    registerFormInputs = registerForm.querySelectorAll("input"),
    contactFormInputs = contactForm.querySelectorAll("input,textarea"),
    progressBar = document.getElementById("scrollBar"),
    menuCarouselInner=document.querySelector("#menuCarouselInner"),
    lastScroll = 0,

    menus = {
                BreakFast : BreakFast,
                Lunch : Lunch,
                Dinner : Dinner,
                Drinks : Drinks,
            },
regexInputs = {
    userName: /^(?=.*[A-Za-z])[A-Za-z\s]+$/,
    Name : /^[A-Za-z]+$/,
    phone: /^\+201(1|2|5|0)[0-9]{8}$/,
    seats : /^(?:[1-9]|1[0-5])$/,
    email:/^[A-Za-z_][A-Za-z_0-9\.]+@(gmail|yahoo)\.(com|org)$/,

  };
    checkScrollNav();

for(let menu in menus)
    {
        prepareMenu(`${menu}-content`,menus[menu]);
    }
    


window.addEventListener("load",function(){
        loading.classList.add('hide');
    setTimeout(function(){
        loading.classList.add('d-none');
        },3500)
});

window.addEventListener("scroll",function(){
        checkScrollNav();
        updateScrollBar();
        sections.forEach(function(section)
        {
            updateNavLink(section.id);
        });
});

navLinks.forEach(function(navLink) {
    navLink.addEventListener("click", function(e) {
        e.preventDefault();

        let topOfSection = updateActiveLink(this);

        window.scrollTo(0, topOfSection - navEle.clientHeight + 100);
    });
});

carousel.addEventListener("slid.bs.carousel", function () {
    let homeLink = document.querySelector('.main-nav-link[href="#Home"]');

    if (homeLink.classList.contains("active")) {
        let home = document.querySelector("#Home");

        home.classList.remove("flash");
        requestAnimationFrame(()=> {

            home.classList.add("flash");
        })

        slideSound.currentTime = 0;
        slideSound.play();
    }
});

popupBoxes.forEach(function(box) {
    box.addEventListener('click', function(e) {
        e.stopPropagation();
    });
});





