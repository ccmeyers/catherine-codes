var $ = require('jquery-browserify'),
    _ = require('underscore');

'use strict';

var app = {

  documentWindow: $(window),
  beforeSubtag: $('.subtag-before'),
  afterSubtag: $('.subtag-after'),
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
    app.documentWindow.on('load', app.squarify);
    app.documentWindow.on('resize', app.squarify);
    app.documentWindow.on('orientationchange', app.squarify);
    app.navJumper();
    app.navHighlighter();
    app.mobileNav();
  },

  displayHeader: function() {
    app.beforeSubtag.delay(1500).fadeOut(1000);
    app.afterSubtag.delay(1500).fadeOut(1000);
    setTimeout(function(){ 
      app.beforeSubtag.addClass('swapper').fadeIn(2000);
      app.afterSubtag.addClass('swapper').fadeIn(2000);
    }, 3000);
  },

  fixHeader: function() {
    var width = app.documentWindow.innerWidth();

    if (width > 768) {
      app.documentWindow.on('scroll', function(){
        var distance = app.headerLogo.offset().top,
            scrollTop = $(this).scrollTop();
        if (scrollTop >= (distance-21)) {
          $('.navigation .logo').fadeIn();
        } else {
          $('.navigation .logo').fadeOut();
        }
      });
    }
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
  }

}

$(document).ready( app.init() );