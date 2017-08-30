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

document.addEventListener('DOMContentLoaded', () => {
  adjsutNavigationHeight()
})

window.addEventListener('scroll', () => {
  adjsutNavigationHeight()
})
