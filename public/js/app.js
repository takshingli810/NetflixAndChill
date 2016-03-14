//CLIENT-SIDE JS
//MAIN FUNCTION
var user = {};

$(function() {
    console.log( "ready!" );
    $("#signup-button").click(function(){
        $("#signUpModal").modal();
        console.log("no issues with jquery");
    });

    getMovies();
});
