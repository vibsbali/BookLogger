/**
 * Created by owner on 16/10/2016.
 */
"use strict";

(function () {
    angular.module("app")
        .controller("EditBookController", ["$routeParams", "$cookies", "$cookieStore", "dataService", "$log", "$location", EditBookController]);

    function EditBookController($routeParams, $cookies, $cookieStore, dataService, $log, $location) {
        var vm = this;
        vm.currentBook = {};

        dataService.getBookById($routeParams.bookId)
            .then(getBookSuccess)
            .catch(getBookError);

        function getBookSuccess(book) {
            vm.currentBook = book;
            $cookieStore.put("lastEdited", vm.currentBook);
        }

        function getBookError(error) {
            $log.error(error);
        }

        vm.setAsFavorite = function(){
            $cookies.favoriteBook = vm.currentBook.title;
        }
    }
}());