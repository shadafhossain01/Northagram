import { feedData } from "../data.js";

const avaterContainer = document.querySelector(".feed-avatars");
const feedContainer = document.querySelector(".feed-images");
let timer;

function renderAvatars() {
  const avaterImg = feedData
    .map(
      (avtr) =>
        ` <img src="images/${avtr.avatarUrl}" alt="images/${avtr.handle}" class="avatar" />`
    )
    .join("");
  avaterContainer.innerHTML = avaterImg;
}

renderAvatars();

const avaters = document.querySelectorAll(".avatar");

function renderAvatarHighlight(index) {
  avaters.forEach((a) => a.classList.remove("highlight"));
  avaters[index].classList.add("highlight");
}


function renderImage(imgData, currentIndex, imgPostion) {
  const featureImg = imgData[currentIndex].features[imgPostion].imageUrl;
  feedContainer.innerHTML = `<img src="images/${featureImg}" class="feature-image"/>`;
}


function handleTimer() {
  let currentIndex = 0;
  let imgPosition = 0;

   timer = setInterval(() => {
    if (currentIndex >= feedData.length) {
      feedContainer.innerHTML = `<div class="ux-loading">Reload for More Data...</div>`;
      clearInterval(timer);
    }

    renderImage(feedData, currentIndex, imgPosition);
    renderAvatarHighlight(currentIndex);
    imgPosition++;

    if (imgPosition >= feedData[currentIndex].features.length) {
      imgPosition = 0;
       avaters[currentIndex].classList.add("gray");
       currentIndex++;
    }
    
  }, 1500);

}

handleTimer();


document.querySelector(".feed-images").addEventListener("click",()=>{
        clearInterval(timer);
});
