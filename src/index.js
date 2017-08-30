// ======================
// Header menu navigation
// ======================
const navWrapper = document.getElementById('nav__wrapper')
const navLogo = document.getElementsByClassName('nav__logo')[0]

function adjsutNavigationHeight () {
  if (window.scrollY >= 100) {
    navWrapper.style.height = '50px'
    navLogo.style.width = '35px'
  } else if (window.scrollY < 100) {
    navWrapper.style.height = '100px'
    navLogo.style.width = '50px'
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
  volvo: 62275317
}

function replaceVideo (videoPlayerID) {
  const mainVideo = videoPlayerID === 'reel'
  const videoPlayerOriginal = document.getElementById(videoPlayerID)
  let videoWrapper = videoPlayerOriginal.parentNode

  // Video wrapper is one level higher in all non-main videos
  if (!mainVideo) {
    videoWrapper = videoWrapper.parentNode
  }

  // Create the vimeo embedd div
  const videoPlayer = document.createElement('div')
  const videoPlayerClass = mainVideo ? 'video__player-main' : 'video__player'
  videoPlayer.classList.add(videoPlayerClass)
  videoPlayer.innerHTML = `<iframe src="https://player.vimeo.com/video/${videos[videoPlayerID]}?title=false&portrait=false&byline=false&autoplay=true" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>`

  // Video replacements are handled differently at the main level and at the portfolio level
  if (mainVideo) {
    videoWrapper.replaceChild(videoPlayer, mainReel)
  } else {
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
    } else {
      // Remove the vimeo embedd for everything else
      videoPlayer.remove()
    }
  })
}

// Attach click events that replace videos to all buttons!
const buttons = document.getElementsByTagName('button')
for (let i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener('click', () => {
    let videoName = buttons[i].id
    replaceVideo(videoName)
  })
}

// Replace splash main movie reel
const mainReel = document.getElementById('reel')
mainReel.addEventListener('click', () => {
  replaceVideo('reel')
})
