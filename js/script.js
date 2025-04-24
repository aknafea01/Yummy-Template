const nav = document.getElementById("navbar");
const sections = document.querySelectorAll("section");
const items = document.querySelectorAll("section .scrollable");
const stats = document.querySelector("#stats");
const lightBoxContainer = document.getElementById("lightBoxContainer");
const lightBoxItem = document.getElementById("lightBoxItem");
const TapPanes = document.querySelectorAll(".tab-pane");
const swipperImages = document.querySelectorAll(".swiper-slide");
const closeBtn = document.getElementById("close");
const nextBtn = document.getElementById("nextImg");
const prevBtn = document.getElementById("prevImg");
const carousels = document.querySelectorAll(".carousel");
const swiper = new Swiper(".swiper", {
  slidesPerView: 5,
  spaceBetween: 30,
  centeredSlides: true,
  loop: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});

let i;
sections.forEach((section) => {
  i = 0.1;
  section.querySelectorAll("section .scrollable").forEach((el) => {
    i += 0.1;
    el.style.transitionDelay = `${i}s`;
  });
});
// Navbar onscroll styled
window.onscroll = function () {
  if (window.scrollY > 10) {
    nav.style.boxShadow = "rgba(149, 157, 165, 0.2) 0px 8px 24px";
    document.getElementsByClassName("scroll-up")[0].classList.add("show");
  } else {
    nav.style.boxShadow = "none";
    document.getElementsByClassName("scroll-up")[0].classList.remove("show");
  }
};

const options = {
  // rootMargin:'-100px'
};
const observer = new IntersectionObserver((enteries) => {
  enteries.forEach((el) => {
    el.target.classList.toggle("show", el.isIntersecting);
    if (el.isIntersecting) {
      observer.unobserve(el.target);
    }
  });
}, options);

items.forEach((item) => {
  observer.observe(item);
});

const statsObserver = new IntersectionObserver((enteries) => {
  enteries.forEach((entry) => {
    if (entry.isIntersecting) {
      stats.querySelectorAll("h2").forEach((h2) => {
        startCount(h2);
      });
    }
  });
});
statsObserver.observe(stats);
function startCount(el) {
  let end = el.getAttribute("data-value");
  let counter = setInterval(() => {
    el.textContent = +el.textContent + 14;
    if (+el.textContent >= +end) {
      clearInterval(counter);
    }
  }, 1);
}
let currenIndex, ParentIdx, TapPaneImgsLength;

TapPanes.forEach((TapPane, parentIdx) => {
  TapPane.querySelectorAll("img").forEach((img, idx, arr) => {
    img.style.cursor = "pointer";
    img.addEventListener("click", () => {
      TapPaneImgsLength = arr.length;
      nav.classList.toggle("hidden", true);
      document.body.style.overflow = "hidden";
      currenIndex = idx;
      ParentIdx = parentIdx;
      lightBoxContainer.style.display = "flex";
      lightBoxItem.style.scale = 1;
      lightBoxItem.style.backgroundImage = `url(${
        TapPane.querySelectorAll("img")[idx].src
      })`;
    });
  });
});
closeBtn.addEventListener("click", closeLightBox);
function closeLightBox() {
  lightBoxContainer.style.display = "none";
  lightBoxItem.style.scale = 0;
  nav.classList.toggle("hidden", false);
  document.body.style.overflow = "";
}
nextBtn.addEventListener("click", nextImg);
prevBtn.addEventListener("click", prevImg);
function nextImg() {
  currenIndex++;
  if (currenIndex == TapPaneImgsLength) {
    currenIndex = 0;
  }
  lightBoxItem.style.backgroundImage = `url(${
    TapPanes[ParentIdx].querySelectorAll("img")[currenIndex].src
  })`;
  lightBoxItem.classList.toggle("moveLeft", false);
  lightBoxItem.classList.toggle("moveLeft", true);
}
function prevImg() {
  currenIndex--;
  if (currenIndex < 0) {
    currenIndex = TapPaneImgsLength - 1;
  }
  lightBoxItem.style.backgroundImage = `url(${
    TapPanes[ParentIdx].querySelectorAll("img")[currenIndex].src
  }`;
}

lightBoxItem.addEventListener("dragstart", (e) => {
  const ghostImg = new Image();
  ghostImg.src =
    "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='1' height='1'></svg>";
  e.dataTransfer.setDragImage(ghostImg, 0, 0);
});

lightBoxItem.addEventListener("dragend", (e) => {
  let rightEdge =
    lightBoxItem.getBoundingClientRect().left +
    lightBoxItem.getBoundingClientRect().width;

  let leftEdge = lightBoxItem.getBoundingClientRect().left;
  if (e.clientX > rightEdge) {
    nextImg();
  } else if (e.clientX < leftEdge) {
    prevImg();
  }
});
carousels.forEach((carousel, CaroselIdx, carouselArr) => {
  carousel.querySelectorAll(".draggable").forEach((item, idx, arr) => {
    item.setAttribute("draggable", "true");
    item.style.cursor = "grab";
    item.addEventListener("dragstart", (e) => {
      const ghostImg = new Image();
      ghostImg.src =
        "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='1' height='1'></svg>";
      e.dataTransfer.setDragImage(ghostImg, 0, 0);
    });
    item.addEventListener("dragend", (e) => {
      console.log(
        item.getBoundingClientRect().left + item.getBoundingClientRect().width,
        e.clientX
      );
      if (e.clientX > item.getBoundingClientRect().left) {
        carousel.querySelector(".carousel-control-prev").click();
      } else if (e.clientX < item.getBoundingClientRect().left + 200) {
        carousel.querySelector(".carousel-control-next").click();
      }
    });
  });
});

/*////////////////////////////*/
const slider = document.querySelector(".slider");
const innerSlider = document.querySelector(".inner-slider");
let sliderItems = document.querySelectorAll(".slider-item");
let dragged = false;
let startX;
let x;
sliderItems.forEach((item) => {
  const clone = item.cloneNode(true);
  innerSlider.appendChild(clone);
});
sliderItems = document.querySelectorAll(".slider-item");

slider.addEventListener("mousedown", (e) => {
  dragged = true;
  startX = e.clientX - innerSlider.offsetLeft;
  slider.style.cursor = "grabbing";
});

slider.addEventListener("mouseenter", () => {
  slider.style.cursor = "grab";
});

slider.addEventListener("mouseup", () => {
  slider.style.cursor = "grab";
  dragged = false;
});
slider.addEventListener("mousemove", (e) => {
  if (!dragged) return;
  e.preventDefault();
  x = e.clientX;
  innerSlider.style.left = `${x - startX}px`;
  const maxScroll = -innerSlider.scrollWidth / 2;
  const left = parseInt(innerSlider.style.left || "0", 10);

  if (left < maxScroll) {
    innerSlider.style.left = "0px";
    startX = e.clientX;
  } else if (left > 0) {
    innerSlider.style.left = `${maxScroll}px`;
    startX = e.clientX - maxScroll;
  }
});
const indicators = document.querySelectorAll(".indicator");

function updateIndicators() {
  const left = parseInt(innerSlider.style.left || "0", 10);
  const index = Math.round(-left / 400);
  indicators.forEach((btn, i) => {
    btn.classList.toggle("active", i === index);
  });
}
slider.addEventListener("mousemove", () => {
  if (!dragged) return;
  updateIndicators();
});

swipperImages.forEach((swipper, parentIdx) => {
  swipper.querySelectorAll("img").forEach((img, idx, arr) => {
    img.style.cursor = "pointer";
    img.addEventListener("click", () => {
      swipperImgsLength = arr.length;
      nav.classList.toggle("hidden", true);
      document.body.style.overflow = "hidden";
      currenIndex = idx;
      ParentIdx = parentIdx;
      lightBoxContainer.style.display = "flex";
      lightBoxItem.style.scale = 1;
      lightBoxItem.style.backgroundImage = `url(${
        swipper.querySelectorAll("img")[idx].src
      })`;
    });
  });
});