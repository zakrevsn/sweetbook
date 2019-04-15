const express = require("express");
const app = express();
const db = require("./db");

app.use(require("body-parser").json());
app.use(express.static("./public"));

app.get("/images", (req, res) => {
    // https://expressjs.com/en/4x/api.html#res.json
    db.getImages().then(results => {
        res.json(results.rows);
    });
});

app.listen(8080, () => {
    console.log("I am listening");
});
