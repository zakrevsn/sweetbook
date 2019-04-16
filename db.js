var spicedPg = require("spiced-pg");

var dbUrl =
    process.env.DATABASE_URL ||
    "postgres:postgres:postgres@localhost:5432/imageboard";
var db = spicedPg(dbUrl);

exports.getImages = function getImages() {
    let q = `SELECT * FROM images ORDER BY id DESC `;
    return db.query(q);
};

exports.addImage = function addImage(url, username, title, description) {
    let q = `INSERT INTO images(url, username, title, description)
             VALUES ($1, $2, $3, $4) RETURNING *`;
    let params = [url, username, title, description];
    return db.query(q, params);
};
