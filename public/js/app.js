//CLIENT-SIDE JS
//MAIN FUNCTION

$(function() {
    console.log( "ready!" );
    $("#signup-button").click(function(){
        $("#signUpModal").modal();
    });

    getMovies();
});


// function to SEARCH FOR MOVIES (searchLikes.hbs template)
function getMovies(){




  //name of entire search form
  var $searchForm = $("#searchForm");

  //need to compile handlebars?
  // var template = Handlebars.compile($searchForm.html());

  //where the results will be appended
  var $searchResults = $(".search-results");

  //search term input (title)
  var $searchTerm = $('#searchTerm');

  //submit form to search OMDB API
  $searchForm.on('submit', function(event){
    //prevent from refreshing page
    event.preventDefault();

    //empty previous results
    $searchResults.empty();

    //save form data to variable
    var searchTerm = $searchTerm.val();

    //ajax request to GET the movie with the title of the searchTerm
    //To do - Why is only one result showing up? Is there a way to search with keywords?
    $.ajax({
      type: 'GET',
      url: "http://www.omdbapi.com/?v=10&t=" + searchTerm, //v=1 is version 1, t means title
      data: {}, //no data is being passed in
      success: function(result){
        console.log(result);

        //if the result is FOUND
        if(result.Response !== "False"){
          //if the poster image is FOUND
          if(result.Poster !== "N/A"){
            $searchResults.append("<img src=" +  result.Poster + ">");
          }
          else{
            $searchResults.append("<img src=" + "../images/no-photo-available.jpg>");
          }
          $searchResults.append("<h1>"+ result.Title + ", " + result.Year + "</h1>");
          $searchResults.append("<p>"+ result.Plot +"</p>");
        }
        //if Title of show is NOT FOUND
        else{
            $searchResults.append("Not found. Maybe your tastes are too obscure?");
        }
      },
      //if theres an error with the AJAX request
      error: function(err){
        console.log("AJAX not working... ", err);
      }

    }); //end of AJAX

    //reset form
    $searchForm[0].reset();
    $searchTerm.focus();

  }); //end of on submit




};//end of getMovies
