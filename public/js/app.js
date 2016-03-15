//CLIENT-SIDE JS
//MAIN FUNCTION
var user = {};

$(function() {
    console.log( "ready!" );
    $("#signup-button").click(function(){
        // $("#signUpModal").modal();
        console.log("no issues with jquery");
    });

    getMovies();

    $('.add-like').on('click', function(event){
      createLike(event);
    });
});

// function createLike(event){
//   event.preventDefault();
//   console.log(event);
// }

//CREATE LIKE
function createLike(event){
  event.preventDefault();

  console.log("HI");

  console.log(event);

  //info about the new like
  var newLike= {
    // name: $name,
    // artistName: $artistName,
    // releaseDate: $releaseDate,
    // genres: $genres,
    // description: $description,
    // imageUrl: $imageUrl
    title: "IS THIS WORKING"
  };

  $.ajax({
    type: 'POST',
    url: '/api/likes',
    data: newLike,
    success: function(newLike){
      console.log(newLike);
    },
    error: function(err) {
      alert("issue with create likes: " + err);
    }
  });
};


// function to SEARCH FOR MOVIES (searchLikes.hbs template)
function getMovies(){

  //name of entire search form
  var $searchForm = $("#searchForm");

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
    var searchTerm = encodeURI($searchTerm.val());

    //ajax request to GET the movie with the title of the searchTerm
    $.ajax({
      type: 'GET',
      url: "http://www.omdbapi.com/?s=" + searchTerm,
     //v=1 is version 1, t means title
      dataType: 'json', //no data is being passed in
      success: function(result){
        console.log(result);

        var allMovies = '<div>';

        // iterate over the data result set
        $.each(result.Search, function(index, element) {

          allMovies += "<form id='add-like'>"
                      +"<input type='submit' value='+'></input>"
                      +"</form>";
          if(element.Poster !== "N/A"){
              allMovies += "<div><img src=" + element.Poster + ">";
          } else {
              allMovies += "<img src='../images/no-photo-available.jpg'>";
          }

          allMovies += "<h1>" + element.Title + ", " + element.Year + "</h1>";
        });

        allMovies += '</div>';

        // insert the html
        $searchResults.append(allMovies);
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
