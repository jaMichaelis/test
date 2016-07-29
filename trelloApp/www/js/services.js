angular.module('trelloApp.services', [])

.service('boardInfoService', [function(){
  var boardID = undefined;

  var setBoardID = function(id) {
    boardID = id;
  };

  var getBoardID = function(){
    return boardID;
  };

  return {
    setBoardID: setBoardID,
    getBoardID: getBoardID
  };


}])
  .service('applicationKeyService', [function(){
  var appKey = undefined;

  var setappKey = function(aKey) {
    appKey = aKey;
  };

  var getappKey = function(){
    return appKey;
  };

  return {
    setappKey: setappKey,
    getappKey: getappKey
  };


}])



