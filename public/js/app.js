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

//delete user ajax call
app.deleteUser = function(e) {
	var id = 
};

app.editUser = function(e) {
	e.preventDefault();
	var user= $(e.target).serialize();

	$.put("/users/", user)
		.done(function)
}
