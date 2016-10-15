(function() {

    angular.module('app')
        .controller('BooksController', ["$q", "books", "dataService", "logger", "badgeService", BooksController]);

    function BooksController($q, books, dataService, logger, badgeService) {

        var vm = this;

        vm.appName = books.appName;
        vm.appDesc = books.appDesc;

        vm.getBadge = badgeService.retrieveBadge;

        // dataService.getAllReaders()
        //     .then(getReadersSuccess, getBooksOrReadersError);
        var booksPromise = dataService.getAllBooks();
        var readersPromise = dataService.getAllReaders();


        $q.all([booksPromise, readersPromise])
            .then(getAllDataSuccess)
            .catch(errorCallback)
            .finally(getAllBooksComplete);

        function getAllDataSuccess(dataArray) {
            vm.allBooks = dataArray[0];
            logger.output(dataArray);
            vm.allReaders = dataArray[1];
        }

        // function getReadersSuccess(result) {
        //     vm.allReaders = result;
        // }


        // dataService.getAllBooks()
        //     .then(getBooksSuccess, getBooksOrReadersError, getBooksNotification)
        //     .catch(errorCallback)
        //     .finally(getAllBooksComplete);

        // function getBooksSuccess(books) {
        //     //throw "error in success handler";
        //     vm.allBooks = books;
        // }
        //
        // function getBooksOrReadersError(reason) {
        //     logger.output("Error occured " + reason);
        // }

        function getBooksNotification(notification) {
            logger.output("Progress " + notification);
        }

        function errorCallback(reason) {
            logger.output(reason);
        }

        function getAllBooksComplete(){
            //logger.output("Books download complete");
            logger.output("All data downloaded");
        }

        logger.output("BooksController has been created");
    }
}());