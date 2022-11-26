DROP TABLE IF EXISTS posts CASCADE;

CREATE TABLE posts (
    id SERIAL PRIMARY KEY NOT NULL,
    text TEXT,
    image VARCHAR(255),
    spoiler BOOLEAN DEFAULT false,
    total_likes INTEGER DEFAULT 0,
    total_comments INTEGER DEFAULT 0,
    users_id INTEGER REFERENCES users(id) NOT NULL ON DELETE CASCADE,
    tvshow_id VARCHAR (255) REFERENCES users(id) NOT NULL ON DELETE CASCADE,
    created_at TIMESTAMP NOT NULL
);