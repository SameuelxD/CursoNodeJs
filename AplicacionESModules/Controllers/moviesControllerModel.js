//import { MovieModel } from "../Models/movieModels.js";
//import { MovieModel } from "../Models/movieSql.js";
import { validateMovie, validatePartialMovie } from "../Schemas/moviesSchemas.js"

export class MovieControllerModel {
    constructor({ movieModel }) {
        this.movieModel = movieModel;
    }
    getAll = async (req, res) => {
        //res.header("Access-Control-Allow-Origin", "*", "http://localhost:8080"); Solucion a las cors , a sus dominios
        const { genre } = req.query;
        const movies = await this.movieModel.getAll({ genre });
        res.json(movies);
    }
    getById = async (req, res) => {
        const { id } = req.params;
        const movie = await this.movieModel.getById({ id });
        if (movie) return res.json(movie);
        res.status(404).json({ message: "Movie not Found" });
    }
    create = async (req, res) => {
        // const { title, genre, year, director, duration, rate, poster } = req.body;
        const result = validateMovie(req.body);

        if (!result.success) {
            return res.status(400).json({ error: JSON.parse(result.error.message) });
        }

        const newMovie = await this.movieModel.create({ input: result.data });

        res.status(201).json(newMovie); //actualizar la cache del cliente;
    }
    delete = async (req, res) => {
        const { id } = req.params
        const result = await this.movieModel.delete({ id });

        if (result === false) {
            return res.status(404).json({ message: 'Movie not found' })
        }

        return res.json({ message: 'Movie deleted' })
    }
    update = async (req, res) => {
        const result = validatePartialMovie(req.body);
        if (!result.success) {
            return res.status(400).json({ error: JSON.parse(result.error.message) });
        }

        const { id } = req.params;
        const updateMovie = await this.movieModel.update({ id, input: result.data })

        return res.json(updateMovie);
    }
}





