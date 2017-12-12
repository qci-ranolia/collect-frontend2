$( function() {
    "use strict";
    $(".fa-bars").click(function(){
        $(this).siblings(".fa-times").addClass("active");
        $(this).removeClass("active");
        $(this).parent(".slider-fix").removeClass("sf");
    });
    $(".fa-times").click(function(){
        $(this).siblings(".fa-bars").addClass("active");
        $(this).removeClass("active");
        $(this).parent(".slider-fix").addClass("sf");
    });
});