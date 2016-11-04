var expect = require ("chai").expect;
var tools = require("../lib/tools");

describe("printName()", function(){
    it("should print the last name first", function(){
        var results = tools.printName({first:"alex", last:"banks"});

        expect(results).to.equal("banks","alex");

        console.log(results);


    });

});