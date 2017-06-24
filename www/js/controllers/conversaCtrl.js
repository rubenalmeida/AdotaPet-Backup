angular.module('conversaCtrls', []).controller('conversaCtrl', ['$scope', '$rootScope', '$state', 'UsuarioService', 'ChatService', '$ionicScrollDelegate', '$stateParams',
    function ($scope, $rootScope, $state, UsuarioService, ChatService, $ionicScrollDelegate, $stateParams) {

        $scope.myId = UsuarioService.getUser().userId;
        var chaveChat = $stateParams.id;
        var dono = $stateParams.dono;

        $scope.msg = [];

        var messages = [];
        $scope.messages = [];

        ChatService.getMessages(chaveChat).on('child_added', function (snap) {
            $scope.messages.push(snap.val());
            $ionicScrollDelegate.scrollBottom(true);
            $scope.$apply();

        });


        $scope.sendMessage = function (msg) {

            var retorno = ChatService.enviarMensagem(msg);
            delete $scope.msg;
            $ionicScrollDelegate.scrollBottom(true);

        };




    }]);
