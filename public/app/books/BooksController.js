(function() {

    angular.module('app')
        .controller('BooksController', ["$q", "books", "dataService", "logger", "badgeService", "$cookies", "$cookieStore", "$log", BooksController]);

    function BooksController($q, books, dataService, logger, badgeService, $cookies, $cookieStore, $log) {

        $log.log("logging with log");
        $log.info("info with log");
        $log.warn("warn with log");
        $log.error("error with log");
        $log.debug("debug with log");

        var vm = this;

        vm.appName = books.appName;
        vm.appDesc = books.appDesc;

        vm.getBadge = badgeService.retrieveBadge;
        vm.favoriteBook = $cookies.favoriteBook;
        vm.lastEdited = $cookieStore.get("lastEdited");


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