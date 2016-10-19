/**
 * Created by owner on 16/10/2016.
 */
"use strict";

(function () {
    angular.module("app")
        .controller("EditBookController", ["$routeParams", "$cookies", "$cookieStore", "dataService", "$log", "$location", "currentUser", EditBookController]);

    function EditBookController($routeParams, $cookies, $cookieStore, dataService, $log, $location, currentUser) {
        var vm = this;
        vm.currentBook = {};

        dataService.getBookById($routeParams.bookId)
            .then(getBookSuccess)
            .catch(getBookError);

        function getBookSuccess(book) {
            vm.currentBook = book;

            //instead of cookie we are using service
            currentUser.lastEditedBook = vm.currentBook;

            //$cookieStore.put("lastEdited", vm.currentBook);
        }

        function getBookError(error) {
            $log.error(error);
        }

        vm.saveBook = function(){
            dataService.updateBook(vm.currentBook)
                .then(updateBookSuccess)
                .catch(updateBookError)
        };

        function updateBookSuccess(message){
            $log.info(message);
            $location.path("/");
        };

        function updateBookError(errorMessage) {
            $log.error(errorMessage);
        };

        vm.setAsFavorite = function(){
            $cookies.favoriteBook = vm.currentBook.title;
        }
    }
}());