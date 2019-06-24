var conexion = require('../lib/conexionbd');

function informacion(req, res) {
  //vamos a solicitar una pelicula con su id.
  var id = req.params.id;
  var sql = 'select * from pelicula join actor_pelicula on pelicula.id = actor_pelicula.pelicula_id join actor on actor.id = actor_pelicula.actor_id join genero on pelicula.genero_id = genero.id where pelicula.id = ' + id;
  conexion.query(sql, function(err, result, fields) {
    if (err) {
      console.log('Hubo un error en la consulta', err.message);
      return res.status(404).send('Hubo un error en la consulta');
    }
    if (result.length == 0) {
      console.log('No se encontró ninguna pelicula con ese id');
      return res.status(404).send('No se encontró ninguna pelicula con ese id');
    } else {
      var response = {
        'pelicula': result[0],
        'actores': result,
        'genero': result[0]
      };
      res.send(JSON.stringify(response));
    }
  })
}
module.exports = {
  informacion : informacion
}
