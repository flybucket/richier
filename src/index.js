const navWrapper = document.getElementById('nav__wrapper')
const navLogo = document.getElementsByClassName('nav__logo')[0]
const splashLoop = document.getElementById('splash_loop')

function adjsutNavigationHeight () {
  if (window.scrollY >= 100) {
    navWrapper.style.height = '50px'
    navLogo.style.width = '35px'
  } else if (window.scrollY < 100) {
    navWrapper.style.height = '100px'
    navLogo.style.width = '50px'
  }
}

document.addEventListener('DOMContentLoaded', () => {
  adjsutNavigationHeight()
})

window.addEventListener('scroll', () => {
  adjsutNavigationHeight()
})

splashLoop.addEventListener('click', () => {
  console.log('replace with video')
  const videoPlayer = document.createElement('div')
  videoPlayer.classList.add('video__player')
  videoPlayer.innerHTML = '<iframe src="https://player.vimeo.com/video/231239209?title=false&portrait=false&byline=false&autoplay=true" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>'
  splashLoop.parentNode.replaceChild(videoPlayer, splashLoop)
})
