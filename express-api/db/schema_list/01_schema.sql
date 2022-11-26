DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS posts CASCADE;
DROP TABLE IF EXISTS comments CASCADE;
DROP TABLE IF EXISTS tvshows CASCADE;
DROP TABLE IF EXISTS user_tvshows CASCADE;
DROP TABLE IF EXISTS watchlist CASCADE;
DROP TABLE IF EXISTS likes CASCADE;


CREATE TABLE users (
    id SERIAL PRIMARY KEY NOT NULL,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    bio TEXT,
    icon_url VARCHAR(255) DEFAULT "https://freesvg.org/img/TV_vintage.png",
    password VARCHAR(255) NOT NULL
);

CREATE TABLE posts (
    id SERIAL PRIMARY KEY NOT NULL,
    text TEXT,
    image VARCHAR(255),
    spoiler BOOLEAN DEFAULT false,
    total_likes INTEGER DEFAULT 0,
    total_comments INTEGER DEFAULT 0,
    user_id INTEGER REFERENCES users(id) NOT NULL ON DELETE CASCADE,
    tvshow_id VARCHAR (255) REFERENCES users(id) NOT NULL ON DELETE CASCADE,
);


CREATE TABLE comments (
    id SERIAL PRIMARY KEY NOT NULL,
    text TEXT NOT NULL,
    user_id INTEGER REFERENCES users(id) NOT NULL ON DELETE CASCADE,
    tvshow_id VARCHAR (255) REFERENCES users(id) NOT NULL ON DELETE CASCADE,
);



CREATE TABLE tvshows (
    id SERIAL PRIMARY KEY NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    image_url VARCHAR(255), NOT NULL
);


CREATE TABLE user_tvshows (
    id SERIAL PRIMARY KEY NOT NULL,
    user_id INTEGER REFERENCES users(id) NOT NULL ON DELETE CASCADE,
    tvshow_id VARCHAR (255) REFERENCES users(id) NOT NULL ON DELETE CASCADE,
);


CREATE TABLE watchlist (
    id SERIAL PRIMARY KEY NOT NULL,
    user_id INTEGER REFERENCES users(id) NOT NULL ON DELETE CASCADE,
    tvshow_id INTEGER REFERENCES users(id) NOT NULL ON DELETE CASCADE,
);

CREATE TABLE likes (
    id SERIAL PRIMARY KEY NOT NULL,
    posts_id INTEGER REFERENCES posts(id) NOT NULL ON DELETE CASCADE,
    user_id INTEGER REFERENCES users(id) NOT NULL ON DELETE CASCADE,
);
