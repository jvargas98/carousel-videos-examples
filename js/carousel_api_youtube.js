var players = new Array()
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
firstScriptTag.parentNode.appendChild(tag)

function onYouTubeIframeAPIReady() {
  let elements = document.getElementsByClassName("carousel-video");
  let elements_array = Array.prototype.slice.call(elements, 0);

  elements_array.forEach(element => {
    if (element.hasAttribute("video_id")) {
      let id = element.getAttribute("video_id")
      let player = new YT.Player(element.id, {
        videoId: id,
        events: {
          'onStateChange': onPlayerStateChange
        }
      });
      players.push(player)
    }
  });
}

function onPlayerStateChange(event) {
  switch (event.data) {
    case 0:
      startCarousel();

      break;
    case 1:
      pauseCarousel();
      break;
  }
}

$(document).ready(function () {
  $('#carouselExampleIndicators').on('slid.bs.carousel', function () {
    let element = getElement();
    if (element.prop("tagName") == "IFRAME") {
      let player_id = getIdPlayer(element[0]);
      players[player_id - 1].playVideo();
      if (players[player_id - 1].getPlayerState() == 0) {
        players[player_id - 1].clearVideo();
        players[player_id - 1].playVideo();
      }
    }

  });

  $('#carouselExampleIndicators').bind('slide.bs.carousel', function () {
    let element = getElement();
    if (element.prop("tagName") == "IFRAME") {
      let player_id = getIdPlayer(element[0]);
      players[player_id - 1].pauseVideo();
    }
  });
});

function getIdPlayer(element) {
  return element.id.slice(-1);
}

function getElement() {
  return element = $('#carouselExampleIndicators .carousel-item.active iframe').first();
}

function startCarousel() {
  $('.carousel').carousel('cycle');
}

function pauseCarousel() {
  $('.carousel').carousel('pause');
}
