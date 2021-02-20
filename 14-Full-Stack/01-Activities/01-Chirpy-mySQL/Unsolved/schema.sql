CREATE DATABASE chirpy;
USE chirpy;

CREATE TABLE `chirps` (

  -- TABLE CODE TO GO HERE
  id INTEGER AUTO_INCREMENT,
  author VARCHAR(100),
  chirp VARCHAR(100),
  time_created DATE,
  PRIMARY KEY (id)
);