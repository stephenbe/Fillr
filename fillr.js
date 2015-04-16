;(function ( $, window, document, undefined ) {

    "use strict";

    var fillr = "fillr";

    var defaults = {        
        slide: '.slide',
        previous_btn : '.js-fillr-previous',
        next_btn : '.js-fillr-next',
        dots: true,
        dots_append : ".dots",
        dots_tag : "a",
        easing : 'easeInOutCirc',
        init : function(elem,code) {
        },
        beforeChange : function(elem) {
        },
        afterChange : function(elem) {
        }
    };

    var initials = {
        currentSlide : $(".slide").first(),
        currentSlideId : $(".slide").first().index(),
        slideCount : $(".slide").length,
        is_animating : false,
        slide_change : 0

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

        if ($(window).scrollTop() > 0) {
         $(window).scroll(self.onScroll);
        }

        //pagination
        if (self.settings.dots == true) { 
            $(self.settings.dots_append).on('click', '.js-pagination', function(event) {
                event.preventDefault();
                var $this = $(this);
                var selected_slide_id = $(this).data("slide");
                var slide_found = $(self.settings.slide).eq(selected_slide_id - 1);

                self.goToSlide(slide_found);
            });
        }

        //see if the user previously scrolled and just refreshed the page
        if ($(window).scrollTop() > 0) {
            self.defineCurrentSlide();
        };

        //init user settings
        self.buildDots();
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
        var html = '';
        if (self.settings.dots == true) {            
            for (var i = 0; i < self.settings.slideCount; i++) {
                var number = i + 1;
                var href_string = '';

                if (self.settings.dots_tag === "a") {
                    href_string = 'href="#slide'+ number +'"';
                };

                //html for the dotsis here
                html += '<'+ self.settings.dots_tag + ' ' + href_string + 'class="nav__item mav__item--' + number + ' js-pagination" data-slide="' + number + '"><span class="nav__text">'+ number +'</span></'+ self.settings.dots_tag +'>';
            };
        }

        $(self.settings.dots_append).append(html);
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

            self.settings.beforeChange(self.settings.currentSlide);
            self.settings.slide_change++;
           
            $("body, html").animate(
                {    
                    scrollTop: $(self.settings.slide).eq(self.settings.currentSlideId).offset().top,
                },
                {
                    duration:1500,
                    easing: self.settings.easing,
                    complete: function() {
                       //self.settings.slide_change = 0;
                        self.settings.is_animating = false;
                        //self.settings.afterChange(self.settings.currentSlide);
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

    Fillr.prototype.defineCurrentSlide = function(event) {
        var found=null;
        var found_top=0;

        $(self.settings.slide).each(function(index, el) {
            var $this = $(this);
            var offset = Math.abs($this.offset().top - $(window).scrollTop());              


            //find the closest slide to the top
            if((found == null ) || ( offset >= 0 ) && ( offset < found_top )){
                found = $this;
                found_top = offset;
            }
        });  

        self.settings.currentSlide = found;
    }

    Fillr.prototype.onScroll = function(event) {

        if(self.settings.is_animating == false) {             
            clearTimeout($.data(this, 'scrollTimer'));
            $.data(this, 'scrollTimer', setTimeout(function() {
                self.defineCurrentSlide();
                console.log("onScroll");
                self.goToSlide(self.settings.currentSlide);

            }, 2000));    
         }      
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