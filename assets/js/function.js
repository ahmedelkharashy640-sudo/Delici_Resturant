function prepareMenu(idName, menuItems) {
    // let listContent = document.getElementById(`${idName}`); //another right way 
    let listContent = document.getElementById(idName),
    part = listContent.querySelectorAll(".part"),
    menuImage = {
        "BreakFast-content" : {prefix : "BF" , ext : "webp"},
        "Lunch-content" :     {prefix : "L" , ext : "png"},
       "Dinner-content" :    {prefix : "Di" , ext : "webp"},
        "Drinks-content" :    {prefix : "Dr" , ext : "webp"},
    },
    image = menuImage[idName];

    menuItems.forEach((item, index) => {
        let targetPart; 
        if (index < 3) {
            targetPart = part[0];
        }
        else 
        {
            targetPart = part[1];
            
        }
       let targetItem = targetPart.querySelector(".item"),
           imagePath = `./assets/images_delici/images/${image.prefix}-${index + 1}.${image.ext}`;
        targetItem.innerHTML +=`
        <div class="box">
            <div class="item">
                <div class="headImage">
                    <div class="img" style="background-image:url('${imagePath}')">
                    
                        </div>
                    <i class="fab fa-hand-rock" onclick="openMenuPopup(event)" data-category="${idName}" data-index="${index}"></i>

                </div>
                <div class="content">
                    <div class="header mb-2">
                        <h5 class="mb-0">${item.name}</h5>
                        <div class="Hr d-sm-block d-none">
                            <hr>
                            <hr>
                        </div> 
                    
                        <p class="mb-0">${item.price}</p>
                    </div>
                    <p class="mainParagraph">${item.miniDescription}</p>
                </div>
            </div>
        </div>
        `;
    });
    
}

function checkScrollNav() {
 let currentScroll = window.scrollY;

 if(currentScroll < lastScroll)
 {
    navEle.classList.remove("hide");
   burger.classList.remove("hide");
 }
 else if (currentScroll > lastScroll)
 {
   navEle.classList.add("hide");
   burger.classList.add("hide");


 }
 lastScroll = currentScroll;

  if (currentScroll > 10) {

    navEle.classList.add("scrolled");
  }
 else {
    navEle.classList.remove("scrolled");
  }
}
function updateScrollBar() {
  let scrollTop = window.scrollY,
      scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight,
      progress = (scrollTop/scrollHeight)*100;

      progressBar.style.width = `${progress}%`;


}

function setActiveNavLink(href) {
    let currentEleLinks = document.querySelectorAll(".main-nav-link.active"),
        linksOfSection = document.querySelectorAll(`.main-nav-link[href="${href}"]`);

    currentEleLinks.forEach(function(link) {
        link.classList.remove("active");
    });

    linksOfSection.forEach(function(link) {
        link.classList.add("active");
    });
}

function updateActiveLink(linkEle) {
    let currentId = linkEle.getAttribute("href"),
        currentSection = document.querySelector(currentId),
        topOfSection = currentSection.offsetTop;

    setActiveNavLink(currentId);

    return topOfSection;
}

function updateNavLink(sectionId) {
    let section = document.querySelector(`#${sectionId}`),
        sectionTop = section.offsetTop - 100,
        sectionHeight = section.clientHeight,
        sectionBottom = sectionTop + sectionHeight;

    if (window.scrollY > sectionTop && window.scrollY < sectionBottom) {
        setActiveNavLink(`#${sectionId}`);
    }
}

function openPopup(popupName) {
  let popupEle = document.querySelector(
    `.popup[data-popup-name="${popupName}"]`,
  );
  popupEle.classList.add("active");
  setTimeout(function () {
    popupEle.classList.add("show");
  }, 100);
}
function createMenuItem(item, index, selectedIndex) {
return `
 <div class="carousel-item h-100 ${index === Number(selectedIndex) ? "active" : ""}">
                    <div class="container h-100 text-center">
                        <div class="box rounded-3 p-3">
                            <div class="title">
                                <i class="fa-regular fa-circle-xmark fs-4" onclick="closePopup();"></i>
                                <h6>SPECIAL SELECTION</h6>
                                <img src="./assets/images_delici/images/separator.svg" class="img-fluid mb-4" alt="separator_image">
                                <h2>${item.name}</h2>
                            </div>
                            <div class="body">
                                <div class="image">
                                    <div class="price">${item.price}</div>
                                    <img src="./assets/images_delici/images/${item.images[0]}" class="img-fluid" alt="BF_image">
                                </div>
                                <p>
                                  ${item.description.trim().split(/\s+/, 200).join(" ")}
                                </p>

                            </div>
                        </div>
                    </div>
                </div>

`
}
function openMenuPopup(event)
{
    let icon = event.currentTarget,
        category = icon.dataset.category,
        selectedIndex = icon.dataset.index;

    category = category.replace("-content", "");

    let menuItems = menus[category];

    menuCarouselInner.innerHTML = "";

    menuItems.forEach(function (item, itemIndex) {
        menuCarouselInner.innerHTML += createMenuItem(
            item,
            itemIndex,
            selectedIndex
        );
    });

    openPopup("Menu");
}
function closePopup() {
  let popupEle = document.querySelector(".popup.active");
  popupEle.classList.remove("show");
  setTimeout(function () {
    popupEle.classList.remove("active");
  }, 400);
}

function cancelEditing()
{
  resetForm();
}
function checkInput(input) {
  let inputName = input.name,
    inputValue = input.value,
    isEmpty = inputValue === "",
    errorEle = document.querySelector(
      `p.alert[data-error-name="${inputName}"]`,
    ),
    errorMsg = "",
    isInValidDate = false,
    isInValid = false;

  if (inputName == "datetime-local" && !isEmpty) {
    let selectedDate = new Date(input.value),
      selectedHour = selectedDate.getHours(),
      selectedMinutes = selectedDate.getMinutes(),
      currentDate = new Date();

    isInValidDate =
      selectedHour < 7 ||
      selectedHour > 21 ||
      (selectedHour == 21 && selectedMinutes > 0) ||
      selectedDate <= currentDate;
  }

  if (inputName == "datetime-local") {
    isInValid = isInValidDate;
  } else if (regexInputs[inputName]) {
    isInValid = !regexInputs[inputName].test(inputValue);
  }

  if (isEmpty) {
    errorMsg = "this field is required.";
  } else if (
    isInValid &&
    (inputName == "userName" || inputName == "Name")
  ) {
    errorMsg = "Enter letters only.";
  } else if (isInValid && inputName == "phone") {
    errorMsg = "Enter a valid Egyptian phone number.";
  } else if (isInValid && inputName == "seats") {
    errorMsg = "Available seats from 1 to 15.";
  } else if (isInValid && inputName == "datetime-local") {
    errorMsg = "Choose a future time between 7 AM and 9 PM.";
  } else if (isInValid && inputName == "email") {
    errorMsg = "Invalid email address.";
  }

  if (isEmpty || isInValid) {
    input.classList.add("is-invalid");
    input.classList.remove("is-valid");

    if (errorEle) {
      errorEle.classList.remove("d-none");
      errorEle.textContent = errorMsg;
    }

    input.dataset.valid = false;
  } else {
    input.classList.remove("is-invalid");
    input.classList.add("is-valid");

    if (errorEle) {
      errorEle.classList.add("d-none");
    }

    input.dataset.valid = true;
  }
}