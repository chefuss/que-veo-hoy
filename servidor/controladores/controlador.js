var conexion = require('../lib/conexionbd');

function mostrarPeliculas(req, res) {
  var anio = req.query.anio;
  var titulo = req.query.titulo;
  var genero = req.query.genero;
  var columna_orden = req.query.columna_orden;
  var tipo_orden = req.query.tipo_orden;
  var pagina = req.query.pagina;
  var cantidad = req.query.cantidad;
  var total;
  var sql = 'select * from pelicula';
  if (titulo && anio && genero) {
    sql += ' where titulo LIKE "%' + titulo + '%" AND anio = "' + anio + '" AND genero_id = "' + genero + '"';
  } else if (!titulo && anio && genero) {
    sql += ' where anio = "' + anio + '" AND genero_id = "' + genero + '"';
  } else if (titulo && !anio && genero) {
    sql += ' where titulo LIKE "%' + titulo + '%" AND genero_id = "' + genero + '"';
  } else if (titulo && anio && !genero) {
    sql += ' where titulo LIKE "%' + titulo + '%" AND anio = "' + anio + '"';
  } else if (titulo) {
    sql += ' where titulo LIKE "%' + titulo + '%"';
  } else if (anio) {
    sql += ' where anio = "' + anio + '"';
  } else if (genero) {
    sql += ' where genero_id = "' + genero + '"';
  }
  //orden
  if (columna_orden) {
    sql += ' ORDER BY ' + columna_orden + ' ' + tipo_orden;
  }
  var sqlNoLimit = sql;
  //cantidad por página.
  //LIMIT  select * from tabla LIMIT 30; //will return only 30 records.
  //OFFSET is the number to start counting. select * from tabla limit 10 offset 15; //will return from 16 and only 10 records;
  //select * from tabla LIMIT 15,10; the first is the offset and the second is the limit.
  var offset = (pagina - 1) * cantidad;
    sql += ' LIMIT ' + offset + ', ' + cantidad;
  conexion.query(sql, function(err, result, fields) {
    if (err) {
      console.log('Hubo un error en la consulta, ', err.message);
      return res.status(404).send('Hubo un error en la consulta');
    }
    conexion.query(sqlNoLimit, function(error, resultado, campos) {
      if (error) {
        console.log('Hubo un error en la consulta, ', error.message);
        return res.status(404).send('Hubo un error en la consulta');
      }
      total = resultado.length;
      var response = {
        'peliculas' : result,
        'total': total
      };
      res.send(JSON.stringify(response));
    });
  });
}
function buscarGeneros(req, res) {
  var sql = 'select * from genero';
  conexion.query(sql, function(err, result, fields) {
    if (err) {
      console.log('Hubo un error en la consulta, ', err.message);
      return res.status(404).send('Hubo un error en la consulta');
    }
    var response = {
      'generos' : result
    };
    res.send(JSON.stringify(response));
  })
}
module.exports = {
  mostrarPeliculas : mostrarPeliculas,
  buscarGeneros : buscarGeneros
}
