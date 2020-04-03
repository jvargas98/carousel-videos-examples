
$(document).ready(function () {
  $('#carouselExampleIndicators').on('slid.bs.carousel', function (e) {
    let elemento = $('#carouselExampleIndicators .carousel-item.active iframe').first();
    console.log(elemento);
    if (elemento.prop("tagName") == "IFRAME") {
      var videoURL = elemento.prop('src');
      videoURL += "?rel=0&amp;autoplay=1";
      elemento.prop('src', videoURL);
    }
    console.log("Active");
  });

  $('#carouselExampleIndicators').bind('slide.bs.carousel', function (e) {
    let elemento = $('#carouselExampleIndicators .carousel-item.active iframe').first();
    if (elemento.prop("tagName") == "IFRAME") {
      var videoURL = elemento.prop('src');
      videoURL = videoURL.replace("?rel=0&amp;autoplay=1", "");
      elemento.prop('src', '');
      elemento.prop('src', videoURL);
    }
    console.log("Actived");
  });
});