document.body.onkeydown = function(event) {
  if (event.keyCode === 9) {  // TAB
    document.body.classList.add('tab-user');

    document.addEventListener('click', function() {
      document.body.classList.remove('tab-user');
    });
  }
};

document.removeEventListener('click', function() {
  document.body.classList.remove('tab-user');
});

var nav_toggle = document.getElementsByClassName('main-nav__toggle')[0];
//var nav_toogle_open = document.getElementsByClassName('main-nav__toggle--open')[0];
//var nav_toogle_close = document.getElementsByClassName('main-nav__toggle--close')[0];
var main_nav = document.getElementsByClassName('main-nav')[0];

main_nav.classList.remove('main-nav--nojs');

nav_toggle.addEventListener('click', function() {
  if (main_nav.classList.contains('main-nav--open')) {
    main_nav.classList.remove('main-nav--open');
    main_nav.classList.add('main-nav--close');
  }
  else {
    main_nav.classList.remove('main-nav--close');
    main_nav.classList.add('main-nav--open');
  }
});


/*******Карта в подвале*********/

if(document.getElementById('YMapsID')) {
  ymaps.ready(init);
  var myMap, myPlacemar;

  function init() {

    myMap = new ymaps.Map("YMapsID", {
      center: [59.936280, 30.321076],
      zoom: 16,
      controls: [] //убираем все кнопки управления
    });

    myMap.behaviors.disable('scrollZoom'); //отключение зума скролом колесика
    //myMap.behaviors.disable('drag');

    myMap.controls.add('zoomControl', {
      float: 'none'
    });
    myMap.controls.add('fullscreenControl', {
      float: 'right'
    });

    myMap.controls.add('typeSelector', {
      float: 'left',
      // Переключатель слоев карты – второй слева.
    });
    myMap.controls.get('typeSelector').options.set('size', 'small');//принудительно выбран маленькой мконки

    myPlacemark = new ymaps.Placemark([59.936280, 30.321076], {
      hintContent: 'PINK',
      balloonContent: '191186, Санкт-Петербург, Невский пр., д.20'
    }, {
      iconLayout: 'default#image', //изображение без доп текста
      iconImageHref: 'img/icon-map-marker.svg',
      iconImageSize: [36, 36],
      iconImageOffset: [-10, -10] //смещение картинки
    });

    myMap.geoObjects.add(myPlacemark);
  }
}



/*******Открытии и закрытие попапов*******/

var pop_sucs = document.getElementById('popup_success');
var pop_err = document.getElementById('popup_error');
var form_contest= document.getElementsByClassName("questionnaire__form")[0];
var first_name = document.getElementById('first_name');
var second_name = document.getElementById('surname');
var email = document.getElementById('mail');
var storage_name = localStorage.getItem('first_name');
var storage_second_name = localStorage.getItem('second_name');
var storage_email = localStorage.getItem('email');

if (form_contest) {
  if (storage_name) {
    first_name.value = storage_name;
    //console.log('first_name ' + storage_name);
  }

  if (storage_second_name) {
    second_name.value = storage_second_name;
    //console.log('second_name ' + storage_second_name);
  }

  if (storage_email) {
    email.value = storage_email;
    //console.log('email ' + storage_email);
  }

  function showPopup(popup, form_contest) {
    popup.classList.remove('popup--close');
    popup.classList.add('popup--open');

    var btn_close= popup.getElementsByClassName("popup__btn")[0];

    btn_close.onclick = function() {
      if (popup.classList.contains('popup--success')) {
        form_contest.submit();
      }
      closePopup(popup);
    }

    document.onkeydown = function (event) {
      if (event.keyCode === 27) { // escape
        closePopup(popup);
      }
    };
  }

  function closePopup(popup) {
    popup.classList.remove('popup--open');
    popup.classList.add('popup--close');
  }

  form_contest.addEventListener('submit', function (event) {
    if (first_name.value == '' || second_name.value == '' ||email.value == '') {
      showPopup(pop_err);
      //console.log('error');
      event.preventDefault();
    }
    else {
      showPopup(pop_sucs, form_contest);
      //console.log('suc');
      localStorage.setItem('first_name', first_name.value);
      localStorage.setItem('second_name', second_name.value);
      localStorage.setItem('email', email.value);
      event.preventDefault();
    }
  });
}
