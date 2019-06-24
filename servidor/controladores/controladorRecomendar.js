var conexion = require('../lib/conexionbd');

function recomendar(req, res) {
  //los datos que vendran en la solicitud - queries.
  var genero = req.query.genero;
  var anio_inicio = req.query.anio_inicio;
  var anio_fin = req.query.anio_fin;
  var puntuacion = req.query.puntuacion;
  var pelicula_actual = req.query.pelicula_actual;

  //la request a la base de datos tiene que:
  // consultar a pelicula y genero.
  // establecemos el inicio de nuestra consulta.
    //vamos a seleccionar las columnas que queremos traer, ya que si dejo *, al hacer join entre las tablas pelicula y genero, se duplica el valor de id (quedan dos columnas con el mismo nombre id) y da un resultado erroneo al hacer click en mostrar más.

  var sql = 'select pelicula.id, pelicula.titulo, pelicula.trama, pelicula.poster, pelicula.anio, pelicula.puntuacion, genero.nombre_genero from pelicula inner join genero on pelicula.genero_id = genero.id';

  //si está el query de genero, y anio_inicio y anio_fin y puntuacion
  if (genero || anio_inicio || anio_fin || puntuacion) {
    sql += ' where';
    if (genero) {
      sql += ' genero.nombre_genero = "' + genero + '"';
    }
    if (anio_inicio) {
      if (!genero) {
        sql += ' pelicula.anio >= ' + anio_inicio;
      } else {
        sql += ' AND pelicula.anio >= ' + anio_inicio;
      }
    }
    if (anio_fin) {
      if (!genero && !anio_inicio) {
        sql += ' pelicula.anio <= ' + anio_fin;
      } else {
        sql += ' AND pelicula.anio <= ' + anio_fin;
      }
    }
    if (puntuacion) {
      if (!genero && !anio_inicio && !anio_fin) {
        sql += ' pelicula.puntuacion >= ' + puntuacion;
      } else {
        sql += ' AND pelicula.puntuacion >= ' + puntuacion;
      }
    }
  }
  conexion.query(sql, function(err, result, fields) {
    if (err) {
      console.log('Hubo un erroressssss en la consulta', err.message);
      return res.status(404).send('Hubo un error en la consulta');
    }
    if (result.length == 0) {
      console.log('No se encontró ninguna pelicula con esos datos');
      return res.status(404).send('No se encontró ninguna pelicula con esos datos');
    } else {
      var response = {
        'peliculas': result
      }
      res.send(JSON.stringify(response));
    }
  })
}
module.exports = {
  recomendar : recomendar
}
