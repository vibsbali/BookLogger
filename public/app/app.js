"use strict";
(function() {

    var app = angular.module('app', []);

    app.config(["$provide", "constants", function($provide, constants){

        $provide.provider("books", function(){

            //This is the configuration part
            var includeVersionInTitle = false;
            this.setIncludeVersionInTitle = function(value){
                includeVersionInTitle = value;
            };

            this.$get = function(){
                var appName = "Books Logger";
                var appDesc = constants.APP_DESCRIPTION;
                var version = "1.0";

                if(includeVersionInTitle){
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
    app.config(function(booksProvider){
        booksProvider.setIncludeVersionInTitle(true);
    });

}());