var express = require("express");
var burger = require("../models/burger");

var router = express.Router();

router.get("/", function(req, res) {
    burger.all(function(data) {
        var handlebarObj = {
            burger: data
        };
        console.log(handlebarObj);
        res.render("index", handlebarObj);
    });
});

router.get("/api/:column/:value", function(req, res) {
    burger.bycolumn(req.params.column, req.params.value, function(data) {
        var handlebarObj = {
            burger: data
        };
        res.json(handlebarObj);
    });
});

router.post("/api/add/", function(req, res) {
    var data = req.body;
    console.log(data);
    var columnArray = ["burger_name", "devoured"];
    var valueArray = [data.name];
    if (data.devoured == true) {
        valueArray.push(1);
    } else
    {
        valueArray.push(0);
    }
    console.log(columnArray);
    console.log(valueArray);
    
    burger.insert(columnArray, valueArray, function(stuff) {
        console.log(stuff);
        res.json(stuff);
    });
});

router.put("/api/devour/:id", function(req, res) {
    var burgerId = req.params.id;
    burger.update("id", burgerId, "devoured", true, function(data) {
        console.log(data);
        res.json(data);
    });
});

module.exports = router;