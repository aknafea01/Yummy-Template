const nav = document.getElementById("navbar");
const sections = document.querySelectorAll("section");
const items = document.querySelectorAll("section .scrollable");
const stats = document.querySelector("#stats");
const lightBoxContainer = document.getElementById("lightBoxContainer");
const lightBoxItem = document.getElementById("lightBoxItem");
const TapPanes = document.querySelectorAll(".tab-pane");
const swipperImages = document.querySelectorAll(".swiper-slide");
const closeBtns = document.querySelectorAll(".close");
const nextBtn = document.getElementById("nextImg");
const prevBtn = document.getElementById("prevImg");
const gallery = document.getElementById("gallery");
const gallerLightBoxContainer = document.getElementById(
  "galler-LightBoxContainer"
);
const gallerLightBoxItems = document.getElementById("gallery-LightBoxItems");
const prevGalleryImg = document.getElementById("prevGalleryImg");
const nextGalleryImg = document.getElementById("nextGalleryImg");

$(document).ready(function () {
  $(".testimonials").slick({
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  });
});
$(document).ready(function () {
  $(".event .slider .inner-slider").slick({
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 992, // tablets
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768, // mobiles
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  });
});

const swiper = new Swiper(".swiper", {
  slidesPerView: 1,
  spaceBetween: 10,
  centeredSlides: true,
  loop: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  breakpoints: {
    640: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    768: {
      slidesPerView: 3,
      spaceBetween: 25,
    },
    1024: {
      slidesPerView: 5,
      spaceBetween: 30,
    },
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
closeBtns.forEach((closeBtn) => {
  closeBtn.addEventListener("click", closeLightBox);
  function closeLightBox() {
    lightBoxContainer.style.display = "none";
    lightBoxItem.style.scale = 0;
    gallerLightBoxContainer.style.display = "none";
    nav.classList.toggle("hidden", false);
    document.body.style.overflow = "";
  }
});
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
let currenGalleryIndex;
const galleryImgs = gallery.querySelectorAll("img");
galleryImgs.forEach((img, idx) => {
  img.style.cursor = "pointer";
  img.addEventListener("click", () => {
    gallerLightBoxContainer.style.display = "flex";
    gallerLightBoxItems.style.backgroundImage = `url(${img.getAttribute(
      "src"
    )})`;
    document.body.style = "overflow:hidden";
    nav.classList.toggle("hidden");
    currenGalleryIndex = idx;
  });
});
prevGalleryImg.addEventListener("click", prevGalImg);
nextGalleryImg.addEventListener("click", nextGalImg);
function prevGalImg() {
  currenGalleryIndex--;
  if (currenGalleryIndex < 0) {
    currenGalleryIndex = galleryImgs.length - 1;
  }
  gallerLightBoxItems.style.backgroundImage = `url(${galleryImgs[
    currenGalleryIndex
  ].getAttribute("src")})`;
}
function nextGalImg() {
  currenGalleryIndex++;
  if (currenGalleryIndex > galleryImgs.length - 1) {
    currenGalleryIndex = 0;
  }
  gallerLightBoxItems.style.backgroundImage = `url(${galleryImgs[
    currenGalleryIndex
  ].getAttribute("src")})`;
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
