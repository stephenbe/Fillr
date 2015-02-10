;(function ( $, window, document, undefined ) {

  "use strict";

  var fillr = "fillr";

  var defaults = {
    dots: true
  };

  var constants = {
    slides : $(".slide"),
    currentSlide : $(".slide").first()
  }

  /**
  * Plugin Constructor
  */
  function Fillr ( element, options ) {
    self = this;
    this.element = element;
    this.constants = constants;

    this.settings = $.extend( {}, defaults, options );
    this._defaults = defaults;


    this.init();
  };


  Fillr.prototype.init = function () {
    console.log(self.numberOfSlides());

    //add listeners
    $(".js-fillr-previous").on("click",  self.goToPrevSlide);
    $(".js-fillr-next").on("click",   self.goToNextSlide);

  };

  /**
  * Checks for children of self
  *
  * @return number of slides (int)
  */
  Fillr.prototype.numberOfSlides = function() {
      return $(self.element).children().length;
  };

  /**
  * Creates html for dots
  *
  * @return the html that makes the nav
  */
  Fillr.prototype.buildDots = function() {
    if (true) {

    }
  };

  /**
  * Goes to next slide
  *
  */
  Fillr.prototype.goToNextSlide = function() {
    self.goToSlide(3);
  };

  /**
  * Goes to prev slide
  *
  */
  Fillr.prototype.goToPrevSlide = function() {
    self.goToSlide(2);
  };


  /**
  * Goes to indicated slide
  *
  */
  Fillr.prototype.goToSlide = function($slide) {
    $("body, html").animate({
      scrollTop: $(".slide").eq($slide).offset().top
    });
  };

  /**
  * Create the jquery plugin function
  */
  $.fn.fillr = function ( options ) {
    return this.each(function() {
      if ( !$.data( this, "plugin_" + fillr ) ) {
        $.data( this, "plugin_" + fillr, new Fillr( this, options ) );
      }
    });
  };

})( jQuery, window, document );
