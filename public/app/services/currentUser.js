/**
 * Created by owner on 19/10/2016.
 */
(function(){
  "use strict";

    angular.module("app")
        .factory("currentUser", currentUser);

    function currentUser(){

        var lastEditedBook = {

        };

        return {
            lastEditedBook: lastEditedBook
        };
    }
}());
