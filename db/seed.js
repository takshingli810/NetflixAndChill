//SO FAR ONLY LIKES TO TEST CREATE METHOD

//eventually want to GET movies from OMDB
//CLICK ON ADD BUTTON next to the movie after searching
//ADD movie to our User's "LIKES"


var db = ("../models/");
var Like = require("../models/like");
var mongoose = require('mongoose');

var likesList = [
  {
    title: "Game of Thrones",
    imageUrl: "http://ia.media-imdb.com/images/M/MV5BMjM5OTQ1MTY5Nl5BMl5BanBnXkFtZTgwMjM3NzMxODE@._V1_SX300.jpg",
    plot: "While a civil war brews between several noble families in Westeros, the children of the former rulers of the land attempt to rise up to power. Meanwhile a forgotten race, bent on destruction, return after thousands of years in the North",
    imdbID: "tt0944947",
    yearOfRelease: "2011-"
  },

  {
    title: "Troll 2",
    imageUrl: "http://ia.media-imdb.com/images/M/MV5BMTM1OTUzOTM2OV5BMl5BanBnXkFtZTcwMzYxNDY3NA@@._V1_SX300.jpg",
    plot: "A family vacationing in a small town discovers the entire town is inhabited by goblins in disguise as humans, who plan to eat them",
    imdbID: "tt0105643",
    yearOfRelease: "1990"
  },

  {
    title: "Broad City",
    imageUrl: "http://ia.media-imdb.com/images/M/MV5BMTYxNzk5MDA2MF5BMl5BanBnXkFtZTgwNjM2MjQzMTE@._V1_SX300.jpg",
    plot: "Broad City follows two women throughout their daily lives in New York City, making the smallest and mundane events hysterical and disturbing to watch all at the same time",
    imdbID: "tt2578560",
    yearOfRelease: "2014-"
  }
];

Like.remove({}, function(err, likes){
  Like.create(likesList, function(err, likes){
    if(err){
      console.log("ERROR: ", err);
    }
    else{
      console.log("all likes: ", likes);
      console.log("created ", likes.length, " likes");
      process.exit();
      mongoose.connection.close();
    }
  });
});
