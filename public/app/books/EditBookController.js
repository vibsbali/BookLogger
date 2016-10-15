/**
 * Created by owner on 16/10/2016.
 */
"use strict";

(function(){
    angular.module("app")
        .controller("EditBookController", ["$routeParams", "dataService", EditBookController]);

    function EditBookController($routeParams, dataService) {
        var vm = this;

        dataService.getAllBooks()
            .then(function(books){
                vm.currentBook = books.filter(function(item){
                    return item.book_id == $routeParams.bookId
                })[0];
            });
    }
}());