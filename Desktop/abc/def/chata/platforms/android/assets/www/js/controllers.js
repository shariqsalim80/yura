angular.module('app.controllers', [])
  
.controller('pageCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


$scope.messageBody={message:""};



$scope.sendMessage =function(){

/*if(($scope.messageBody.message).trim()==""){
//alert("Please Enter Message");
}else{*/
  jQuery.ajax({
                        url: "http://123.108.201.76:8118/daqiao0909/sendgcm.php?msg=Predefined Test Message",
                        type:"POST",
                        crossDomain:true,
                        success:function(res){
                        alert("Message Sent Successfully");
                        $scope.messageBody={message:""};
                        window.location.href="#/page2"
                        },
                        error:function(e){
                               }
                            })
//}
}
}])
   
.controller('page2Ctrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {

$scope.data = {
    showDelete: false
  };
  
  $scope.edit = function(item) {
    alert('Edit Item: ' + item.id);
  };
  $scope.share = function(item) {
    alert('Share Item: ' + item.id);
  };
  
  $scope.moveItem = function(item, fromIndex, toIndex) {
    $scope.items.splice(fromIndex, 1);
    $scope.items.splice(toIndex, 0, item);
  };
  
  $scope.onItemDelete = function(item) {
    $scope.items.splice($scope.items.indexOf(item), 1);
  };

   setInterval(function(){ jQuery.ajax({url: "http://123.108.201.76:8118/daqiao0909/get_msg.php",
                              type:"get",crossDomain:true,success:function(res){
                                $scope.items=res.msg;
                                 $scope.$apply();
                                 },
                                 error:function(e){}
                               })  }, 1000);

  

}])
 