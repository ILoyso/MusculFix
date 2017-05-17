$(document).ready(function(){

  var scrollMenuPos = 125;
  var scrollMenuMobPos = 52;
  var modalBasket = $('#modalBasket');


  // Scroll menu
  function scrollMenu() {
    var scrollPos = $(this).scrollTop();

    if ( $(window).width() < 768) {
      if ( scrollPos >= scrollMenuMobPos ) {
        $('.mob-menu').addClass('mob-menu--active');
        $('.mob-tabs').addClass('mob-tabs--scroll');
      } else {
        $('.mob-menu').removeClass('mob-menu--active');
        $('.mob-tabs').removeClass('mob-tabs--scroll');
      }
    } else {
      if ( scrollPos >= scrollMenuPos ) {
        $('.scroll-menu').addClass('scroll-menu--active');
      } else {
        $('.scroll-menu').removeClass('scroll-menu--active');
      }
    }

  }

  $(window).scroll(function(){
    scrollMenu();
  });

  scrollMenu();


  //Modal for places
  function modalPlaceClose() {
    var activeModal = $('.modal-place.active');
    var modalWrap = activeModal.find('.modal-place__wrap');
    var modalHeader = modalWrap.find('.modal-place__top');
    $('.places__open').removeClass('active');
    $(modalWrap).prepend(modalHeader);
    $('.modal-place').removeClass('active');
  }

  function showModalPlace(location, position) {
    $('.places__open[alt="'+ location +'"]').addClass('active');
    $('#' + location).addClass('active');
    $('.modal-place__wrap').offset({
      top: position.top,
      left: position.left
    });
  }

  function showModalPlaceFooter(location, position) {
    var activeModal = $('#' + location);
    var modalWrap = activeModal.find('.modal-place__wrap');
    var modalHeader = modalWrap.find('.modal-place__top');

    $('.places__open[alt="'+ location +'"]').addClass('active');
    $(activeModal).addClass('active');

    var modalHeight = $(modalWrap).outerHeight();
    $(modalWrap).append(modalHeader);

    $('.modal-place__wrap').offset({
      top: position.top - modalHeight + 20,
      left: position.left
    });
  }

  $('.places__open').click(function() {
    var location = $(this).attr('alt');
    var position = $(this).offset();

    if ($(this).hasClass('places__open--footer')) {
      showModalPlaceFooter(location, position);
    } else {
      showModalPlace(location, position);
    }
  });

  $('.modal-place__close').click(function() {
    modalPlaceClose();
  });

  $(document).click( function(event) {
    if (($(event.target).closest('.modal-place__wrap').length) ||
        ($(event.target).closest('.places__link').length)) {
      return;
    }
    modalPlaceClose();
    event.stopPropagation();
  });

  $(window).scroll(function(){
    modalPlaceClose();
  });


  //Modal for compare
  var productCompare = function () {
    $('.modal-compare').addClass('active');
    setTimeout(function(){
      $('.modal-compare').removeClass('active')
    },2000);
  };

  $('.product__compare').click(function(){
    productCompare();
  });
  $('.product-detail__compare').click(function(){
    productCompare();
  });


  //Modal for basket
  var basketOpenTop = function (basket, position, basketHeight, basketWidth, modalWidth) {
    $(basket).find('.basket__main').addClass('active');
    $(modalBasket).addClass('modal-basket--top');
    $(modalBasket).offset({
      top: position.top + basketHeight,
      left: position.left - modalWidth + basketWidth
    });
  }

  var basketOpenScroll = function (position, basketHeight, basketWidth, modalWidth) {
    $(modalBasket).addClass('modal-basket--scroll');
    $(modalBasket).offset({
      top: basketHeight,
      left: position.left - modalWidth + basketWidth
    });
  }

  var basketOpenMob = function () {
    $(modalBasket).addClass('modal-basket--mob');
  }

  var basketOpenMobScroll = function () {
    $(modalBasket).addClass('modal-basket--mob-scroll');
  }

  var basketOpen = function (basket) {
    var basketHeight = $(basket).outerHeight();
    var basketWidth = $(basket).outerWidth();
    var modalWidth = $(modalBasket).outerWidth();
    var position = $(basket).offset();
    $(basket).addClass('active');

    if ($(basket).hasClass('basket--top')) {
      basketOpenTop(basket, position, basketHeight, basketWidth, modalWidth);
    }

    if ($(basket).hasClass('basket--scroll')) {
      basketOpenScroll(position, basketHeight, basketWidth, modalWidth);
    }

    if ($(basket).hasClass('basket--mob')) {
      basketOpenMob();
    }

    if ($(basket).hasClass('basket--mob-scroll')) {
      basketOpenMobScroll();
    }

    $(modalBasket).addClass('active');
  }

  var basketClose = function () {
    $(modalBasket).removeClass('modal-basket--top');
    $(modalBasket).removeClass('modal-basket--scroll');
    $(modalBasket).removeClass('modal-basket--mob');
    $(modalBasket).removeClass('modal-basket--mob-scroll');
    if ($(window).width() > 768) {
      $(modalBasket).offset({
        top: 0,
        left: 0
      });
    }
    $(modalBasket).removeClass('active');
    $('.basket__main').removeClass('active');
    $('.basket').removeClass('active');
  }

  $('.basket').click( function () {
    var basketClick = this;
    if ( $(basketClick).hasClass('active') ) {
      basketClose();
    } else {
      basketOpen(basketClick);
    }
  });

  $('.modal-basket__close').click( function () {
    basketClose();
  });

  var scrollBasket = function () {
    var scrollPos = $(this).scrollTop();
    if (( scrollPos >= scrollMenuPos ) & ($('.basket').hasClass('active'))) {
      basketClose();
      basketOpen($('.basket--scroll'));
    } else if (( scrollPos < scrollMenuPos ) & ($('.basket').hasClass('active'))) {
      basketClose();
      basketOpen($('.basket--top'));
    }
  }

  var changeMobBasket = function () {
    var scrollPos = $(this).scrollTop();
    if (scrollPos >= scrollMenuMobPos) {
      $('.basket.basket--mob').addClass('basket--mob-scroll');
      $('.basket.basket--mob-scroll').removeClass('basket--mob');
      $('.modal-basket').addClass('modal-basket--mob-scroll');
      $('.modal-basket').removeClass('modal-basket--mob');

    } else {
      $('.basket.basket--mob').removeClass('basket--mob-scroll');
      $('.basket.basket--mob-scroll').addClass('basket--mob');
      $('.modal-basket').removeClass('modal-basket--mob-scroll');
      $('.modal-basket').addClass('modal-basket--mob');
    }
  }

  changeMobBasket();

  $(window).scroll(function(){
    var scrollPos = $(this).scrollTop();
    if ($(window).width() < 768) {
      changeMobBasket();
    } else {
      scrollBasket();
    }
  });

  $('.js-add-to-basket').click(function(){
    event.preventDefault();
    var scrollPos = $(document).scrollTop();

    if ($(window).width() < 768) {
      if ( scrollPos >= scrollMenuPos ) {
        basketOpen($('.basket--mob-scroll'));
      } else  {
        basketOpen($('.basket--mob'));
      }
    } else {
      if ( scrollPos >= scrollMenuPos ) {
        basketOpen($('.basket--scroll'));
      } else  {
        basketOpen($('.basket--top'));
      }
    }
  });


  //Modal for search
  var closeSearch = function () {
    $('.modal-search').removeClass('modal-search--scroll');
    $('.modal-search').removeClass('modal-search--active');
  }

  var changeScrollSearch = function () {
    var scrollPos = $(this).scrollTop();
    if (scrollPos >= scrollMenuMobPos) {
      $('.modal-search').addClass('modal-search--scroll');
    } else {
      $('.modal-search').removeClass('modal-search--scroll');
    }
  }

  $(window).scroll(function(){
    if ($(window).width() < 768) {
      changeScrollSearch();
    }
  });

  $('.search__button').click(function() {
    event.preventDefault();
    var position = $(this).offset();
    var btnHeight = $(this).height();
    var btnWidth = $(this).width();
    var modalWight = $('.modal-search').width();

    if ($('.modal-search').hasClass('modal-search--active')) {
      closeSearch();
    } else {
      $('.modal-search').addClass('modal-search--active');

      if ($(window).width() > 768) {
        $('.modal-search').offset({
          top: position.top + btnHeight,
          left: position.left - modalWight + btnWidth -2
        });
      }
    }
  });

  $(document).click( function(event) {
    if (($(event.target).closest('.search__form').length) ||
        ($(event.target).closest('.modal-search').length)) {
      return;
    }
    closeSearch();
    event.stopPropagation();
  });


  // Show all brands
  var showBrandNav = function () {
    if ($('.brand-nav__wrap').hasClass('brand-nav__wrap--full')) {
      $('.brand-nav__wrap').removeClass('brand-nav__wrap--full');
      $('html, body').animate({
        scrollTop: ($('.brand-nav__wrap').offset().top - 100)
      }, 500);
      $('.brand-nav__show').html('Показать весь список');
      $('.brand-nav__hide').hide();
    } else {
      $('.brand-nav__wrap').addClass('brand-nav__wrap--full');
      $('.brand-nav__show').html('Свернуть список');
      $('.brand-nav__hide').show();
    }
  }
  $('.brand-nav__show').click(function() {
    showBrandNav();
  });
  $('.brand-nav__hide').click(function() {
    showBrandNav();
  });

  var showCheckboxFilter = function () {
    if ($('.checkbox-filter__wrap').hasClass('checkbox-filter__wrap--full')) {
      $('.checkbox-filter__wrap').removeClass('checkbox-filter__wrap--full');
      $('html, body').animate({
        scrollTop: ($('.checkbox-filter__wrap').offset().top - 100)
      }, 500);
      $('.checkbox-filter__show').html('Показать весь список');
      $('.checkbox-filter__hide').hide();
    } else {
      $('.checkbox-filter__wrap').addClass('checkbox-filter__wrap--full');
      $('.checkbox-filter__show').html('Свернуть список');
      $('.checkbox-filter__hide').show();
    }
  }
  $('.checkbox-filter__show').click(function() {
    showCheckboxFilter();
  });
  $('.checkbox-filter__hide').click(function() {
    showCheckboxFilter();
  });

  // Show all category
  var showProductNav = function () {
    if ($('.product-nav__wrap').hasClass('product-nav__wrap--short')) {
      $('.product-nav__wrap').removeClass('product-nav__wrap--short');
      $('.product-nav__show').html('Свернуть список');
      $('.product-nav__hide').show();
    } else {
      $('.product-nav__wrap').addClass('product-nav__wrap--short');
      $('html, body').animate({
        scrollTop: ($('.product-nav__wrap').offset().top - 100)
      }, 500);
      $('.product-nav__show').html('Показать весь список');
      $('.product-nav__hide').hide();
    }
  }
  $('.product-nav__show').click(function() {
    showProductNav();
  });
  $('.product-nav__hide').click(function() {
    showProductNav();
  });

  // Burger menu
  function closeBurgerMenu() {
    $('.left-menu').removeClass('active');
    $('.left-menu__wrap').removeClass('active');
    $('body').removeClass('mob-menu');
  }

  function openBurgerMenu() {
    $('.left-menu').addClass('active');
    $('.left-menu__wrap').addClass('active');
    $('body').addClass('mob-menu');
  }

  $('.burger--open').click(function(){
    openBurgerMenu();
  });

  $('.burger--close').click(function(){
    closeBurgerMenu();
  });

  $(window).scroll(function(){
    var scrollPos = $(this).scrollTop();
    if (scrollPos >= scrollMenuMobPos) {
      $('.left-menu__close').addClass('left-menu__close--scroll');
    } else {
      $('.left-menu__close').removeClass('left-menu__close--scroll');
    }
  });

  $(document).click( function(event) {
    if (($(event.target).closest('.left-menu__wrap').length) || ($(event.target).closest('.burger').length)) {
      return;
    }
    closeBurgerMenu();
    event.stopPropagation();
  });


  // Subscribe Form
  $('#subscribeForm').submit(function(evt) {
    $('.subscribe__main').hide();
    $('.subscribe__thank').show();
    evt.preventDefault();
  });

  $('.carousel-brand').slick({
    infinite: true,
    speed: 300,
    slidesToShow: 5
  });
  $('.carousel-banner').slick({
    dots: true,
    infinite: true,
    speed: 300,
    autoplay: true,
    autoplaySpeed: 10000,
  });
  $('.timer').countdown({
    until: new Date(2017, 12 - 8, 30),
    padZeroes: true
  });


  // For mob
  function mobResize() {
   if ($(window).width() <= '767') {
      $('.action').appendTo('#actionMob');
      $('.subscribe').appendTo('#subscribeMob');
    } else {
      $('.action').appendTo('#actionFull');
      $('.subscribe').appendTo('#subscribeFull');
    }
  };

  $(window).resize(function(){
    mobResize();
  });

  mobResize();


  //Tabs
  $("#myTab a").click(function(e){
    if ($(this).is('#mobActionLink')) {
      return;
    }
    e.preventDefault();
    var tab = $(this);

    if(tab.parent('li').hasClass('active')) {
      $(".tab-pane").removeClass('active');
      tab.parent('li').removeClass('active');
    } else {
      $(this).tab('show');
    }
  });

  $('.mob-tabs__close').click(function(e){
    $('.tab-pane').removeClass('active');
    $('#myTab li').removeClass('active');
  });

  // Show all list in tab
  $('.mob-tabs__show').click(function() {
    if ($('.mob-tabs-nav').hasClass('mob-tabs-nav--full')) {
      $('.mob-tabs-nav').removeClass('mob-tabs-nav--full');
      $('html, body').animate({
        scrollTop: ($('#myTab').offset().top)
      }, 500);
      $('.mob-tabs__show').html('Показать весь список');
    } else {
      $('.mob-tabs-nav').addClass('mob-tabs-nav--full');
      $('.mob-tabs__show').html('Свернуть список');
    }
  });

  // Form-table
  $('.count__arrow--plus').click(function() {
    var numCount = $(this).prev();
    var qty = parseInt($(numCount).val());
    qty = qty + 1;
    $(numCount).val(qty);
  });

  $('.count__arrow--minus').click(function() {
    var numCount = $(this).next();
    var qty = parseInt($(numCount).val());
    if (qty <= 1) {
      return;
    }
    qty = qty - 1;
    $(numCount).val(qty);
  });


  function getChar(event) {
    if (event.which == null) { // IE
      if (event.keyCode < 32) return null; // спец. символ
      return String.fromCharCode(event.keyCode)
    }
    if (event.which != 0 && event.charCode != 0) { // все кроме IE
      if (event.which < 32) return null; // спец. символ
      return String.fromCharCode(event.which); // остальные
    }
    return null; // спец. символ
  }

  $('.count__value').keypress(function(e) {
    e = e || event;
    if (e.ctrlKey || e.altKey || e.metaKey) return;
    var chr = getChar(e);
    if (chr == null) return;
    if (chr < '0' || chr > '9') {
      return false;
    }
  });


  // Main form submit
  $('#mainFormSubmit').click(function() {
    $('.form-main').hide();
    $('.thank-you').show();
    $('html, body').animate({
        scrollTop: (0)
    }, 100);
  })

  $('.form-steps__next').click(function() {
    var step = document.querySelector('.form-steps__step.active');
    $(step).next().addClass('active');
    $(step).removeClass('active');
  });

  $('.form-steps__prev').click(function() {
    var step = document.querySelector('.form-steps__step.active');
    $(step).prev().addClass('active');
    $(step).removeClass('active');
  });

  // Clickable stars
  var clearStar = function(){
    $('#stars .stars__item').each(function(){
      $(this).removeClass('stars__item--gold');
    })
  }

  var colorizeStar = function(item) {
    var count = $(item).attr('alt');
    for (var i = 1; i <= count; i++) {
      $('.stars__item[alt='+i+']').addClass('stars__item--gold');
    }
  }

  $('#stars .stars__item').click(function(){
    clearStar();
    colorizeStar($(this));
  });

  // Checkbox filter sort
  var showFilterSort = function(item) {
    var positionTop = $(item).offset();
    $('.filter-wrap__sort').show();
    $('.filter-wrap__sort').offset({
      top: positionTop.top - 3
    });
  };

  $('.checkbox-filter__label, .stars__item').click(function(){
    showFilterSort(this);
  });

  $('.input-filter__input').keyup(function(){
    showFilterSort(this);
  });

});