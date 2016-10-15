/**
 * Created by owner on 16/10/2016.
 */
"use strict";

(function () {
    angular.module("app")
        .controller("EditBookController", ["$routeParams", "books", EditBookController]);

    function EditBookController($routeParams, books) {
        var vm = this;

        vm.currentBook = books.filter(function (item) {
            return item.book_id == $routeParams.bookId
        })[0];
    }
}());