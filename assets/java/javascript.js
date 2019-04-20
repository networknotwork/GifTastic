$(document).ready(function(){

var topics=["car", "truck", "plane", "ship", "train", "rocket", "tank"];

function renderButtons() {
    $("#buttonhere").empty();
        for (var i = 0; i < topics.length; i++) {
          var a = $("<button>");
          a.addClass("topic");
          a.attr("query", topics[i]);
          a.text(topics[i]);
          $("#buttonhere").append(a);
        };
        $("button.topic").on("click",function(){
            $("#feed").empty();
            var stuff = $(this).attr("query");
            var queryURL = "https://api.giphy.com/v1/gifs/search?q="+stuff+"&api_key=QHIBtEodEXwREBCtZ8IGnew8UJBqJ9JI&limit=10";
        
            $.ajax({
                url: queryURL,
                method: "GET"
              }).then(function(response) {
                console.log(response);
                var results = response.data;
        
                for (var i = 0; i < results.length; i++) {
                    var gifDiv = $("<div>");
                    gifDiv.addClass("float-left giffed");
                    var rating = results[i].rating;
                    var p = $("<p>").text("Rating: " + rating);
                    var topicImage = $("<img>");
                    topicImage.addClass("topicgif");
                    topicImage.attr("src", results[i].images.fixed_height_still.url);
                    topicImage.attr("data-state", "still");
                    topicImage.attr("data-still", results[i].images.fixed_height_still.url);
                    topicImage.attr("data-animate", results[i].images.fixed_height.url);
        
                    gifDiv.append(p);
                    gifDiv.append(topicImage);
                    $("#feed").prepend(gifDiv);
                    
                };
                $(".topicgif").on("click", function() {
                  var state = $(this).attr("data-state");
              if(state=="still"){
              $(this).attr("src",$(this).attr("data-animate"));
              $(this).attr("data-state", "animate");
            }else if(state=="animate"){
              $(this).attr("src",$(this).attr("data-still"));
              $(this).attr("data-state","still");
            };
            });
        });
        });
      };
renderButtons();

$("#add-topic").on("click", function(event) {
        event.preventDefault();
        var topicquery = $("#topic-input").val().trim();
        topics.push(topicquery);
        renderButtons();
      });

});
