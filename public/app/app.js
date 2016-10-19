"use strict";
(function () {

    var app = angular.module('app', ["ngRoute", "ngCookies"]);

    app.config(["$provide", "constants", "$routeProvider", "$logProvider", "$httpProvider", function ($provide, constants, $routeProvider, $logProvider, $httpProvider) {

        $logProvider.debugEnabled(true);

        $httpProvider.interceptors.push("bookLoggerInterceptor");

        $routeProvider
            .when("/", {
                templateUrl: "app/templates/books.html",
                controller: "BooksController",
                controllerAs: "books"
            })
            .when("/AddBook", {
                templateUrl: "app/templates/addbook.html",
                controller: "AddBookController",
                controllerAs: "bookAdder"
            })
            .when("/EditBook/:bookId", {
                templateUrl: "app/templates/editbook.html",
                controller: "EditBookController",
                controllerAs: "editBook"
                // resolve: {
                //     books: function (dataService) {
                //         return dataService.getAllBooks()
                //     }
                // }
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

        $provide.decorator("$log", ["$delegate", "books", logDecorator]);

        function logDecorator($delegate, books){
            function log(message) {
                message += " - " + new Date() + " (" + books.appName + " )";
                $delegate.log(message);
            };

            function info(message) {
                $delegate.info(message);
            };

            function warn(message) {
                $delegate.warn(message);
            };

            function error(message) {
                $delegate.error(message);
            };

            function debug(message) {
                message += " - " + new Date() + " (" + books.appName + " )";
                $delegate.debug(message);
            };

            //adding additional properties
            function awesome(message){
                message += " - Awesome";
                $delegate.debug(message)
            };

            return {
                log: log,
                info: info,
                warn: warn,
                error: error,
                debug: debug,
                awesome: awesome
            };
        };
    }]);

    //Configuring booksProvider
    app.config(function (booksProvider) {
        booksProvider.setIncludeVersionInTitle(true);
    });

}());