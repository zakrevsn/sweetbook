var spicedPg = require("spiced-pg");

var dbUrl =
    process.env.DATABASE_URL ||
    "postgres:postgres:postgres@localhost:5432/imageboard";
var db = spicedPg(dbUrl);

exports.getImages = function getImages() {
    let q = `SELECT * FROM images ORDER BY id `;
    return db.query(q);
};
