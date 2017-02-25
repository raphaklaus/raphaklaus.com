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

console.log('Olá! Espero que aprenda um pouco por aqui também :)');
