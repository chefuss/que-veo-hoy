CREATE TABLE actor (
  id INT NOT NULL AUTO_INCREMENT,
  nombre VARCHAR(70) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE actor_pelicula (
  id INT NOT NULL AUTO_INCREMENT,
  actor_id INT NOT NULL,
  pelicula_id INT NOT NULL,
  FOREIGN KEY (actor_id) REFERENCES actor(id),
  FOREIGN KEY (pelicula_id) REFERENCES pelicula(id),
  PRIMARY KEY (id)
);
