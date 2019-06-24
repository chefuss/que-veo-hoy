CREATE TABLE pelicula (
  id INT NOT NULL AUTO_INCREMENT,
  titulo VARCHAR(100) NOT NULL,
  duracion NUMERIC(5),
  director VARCHAR(400),
  anio NUMERIC(5),
  fecha_lanzamiento DATE,
  puntuacion NUMERIC(2),
  poster VARCHAR(300),
  trama VARCHAR(700),
  PRIMARY KEY (id)
);
