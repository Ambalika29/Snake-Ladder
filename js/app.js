angular.module('snakeLadder', [])
    .controller('MainCtrl', MainCtrl)
    .controller('SnlBoardCtrl', SnlBoardCtrl)
    .component('landingPage', {
        bindings: {},
        templateUrl: '../templates/landing-page.html',
        controller: LandingPageCtrl
    })
    .component('snlBoard', {
        bindings: {},
        templateUrl: '../templates/snl-board.html',
        controller: SnlBoardCtrl
    })
    .factory('SettingsFactory', SettingsFactory);

MainCtrl.$inject = ['$scope'];

function MainCtrl($scope) {
    $scope.hello = 'Snake and Ladder';
}

SnlBoardCtrl.$inject = ['$scope'];

function SnlBoardCtrl($scope){
    $scope.boards = [];
    setBoard();

    function setBoard() {
        for (var i = 0; i<100; i++) {
            $scope.boards.push({
                value: i+1,
                iseven: ((i/10)%2) === 0 ? true : false
            });
        }

        console.log($scope.boards);
    }
}

LandingPageCtrl.$inject = ['$scope', 'SettingsFactory'];

function LandingPageCtrl($scope, SettingsFactory){
    $scope.showSelect = false;
    $scope.players = [];

    $scope.multiPlayerOptions = {
        options: [2, 3, 4],
        selected: 2
    };

    $scope.getPlayerNumArray = function(){
        return new Array($scope.multiPlayerOptions.selected);
    };

    $scope.setPlayerCount = function(count){
        $scope.showSelect = false;
        SettingsFactory.playerCount = count;
    };

    $scope.setMultiplePlayer = function (){
        $scope.showSelect = true;
    };

    $scope.savePlayerInfo = function (){
        SettingsFactory.savePlayers($scope.players);
    };

    $scope.resetForm = function (){
        $scope.players.length = 0;
    };

}

// SettingsFactory.$inject = ['$scope'];

function SettingsFactory(){
    var settings = {
        playerCount: 1,
        players: [],
        savePlayers: function(scopePlayers){
            this.players.length = 0;
            angular.forEach(scopePlayers, function(player){
                this.push({
                    name: player,
                    currentPoition: -1,
                    numThrows: 0,
                    numSix: 0,
                    numLadders: 0,
                    numSnakes: 0,
                    isComp: false
                });
            }, this.players);
        }
    };
    return settings;
}
