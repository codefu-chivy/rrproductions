$(function() {
    let minimize = false;
    function collapse() {
        if ($(window).width() <= 430) {
            $("#col-button").removeClass("collapse");
        }
        else {
            $("#col-button").addClass("collapse");
        }
    };
    collapse();
    $(window).resize(function() {
        collapse();
    }) 
    $("#col-button").click(function() {
        minimize = !minimize;
        if (minimize) {
            $("#col-button").text("Minimize");
        }
        else {
            $("#col-button").text("Menu");
        }
        $(".menu").toggleClass("nav-link-expand");
    })
    
});