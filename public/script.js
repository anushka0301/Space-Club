function scrollWin(a) {
  if ($(window).width() > 600){
    window.scrollTo(0, a*700);
  }
  else{
    document.getElementById("nav-container").style= 'animation: nav-anim2 0.5s both;';
    document.getElementById("alt-nav").style= 'animation: alt-nav-anim2 0.5s both;';
    if(a==4.1){
      window.scrollTo(0, a*700+2000);
    }
    else{
      window.scrollTo(0, a*700);
    }
  }
}
function logoTrigger(){
  var a=document.getElementById("full-page");
  var x= a.scrollTop;
  console.log(x);
  document.getElementById("result").innerHTML = "Horizontally: " + x + "px.";
}
function myFunction() {
  document.getElementById("nav-container").style= 'animation: nav-anim2 0.5s both;';
  if ($(window).width() > 750){
    document.getElementById("myDropdown").classList.toggle("show");
  }
  else{
    document.getElementById("myDropdown2").style= 'animation: mem-anim-1 0.5s both;';
  }
}
function myFunction2() {
  document.getElementById("nav-container").style= 'animation: nav-anim1 0.5s both;';
  document.getElementById("alt-nav").style= 'animation: alt-nav-anim1 0.5s both;';
}
function myFunction3() {
  document.getElementById("nav-container").style= 'animation: nav-anim2 0.5s both;';
  document.getElementById("alt-nav").style= 'animation: alt-nav-anim2 0.5s both;';
}
function myFunction4() {
  document.getElementById("myDropdown2").style= 'animation: mem-anim-2 0.5s both;';
  document.getElementById("alt-nav").style= 'animation: alt-nav-anim2 0.5s both;';
  
}


// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
   
  if (!event.target.matches('.dropbtn')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}
 

$(function () {
  $(window).on('scroll', function () {
      if ($(window).width() > 1130 && $(window).scrollTop() > 200 ) {
        $('.heading1').removeClass('active12');  
        $('.heading1').addClass('active11');
        $('.heading2').removeClass('active22');  
        $('.heading2').addClass('active21');
        $('#nav-container').css('background','black');
      } 
      if ( $(window).width() > 1130 && $(window).scrollTop() < 200 ) {
          $('.heading1').addClass('active12');
          $('.heading2').addClass('active22');
          $('#nav-container').css('background','rgba(255, 255, 255, 0)');
          $('#nav-container').css('background-image','linear-gradient(black, rgba(0, 0, 0, 0.726), rgba(0, 0, 0, 0))');
      }
      /*if ($(window).width() < 600 && $(window).scrollTop() > 150 ) {
          $('#nav-container').css('background','black');
      } 
      if ( $(window).width() < 600 && $(window).scrollTop() < 150 ) {
         $('#nav-container').css('background','rgba(255, 255, 255, 0)');
         $('#nav-container').css('background-image','linear-gradient(black, rgba(0, 0, 0, 0.726), rgba(0, 0, 0, 0))');
      }*/
  });
});