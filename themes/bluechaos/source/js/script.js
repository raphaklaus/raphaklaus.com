var isMenuOpened = false;

function toggleMenu(){
  if (isMenuOpened){
    $('.menu').addClass('invisible');
    isMenuOpened = false;
  }
  else{
    $('.menu').removeClass('invisible');
    isMenuOpened = true;
  }

  // todo: Some crazy animation... :)
  // $('.menu').one('webkitAnimationEnd oanimationend msAnimationEnd animationend', function(e){
  //   if (e.animationName === 'closeAnimation')
  //     $(this).addClass('invisible');
  // });  
}

