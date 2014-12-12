$(function(){

  var $windowHeight = $(window).height(),
      $navHeight = $(".navbar").height(),
      $firstText = $("#first-text"),
      $secondText = $("#second-text"),
      $thirdText = $("#third-text"),
      $about = $(".about"),
      $captionFirst = $("#caption-first"),
      $captionSecond = $("#caption-second"),
      $portfolio = $(".portfolio"),
      $bgHeight = $windowHeight - $navHeight,
      $portfolioH1 = $('.portfolio h1').outerHeight(true);
  console.log('$portfolioH1', $portfolioH1);
  var portfolioHeight = $portfolioH1;

  $('.project').each(function(){
    var $this = $(this);
    portfolioHeight +=  $this.outerHeight(true);
  });

  console.log('portfolioHeight', portfolioHeight);

  $(window).on('load', function(){
    $(".home").css("height", $bgHeight);
    $about.css("height", $bgHeight);
    $portfolio.css("height", portfolioHeight);
  });

  $firstText.hide();
  $secondText.hide();
  $thirdText.hide();
  $about.hide();
  $portfolio.hide();

  $captionFirst.hide()
  $captionSecond.hide()
  $captionFirst.fadeIn(1500);
  $captionSecond.delay(500).fadeIn(1500);

  $("#about-link").click(function () {
    $captionFirst.hide();
    $captionSecond.hide();    
    $portfolio.fadeOut();
    $about.fadeIn("slow");
  });  

  $("#portfolio-link").click(function () {
    $captionFirst.hide();
    $captionSecond.hide();
    $about.fadeOut();
    $portfolio.fadeIn("slow");
  });

  $("#first-project").click(function(){
    $firstText.fadeToggle("slow");
  });  

  $("#second-project").click(function(){
    $secondText.fadeToggle("slow");
  });  

  $("#third-project").click(function(){
    $thirdText.fadeToggle("slow");
  });



});