/**
 * Created by vaibhba on 14/Oct/2016.
 */
"use strict";

(function(){

    function LoggerBase() {

    }

    LoggerBase.prototype.output = function(message){
        console.log("LoggerBase: " + message);
    };

  angular.module("app")
      .service("logger", BookAppLogger);

    function BookAppLogger(){
        LoggerBase.call(this);

        this.logBook = function(book){
            console.log("Book: " + book.title);
        }
    };

    BookAppLogger.prototype = Object.create(LoggerBase.prototype);
}());