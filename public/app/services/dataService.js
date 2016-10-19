/**
 * Created by vaibhba on 14/Oct/2016.
 */
"use strict";
(function () {
    angular.module("app")
        .factory("dataService", dataService);

    function dataService(logger, $q, $timeout, $http, constants, $cacheFactory) {

        function getAllBooks() {

            return $http({
                method: "GET",
                url: "api/books",
                headers: {
                    "PS-BookLogger-version": constants.APP_VERSION
                },
                transformResponse: transformGetBooks
            }).then(sendResponseData).catch(sendGetBooksError);

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

        function transformGetBooks(data, headersGetter) {
            var transformed = angular.fromJson(data);

            transformed.forEach(function (currentValue, index, array) {
                currentValue.dateDownloaded = new Date();
            });

            console.log(transformed);
            return transformed;
        }

        function sendResponseData(response) {
            return response.data;
        };

        function sendGetBooksError(error) {
            return $q.reject("Error retrieving books " + error.status);
        };

        //get book by bookId
        function getBookById(bookId) {
            return $http({
                method: "GET",
                url: "api/books/" + bookId
            })
                .then(sendResponseData)
                .catch(sendGetBooksError);
        };

        //method to update a book
        function updateBook(book) {
            return $http({
                method: "PUT",
                url: "api/books/" + book.book_id,
                data: book
            })
                .then(updateBookSuccess)
                .catch(updateBookError)
        };

        function updateBookSuccess(response) {
            return "Book Updated " + response.config.data.title;
        }

        function updateBookError(response) {
            return $q.reject("Error updating book (HTTP Status : " + response.status + ")");
        }

        //method to add a new book
        function addBook(book) {
            return $http({
                method: "POST",
                url: "api/books",
                data: book,
                transformRequest: transformPostRequest
            })
                .then(addBookSuccess)
                .catch(addBookError)
        };

        function transformPostRequest(data) {
            data.newBook = true;
            console.log(data);
            return JSON.stringify(data);
        }

        function addBookSuccess(response) {
            return "Book Added " + response.config.data.title;
        }

        function addBookError(response) {
            return $q.reject("Error adding a book (HTTP Status : " + response.status + ")");
        }

        //method to delete a book
        function deleteBook(bookId) {
            return $http({
                method: "DELETE",
                url: "api/books/" + bookId
            })
                .then(deleteBookSuccess)
                .catch(deleteBookError)
        };

        function deleteBookSuccess(response) {
            return "Book Deleted " + response.config.data.title;
        }

        function deleteBookError(response) {
            return $q.reject("Error deleting a book (HTTP Status : " + response.status + ")");
        }


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

        function getUserSummary() {
            var deferred = $q.defer();

            var dataCache = $cacheFactory.get("bookLoggerCache");
            if (!dataCache) {
                dataCache = $cacheFactory("bookLoggerCache");
            }

            var summaryFromCache = dataCache.get("summary");
            if (summaryFromCache) {
                console.log("returning summary from cache");
                deferred.resolve(summaryFromCache);
            }
            else {
                console.log("gathering new summary data");

                var booksPromise = getAllBooks();
                var readersPromise = getAllReaders();

                $q.all(booksPromise, readersPromise)
                    .then(function (booksAndReadersData) {
                        var allBooks = booksAndReadersData[0];
                        var allReaders = booksAndReadersData[1];

                        var grandTotalMinutes = 0;

                        allReaders.forEach(function (currentReader, index, array) {
                            grandTotalMinutes += currentReader.totalMinutesRead;
                        });

                        var summaryData = {
                            bookCount: allBooks.length,
                            readerCount: allReaders.length,
                            grandTotalMinutes: grandTotalMinutes
                        };

                        dataCache.put("summary", summaryData);
                        deferred.resolve(summaryData);
                    });
            }

            return deferred.promise;
        };

        return {
            getAllBooks: getAllBooks,
            getAllReaders: getAllReaders,
            getBookById: getBookById,
            updateBook: updateBook,
            addBook: addBook,
            deleteBook: deleteBook,
            getUserSummary: getUserSummary
        };
    };

    //This is an alternative way to inject external services
    dataService.$inject = ["logger", "$q", "$timeout", "$http", "constants", "$cacheFactory"];
}());