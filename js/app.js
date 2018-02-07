var $button = $("#push")
var API_ENDPOINT = "https://api.themoviedb.org/3/search/movie?"
var api_key ="api_key=ad83002e6c7881556af5c5725f46194b"
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
	$input = $("#icon_prefix")
	// var url = API_ENDPOINT + api_key + query + movie
	// console.log(url)
}

function movieAsked() {
	var url = API_ENDPOINT + api_key + lang + query + $input.val()
	//console.log(url)
	request
	.get(url)
	.then(function(response) {
		const responseObject = response.body
		// console.log(responseObject)
		const movieTitle = responseObject.results
		console.log(movieTitle)
		const movieTriler = movieTitle[1]
		// console.log(responseObject)
		const id = movieTriler.id
		const overview = movieTriler.overview
		const name = movieTriler.original_title
		const video = movieTriler
		// document.write(name + ":" + overview + id)
		$("#modal1").click(showTrailer(id))
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
		src="https://www.youtube.com/embed/QRPRkucfv-g"
		var $trailerFrame = $("#trailer")
		$trailerFrame.attr("src", "https://www.youtube.com/embed/"+ keyTrailer)
	})
	
}



$(document).ready(getJson)