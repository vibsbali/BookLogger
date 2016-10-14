"use strict";
(function() {

    var app = angular.module('app', []);

    app.config(function($provide){

        $provide.provider("books", function(){

            //This is the configuration part
            var includeVersionInTitle = false;
            this.setIncludeVersionInTitle = function(value){
                includeVersionInTitle = value;
            };

            this.$get = function(){
                var appName = "Books Logger";
                var appDesc = "Track which books you read";
                var version = "1.0";

                if(includeVersionInTitle){
                    appName += " " + version;
                }

                return {
                    appName: appName,
                    addDesc: appDesc
                }
           };
        });
    });

    //Configuring booksProvider
    app.config(function(booksProvider){
        booksProvider.setIncludeVersionInTitle(true);
    });

}());