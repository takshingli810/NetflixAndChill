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

    // url: "https://api.themoviedb.org/search/keyword?query=" + searchTerm + "&api_key=" + key

    var key = "c3cbdd6e7ebb04fe90c3e817eb4cd656";

    //ajax request to GET the movie with the title of the searchTerm
    //"http://www.omdbapi.com/?t="
    //To do - Why is only one result showing up? Is there a way to search with keywords?
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

          if(element.Poster !== "N/A"){
              allMovies += "<img src=" + element.Poster + ">";
          } else {
              allMovies += "<img src='../images/no-photo-available.jpg'>";
          }

          allMovies += "<h1>" + element.Title + ", " + element.Year "</h1>";
          allMovies += "<p>" + element.Plot + "</p>";


            // str += "<tr>";
            // str += "<td>" + index + "</td>";
            // str += "<td>" + element.Title + "</td>";
            // str += "<td>" + element.Type + "</td>";
            // str += "<td>" + element.Year + "</td>";
            // str += "<td>" + element.imdbID + "</td>";
            // str += "</tr>";
        });


        allMovies += '</div>';

        // insert the html
        $searchResults.append(allMovies);

      //   //if the result is FOUND
      //   if(result.Response !== "False"){
      //     //if the poster image is FOUND
      //     if(result.Poster !== "N/A"){
      //       $searchResults.append("<img src=" +  result.Poster + ">");
      //     }
      //     else{
      //       $searchResults.append("<img src=" + "../images/no-photo-available.jpg>");
      //     }
      //     $searchResults.append("<h1>"+ result.Title + ", " + result.Year + "</h1>");
      //     $searchResults.append("<p>"+ result.Plot +"</p>");
      //   }
      //   //if Title of show is NOT FOUND
      //   else{
      //       $searchResults.append("Not found. Maybe your tastes are too obscure?");
      //   }
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
