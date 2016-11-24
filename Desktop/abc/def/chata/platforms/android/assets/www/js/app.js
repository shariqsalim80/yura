// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('app', ['ionic', 'app.controllers', 'app.routes', 'app.directives','app.services','ngCordova',])

.config(function($ionicConfigProvider, $sceDelegateProvider){
  

  $sceDelegateProvider.resourceUrlWhitelist([ 'self','*://www.youtube.com/**', '*://player.vimeo.com/video/**']);

})

.run(function($ionicPlatform,$cordovaPush,$rootScope) {
var androidConfig = {
    "senderID": "536987100036",
    "icon": "icon", // will look for myIcon.png in res/drawable
    "iconColor": "#00AABB"

  };
  // Gcm Configuration for Android
  document.addEventListener("deviceready", function(){
    $cordovaPush.register(androidConfig).then(function(result) {
     // alert('Success ID = ' );
      // Success
    }, function(err) {
      // alert('err ID = ' ); // Error
    })

    $rootScope.$on('$cordovaPush:notificationReceived', function(event, notification) {
        switch(notification.event) {
        case 'registered':
          if (notification.regid.length > 0 ) {
            //alert('registration ID = ' + notification.regid);
             if(window.localStorage.getItem ("regToken") == null){
                  window.localStorage.setItem("regToken",notification.regid);
                        jQuery.ajax({
                        url: "http://123.108.201.76:8118/daqiao0909/register.php?regId="+notification.regid+"&category=A",
                        type:"POST",
                        crossDomain:true,
                        headers:{"Content-Type": "application/json"},

                        success:function(res){
                       // alert("success");
                        },
                        error:function(e){
                               }
                            })
            }
          }
          break;

        case 'message':
          // this is the actual push notification. its format depends on the data model from the push server
         // alert('message = ' + notification.message + ' msgCount = ' + notification.msgcnt);
          $rootScope.dataV=notification.message;

          break;

        case 'error':
          //alert('GCM error = ' + notification.msg);
          break;

        default:
          //alert('An unknown GCM event has occurred');
          break;
      }
    });


    // WARNING: dangerous to unregister (results in loss of tokenID)
    $cordovaPush.unregister(options).then(function(result) {
      // Success!
    }, function(err) {
      // Error
    })

  }, false);

  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });

})