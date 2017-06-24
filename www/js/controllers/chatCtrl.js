angular.module('chatCtrls', []).controller('chatCtrl', ['$scope', '$rootScope', '$state', 'ChatService', 'UsuarioService', '$ionicLoading',
    function ($scope, $rootScope, $state, ChatService, UsuarioService, $ionicLoading) {

        $ionicLoading.show({
            template: '<ion-spinner icon="bubbles" class="spinner-balanced"></ion-spinner>'
        });

        var salasEnvios = [];
        ChatService.getSalasEnviadas().on('child_added', function (snap) {
            salasEnvios.unshift(snap.val());
            $scope.apply();
            $ionicLoading.hide();
        });

        var salasRecebidas = [];
        ChatService.getSalasRecebidas().on('child_added', function (snap) {
            salasRecebidas.unshift(snap.val());
            $scope.apply();
            $ionicLoading.hide();

        });

        $scope.apply = function () {
            $scope.$apply();
        };

        $scope.salasEnvios = salasEnvios;
        $scope.salasRecebidas = salasRecebidas;

        $scope.abrirChat = function (chat) {

            // O padrão é um objeto, a key do pet, e os dados agrupados.
            var retorno = ChatService.setDados(chat, chat.pet, chat.dono_interessado_pet);

            $state.go('tabs.conversa', {id: chat.dono_interessado_pet, dono: chat.id_dono});
        };

        $scope.deletarSala = function () {

        };

    }]);
