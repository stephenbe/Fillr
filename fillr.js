;(function ( $, window, document, undefined ) {

    "use strict";

    var fillr = "fillr";

    var defaults = {
        dots: true,
        slide: '.slide',
        previous_btn : '.js-fillr-previous',
        next_btn : '.js-fillr-next'
    };

    var initials = {
        currentSlide : $(".slide").first(),
        currentSlideId : $(".slide").first().index(),
        is_animating : false
    };

    /**
    * Plugin Constructor
    */
    function Fillr ( element, options ) {
        self = this;
        this.element = element;

        this.settings = $.extend( {}, defaults, options, initials );
        this._defaults = defaults;


        this.init();
    };


    Fillr.prototype.init = function () {
        //add listeners
        $(self.settings.previous_btn).on("click",  self.goToPrevSlide);
        $(self.settings.next_btn).on("click",   self.goToNextSlide);
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
        if(self.settings.currentSlide.next().length){
            self.goToSlide(self.settings.currentSlide.first().next());
        }
    };

    /**
    * Goes to prev slide
    *
    */
    Fillr.prototype.goToPrevSlide = function() {
        if(self.settings.currentSlide.prev().length) {
            self.goToSlide(self.settings.currentSlide.first().prev());
        }
    };

    /**
    * Goes to indicated slide
    *
    */
    Fillr.prototype.goToSlide = function($slide) {        
        if (self.settings.is_animating != true) {
            self.settings.currentSlide = $slide;
            self.settings.currentSlideId = self.settings.currentSlide.index();
            self.settings.is_animating = true;

            $("body, html").animate(
                {	 
                	scrollTop: $(self.settings.slide).eq(self.settings.currentSlideId).offset().top,
                },
                {
                    duration:1500,
                    easing: "easeInOutCirc",
                    complete: function() {
                        self.settings.is_animating = false; 
                    }
                }
            );
        }
    }
  
    Fillr.prototype.onMousewheel = function(event) {

        //Normalize event wheel delta
        var delta = event.originalEvent.wheelDelta / 30 || -event.originalEvent.detail;

        event.preventDefault();  

        //If the user scrolled up, it goes to previous slide, otherwise - to next slide
        if(delta < -1) {
            self.goToNextSlide();
        }
        else if(delta > 1) {
            self.goToPrevSlide();
        }
    };

    Fillr.prototype.onScroll = function(event) {
        clearTimeout($.data(this, 'scrollTimer'));
        $.data(this, 'scrollTimer', setTimeout(function() {
            var found=null;
            var found_top=0;

            $(self.settings.slide).each(function(index, el) {
                var $this = $(this);
                var offset = Math.abs($this.offset().top - $(window).scrollTop());          	

                if((found == null ) || ( offset >= 0 ) && ( offset < found_top )){
                    found = $this;
                    found_top = offset;
                }
            });
            self.goToSlide(found);

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