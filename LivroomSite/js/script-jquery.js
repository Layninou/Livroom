//this function is here to collapse the button if with clic on the page
$(function () { // Same as document.addEventListener("DOMContentLoaded"...

  // Same as document.querySelector("#navbarToggle").addEventListener("blur",...
  $("#navbarToggle").blur(function (event) {
    var screenWidth = window.innerWidth;
    if (screenWidth < 768) {
      $("#collapsable-nav").collapse('hide');
    }
  });
});

//this function load the main-content
(function (global) {

	var dc = {};

  //Snippets
	var homeHTMLUrl    = "snippets/home-snippet.html";
  var booksTitleHtml = "snippets/books-title-snippet.html";
  var booksHtml      = "snippets/books-snippet.html";
  var donTitleHtml   = "snippets/don-title-snippet.html"
  var donHtml        = "snippets/don-snippet.html";
	var secretHTMLUrl  = "snippets/secret-snippet.html";

  //Json
  var allBooksUrl    = "json/data.json";
  var gainUrl        = "json/don.json";

	// Convenience function for inserting innerHTML for 'select'
	var insertHTML = function (selector, html) {
		var targetElement = document.querySelector(selector);
		targetElement.innerHTML = html;
	};

	// Show loading icon inside element identified by 'selector'.
	var showLoading = function (selector) {
		var html = "<div class='text-center'>";
		html += "<img src='images/ajax-loader.gif'></div>";
		insertHTML(selector, html);
	};

	// Return substitute of '{{propName}}' with propValue in given 'string'
	// it is for show all books with only one html snippet
	var insertProperty = function (string, propName, propValue) {
		var propToReplace = "{{" + propName + "}}";
		string = string.replace(new RegExp(propToReplace, "g"), propValue);
		return string;
	};

	// On page load (before images or CSS)
	document.addEventListener("DOMContentLoaded", function (event) {

		//It shown the gif before find the main content
		showLoading("#main-content");

		//Load the main content of the page
		$ajaxUtils.sendGetRequest(
			homeHTMLUrl,
			function (responseText){
				document.querySelector("#main-content").innerHTML = responseText;
			},
			false);
	});


  /************** START BOOK ********************/

  // Load the Book categories view
	dc.loadBooks = function () {
  		showLoading("#main-content");
  		$ajaxUtils.sendGetRequest(
    	allBooksUrl,
    	buildAndShowBooksHTML);
	};

  //Build HTML for the books page based on my json of data
  function buildAndShowBooksHTML (books) {
    //Load title snippet of books page
    $ajaxUtils.sendGetRequest(
      booksTitleHtml,
      function (booksTitleHtml) {
        //Retrive single book snippet
        $ajaxUtils.sendGetRequest(
          booksHtml,
          function (booksHtml) {
            var booksViewHtml = buildBooksViewHtml(books,
                                                   booksTitleHtml,
                                                   booksHtml);
            insertHTML("#main-content", booksViewHtml);
          },
          false);
      },
      false);
  }

  //using data and snippets, we build the view html to be insert in the page
  function buildBooksViewHtml(books, booksTitleHtml, booksHtml){

    var finalHtml = booksTitleHtml;
    finalHtml += "<section class = 'row'>";

    //loop over books
    for(var i = 0; i < books.length; i++){
      // Insert book values
      var html = booksHtml;
      var author = books[i].author;
      var title = books[i].title;
      var price = books[i].price;
      var image = books[i].image;

      html = insertProperty(html, "author", author);
      html = insertProperty(html, "title", title);
      html = insertProperty(html, "price", price);
      html = insertProperty(html, "image", image);

      finalHtml += html;
    }

    finalHtml += "</section>";
    return finalHtml;
  }

  /************** END BOOKS ********************/

  /************** START DON ********************/

  //I Know this code is useless but i wanna train.

  //Load Don Page
  dc.loadDon = function () {
    showLoading("#main-content");
    $ajaxUtils.sendGetRequest(
      gainUrl,
      buildAndShowDonHTML
    );
  };

  function buildAndShowDonHTML (gain){
    $ajaxUtils.sendGetRequest(
      donTitleHtml,
      function (donTitleHtml) {
        $ajaxUtils.sendGetRequest(
          donHtml,
          function (donHtml) {
            var donViewHtml =  buildDonViewHtml(gain, donTitleHtml, donHtml);
            insertHTML("#main-content", donViewHtml);
          },
          false);
      },
      false);
  }

  function buildDonViewHtml(gain, donTitleHtml, donHtml) {

    var finalHtml = donTitleHtml;
    finalHtml += "<section class = 'row'>";

    var html = donHtml;
    html = insertProperty(html, "gain", gain[0].gain);
    finalHtml += html;
    
    finalHtml += "</section>";
    return finalHtml;
  }

  /************** END DON ********************/

	//Load Secret Page
	dc.loadSecret = function () {
		showLoading("#main-content");
		$ajaxUtils.sendGetRequest(
			secretHTMLUrl,
			function (responseText){
				document.querySelector("#main-content").innerHTML = responseText;
			},
			false);
	};

	global.$dc =dc;

})(window);
