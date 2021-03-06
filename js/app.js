$(loaded);

let windowBottom;
let userScroll = 0;

function loaded() {
  setTimeout(() => demo.init(), 1000);

  window.addEventListener('resize', demo.resize);
  window.addEventListener('scroll', getWindowHeight);
  window.addEventListener('resize', getWindowHeight);

  $('.burger').on('click', handleBurgerClick);
  $('#nav li, .fa-sort-down').on('click', scrollToSection);

  $('.quote-carousel').slick({
    dots: true,
    arrows: false,
    infinite: true,
    autoplay: false,
    autoplaySpeed: 10000,
    speed: 500,
    fade: false,
    cssEase: 'linear'
  });
}

function scrollToSection() {
  const element = $(this).attr('id');

  $('.burger').removeClass('open');
  $('.side-menu').removeClass('show-side-menu');
  $('.shader').removeClass('dim');
  $('body').removeClass('disable-scroll');

  $('html, body').animate({
    scrollTop: ($(`.${element}`).offset().top)
  }, 2000);
}

function handleBurgerClick() {
  $(this).toggleClass('open');
  $('.side-menu').toggleClass('show-side-menu');
  $('.shader').toggleClass('dim');
  $('body').toggleClass('disable-scroll');
}

function getWindowHeight() {
  userScroll = $(window).scrollTop();
  windowBottom = userScroll + $(window).height();

  animateNavbar();
  animateSection('portfolio');
  animateSection('experience');
}

function animateNavbar() {
  const landingHeight = $('.landing').height();

  userScroll > landingHeight ? $('nav').addClass('nav-small') : $('nav').removeClass('nav-small');
}

function animateSection(element) {
  const elementTop = $(`.${element}`).offset().top;
  const elemementBottom = elementTop + $(`.${element}`).height();

  if(elemementBottom <= windowBottom) {
    $(`.${element} .left, .${element} h4`)
      .removeClass('hidden')
      .addClass('animated fadeInLeft');

    $(`.${element} .right`)
      .removeClass('hidden')
      .addClass('animated fadeInRight');

    $(`.${element} hr`).removeClass('hidden');
  }
}