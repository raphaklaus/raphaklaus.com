var isMenuOpened = false;

function toggleMenu() {
  if (isMenuOpened) {
    $('.menu').addClass('invisible');
    isMenuOpened = false;
  } else {
    $('.menu').removeClass('invisible');
    isMenuOpened = true;
  }
}

Zepto(function($) {
  if ($(window).width() > 720) {
    $('nav > video').append('<source src="/media/cssbackground.mp4" type="video/mp4">');
  }
});

console.log('Olá! Espero que aprenda um pouco por aqui também :)');
