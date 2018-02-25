// ======================
// Header menu navigation
// ======================
const navWrapper = document.getElementById('nav__wrapper')

function adjsutNavigationHeight () {
  if (window.scrollY >= 100) {
    navWrapper.style.height = '50px'
  } else if (window.scrollY < 100) {
    navWrapper.style.height = '100px'
  }
}

// Adjust the header height on load (the user can be anywhere on the page)
document.addEventListener('DOMContentLoaded', () => {
  adjsutNavigationHeight()
})

window.addEventListener('scroll', () => {
  adjsutNavigationHeight()
})

// =======================
// Movie replacement logic
// =======================
// videos[title] = vimeo ID
const videos = {
  bin_horror: 230815073,
  chip: 126994865,
  dbot: 230814499,
  ink: 72102640,
  key_ingredient: 120703879,
  new_holland: 84741090,
  pico8: 230846595,
  reel: 231239209,
  editreel: 256707307,
  volvo: 62275317,
  chan: 116976989,
  perry_hamlin: 108628040,
  macys_inc: 95559201,
  macys_ck: 256869735,
  lenovo_y: 92186588,
  lenovo_yoga: 92186587,
  lenovo_z: 92186540,
  focal: 92783337,
  livestrong: 90188086,
  pchip: 230847045,
  prodchip: 230846642,
  otto: 230847459,
  audition: 256868075,
  dell: 255429818,
  rice: 99767852
}

function replaceVideo (videoPlayerID) {
  const mainVideo = videoPlayerID === 'reel'
  const mainEdit = videoPlayerID === 'editreel'
  const videoPlayerOriginal = document.getElementById(videoPlayerID)
  let videoWrapper = videoPlayerOriginal.parentNode

  // Video wrapper is one level higher in all non-main videos
  if (!mainVideo) 
  if (!mainEdit) {
    videoWrapper = videoWrapper.parentNode
  }

  // Create the vimeo embedd div
  const videoPlayer = document.createElement('div')
  const videoPlayerClass = mainVideo ? 'video__player-main' : 'video__player'
  const videoPlayerClass = mainEdit ? 'video__player-main' : 'video__player'
  videoPlayer.classList.add(videoPlayerClass)
  videoPlayer.innerHTML = `<iframe src="https://player.vimeo.com/video/${videos[videoPlayerID]}?title=false&portrait=false&byline=false&autoplay=true" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>`

  // Video replacements are handled differently at the main level and at the portfolio level
  if (mainVideo) {
    videoWrapper.replaceChild(videoPlayer, mainReel)
  } if (mainEdit) {
    videoWrapper.replaceChild(videoPlayer, mainReel2)
  
  else {
    videoWrapper.appendChild(videoPlayer)
  }

  // When video has completed playing, swap back in the original static media
  const iframe = videoPlayer.querySelector('iframe')
  // Note: Vimeo class is being loaded in a vendor js (see js/player.min.js)
  const player = new Vimeo.Player(iframe)
  player.on('ended', () => {
    if (mainVideo) {
      videoWrapper.replaceChild(mainReel, videoPlayer)
      // Safari/Chrome on desktop do not like video tag DOM manipulation
      // After replacing the child, the video will not autoplay
      // so we need to trigger it manually
      mainReel.play()
    if (mainEdit) {
      videoWrapper.replaceChild(mainReel2, videoPlayer)
      // Safari/Chrome on desktop do not like video tag DOM manipulation
      // After replacing the child, the video will not autoplay
      // so we need to trigger it manually
      mainReel.play()
    } else {
      // Remove the vimeo embedd for everything else
      videoPlayer.remove()
    }
  })
}

// Attach click events that replace videos to all buttons!
const buttons = document.getElementsByTagName('button')
for (let i = 0; i < buttons.length; i++) {
  let videoName = buttons[i].id
  if (videoName) {
    buttons[i].addEventListener('click', () => {
      replaceVideo(videoName)
    })
  }
}

// Replace splash main movie reel
const mainReel = document.getElementById('reel')
const mainReel2 = document.getElementByID('editreel')
const mainReelPlayButton = document.getElementsByClassName('video__button-play')[0]
const mainReel2PlayButton = document.getElementsByClassName('video__button-play')[0]
if (mainReel) {
  // Androids don't play nice with video tags
  // Must manually play videos
  mainReel.play()
  mainReel.addEventListener('click', () => {
    replaceVideo('reel')
  })
  mainReelPlayButton.addEventListener('click', () => {
    replaceVideo('reel')
 if (mainReel2) {
  // Androids don't play nice with video tags
  // Must manually play videos
  mainReel2.play()
  mainReel2.addEventListener('click', () => {
    replaceVideo('editreel')
  })
  mainReelPlayButton.addEventListener('click', () => {
    replaceVideo('editreel')
  })
}
