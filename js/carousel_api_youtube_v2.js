var players = new Array()

function onYouTubeIframeAPIReady() {
  const elements = document.querySelectorAll(`[video_id]`);
  elements.forEach(element => {
    if (element.hasAttribute("video_id")) {
      let video_id = element.getAttribute("video_id");
      let player = createPlayer(video_id, element.id);
      players.push(player);
    };
  });
  console.log(players);
}

function createPlayer(video_id, player_id) {
  let player = new YT.Player(player_id, {
    videoId: video_id,
    events: {
      'onStateChange': onPlayerStateChange
    }
  });
  return player;
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
    if (isIframe()) {
      let player_id = getIdPlayer(element[0]);
      players[player_id].playVideo();
    }
  });

  $('#carouselExampleIndicators').bind('slide.bs.carousel', function () {
    if (isIframe()) {
      let player_id = getIdPlayer(element[0]);
      console.log(players[player_id]);
      players[player_id].pauseVideo();
      startCarousel();
      if (players[player_id].getPlayerState() == 0) {
        players[player_id].seekTo(0);
      }
    }
  });
});


function getIdPlayer(element) {
  return element.id.slice(-1) - 1;
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

function isIframe() {
  let element = getElement();
  return element.prop("tagName") == "IFRAME" ? true : false;
}
