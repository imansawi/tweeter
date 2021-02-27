$(document).ready(function () {
  // Function Creates Tweet Element for Each Tweet
  //==================================================
  const createTweetElement = function (tweet) {
    const $tweet = $("<article>").addClass("tweet");

    // Creating DOM Elements
    $header = $("<header>");
    $avatar = $('<img class="avatar">').attr("src", tweet.user.avatars);
    $name = $("<h2>").text(tweet.user.name);
    $handle = $("<p>").text(tweet.user.handle);
    $tweetContent = $("<p>").text(tweet.content.text);
    $footer = $("<footer>");
    $date = $("<p>").text(moment(tweet.created_at).calendar());

    // Appending DOM Elements
    $header.append($avatar, $name, $handle);
    $footer.append($date);
    $tweet.append($header, $tweetContent, $footer);
    return $tweet;
  };

  // Function Loops Through Tweets Takes Return Value
  // and Appends itto The Tweets Container
  //===================================================
  const renderTweets = function (tweets) {
    for (tweet of tweets) {
      let $tweet = createTweetElement(tweet);
      $("#tweet-container").prepend($tweet);
    }
  };

  // Post Request Function to Submit a Form
  //===================================================
  const postRequest = () => {
    $("form").on("submit", function (event) {
      event.preventDefault();

      if (!$("textarea", this).val()) {
        $(".errorMessage").slideDown("slow");
        $(".errorMessage").text("Compose a Tweet!");
        return;
      } else if ($("textarea", this).val().length > 140) {
        $(".errorMessage").slideDown("slow");
        $(".errorMessage").text("Ooops!! Exceeded Charactets Limit!");
        return;
      } else {
        $.ajax({
          type: "POST",
          url: "/tweets",
          data: $(this).serialize(),
        }).done(function () {
          $("textarea").val("");
          $("#tweet-container").empty();
          loadTweets();
        });
      }
    });
  };

  postRequest();

  // Get Request Function to Submi a Form
  //===================================================
  const loadTweets = () =>
    $.ajax({
      type: "GET",
      url: "/tweets",
      dataType: "json",
    }).done(function (response) {
      renderTweets(response);
    });

  loadTweets();
});