const express = require("express");
const app = express();
const db = require("./db");
const s3 = require("./s3");

var multer = require("multer");
var uidSafe = require("uid-safe");
var path = require("path");
const config = require("./config");

var diskStorage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, __dirname + "/uploads");
    },
    filename: function(req, file, callback) {
        uidSafe(24).then(function(uid) {
            callback(null, uid + path.extname(file.originalname));
        });
    }
});

var uploader = multer({
    storage: diskStorage,
    limits: {
        fileSize: 2097152
    }
});

app.use(require("body-parser").json());
app.use(express.static("./public"));

//upload images
app.get("/images", (req, res) => {
    // https://expressjs.com/en/4x/api.html#res.json
    db.getImages()
        .then(results => {
            res.json(results.rows);
        })
        .catch(() => {
            res.sendStatus(500);
        });
});

app.post("/upload", [uploader.single("file"), s3.upload], function(req, res) {
    // If nothing went wrong the file is already in the uploads directory
    console.log("req.file", req.file);
    db.addImage(
        config.s3Url + req.file.filename,
        req.body.username,
        req.body.title,
        req.body.description
    )
        .then(results => {
            res.json(results.rows);
        })
        .catch(() => {
            res.sendStatus(500);
        });
});
// open image and get comments
app.get("/comments/:imageId", (req, res) => {
    db.getComments(req.params.imageId)
        .then(results => {
            res.json(results.rows);
        })
        .catch(() => {
            res.sendStatus(500);
        });
});
app.post("/comments/:imageId", (req, res) => {
    db.addComment(req.params.imageId, req.body.username, req.body.comment)
        .then(results => {
            res.json(results.rows);
        })
        .catch(() => {
            res.sendStatus(500);
        });
});

app.listen(8080, () => {
    console.log("I am listening");
});
