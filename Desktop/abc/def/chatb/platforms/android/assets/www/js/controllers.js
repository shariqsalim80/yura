angular.module('app.controllers', [])
.controller('pageCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {
$scope.data = {
    //If False then swiping will be enabled
    showDelete: true
  };
  
/*  $scope.edit = function(item) {
    alert('Edit Item: ' + item.id);
  };
  $scope.share = function(item) {
    alert('Share Item: ' + item.id);
  };*/
  
/*  $scope.moveItem = function(item, fromIndex, toIndex) {
    $scope.items.splice(fromIndex, 1);
    $scope.items.splice(toIndex, 0, item);


  };*/
 jQuery.ajax({url: "http://123.108.201.76:8118/daqiao0909/get_msg.php",
                                                                      type:"get",crossDomain:true,success:function(res){
                                                                        $scope.items=res.msg;
                                                                         //$scope.$apply();
                                                                         },
                                                                         error:function(e){}
                                                                       });



  
  $scope.onItemDelete = function(item) {
  if(confirm("Are you sure?")){
     jQuery.ajax({
                                url: "http://123.108.201.76:8118/daqiao0909/delete.php?id="+item.id,
                                type:"post",
                                crossDomain:true,
                                success:function(res){
                               // alert("yes"+res.msg);
                               // $scope.items=res.msg;
                                window.location.reload();
                               },
                                error:function(e){

                                       }
                                    });

           //$scope.items.splice($scope.items.indexOf(item), 1);
}
  };

  $scope.readMessage=function(item){
  if(confirm("Are you sure?")){
  jQuery.ajax({
                                    url: "http://123.108.201.76:8118/daqiao0909/read.php?id="+item.id,
                                    type:"post",
                                    crossDomain:true,
                                    success:function(res){
                                   // alert("yes"+res.msg);
                                     window.location.reload();
                                   },
                                    error:function(e){

                                           }
                                        });

               //$scope.items.splice($scope.items.indexOf(item), 1);

    }
  }


}])
 