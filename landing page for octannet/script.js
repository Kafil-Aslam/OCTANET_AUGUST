
const homeImageContainer = document.querySelector('.image-container');
const homeImage = document.querySelector('.image-container img');
const homeNextButton = document.querySelector('.next-button');
const homePrevButton = document.querySelector('.prev-button');


const homeImageUrls = [
  'messi.jpg',  
  'mes3.jpeg', 
  'messi.jpg', 
];

let currentHomeImageIndex = 0;


function updateHomeImage() {
  homeImage.src = homeImageUrls[currentHomeImageIndex];
}


homeNextButton.addEventListener('click', () => {
  currentHomeImageIndex = (currentHomeImageIndex + 1) % homeImageUrls.length;
  updateHomeImage();
});

homePrevButton.addEventListener('click', () => {
  currentHomeImageIndex = (currentHomeImageIndex - 1 + homeImageUrls.length) % homeImageUrls.length;
  updateHomeImage();
});

// for career section
const careerImages = ["messi.jpg", "mes3.jpeg", "messi.jpg"]; 
const careerImageDescriptions = [
  "HERE DISCRIPTION IS  YET TO BE ADDED AS IT IS STILL A WORK IN PROGRESS",
  "HERE DISCRIPTION IS  YET TO BE ADDED AS IT IS STILL A WORK IN PROGRESS",
  "HERE DISCRIPTION IS  YET TO BE ADDED AS IT IS STILL A WORK IN PROGRESS"
];

let currentCareerImageIndex = 0;

const careerDescription = document.querySelector(".career-description");
const careerImage = document.querySelector(".career-img");
const careerPrevButton = document.querySelector(".prev-button.career");
const careerNextButton = document.querySelector(".next-button.career");

function updateCareerImageAndDescription() {
  careerImage.src = careerImages[currentCareerImageIndex];
  careerDescription.textContent = careerImageDescriptions[currentCareerImageIndex];
}

careerPrevButton.addEventListener("click", () => {
  currentCareerImageIndex = (currentCareerImageIndex - 1 + careerImages.length) % careerImages.length;
  updateCareerImageAndDescription();
});

careerNextButton.addEventListener("click", () => {
  currentCareerImageIndex = (currentCareerImageIndex + 1) % careerImages.length;
  updateCareerImageAndDescription();
});


updateHomeImage();
updateCareerImageAndDescription();




const videoContainers = document.querySelectorAll('.video-container');
const videoTitles = document.querySelectorAll('.video-title');


const videoUrls = [
  'URL TO BE ADDED .. STILL A WORK IN PROGRESS'
];

const videoTitlesArray = [
  'ALL Goals', 
  'for barcelona', 
  'Video Title 3'  
];


function updateVideo(videoElement, videoTitleElement, videoUrl, videoTitle) {
  videoElement.src = videoUrl;
  videoTitleElement.textContent = videoTitle;
}


videoContainers.forEach((container, index) => {
  const video = container.querySelector('.video');
  const videoTitle = container.querySelector('.video-title');


  updateVideo(video, videoTitle, videoUrls[index], videoTitlesArray[index]);

 
  container.addEventListener('click', () => {
    updateVideo(video, videoTitle, videoUrls[index], videoTitlesArray[index]);
  });
});

