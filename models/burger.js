var orm = require("../config/orm");

var burger = {
    all: function(cb) {
        orm.selectAll("burgers", function(result) {
            cb(result);
        });
    },
    bycolumn: function(col, val, cb) {
        orm.selectSome("burgers", col, val, function(result) {
            cb(result);
        });
    },
    insert: function(cols, vals, cb) {
        orm.insertOne("burgers", cols, vals, function(result) {
            cb(result);
        });
    },
    update: function(col, val, newcol, newval, cb){
        orm.updateOne("burgers", col, val, newcol, newval, function(result) {
            cb(result);
        });
    }
};

module.exports = burger;