//import { randomUUID } from 'node:crypto';
import { Router } from "express";
//import { MovieController } from "../Controllers/moviesControllers.js";
//import { MovieModel } from "../Models/movieSql.js";
import { MovieControllerModel } from "../Controllers/moviesControllerModel.js";

//const movies = readJSON('./movies.json');

export const CreateMovieRouter = ({ movieModel }) => {
    const moviesRouter = Router();

    const ControllerModel = new MovieControllerModel({ movieModel })

    moviesRouter.get('/', ControllerModel.getAll)

    moviesRouter.get('/:id', ControllerModel.getById)

    moviesRouter.post('/', ControllerModel.create);

    moviesRouter.delete('/:id', ControllerModel.delete);

    moviesRouter.patch("/:id", ControllerModel.update);

    return moviesRouter;

}
