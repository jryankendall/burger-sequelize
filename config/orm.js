var connection = require("./connection");

var orm = {
    selectAll: function(table, cb){
        var queryString = "SELECT * FROM ??";
        var inputsArray = [table];
        connection.query(queryString, inputsArray, function(err, results) {
            if (err) throw err;
            return cb(results);
        })
    },
    selectSome: function(table, condition, value, cb) {
        var queryString = "SELECT * FROM ?? WHERE ?? = ?";
        var inputArray = [table, condition, value];
        connection.query(queryString, inputArray, function(err, results) {
            if (err) throw err;
            return cb(results);
        })
    },
    insertOne: function(table, columnsArr, valuesArr, cb){
        if (columnsArr.length != valuesArr.length) {
            console.log(columnsArr.length + " " + valuesArr.length);
            return console.log("Error in insert code. Columns array length does not match VALUES array length.");
            
        };
        var queryString = `INSERT INTO ??(`;
        for (var i = 0; i < columnsArr.length-1; i++) {
            queryString += `??, `;
        };
        queryString += `??) VALUES(`;
        for (var j = 0; j < valuesArr.length-1; j++) {
            queryString += `?, `;
        };
        queryString += `?)`;
        var inputArray = [table];
        for (var k = 0; k < columnsArr.length; k++) {
            inputArray.push(columnsArr[k]);
        };
        for (var l = 0; l < valuesArr.length; l++) {
            inputArray.push(valuesArr[l]);
        };
        connection.query(queryString, inputArray, function(err, results) {
            console.log(queryString + " " + inputArray);
            
            if (err) throw err;
            return cb(results);
        })
    },
    updateOne: function(table, column, value, changeCol, changeVal, cb){
        var queryString = "UPDATE ?? SET ?? = ? WHERE ?? = ?";
        var queryArray = [table, changeCol, changeVal, column, value];
        connection.query(queryString, queryArray, function(err, results) {
            if (err) throw err;
            return cb(results);
        })
    }
};

module.exports = orm;