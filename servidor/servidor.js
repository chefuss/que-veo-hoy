//paquetes necesarios para el proyecto
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var controlador = require('./controladores/controlador');
var controladorInformacion = require('./controladores/controladorInformacion');
var controladorRecomendar = require('./controladores/controladorRecomendar');

var app = express();

app.use(cors());

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

//los parámetros son: ruta, manejo de datos, y vista.
app.get('/peliculas', controlador.mostrarPeliculas);
app.get('/generos', controlador.buscarGeneros);

//recomendar películas
app.get('/peliculas/recomendacion', controladorRecomendar.recomendar);

//informacion peliculas.
app.get('/peliculas/:id', controladorInformacion.informacion);


//seteamos el puerto en el cual va a escuchar los pedidos la aplicación
var puerto = '8080';


app.listen(puerto, function () {
  console.log( "Escuchando en el puerto " + puerto );
});
