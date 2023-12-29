//import { MovieModel } from "../Models/movieModels.js";
import { MovieModel } from "../Models/movieSql.js";
import { validateMovie,validatePartialMovie} from "../Schemas/moviesSchemas.js"

export class MovieController {
    static async getAll(req, res) {
        //res.header("Access-Control-Allow-Origin", "*", "http://localhost:8080"); Solucion a las cors , a sus dominios
        const { genre } = req.query;
        const movies = await MovieModel.getAll({ genre });
        res.json(movies);
    }
    static async getById(req, res) {
        const { id } = req.params;
        const movie = await MovieModel.getById({ id });
        if (movie) return res.json(movie);
        res.status(404).json({ message: "Movie not Found" });
    }
    static async create(req, res) {
        // const { title, genre, year, director, duration, rate, poster } = req.body;
        const result = validateMovie(req.body);

        if (!result.success) {
            return res.status(400).json({ error: JSON.parse(result.error.message) });
        }

        const newMovie = await MovieModel.create({ input: result.data });

        res.status(201).json(newMovie); //actualizar la cache del cliente;
    }
    static async delete(req, res) {
        const { id } = req.params
        const result = await MovieModel.delete({ id });

        if (result === false) {
            return res.status(404).json({ message: 'Movie not found' })
        }

        return res.json({ message: 'Movie deleted' })
    }
    static async update(req, res) {
        const result = validatePartialMovie(req.body);
        if (!result.success) {
            return res.status(400).json({ error: JSON.parse(result.error.message) });
        }

        const { id } = req.params;
        const updateMovie = await MovieModel.update({ id, input: result.data })

        return res.json(updateMovie);
    }
}


