;(function ( $, window, document, undefined ) {

  "use strict";

  var fillr = "fillr";

  var defaults = {
    dots: true
  };

  var constants = {
    slides : $(".slide")    
  }

  var currentSlide = $(".slide").first();
  var currentSlideId = $(".slide").first().index();
  var is_animating = false;
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
    //console.log(self.numberOfSlides());

    //add listeners
    $(".js-fillr-previous").on("click",  self.goToPrevSlide);
    $(".js-fillr-next").on("click",   self.goToNextSlide);
    $(window).on("mousewheel DOMMouseScroll", self.onMousewheel);
    $(window).scroll(self.onScroll);
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
    if(currentSlide.next().length){
      self.goToSlide(currentSlide.first().next());
    }
  };

  /**
  * Goes to prev slide
  *
  */
  Fillr.prototype.goToPrevSlide = function() {
    if(currentSlide.prev().length) {
      self.goToSlide(currentSlide.first().prev());
    }
  };


  /**
  * Goes to indicated slide
  *
  */
  Fillr.prototype.goToSlide = function($slide) {
    

    //console.log(is_animating);
	if (is_animating != true) {
		currentSlide = $slide;
		currentSlideId = currentSlide.index();
		is_animating = true;


		$("body, html")
		.animate({			 
			scrollTop: $(".slide").eq(currentSlideId).offset().top,
		}, 300, "linear", function() {
			is_animating = false;			 
		});
	}

  };
  Fillr.prototype.onMousewheel = function(event) {
	
	//Normalize event wheel delta
	var delta = event.originalEvent.wheelDelta / 30 || -event.originalEvent.detail;

		clearTimeout($.data(this, 'scrollTimer'));
		$.data(this, 'scrollTimer', setTimeout(function() {
			console.log("Haven't scrolled in 250ms!");
		}, 3000));


	//If the user scrolled up, it goes to previous slide, otherwise - to next slide
	if(delta < -1)
	{
	  self.goToNextSlide();
	}
	else if(delta > 1)
	{
	  self.goToPrevSlide();
	}  


	event.preventDefault();  
  };

	Fillr.prototype.onScroll = function(event) {
	   clearTimeout($.data(this, 'scrollTimer'));
	    $.data(this, 'scrollTimer', setTimeout(function() {
	        // do something
	        console.log("Haven't scrolled in 250ms!");

	        $(".slide").each(function(index, el) {
	        	var $this = $(this);
	        	var offset = $this.offset().top - $(window).scrollTop();
	        	console.log();
	        });
	    }, 2000));			
	}

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