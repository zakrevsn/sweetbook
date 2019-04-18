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

exports.addComment = function addComment(imageId, username, comment) {
    let q = `INSERT INTO comments(image_id, username, comment)
             VALUES ($1, $2, $3) RETURNING *`;
    let params = [imageId, username, comment];
    return db.query(q, params);
};
exports.getComments = function getComments(imageId) {
    let q = `SELECT * FROM comments WHERE image_id = $1 ORDER BY id DESC `;
    let params = [+imageId || null];
    return db.query(q, params);
};

// exports.getImage = function getImage(id) {
//     let q = `SELECT * FROM images WHERE id=$1 `;
//     let params = [id];
//     return db.query(q, params);
// };
