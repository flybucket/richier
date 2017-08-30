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

function replaceVideo (videoName) {
  const videoButton = document.getElementById(videoName)
  const videoWrapper = videoButton.parentNode.parentNode

  const videoPlayer = document.createElement('div')
  videoPlayer.classList.add('video__player')
  videoPlayer.innerHTML = `<iframe src="https://player.vimeo.com/video/${videos[videoName]}?title=false&portrait=false&byline=false&autoplay=true" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>`
  videoWrapper.appendChild(videoPlayer)

  const iframe = videoPlayer.querySelector('iframe')
  const player = new Vimeo.Player(iframe)

  // When reel has completed playing, swap back in the looping splash screen
  player.on('ended', () => {
    console.log('finished playing', videoName)
    // Safari/Chrome on desktop do not like video tag DOM manipulation
    // After replacing the child, the video will not autoplay
    // so we need to trigger it manually
  })
}

const buttons = document.getElementsByTagName('button')
for (let i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener('click', () => {
    let videoName = buttons[i].id
    console.log(videoName, 'was clicked')
    replaceVideo(videoName)
  })
}

// Replace splash main movie reel
const mainReel = document.getElementById('main_reel')
mainReel.addEventListener('click', () => {
  const videoWrapper = mainReel.parentNode
  const videoPlayer = document.createElement('div')

  videoPlayer.classList.add('video__player-main')
  videoPlayer.innerHTML = `<iframe src="https://player.vimeo.com/video/${videos['reel']}?title=false&portrait=false&byline=false&autoplay=true" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>`

  videoWrapper.replaceChild(videoPlayer, mainReel)

  const iframe = videoPlayer.querySelector('iframe')
  const player = new Vimeo.Player(iframe)

  // When reel has completed playing, swap back in the looping splash screen
  player.on('ended', () => {
    console.log('finished playing main reel')
    videoWrapper.replaceChild(mainReel, videoPlayer)
    // Safari/Chrome on desktop do not like video tag DOM manipulation
    // After replacing the child, the video will not autoplay
    // so we need to trigger it manually
    mainReel.play()
  })
})
