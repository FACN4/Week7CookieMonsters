BEGIN;

DROP TABLE IF EXISTS users,rooms,messages,colour,users_in_room;

CREATE TABLE colour(
  id SERIAL PRIMARY KEY,
  colour varchar(15) NOT NULL
);

CREATE TABLE users(
  id SERIAL PRIMARY KEY,
  name varchar(20) UNIQUE NOT NULL,
  password varchar(80) NOT NULL,
  photo_url varchar(255) NOT NULL,
  is_admin boolean,
  name_colour_id INTEGER REFERENCES colour(id)
);

CREATE TABLE messages(
  id SERIAL PRIMARY KEY,
  date DATE NOT NULL,
  text TEXT NOT NULL,
  user_id INTEGER REFERENCES users(id)
);

CREATE TABLE rooms(
  id SERIAL PRIMARY KEY,
  name varchar(30) NOT NULL
);


CREATE TABLE users_in_room(
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  room_id INTEGER REFERENCES rooms(id),
  is_user_admin boolean
);

COMMIT;
