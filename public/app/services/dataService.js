/**
 * Created by vaibhba on 14/Oct/2016.
 */
"use strict";
(function () {
    angular.module("app")
        .factory("dataService", dataService);

    function dataService(logger, $q, $timeout, $http, constants) {

        function getAllBooks() {

            return $http({
                method: "GET",
                url: "api/books",
                headers: {
                    "PS-BookLogger-version": constants.APP_VERSION
                }
            }).then(sendResponseData).catch(sendGetBooksError);

            function sendResponseData(response) {
                return response.data;
            };

            function sendGetBooksError(error) {
                return $q.reject("Error retrieving books " + response.statusCode);
            };

            // var books = [
            //     {
            //         "book_id": 1,
            //         "title": "Anna Karenina",
            //         "author": "Leo Tolstoy",
            //         "year_published": "1878"
            //     },
            //     {
            //         "book_id": 2,
            //         "title": "The Things They Carried",
            //         "author": "Tim O'Brien",
            //         "year_published": "1990"
            //     },
            //     {
            //         "book_id": 3,
            //         "title": "Invisible Man",
            //         "author": "Ralph Ellison",
            //         "year_published": "1952"
            //     },
            //     {
            //         "book_id": 58,
            //         "title": "Advanced OS X Programming",
            //         "author": "Mark Dalrymple",
            //         "year_published": "2010"
            //     },
            //     {
            //         "book_id": 59,
            //         "title": "The Cat and the Hat",
            //         "author": "Dr. Seuss",
            //         "year_published": "1950"
            //     },
            //     {
            //         "book_id": 61,
            //         "title": "Green Eggs and Ham",
            //         "author": "Dr. Seuss",
            //         "year_published": "1960"
            //     }
            // ]
            //
            // //create deferred object
            // var deferred = $q.defer();
            // $timeout(function(){
            //     var successful = true;
            //     if(successful){
            //         deferred.notify("50%");
            //         deferred.notify("90%");
            //          deferred.resolve(books);
            //         logger.output(books);
            //     } else {
            //         deferred.reject("Error retrieving books");
            //     }
            // }, 1000);
            //
            // return deferred.promise;


        };

        function getAllReaders() {
            var readers = [
                {
                    reader_id: 1,
                    name: 'Marie',
                    weeklyReadingGoal: 315,
                    totalMinutesRead: 5600
                },
                {
                    reader_id: 2,
                    name: 'Daniel',
                    weeklyReadingGoal: 210,
                    totalMinutesRead: 3000
                },
                {
                    reader_id: 3,
                    name: 'Lanier',
                    weeklyReadingGoal: 140,
                    totalMinutesRead: 600
                }
            ];

            var deferred = $q.defer();

            $timeout(function () {
                deferred.resolve(readers);
            }, 1000);

            return deferred.promise;
        };

        return {
            getAllBooks: getAllBooks,
            getAllReaders: getAllReaders
        };
    };

    //This is an alternative way to inject external services
    dataService.$inject = ["logger", "$q", "$timeout", "$http", "constants"];
}());