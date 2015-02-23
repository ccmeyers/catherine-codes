var $ = require('jquery-browserify'),
    _ = require('underscore');

'use strict';

var app = {

  documentWindow: $(window),
  beforeHeader: $('.header-before'),
  afterHeader: $('.header-after'),
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

  init: function() {
    app.displayHeader();
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
  },

  displayHeader: function() {
    app.beforeHeader.delay(2000).fadeOut(1000);
    app.afterHeader.delay(2000).fadeOut(1000);
    setTimeout(function(){ 
      app.beforeHeader.addClass('swapper').fadeIn(2000);
      app.afterHeader.addClass('swapper').fadeIn(2000);
    }, 3000);
  },

  heroHeightSetter: function() {
    var windowHeight = app.documentWindow.height();
    app.hero.css('height', windowHeight - 20);
    app.heroHeader.css('padding-top', (windowHeight/2)-(app.heroHeaderHeight/2));
  },

  squarify: function() {
    var feWidth = app.detail.width();
    app.detail.css('height', feWidth);
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

}

$(document).ready( app.init() );