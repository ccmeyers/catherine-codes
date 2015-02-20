var $ = require('jquery-browserify'),
    _ = require('underscore');

'use strict';

var app = {

  documentWindow: $(window),
  musicNotes: $('#music-notes'),
  htmlTags: $('#html-tags'),
  homeLink: $('.home-link'),
  portfolioLink: $('.portfolio-link'),
  aboutLink: $('.about-link'),
  navbar: $('.navigation'),
  hero: $('.hero'),
  heroHeader: $('.header'),
  heroHeaderHeight: $('.header').height(),
  portfolio: $('.portfolio'),

  init: function() {
    app.displayHeader();
    app.heroHeightSetter();
    app.documentWindow.on('load', app.heroHeightSetter);
    app.documentWindow.on('resize', app.heroHeightSetter);
    app.documentWindow.on('orientationchange', app.heroHeightSetter);
    app.navJumper();
    app.navHighlighter();
  },

  displayHeader: function() {
    app.htmlTags.hide()
    app.musicNotes.delay(1000).fadeOut(1500);
    app.htmlTags.delay(1500).fadeIn(1500);
  },

  heroHeightSetter: function() {
    var windowHeight = app.documentWindow.height();
    app.hero.css('height', windowHeight - 20);
    app.heroHeader.css('padding-top', (windowHeight/2)-(app.heroHeaderHeight/2));
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
  }

}

$(document).ready( app.init() );