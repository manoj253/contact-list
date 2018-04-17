var myApp = angular.module('myApp', []);
myApp.controller('AppCtrl', ['$scope', '$http', function($scope, $http) {
    console.log("Hello World from controller");
$scope.contact={
  "name":'',
  "email":'',
  "number":'',
  "city":''
}
var refresh = function(){
  $http.get('/contactlist').then(successCallback, errorCallback);


function successCallback(response){
    //success code
    console.log(response);
    $scope.contactlist = response.data;
}
function errorCallback(error){
    //error code
    console.log(error);
    console.log("GOT ERROR!")
}
};

refresh();

$scope.addContact = function(){
  console.log($scope.contact);//will add a contact
  // $http.post('/contactlist',$scope.contact).success(function(response){
  //   console.log(response);
  // })
  function check() {
    console.log("Here is your contact")
    console.log($scope.contact)
    if($scope.contact=={})
    alert("Don't you have a name and email ? C'mon")
    else if($scope.contact.name=="")
    alert("Please enter your name")
    else if($scope.contact.email=="")
    alert("Email is epmty...<nudge>")
    else if($scope.contact.number=="")
    alert("I need number as well :(")
    else return true;

  }
  if(check()){
    $http.post('/contactlist',$scope.contact).then(contactlistsuccess,contactlisterr);
    function contactlistsuccess() {
      $scope.contact={
        "name":'',
        "email":'',
        "number":'',
        "city":''
      }
    }
    function contactlisterr() {
    }
    refresh();
  }
 // this sends input data to server
  //.success(function(response)), is used to test data receive from DB
};
$scope.remove = function(id){
  console.log(id);
  $http.delete('/contactlist/' + id).then(contactlistsuccess,contactlisterr);
  function contactlistsuccess(){
    }
    function contactlisterr(){
      }
      refresh();
};
$scope.edit = function(id){
  console.log(id);
  $http.get('/contactlist/' + id).then(contactlistsuccess,contactlisterr);
  function contactlistsuccess(res){
          console.log(res)
          $scope.contact = res.data;
        }
    function contactlisterr(){
      }
      };
  $scope.update = function(){
    console.log($scope.contact._id);
    $http.put('/contactlist/' + $scope.contact._id, $scope.contact).then(contactlistsuccess,contactlisterr);
    function contactlistsuccess(){
      refresh();
      $scope.contact={
        "name":'',
        "email":'',
        "number":'',
        "city":''
      }
      }
      function contactlisterr(){
        }
  };
  $scope.deselect = function(){
    $scope.contact = "";
  }
}])
