import { CreateApp } from "./app.js";
import { MovieModel } from "./Models/movieSql.js";

CreateApp({ movieModel:MovieModel })

/* node --watch serverMySql.js */