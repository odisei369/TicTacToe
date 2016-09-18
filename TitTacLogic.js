$( document ).ready(function(){
  load();
});
var game = {
  board : [],
  aiSymbol : ''
};

function load(){
  $( ".menu" ).click(function() {
    $( ".menu" ).animate({
      opacity: 0,
    }, 1000, function() {
      $(".menu").css("display", "none");
    });
  });
}