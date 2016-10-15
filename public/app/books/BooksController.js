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
            .then(getBooksSuccess, getBooksError);

        function getBooksSuccess(books) {
            vm.allBooks = books;
        }

        function getBooksError(reason) {
            logger.output("Error occured " + reason);
        }

        logger.output("BooksController has been created");
    };
}());