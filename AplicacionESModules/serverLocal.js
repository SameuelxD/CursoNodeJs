import { CreateApp } from "./app.js";
import { MovieModel } from "./Models/movieModels.js";

CreateApp({ movieModel:MovieModel })

/* node --watch serverLocal.js */