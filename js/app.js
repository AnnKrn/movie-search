var API_ENDPOINT = "https://api.themoviedb.org/3/search/movie?"
var api_key ="api_key=b1ee0f27a3fa4bc1700b668da7528499"
var lang = "&language=es"
var query = "&query="
var $input

var API_TRAILER = "https://api.themoviedb.org/3/movie/"
var videos = "/videos?"

const request = superagent

function getJson() {
	$(".button-collapse").sideNav();
  $('.modal').modal();
	var $button = $("#submit")
	$button.click(movieAsked)
	$input = $("#movie")
	// var url = API_ENDPOINT + api_key + query + movie
	// console.log(url)
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
		console.log(movieTitle)
		const movieTriler = movieTitle[0]
		// console.log(responseObject)
		const id = movieTriler.id
		const overview = movieTriler.overview
		const name = movieTriler.original_title
		const video = movieTriler
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
		// console.log(responseObject)
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

	$("#log-in").click(function(e) {
	e.preventDefault();

	var provider = new firebase.auth.GoogleAuthProvider();

	firebase
		.auth()
		.signInWithPopup(provider)
		.then(function(result) {
			// This gives you a Facebook Access Token. You can use it to access the Facebook API.
			var token = result.credential.accessToken;
			// The signed-in user info.
			var user = result.user;
			// ...
			$(".collage").removeClass("show");
			$("#log-out").addClass("show");
			$(".profile-photo").attr("src", user.photoURL);
			$(".username").text(user.displayName);
			$(".username")
				.parents("li")
				.removeClass("hide");
			$("#log-out")
				.parent()
				.removeClass("hide");
		})
		.catch(function(error) {
			// Handle Errors here.
			var errorCode = error.code;
			var errorMessage = error.message;
			// The email of the user's account used.
			var email = error.email;
			// The firebase.auth.AuthCredential type that was used.
			var credential = error.credential;
			// ...
			console.log("no funciona :(", error);
		});
});

$("#log-out").click(function(e) {
	e.preventDefault();

	firebase
		.auth()
		.signOut()
		.then(function() {
			// Sign-out successful.
			$(".collage").addClass("show");
			$("#log-in").removeClass("show");
			$(".username")
				.parents("li")
				.addClass("hide");
			$("#log-out")
				.parent()
				.addClass("hide");
		})
		.catch(function(error) {
			// An error happened.
		});
});
