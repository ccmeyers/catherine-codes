var $ = require('jquery-browserify'),
    _ = require('underscore');

'use strict';

var app = {

  documentWindow: $(window),
  beforeHeader: $('.header-before'),
  afterHeader: $('.header-after'),
  headerLogo: $('.header-logo'),
  detail: $('.detail'),
  homeLink: $('.home-link'),
  navItems: $('.nav-items', '.navigation'),
  portfolioLink: $('.portfolio-link'),
  aboutLink: $('.about-link'),
  navbar: $('.navigation'),
  hero: $('.hero'),
  heroHeader: $('.header'),
  heroHeaderHeight: $('.header').height(),
  portfolio: $('.portfolio'),
  hamburger: $('.hamburger', '.navigation'),
  modalOverlay: $('.modal-overlay'),
  modal: $('.modal'),
  portfolioBox: $('.detail'),

  init: function() {
    app.displayHeader();
    app.fixHeader();
    app.heroHeightSetter();
    app.documentWindow.on('load', app.heroHeightSetter);
    app.documentWindow.on('resize', app.heroHeightSetter);
    app.documentWindow.on('orientationchange', app.heroHeightSetter);
    app.documentWindow.on('load', app.squarify);
    app.documentWindow.on('resize', app.squarify);
    app.documentWindow.on('orientationchange', app.squarify);
    app.navJumper();
    app.navHighlighter();
    app.mobileNav();
    app.modalPop();
  },

  displayHeader: function() {
    app.beforeHeader.delay(1500).fadeOut(1000);
    app.afterHeader.delay(1500).fadeOut(1000);
    setTimeout(function(){ 
      app.beforeHeader.addClass('swapper').fadeIn(2000);
      app.afterHeader.addClass('swapper').fadeIn(2000);
    }, 3000);
  },

  fixHeader: function() {
    app.documentWindow.on('scroll', function(){
      var distance = app.headerLogo.offset().top,
          scrollTop = $(this).scrollTop();
      if (scrollTop >= (distance-21)) {
        app.headerLogo.addClass('fix-to-nav');
        $('.header').css('margin-top', '58px');
        setTimeout(function(){
          app.headerLogo.addClass('move-left');
        }, 200);
      }
      // if (scrollTop < distance) {
      //   app.headerLogo.addClass('move-right').removeClass('move-left');
      // setTimeout(function(){
      //   app.headerLogo.addClass('unfix').removeClass('fix-to-nav');
      // }, 200);
      // }
    });
  },

  heroHeightSetter: function() {
    var windowHeight = app.documentWindow.height();
    app.hero.css('height', windowHeight - 20);
    app.heroHeader.css('padding-top', (windowHeight/2)-(app.heroHeaderHeight/2));
  },

  squarify: function() {
    var feWidth = app.detail.width(),
        feH2 = (feWidth + 40 -75)/2,
        beH2 = feH2 + 24;
    console.log(feWidth);
    console.log(feH2);
    console.log(beH2);
    app.detail.css('height', feWidth);
    // $('.front-end h2').css('margin-top', feH2);
    // $('.back-end h2').css('margin-top', beH2);
    
  },

  navJumper: function() {
    app.homeLink.add(app.portfolioLink).add(app.aboutLink).on('click', function(){
      var navHeight = app.navbar.outerHeight();
      $('.active').removeClass('active');
      $('html, body').animate({
          scrollTop: $( $.attr(this, 'href') ).offset().top - navHeight + 1
      }, 500);
      return false;
    });
  },

  navHighlighter: function() {
    app.documentWindow.on('scroll', function(){
      var scrollTop = $(this).scrollTop(),
          navHeight = app.navbar.outerHeight(),
          heroHeight = app.hero.outerHeight(),
          portfolioHeight = app.portfolio.outerHeight();

      if (scrollTop < heroHeight ) {
        $('.active').removeClass('active');
      }

      if (scrollTop > heroHeight - navHeight) {
        $('.active').removeClass('active');
        app.portfolioLink.addClass('active');
      }

      if (scrollTop > portfolioHeight + heroHeight - navHeight) {
        $('.active').removeClass('active');
        app.aboutLink.addClass('active');
      }
    });
  },

  mobileNav: function() {
    app.hamburger.on('click', function() {
      $(this).toggleClass('is-open');
      app.navItems.toggleClass('is-open');
    });
  },

  modalPop: function() {
    app.portfolioBox.on('click', function(){
        app.modalOverlay.addClass('open');
        app.modal.addClass('open');
    });

    app.modalOverlay.on('click', function(){
        app.modalOverlay.addClass('close').removeClass('open');
        app.modal.addClass('close').removeClass('open');
        setTimeout(function(){
            app.modalOverlay.removeClass('close');
            app.modal.removeClass('close');
        }, 450);
    });

  }

}

$(document).ready( app.init() );