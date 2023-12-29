import express, { json } from 'express'; // require -> commonJS
import { CreateMovieRouter } from './Routes/moviesRoutes.js';
import { corsMiddleware } from './Middlewares/Cors.js';
//import { MovieModel } from './Models/movieSql.js';
//Lectura JSON ESModules
// import fs from 'node:fs'
// const movies = JSON.parse(fs.readFileSync('./movies.json','utf-8'))

//Recomendado

//const movies=readJSON('./movies.json');

// import en el futuro
// import movies from './movies.json' with { type: 'json' }

export const CreateApp = ({ movieModel }) => {
  const app = express();
  app.use(json());
  app.use(corsMiddleware());
  app.disable("x-powered-by"); // deshabilitar el header X-Powered-By: Express

  app.use('/movies', CreateMovieRouter({ movieModel }));

  const PORT = process.env.PORT ?? 1234;

  app.listen(PORT, () => {
    console.log(`server listening on port http://localhost:${PORT}`);
  });

}

// métodos normales: GET/HEAD/POST
// métodos complejos: PUT/PATCH/DELETE

// CORS PRE-Flight
// OPTIONS

// app.get("/", (req, res) => {
//   res.json({ message: "hola mundo" });
// });

/*
app.get("/movies", (req, res) => {
  res.json(movies);
});
*/
//Todos los recursos que sean de Movies se identifica con /movies , Todas las peliculas de cada genero

/*
node --watch app.js

npm install zod -E

Idempotencia, propiedad de realizar una accion determinada varias veces y aun asi conseguir siempre el mismo resultado que se obtendria al hacerlo una vez mas

POST,Crea un nuevo elemento/recurso en el servidor http://localhost:1234/movies , No es IDEMPOTENTE , put actualiza totalmente todos los elementos que hallan

PUT,Actualiza totalmente un elemento ya existente o lo crea si no existe http://localhost:1234/movies/c8a7d63f-3b04-44d3-9d95-8782fd7dcfaf , Si es IDEMPOTENTE

PATCH,Actualiza parcialmente un elemento/recurso http://localhost:1234/movies/c8a7d63f-3b04-44d3-9d95-8782fd7dcfaf , En principio siempre es IDEMPOTENTE pero depende en ciertos casos puede cambiar , patch actualiza por partes elementos 

npx servor ./web , Dominio estatico

problemas con los dominios , estamos usando el 1234  , pero al crear un dominio local se usa el 8080 , falta una cabecera

Instalar el Modulo Cors
npm install cors

*/
