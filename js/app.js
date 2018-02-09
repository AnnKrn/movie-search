var API_ENDPOINT = "https://api.themoviedb.org/3/search/movie?"
var api_key ="api_key=b1ee0f27a3fa4bc1700b668da7528499"
var lang = "&language=es"
var query = "&query="
var $input

var API_TRAILER = "https://api.themoviedb.org/3/movie/"
var videos = "/videos?"

var API_IMAGE = "https://image.tmdb.org/t/p/w500"
// var image = "/images?"

const request = superagent

function getJson() {
	$(".button-collapse").sideNav();
  $('.modal').modal();
	var $button = $("#submit")
	$button.click(movieAsked)
	$input = $("#movie")
	// var url = API_ENDPOINT + api_key + query + movie
	// console.log(url)
	$(".log-in").click(login);
	$("#log-out").click(logout);
}

function movieAsked(e) {
	e.preventDefault()
	var url = API_ENDPOINT + api_key + lang + query + $input.val()
	// console.log(url)
	request
	.get(url)
	.then(function(response) {
		const responseObject = response.body
		console.log(responseObject)
		const movieTitle = responseObject.results
		// console.log(movieTitle)
		const movieTriler = movieTitle[0]
		// console.log(movieTriler)
		const id = movieTriler.id
		const posterPath = movieTriler.poster_path
		// console.log(posterPath)

		const voteAverage = movieTriler.vote_average
		const release = movieTriler.release_date
		
		// console.log(voteAverage)
		// console.log(movieTriler.id)		
		// Sinopsis
		const overview = movieTriler.overview
		// console.log(overview)	
		const name = movieTriler.original_title
		// console.log(name)		titulo
		const video = movieTriler
		// console.log(video)	

		var urlImages = API_IMAGE + posterPath
		// console.log(urlImages)
		$('#movie_image').attr('src',urlImages)
		$('.movie_title').html(name)
		$('#sinopsis').html(overview)
		$('#rating').html(voteAverage)
		$('#premier').html(release)

		// document.write(name + ":" + overview + id)
		showTrailer(id)
	})
	.catch(function() {
		alert("Error")
	})

}

function showTrailer(id) {
	var urlTrailer = API_TRAILER + id + videos + api_key + lang

	request
	.get(urlTrailer)
	.then(function(response) {
		const responseObject = response.body
		console.log(responseObject)
		const movieTrailer = responseObject.results[0]
		const keyTrailer = movieTrailer.key
		// console.log(keyTrailer)
		var $trailerFrame = $("#trailer")
		$trailerFrame.attr("src", "https://www.youtube.com/embed/"+ keyTrailer)
	})

}


$(document).ready(getJson)

//verifying collaborative git

// Initialize Firebase
  var config = {
    apiKey: "AIzaSyAW2-YGoh4vI2pCrLWIY-B1WHQO9lhx9Uc",
    authDomain: "trailerama-de97d.firebaseapp.com",
    databaseURL: "https://trailerama-de97d.firebaseio.com",
    projectId: "trailerama-de97d",
    storageBucket: "",
    messagingSenderId: "629971437449"
  };
  firebase.initializeApp(config);

  var provider = new firebase.auth.GoogleAuthProvider();

	var login = function(e) {
	e.preventDefault();

	firebase.auth()
		.signInWithPopup(provider)
		.then(function(result) {
			console.log(result.user);
			$(".collage").removeClass("show");
			$(".collage").addClass("hide");
			$(".log-out").removeClass("hide");
			$(".log-out").addClass("show");
			$(".section-input").removeClass("hide");
			$(".section-input").addClass("show");
			$(".log-in").removeClass("show");
			$(".log-in").addClass("hide");
			$(".section-card").removeClass("hide");
			$(".section-card").addClass("show");
			//$(".profile-photo").attr("src", user.photoURL);
			//$(".username").text(user.displayName);
			//$(".username")
				//.parents("li")
				//.removeClass("hide");
			//$("#log-out").addClass("show");

				//.parent()
				//.removeClass("hide");
		});
		/*.catch(function(error) {
			// Handle Errors here.
			var errorCode = error.code;
			var errorMessage = error.message;
			// The email of the user's account used.
			var email = error.email;
			// The firebase.auth.AuthCredential type that was used.
			var credential = error.credential;
			// ...
			console.log("no funciona :(", error);
		});*/
};

var logout = function(e) {
	e.preventDefault();

	firebase.auth()
		.signOut()
		.then(function() {
			// Sign-out successful.
			$(".collage").removeClass("hide");
			$(".collage").addClass("show");
			$("#log-in").removeClass("hide");
			$("#log-in").addClass("show");
			$("#log-out").removeClass("show");
			$("#log-out").addClass("hide");
			/*$(".username")
				.parents("li")
				.addClass("hide");
			$("#log-out")
				.parent()
				.addClass("hide");
		})
		.catch(function(error) {
			// An error happened.*/
		});
};
