const http = require("node:http");
const fs = require('node:fs');
const desiredPort = process.env.PORT ?? 1234; //Variables de Entorno
const processRequest = (req, res) => {
  //Cabeceras
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  if (req.url == "/") {
    res.statusCode = 200; // OK
    res.end("<h1> Bienvenido a la pagina de inicio </h1>");
  } else if (req.url == "/imagen.png") {
    fs.readFile("./infinito.png", (err, data) => {
      if (err) {
        res.statusCode = 500;
        res.end("<h1> 500 Internal Server Error </h1>");
      } else {
        res.setHeader("Content-Type", "image/png");
        res.end(data);
      }
    });
  } else if (req.url == "/contacto") {
    res.statusCode = 200;
    res.end("<h1> Contacto </h1>");
  } else {
    res.statusCode = 404;
    res.end("<h1> Error 404 Not Found </h1>");
  }
};

const server = http.createServer(processRequest); //Creando el servidor

server.listen(desiredPort, () => {
  console.log(`server listening on port http://localhost:${desiredPort}`);
});

/*
server.listen(0, () => {
    console.log(`server listening on port http://localhost:${server.address().port}`); localhost:server.address().port
})
k
Resetear pagina
node --watch http2.js

Dependencia nodemon - npm
npm install nodemon -D
nodemon http2.js
npm run dev

Buffer Node JS
Es una clase global que se usa para trabajar con datos binarios, lo guarda en la memoria fisica de manera temporal
*/
