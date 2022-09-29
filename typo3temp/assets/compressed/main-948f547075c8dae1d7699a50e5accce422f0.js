/**
 * initialize svg shim
 */
svg4everybody()

/**
 * anchor handling
 */

let Anchor = function (el) {
  let _this = this;
  _this.el = el

  let href = _this.el.getAttribute('href').toString();

  if (href.length > 1) {
    _this.target = document.querySelector(href)

    _this.el.addEventListener('click', function (e) {
      e.preventDefault()
      _this.target.scrollIntoView({
        behavior: 'smooth'
      })
    })
  }
}


document.addEventListener('DOMContentLoaded', function () {
  const anchors = document.querySelectorAll('[href^="#"]')
  anchors.forEach(function (anchor) {
    new Anchor(anchor)
  })

  const hamburger = document.querySelector('.s-header .hamburger')
  const navigation = document.querySelector('.s-header__navigation')
  const navigationItem = document.querySelector('.nav-main__list')
  const subnavigation = document.querySelectorAll('.nav-main__level-2')

  hamburger.addEventListener('click', function () {
    navigation.classList.toggle('visible')
  })

  navigationItem.addEventListener('click', function (event) {

    for (let i=0; i<subnavigation.length; i++)
    {
      if (event.target.parentNode.querySelector('.nav-main__level-2') != subnavigation[i])
      {
        subnavigation[i].classList.remove('visible')
      }
    }

    event.target.parentNode.querySelector('.nav-main__level-2').classList.toggle('visible')
  })
})


/**
 * scroll
 */
let scrolled = false

document.addEventListener(
    'scroll',
    (event) => {
      if (!scrolled && window.pageYOffset > 10) {
        scrolled = true

        document.documentElement.classList.add('scroll')
      } else if(window.pageYOffset < 10) {
        scrolled = false
        document.documentElement.classList.remove('scroll')
      }
    },
    { passive: true }
);

/**scroll to femanager status message on mobile devices**/
/*if (window.innerWidth < 1024) {
  let feManager = document.querySelector(".tx-femanager")

  let feManagerStatus = feManager.querySelector(".femanager_status")

  let pageHeader = document.querySelector(".s-header-wrapper")

  if (feManagerStatus) {
    //feManager.scrollIntoView()
    let yOffset = -pageHeader.inn;
    let y = feManager.getBoundingClientRect().top + window.pageYOffset + yOffset;
    window.scrollTo({top: y, behavior: 'smooth'});
  }

  let feManagerError = feManager.querySelector(".femanager_error")

  if (feManagerError) {
    //feManagerError.scrollIntoView()
  }
}

var today = document.getElementById('today')
if (today) {
  const yOffset = -90;
  const y = today.getBoundingClientRect().top + window.pageYOffset + yOffset;
  window.scrollTo({top: y, behavior: 'smooth'});
}
*/
/**scroll if error messages are visible*/