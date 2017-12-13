$( function() {
    "use strict";
    $(".fa-bars").click(function(){
        //$(".black-shadow").addClass("active");
        $(this).siblings(".fa-times").addClass("active");
        $(this).removeClass("active");
        $(this).parents("body").removeClass("left-menu-close");
    });
    $(".fa-times").click(function(){
        //$(".black-shadow").removeClass("active");
        $(this).siblings(".fa-bars").addClass("active");
        $(this).removeClass("active");
        $(this).parents("body").addClass("left-menu-close");
    });
});