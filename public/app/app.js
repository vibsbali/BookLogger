"use strict";
(function () {

    var app = angular.module('app', ["ngRoute"]);

    app.config(["$provide", "constants", "$routeProvider", function ($provide, constants, $routeProvider) {

        $routeProvider
            .when("/", {
                templateUrl: "app/templates/books.html",
                controller: "BooksController",
                controllerAs: "books"
            })
            .when("/AddBook", {
                templateUrl: "app/templates/addbook.html",
                controller: "AddBookController",
                controllerAs: "addBooks"
            })
            .when("/EditBook/:bookId", {
                templateUrl: "app/templates/editbook.html",
                controller: "EditBookController",
                controllerAs: "editBook",
                resolve: {
                    books : function (dataService) {
                        return dataService.getAllBooks()
                    }
                }
            })
            .otherwise("/");


        $provide.provider("books", function () {

            //This is the configuration part
            var includeVersionInTitle = false;
            this.setIncludeVersionInTitle = function (value) {
                includeVersionInTitle = value;
            };

            this.$get = function () {
                var appName = "Books Logger";
                var appDesc = constants.APP_DESCRIPTION;
                var version = "1.0";

                if (includeVersionInTitle) {
                    appName += " " + version;
                }

                return {
                    appName: appName,
                    appDesc: appDesc
                }
            };
        });
    }]);

    //Configuring booksProvider
    app.config(function (booksProvider) {
        booksProvider.setIncludeVersionInTitle(true);
    });

}());