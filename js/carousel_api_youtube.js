
var players = new Array()
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player;
function onYouTubeIframeAPIReady() {
  let elements = document.getElementsByClassName("carousel-video");
  var elements_array = Array.prototype.slice.call(elements, 0);



  elements_array.forEach(element => {
    if (element.hasAttribute("video_id")) {
      id = element.getAttribute("video_id")
      console.log(id);

      player = new YT.Player(element.id, {
        videoId: id,
        playerVars: { 'origin': 'http://localhost:3000' },
        events: {
          'onReady': onPlayerReady,
          'onStateChange': onPlayerStateChange
        }
      });
      players.push(player)
    }
    console.log(players);
  });


}

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
  //event.target.playVideo();

}

// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.
var done = false;
function onPlayerStateChange(event) {
  if (event.data == YT.PlayerState.PLAYING && !done) {
    //setTimeout(stopVideo, 6000);
    done = true;
  }
}
function stopVideo() {
  player.pauseVideo();
}


$(document).ready(function () {
  $('#carouselExampleIndicators').on('slid.bs.carousel', function (e) {
    let elemento = $('#carouselExampleIndicators .carousel-item.active iframe').first();
    if (elemento.prop("tagName") == "IFRAME") {


      var player_id = elemento[0].id.slice(-1)
      console.log(player_id - 1);
      players[player_id - 1].playVideo()
    }
    console.log("Act");
  });

  $('#carouselExampleIndicators').bind('slide.bs.carousel', function (e) {
    let elemento = $('#carouselExampleIndicators .carousel-item.active iframe').first();
    if (elemento.prop("tagName") == "IFRAME") {
      var player_id = elemento[0].id.slice(-1)
      console.log(player_id - 1);
      players[player_id - 1].pauseVideo()
    }
  });
});
