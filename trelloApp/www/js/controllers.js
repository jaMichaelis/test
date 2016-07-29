angular.module('trelloApp.controllers', [])

  .controller('boardsCtrl', function($scope, boardInfoService) {
  $scope.boardInfos = [];

  var success = function(successMsg) {
    for(var i = 0;i < successMsg.length;i++){
      $scope.boardInfos.push({name: successMsg[i].name, id: successMsg[i].id});
    }
  };

  var error = function(errorMsg) {
    console.log(errorMsg);
  };

  $scope.setBoardID = function (bId) {
    boardInfoService.setBoardID(bId);
  };


  Trello.get('/member/me/boards', success, error);
})

  .controller('loginCtrl', function($scope, applicationKeyService) {
    $scope.setAKey = function(){
      $scope.aKey = document.getElementById("input").value;
      applicationKeyService.setappKey($scope.aKey);
    };
    $scope.auth = function(){
      var authenticationSuccess = function() { console.log("Successful authentication"); };
      var authenticationFailure = function() { console.log("Failed authentication"); };
      Trello.authorize({
        type: "popup",
        name: "Trello-App",
        scope: {
          read: true,
          write: true },
        expiration : "never",
        success: authenticationSuccess,
        error: authenticationFailure,
        key: document.getElementById("input").value
      });
    }
  })

  .controller('listsCtrl', function($scope, boardInfoService,$ionicPopup) {

  $scope.boardID = boardInfoService.getBoardID();
  $scope.listInfos = [];

  var success = function(successMsg) {
    console.log(successMsg);
    for(var i = 0;i < successMsg.length;i++){
      $scope.listInfos.push({name: successMsg[i].name, id: successMsg[i].id});
    }
  };

  var error = function(errorMsg) {
    console.log(errorMsg);
  };

    var reload = function (successMsg) {
      console.log(successMsg);

    };

  $scope.deleteList = function(listId){
    Trello.put('lists/'+listId,{closed: true}, reload , error);
  };
  $scope.changeName = function (listId) {

    var promptPopup = $ionicPopup.prompt({
      title: 'Edit',
      template: 'Choose new name: ',
      inputType: 'text',
      inputPlaceholder: 'new name'
    });

    promptPopup.then(function(res) {
      console.log(res);
      Trello.put('lists/'+listId,{name: res}, reload , error);
    });


   };

$scope.createList = function () {
  var promptPopup = $ionicPopup.prompt({
    title: 'New',
    template: 'Choose a name: ',
    inputType: 'text',
    inputPlaceholder: 'Name of new list'
  });

  promptPopup.then(function(res) {
    console.log(res);
    Trello.post('lists/',{name: res, idBoard: $scope.boardID}, reload , error);
  });
};

  Trello.get('/boards/'+($scope.boardID)+'/lists', success, error);


})


