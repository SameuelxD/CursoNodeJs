const express = require("express");
const ditto = require("./pokemon/ditto.json");
const PORT = process.env.PORT ?? 1234;

const app = express();
app.use(app.use(express.json()));
app.disable("x-powered-by"); // quitar

// app.use(express.json()) Middleware Express;

app.use((req, res, next) => {
  if (req.method == "POST") return next();
  if (req.headers["content-type"] == "application/json") return next();

  //solo llegan request que son POST y que tienen el header Content-Type: application/json
  let body = "";

  //escuchar el evento data
  req.on("data", (chunk) => {
    body += chunk.toString();
  });
  req.on("end", () => {
    const data = JSON.parse(body);
    data.timestamp = Date.now();
    //res.status(201).json(data);

    //Mutar la request y meter la informacion en el req.body
    req.body = data;
    next();
  });

  //solo llegan request que son POST y que tienen el header Content-Type: application/json

  // trackear la request a la base de datos
  //revisar si el usuario tiene cookies
});
//Request GET
app.get("/pokemon/ditto", (req, res) => {
  /*Cada vez que resiva un Get en esta ruta respondera: */
  // res.status(200).send("<h1>Mi Pagina</h1>"); //Codigo Estado defecto 200

  res.json(ditto);
});

//Request POST
app.post("/pokemon", (req, res) => {
  /*let body = "";

  //escuchar el evento data
  req.on("data", (chunk) => {
    body += chunk.toString();
  });
  req.on("end", () => {
    const data = JSON.parse(body);
    data.timestamp = Date.now();
    //res.status(201).json(data);

    //Mutar la request y meter la informacion en el req.body
    req.body = data;
    next();*/
  res.status(201).json(req.body);
});

//la ultima a la que va a llegar
app.use((req, res) => {
  res.status(404).send("<h1>Error Not Found 404</h1>");
});
app.listen(PORT, () => {
  console.log(`server listening on port http://localhost:${PORT}`);
});

/* 
node --watch express.js

Diferencia entre Nativo y Express
-Express automaticamente detecta cual es el Content-Type de la respuesta que esta utilizando 
-Si no se quita x-powered-by mostrara la tecnologia usada

Proxy, es un proceso que intercepta las response de manera que reedirige el proceso a como se quiere trabajar, las intercepta para cambiarlas y moverlas

Middlewares , es un proceso que se hace antes de cualquier response con diferente metodo , las intercepta pero , se  hace generalmente para todos los metodos de manera que el proceso cubra todo , es una funcion que haga una tarea,mas de codigo

*/
