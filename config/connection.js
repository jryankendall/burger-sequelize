var mysql = require("mysql");
var connection;

var PORT = 3306;

if (process.env.JAWSDB_URL) {
    connection = mysql.createConnection(process.env.JAWSDB_URL);
}
else {
    var login = require("./login");
    connection = mysql.createConnection({
        host: "localhost",
        port: PORT,
        user: "root",
        password: login.password,
        database: "burgers_db"
    });
}

connection.connect();
module.exports = connection;