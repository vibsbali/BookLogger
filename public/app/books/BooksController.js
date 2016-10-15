(function() {

    angular.module('app')
        .controller('BooksController', ["books", "dataService", "logger", "badgeService", BooksController]);

    function BooksController(books, dataService, logger, badgeService) {

        var vm = this;

        vm.appName = books.appName;
        vm.appDesc = books.appDesc;

        vm.getBadge = badgeService.retrieveBadge;
        vm.allReaders = dataService.getAllReaders();

        dataService.getAllBooks()
            .then(getBooksSuccess, getBooksError, getBooksNotification)
            .catch(errorCallback)
            .finally(getAllBooksComplete);

        function getBooksSuccess(books) {
            //throw "error in success handler";
            vm.allBooks = books;
        }

        function getBooksError(reason) {
            logger.output("Error occured " + reason);
        }

        function getBooksNotification(notification) {
            logger.output("Progress " + notification);
        }

        function errorCallback(reason) {
            logger.output(reason);
        }

        function getAllBooksComplete(){
            logger.output("Books download complete");
        }

        logger.output("BooksController has been created");
    }
}());