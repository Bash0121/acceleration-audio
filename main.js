const audioPlayer = document.getElementById("audioPlayer");
const playButton = document.getElementById("playButton");
const pauseButton = document.getElementById("pauseButton");
const progressBar = document.getElementById("progress");
const customProgressBar = document.getElementById("custom-progress-bar");

const baseURL = "/songs";

let currentTrack = 0;
let currentArt = 0
let savedTime = 0;
let savedPlayBack = 1;

const songs = [
  { file: "Aidan.mp3", albumArt: "Aidan.jpg", name: "Aidan" },
  { file: "autumn_sun.mp3", albumArt: "autumn_sun.png", name: "Autumn Sun" },
  { file: "best_part_of_me.mp3", albumArt: "BestPart.jpg", name: "Best Part" },
  { file: "Better Days - LAKEY INSPIRED.mp3", albumArt: "Better Days.jpg", name: "Better Days" },
  { file: "i_cant_make_you_love_me_cover.mp3", albumArt: "i_cant_make_you_love_me_cover.jpeg", name: "I Cant Make You Love Me" },
  { file: "just_relax.mp3", albumArt: "justRelax_img.jpeg", name: "Just Relax" },
  { file: "paranormal-is-real-leonell-cassio.mp3", albumArt: "paranormal_real_500.jpg", name: "Paranormal" },
  { file: "Polarity.mp3", albumArt: "Polarity.jpg", name: "Polarity" },
];

function activeSongArt () {
  const albumArt = document.querySelectorAll("#albumArt img")
    albumArt.forEach(img => {
    if (img.dataset.art === songs[currentTrack].albumArt) {
      img.classList.add("border-8", "border-yellow-400")
    } else {
      img.classList.remove("border-8", "border-yellow-400")
      
    }
  });
}

function activeName () {
  const songName = document.getElementById("songName")
  songName.textContent = `Current Song: ${songs[currentTrack].name}`
}

playButton.addEventListener("click", () => {
  audioPlayer.load();
  audioPlayer.src = `${baseURL}/${songs[currentTrack].file}`;
  audioPlayer.currentTime = savedTime
  audioPlayer.playbackRate = savedPlayBack
  playButton.classList.toggle("hidden")
  pauseButton.classList.toggle("hidden")
  audioPlayer.play();

  activeSongArt()
  activeName()
});

pauseButton.addEventListener("click", () => {
  console.log("pause");
  audioPlayer.currentTime = savedTime
  audioPlayer.playbackRate = savedPlayBack
  audioPlayer.pause();
  playButton.classList.toggle("hidden")
  pauseButton.classList.toggle("hidden")

  activeSongArt()
  activeName()

});

prevButton.addEventListener("click", () => {
  if (!pauseButton.classList.contains("hidden")) {
    audioPlayer.pause()
    playButton.classList.toggle("hidden")
    pauseButton.classList.toggle("hidden")
  }
  savedTime = 0
  savedPlayBack=1
  audioPlayer.currentTime = savedTime
  audioPlayer.playbackRate = savedPlayBack
  console.log("prev");
  (currentTrack > 0 ? (currentTrack-=1) : (currentTrack = 7))
  audioPlayer.src = `${baseURL}/${songs[currentTrack].file}`;

  activeSongArt()
  activeName()
});

nextButton.addEventListener("click", () => {
  if (!pauseButton.classList.contains("hidden")) {
    audioPlayer.pause()
    playButton.classList.toggle("hidden")
    pauseButton.classList.toggle("hidden")
  }
  savedTime = 0
  savedPlayBack=1
  audioPlayer.currentTime = savedTime
  audioPlayer.playbackRate = savedPlayBack
  console.log("next");
  (currentTrack >= 7 ? (currentTrack=0) : (currentTrack += 1))
  audioPlayer.src = `${baseURL}/${songs[currentTrack].file}`;

  activeSongArt()
  activeName()
});

audioPlayer.addEventListener("timeupdate", () => {
  progressBar.value = audioPlayer.currentTime / audioPlayer.duration;
  customProgressBar.style.width = `${
    (audioPlayer.currentTime / audioPlayer.duration) * 100
  }%`;

  console.log(`${audioPlayer.currentTime} / ${audioPlayer.duration}`);

  audioPlayer.playbackRate += 0.01;

  const currentSpeed = document.getElementById("currentSpeed")
  currentSpeed.textContent = `Current Speed: ${Math.round(audioPlayer.playbackRate *100 )/100}`
});

document.addEventListener("keydown", (event) => {
  switch (event.key.toLowerCase()) {   
    case " ":
      event.preventDefault();

      if (audioPlayer.paused) {
        audioPlayer.play();
        playButton.classList.toggle("hidden")
        pauseButton.classList.toggle("hidden")
      } else {
        audioPlayer.pause()
        playButton.classList.toggle("hidden")
        pauseButton.classList.toggle("hidden")
      }
      break;

    case "m":
      audioPlayer.muted = !audioPlayer.muted;
      break;

    case "arrowleft":
      audioPlayer.currentTime -=5
      savedTime=audioPlayer.currentTime
      break;

    case "arrowright":
      audioPlayer.currentTime +=5
      savedTime=audioPlayer.currentTime
      break;
  }
});
