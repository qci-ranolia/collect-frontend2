//  **Navigation js
$(function(){
    "use strict";
    $(".fa-bars").click(function(){
        //$(".black-shadow").addClass("active");
        $(this).siblings(".fa-long-arrow-left").addClass("active");
        $(this).removeClass("active");
        $(this).parents("body").removeClass("left-menu-close");
    });
    $(".fa-long-arrow-left").click(function(){
        //$(".black-shadow").removeClass("active");
        $(this).siblings(".fa-bars").addClass("active");
        $(this).removeClass("active");
        $(this).parents("body").addClass("left-menu-close");
    });
    //TESTING PHASE, more improvements in later versions will be seen
    $(document).keypress(function(e) {
        var a = $(".modal");
        //var b = a.find(".modal-footer");
        if ( a.hasClass('show') ){
            if(e.which == 13) {
                //b.children(".btn-primary").trigger("click");
                alert('New Implementation being tested right now just for you.........You pressed enter! keynumber is 13.....');
            }
        }
    });
});
//**Navigation Mobile js
$(function(){
"use strict";
    if ( window.innerWidth <= 1024 ) {
        $("body").addClass("left-menu-close");
        $('.navbar-toggleable-md').find(".fa-long-arrow-left").removeClass("active");
        $('.navbar-toggleable-md').find(".fa-bars").addClass("active");
        $(".nav-link").click(function(){
            if ($(this).hasClass("active")){
                $('body').addClass('left-menu-close');
                $('.navbar-toggleable-md').find(".fa-long-arrow-left").removeClass("active");
                $('.navbar-toggleable-md').find(".fa-bars").addClass("active");   
            }
        });
        $(document).on("mouseup touchend", function (e) {
            //"use strict";
            if(!$('body').hasClass('left-menu-close')){
                var fc = $(".slider-fix");
                if(!fc.is(e.target)&&fc.has(e.target).length===0){
                    $('body').addClass('left-menu-close');
                    $('.navbar-toggleable-md').find(".fa-long-arrow-left").removeClass("active");
                    $('.navbar-toggleable-md').find(".fa-bars").addClass("active");    
                }
            }
        });
    }
});