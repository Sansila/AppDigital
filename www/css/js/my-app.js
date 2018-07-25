// Initialize your app
var myApp = new Framework7();
 
// If we need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;
 
// Add view
// var mainView = myApp.addView('.view-main', {
//   // Because we want to use dynamic navbar, we need to enable it for this view:
//   dynamicNavbar: true
// });

var mainView = myApp.views.create('.view-main');
  
  // var mainView = app.views.create('.view-main');
       
  var mySwiper = myApp.swiper.create('.swiper-container', {
    pagination:'.swiper-pagination',
    paginationClickable: true,
    autoplay: 2500,
    autoplayDisableOnInteraction: false
  });

  var mySwiper = myApp.swiper.create('.swiper-container2', {
    pagination:'.swiper-pagination',
    paginationClickable: true,
    autoplay: 2500,
    autoplayDisableOnInteraction: false
  });

  // ---------------Action click login ---------------------//

 $$('.btnlogin').on('click',function(){
    var formData = app.form.convertToData('#formlogin');
    //alert(JSON.stringify(formData));
    var uname = formData['username'];
    var pwd   = formData['password'];

    app.request.post('http://localhost:81/hospital/loginController/gologin', 
    { user:uname, pass:pwd }, 
    function (data) {
      if(data == 1)
      {
            $$('.login-screen').removeClass('modal-in');
        //window.location.replace("http://localhost:81/F7app/kitchen-sink/main.html");
      }else{
        alert("We are not found.");
      }
    });
});



(function ($) {
 "use strict";
    
$(function(){

    /*---------------------
 menu
--------------------- */
      $(".clickopen").on('click', function(){
        $(".popover-links").slideToggle();
    });
     
    
});
    
    
})(jQuery);    

  