/**
 * Created by owner on 16/10/2016.
 */
"use strict";

(function () {
    angular.module("app")
        .controller("EditBookController", ["$routeParams", "books", "$cookies", "$cookieStore", EditBookController]);

    function EditBookController($routeParams, books, $cookies, $cookieStore) {
        var vm = this;

        vm.currentBook = books.filter(function (item) {
            return item.book_id == $routeParams.bookId
        })[0];

        vm.setAsFavorite = function(){
            $cookies.favoriteBook = vm.currentBook.title;
        }

        $cookieStore.put("lastEdited", vm.currentBook);

    }
}());