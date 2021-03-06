// Structure
// ------------------------------------------------
var home = document.querySelector("#home");
var popup = document.querySelector("#popUp");
var closePopUp = document.querySelector(".closePopUp");
var ul = document.querySelector("#menu");
var main = document.querySelector("#main");
var span = document.querySelector("span");
var search = document.querySelector("#search");
var input = document.querySelector("#search input");


// Handlebars Templates
// ------------------------------------------------
var sourceTemplate = document.querySelector("#source-template");
var articleTemplate = document.querySelector("#article-template");
var searchResultTemplate = document.querySelector("#search-results");


// Setup
// ------------------------------------------------
var articles;

var sources = [
	{
		name: "The Next Web",
		path: "the-next-web"
	},
	{
		name: "TechCrunch",
		path: "techcrunch"
	},
	{
		name: "BuzzFeed",
		path: "buzzfeed"
	},
	{
		name: "Engadget",
		path: "engadget"
	},
	{
		name: "The New York Times",
		path: "the-new-york-times"
	},
	{
		name: "Reddit",
		path: "reddit-r-all"
	}, 
	{
		name: "Mashable",
		path: "mashable"
	},
	{
		name: "Hacker News",
		path: "hacker-news"
	}
];



// Event Listeners
// ------------------------------------------------
window.addEventListener("load", init);
home.addEventListener("click", init);
main.addEventListener("click", populatePopUp);
closePopUp.addEventListener("click", hidePopup)
ul.addEventListener("click", chooseSource);
input.addEventListener("input", filter);
search.addEventListener("click", showSearch);
input.addEventListener("keyup", hideSearch);

input.addEventListener("blur", function(e) {
	search.classList.remove("active");
});


// Event Handlers
// ------------------------------------------------
function init(e) {
	timeoutID = window.setTimeout(hidePopup, 1000);
	span.innerHTML = "The Next Web";
	getJSON(e);
	displaySources(e);
};

function getJSON(e) {
	var url = "https://newsapi.org/v1/articles?source=the-next-web&apiKey=ce2ae499737a4b28a9618e6b36fa2076";
	$.getJSON(url, displayArticles);
};

function displaySources(e) {
	var template = Handlebars.compile(sourceTemplate.innerHTML);
	ul.innerHTML = template(sources);
};

function displayArticles(json) {
	articles = json.articles;
	var template = Handlebars.compile(articleTemplate.innerHTML);
	main.innerHTML = template(articles);
};

function populatePopUp(e) {
	e.preventDefault();

	var clicked = e.target.closest("article");
	var index = clicked.dataset.index;

	//grab elements
	var h1 = document.querySelector("#popUp .container h1");
	var p = document.querySelector("#popUp .container p");
	var a = document.querySelector("#popUp .container a");

	//add content, etc
	h1.textContent = articles[index].title;
	p.textContent = articles[index].description;
	a.href = articles[index].url;

	popup.classList.remove("hidden", "loader");
};


function chooseSource(e) {
	e.preventDefault();

	var clicked = e.target.innerHTML;
	span.innerHTML = clicked;

	sources.forEach(function(item) {
		if(clicked === item.name) {
			popup.classList.remove("hidden");
			popup.classList.add("loader");

			var url = "https://newsapi.org/v1/articles?source=" + item.path + "&apiKey=ce2ae499737a4b28a9618e6b36fa2076";
			$.getJSON(url, displayArticles);
			
			var timeoutID = setTimeout(hidePopup, 1000);
			input.value = "";
		}
	});
};

function hidePopup() {
	popup.classList.add("hidden");
};

function showSearch(e) {
	e.preventDefault();
	search.classList.add("active");
	input.focus();
};

function hideSearch(e) {
	e.preventDefault();
	if(e.keyCode == 13) {
		search.classList.remove("active");
	}
};

function filter(e) {
	var searchTerms = input.value.toLowerCase();
	var filteredArticles = [];

	articles.forEach(function(item, index) {
		var articleTitle = item.title.toLowerCase();

		if(articleTitle.includes(searchTerms)) {
			filteredArticles.push(item);

			var template = Handlebars.compile(searchResultTemplate.innerHTML);
			main.innerHTML = template(filteredArticles);

		} else if(filteredArticles.length === 0) {
			main.innerHTML = "<p>I'm sorry, nothing matches your search, please try again.</p>"
		}
	});

	filteredArticles = [];
};












home.addEventListener('click', showDefaultSource);
window.addEventListener('load', getArticles)
closePopUp.addEventListener('click', togglePopUp);
articles.addEventListener('click', articlePreview);
sourcesDropdown.addEventListener('click', selectSource);
home.addEventListener('click', showDefaultSource);


