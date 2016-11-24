// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('app', ['ionic', 'app.controllers', 'app.routes', 'app.directives','app.services','ngCordova',])
.directive('clickForOptionsWrapper', [function() {
                                     	return {
                                     		restrict: 'A',
                                     		controller: function($scope) {
                                     			this.closeOptions = function() {
                                     				$scope.$broadcast('closeOptions');
                                     			}
                                     		}
                                     	};
                                     }]).directive('clickForOptions', ['$ionicGesture', function($ionicGesture) {
                                     	return {
                                     		restrict: 'A',
                                     		scope: false,
                                     		require: '^clickForOptionsWrapper',
                                     		link: function (scope, element, attrs, parentController) {
                                     			// A basic variable that determines wether the element was currently clicked
                                     			var clicked;

                                     			// Set an initial attribute for the show state
                                     			attrs.$set('optionButtons', 'hidden');

                                     			// Grab the content
                                     			var content = element[0].querySelector('.item-content');

                                     			// Grab the buttons and their width
                                     			var buttons = element[0].querySelector('.item-options');

                                     			var closeAll = function() {
                                     				element.parent()[0].$set('optionButtons', 'show');
                                     			};

                                     			// Add a listener for the broadcast event from the parent directive to close
                                     			var previouslyOpenedElement;
                                     			scope.$on('closeOptions', function() {
                                     				if (!clicked) {
                                     					attrs.$set('optionButtons', 'hidden');
                                     				}
                                     			});

                                     			// Function to show the options
                                     			var showOptions = function() {
                                     				// close all potentially opened items first
                                     				parentController.closeOptions();

                                     				var buttonsWidth = buttons.offsetWidth;
                                     				ionic.requestAnimationFrame(function() {
                                     					// Add the transition settings to the content
                                     					content.style[ionic.CSS.TRANSITION] = 'all ease-out .25s';

                                     					// Make the buttons visible and animate the content to the left
                                     					buttons.classList.remove('invisible');
                                     					content.style[ionic.CSS.TRANSFORM] = 'translate3d(-' + buttonsWidth + 'px, 0, 0)';

                                     					// Remove the transition settings from the content
                                     					// And set the "clicked" variable to false
                                     					setTimeout(function() {
                                     						content.style[ionic.CSS.TRANSITION] = '';
                                     						clicked = false;
                                     					}, 250);
                                     				});
                                     			};

                                     			// Function to hide the options
                                     			var hideOptions = function() {
                                     				var buttonsWidth = buttons.offsetWidth;
                                     				ionic.requestAnimationFrame(function() {
                                     					// Add the transition settings to the content
                                     					content.style[ionic.CSS.TRANSITION] = 'all ease-out .25s';

                                     					// Move the content back to the original position
                                     					content.style[ionic.CSS.TRANSFORM] = '';

                                     					// Make the buttons invisible again
                                     					// And remove the transition settings from the content
                                     					setTimeout(function() {
                                     						buttons.classList.add('invisible');
                                     						content.style[ionic.CSS.TRANSITION] = '';
                                     					}, 250);
                                     				});
                                     			};

                                     			// Watch the open attribute for changes and call the corresponding function
                                     			attrs.$observe('optionButtons', function(value){
                                     				if (value == 'show') {
                                     					showOptions();
                                     				} else {
                                     					hideOptions();
                                     				}
                                     			});

                                     			// Change the open attribute on tap
                                     			$ionicGesture.on('tap', function(e){
                                     				clicked = true;
                                     				if (attrs.optionButtons == 'show') {
                                     					attrs.$set('optionButtons', 'hidden');
                                     				} else {
                                     					attrs.$set('optionButtons', 'show');
                                     				}
                                     			}, element);
                                     		}
                                     	};
                                     }])


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
                        url: "http://123.108.201.76:8118/daqiao0909/register.php?regId="+notification.regid+"&category=B",
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
         window.location.reload();

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