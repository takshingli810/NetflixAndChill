//CLIENT-SIDE JS
//MAIN FUNCTION

$(function() {
    console.log( "ready!" );

    $("#signup-button").click(function(){
        // $("#signUpModal").modal();
        console.log("no issues with jquery");
    });

    //render all likes when they go to their profile
    renderLikes();

    //makes AJAX call to OMDB API and displays top ten movies w/keyword in title
    getMovies();

});


//show all likes in the MY LIKES div
function renderLikes(){


  //from the hidden input type in my_profile
  var userID = $('#user-id').attr("user-id");

  //posting to backend (can view on API LIKES)
  $.ajax({
    type: 'GET',
    url: '/api/users/' + userID + '/movies',
    dataType: 'json',
    success: function(usersMovies){
      //movie id is same as imdbID in users movies array
      usersMovies.forEach(function(movieID){
        //ajax request to GET the movie with the imdbID of the movie
        $.ajax({
          type: 'GET',
          url: "http://www.omdbapi.com/?i=" + movieID,
          dataType: 'json',
          success: function(result){
            console.log(result);
            // iterate over the data result set

            var movieDiv = "<div class= 'movie-div col-md-4'><p>" + result.Title + "</p>" + "<img src=" + result.Poster + "></div>";

            $('.movies-grid').prepend(movieDiv);

          },
          //if theres an error with the AJAX request
          error: function(err){
            console.log("AJAX not working in render movies... ", err);
            }
          }); //end of AJAX

        }); //end of on submit

      },
      error: function(err) {
        console.log("render Likes: ", err);
      }
    });

};

//ADD MOVIES TO USERS
//newLike is a JSON object that is created in the AJAX request
function addMovieToUsers(event){
  event.preventDefault();


  //from the hidden input type in my_profile
  var userID = $('#user-id').attr("user-id");

  var imdbID = event.target.children[0].value;

  var newMovie = {
    imdbID: imdbID,
    userID: userID  //will use req.body.userID to push into users array
  }

  //posting to backend (can view on API LIKES)
  $.ajax({
    type: 'POST',
    url: '/api/users',
    data: newMovie,
    dataType: 'json',
    success: function(newMovie){
      console.log("POSTING TO MOVIES");
    },
    error: function(err) {
      console.log("issue with add movies POST: " + err);
    }
  });

  // renderLikes(event);

};


//CREATE LIKE
//newLike is a JSON object that is created in the AJAX request
function createLike(event){





  event.preventDefault();

  addMovieToUsers(event);

  //from the hidden input type in profile_show
  var userID = $('#user-id').attr("user-id");

  var newLike = {
    imdbID: event.target.children[0].value,
    userID: userID  //will use req.body.userID to push into users array
  }

  //posting to backend (can view on API LIKES)
  $.ajax({
    type: 'POST',
    url: '/api/likes',
    data: newLike,
    dataType: 'json',
    success: function(newLike){
      console.log("POSTING TO Likes");
    },
    error: function(err) {
      console.log("issue with create likes POST: " + err);
    }
  });

  renderLikes();
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
        var movie = "<div>";
        // iterate over the data result set
        $.each(result.Search, function(index, element) {

          //imdb ID since omdb ID isn't available?
          var imdbID = element.imdbID;

          console.log("IMDB ID ", imdbID);

          //adds a button to each movie (+)
          movie += "<form id='add-like' onsubmit='createLike(event)'>"
                +  "<input class='hidden' type='hidden' value=" + imdbID + " name='like' id=" + imdbID + "></input>"
                +  "<input type='submit' value='+'></input>"
                +  "</form>";
          //if there is no poster URL then it just adds a default image
          if(element.Poster !== "N/A"){
              movie += "<div><img src=" + element.Poster + ">";
          } else {
              movie += "<img src='../images/no-photo-available.jpg'>";
          }
          movie += "<h1>" + element.Title + ", " + element.Year + "</h1>";
        });

        movie += '</div>';

        // insert the html
        $searchResults.append(movie);
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
