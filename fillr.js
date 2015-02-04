;(function ( $, window, document, undefined ) {

  "use strict";

  var fillr = "fillr";

  var defaults = {
    dots: true
  };

  /**
  * Plugin Constructor
  */
  function Fillr ( element, options ) {
    self = this;
    this.element = element;

    this.settings = $.extend( {}, defaults, options );
    this._defaults = defaults;
    this._name = fillr;
    this.init();
  }


  Fillr.prototype.init = function () {
    console.log(self.numberOfSlides());
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

  };

  /**
  * Goes to next slide
  *
  */
  Fillr.prototype.goToNextSlide = function() {

  };

  /**
  * Goes to prev slide
  *
  */
  Fillr.prototype.goToPrevSlide = function() {

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
