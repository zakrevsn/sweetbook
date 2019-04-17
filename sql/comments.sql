DROP TABLE IF EXISTS comments;

CREATE TABLE comments(
    id SERIAL PRIMARY KEY,
    username TEXT NOT NULL CHECK (username!=''),
    comment TEXT NOT NULL CHECK (comment!=''),
    image_id INTEGER REFERENCES images(id) NOT NULL UNIQUE,
    timestamp TIMESTAMP DEFAULT NOW()
);
