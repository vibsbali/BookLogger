/**
 * Created by owner on 16/10/2016.
 */

(function(){
  angular.module("app")
      .controller("AddBookController", ["dataService", "$log", "$location", AddBookController]);

    function AddBookController(dataService, $log, $location){
        var vm = this;

        vm.newBook = {};

        vm.addBook = function(){
            dataService.addBook(vm.newBook)
                .then(addBookSuccess)
                .catch(addBookError)
        };

        function addBookSuccess(message){
            $log.info(message);
            $location.path("/");
        }

        function addBookError(errorMessage){
            $log.error(errorMessage);
        }
    }
}());
