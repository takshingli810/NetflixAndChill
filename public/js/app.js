//CLIENT-SIDE JS
//MAIN FUNCTION
var user = {};

$(function() {
    console.log( "ready!" );
    $("#signup-button").click(function(){
        // $("#signUpModal").modal();
        console.log("no issues with jquery");
    });

    //makes AJAX call to OMDB API and displays top ten movies w/keyword in title
    getMovies();

});

//CREATE LIKE
//newLike is a JSON object that is created in the AJAX request
function createLike(event, newLike){
  event.preventDefault();
  console.log(event);

  //posting to backend (can view on API LIKES)
  $.ajax({
    type: 'POST',
    url: '/api/likes',
    data: newLike,
    success: function(newLike){
      renderLikes();

      $('.movie-div').append('<div> NEW LIKE' + "INSERT NEW LIKE HERE"+ '</div>');
    },
    error: function(err) {
      alert("issue with create likes: " + err);
    }
  });

};

//show all likes in the MY LIKES div
function renderLikes(){
  // GETTING LIKES AND RENDERING ON MY LIKES PARTIAL
  $.ajax({
    type: 'GET',
    url: '/api/likes',
    success: function(likes){
      $.each(likesObject, function(i, likesArray){
        console.log(likesArray);
        $.each(likesArray, function(j, like){
          $('.movie-div').append('<div>' + like.title + '</div>');
        });
        // $('.movie-div').append('<div>' + like[0].title + '</div>');
      })
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
          //what we'll be passing into the 'createLike' method
          //window. is to make it a global variable
          //currently only pulling data from the first thing added
          window.newLike = {
            title: element.Title,
            yearOfRelease: element.Year,
            imageUrl: element.Poster,
            imdbID: element.imdbID
          };



          // $searchResults.append("NEW LIKE: ", JSON.serialize(window.newLike));
          console.log(newLike);

          //adds a button to each movie (+)
          allMovies += "<form id='add-like' onsubmit='createLike(event, newLike)'>"
                      +"<input type='submit' value='+'></input>"
                      +"</form>";
          //if there is no poster URL then it just adds a default image
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
