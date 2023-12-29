import mysql from 'mysql2/promise';
//Conexion Base de Datos MySql
const config = {
    host: 'localhost',
    user: 'root',
    port: 3306,
    password: '123456',
    database: 'moviesdb'
};

const connection = await mysql.createConnection(config); //Crea la conexion 

export class MovieModel {
    static async getAll({ genre }) {
        //Verificar los generos
        if (genre) {
            const [genres] = await connection.query("SELECT id,name FROM genre WHERE LOWER(name) = ?;", [genre.toLowerCase()]
            );
            //no genre found , si no esta el genero generos
            if (genres.length === 0) return []
            //si hay generos
            const [{ id, name }] = genres;

            const [movies] = await connection.query(
                'SELECT movie.*, genre.name AS genre_name ' +
                'FROM movie ' +
                'INNER JOIN movie_genres ON movie.id = movie_genres.movie_id ' +
                'INNER JOIN genre ON movie_genres.genre_id = genre.id ' +
                'WHERE genre.id = ?',
                [id]
            );
            return movies.map(movie => ({
                ...movie,
                genre_name: name,
            }));
        }

        //Si no la consulta es para mostrar todas las peliculas
        else {
            const [movies] = await connection.query(
                'SELECT * FROM movie'
            );
            return movies;
        }
    }
    static async getById({ id }) {
        const [movie] = await connection.query('SELECT * FROM movie WHERE id = ?', [id]);
        if (movie.length === 0) return null;
        return movie[0];
    }

    static async create({ input }) {
        const {
            genre: genreInput, // genre is an array
            title,
            year,
            duration,
            director,
            rate,
            poster
        } = input;

        try {
            const [uuidResult] = await connection.query('SELECT UUID() uuid;');
            const [{ uuid }] = uuidResult;

            await connection.query(
                `INSERT INTO movie (id, title, year, director, duration, poster, rate)
                VALUES (?, ?, ?, ?, ?, ?, ?);`,
                [uuid, title, year, director, duration, poster, rate]
            );

            const [movies] = await connection.query(
                `SELECT title, year, director, duration, poster, rate, id
                  FROM movie WHERE id = ?;`,
                [uuid]
            );

            return movies[0];
        } catch (e) {
            // puede enviarle información sensible
            console.error('Error creating movie', e);
            // enviar la traza a un servicio interno
            // sendLog(e)
            throw new Error('Error creating movie');
        }
    }

    static async delete({ id }) {
        const [movie] = await connection.query('DELETE FROM movie WHERE id = ?', [id]);
        if (movie.length === 0) return null;
        return movie[0];
    }
    static async update({ id, input }) {
        try {
            // Verificar la existencia de la película
            const [existingMovie] = await connection.query('SELECT * FROM movie WHERE id = ?;', [id]);

            if (existingMovie.length === 0) {
                throw new Error('Movie not found'); // O maneja el caso según tus necesidades
            }

            const updatedFields = [];
            const updatedValues = [];

            // Construir la consulta SQL dinámicamente
            Object.entries(input).forEach(([key, value]) => {
                if (existingMovie[0][key] !== value) {
                    updatedFields.push(`${key} = ?`);
                    updatedValues.push(value);
                }
            });

            if (updatedFields.length === 0) {
                // No hay campos para actualizar
                return existingMovie[0];
            }

            // Agregar el ID al final del array de valores
            updatedValues.push(id);

            // Construir la consulta completa
            const sql = `UPDATE movie SET ${updatedFields.join(', ')} WHERE id = ?;`;

            // Ejecutar la consulta
            const [updatedMovieResult] = await connection.execute(sql, updatedValues);

            // Verificar si la película se actualizó correctamente
            if (updatedMovieResult.affectedRows === 0) {
                throw new Error('Failed to update movie');
            }

            // Obtener y devolver la película actualizada
            const [updatedMovie] = await connection.query(
                'SELECT * FROM movie WHERE id = ?;',
                [id]
            );

            return updatedMovie[0];
        } catch (error) {
            console.error('Error updating movie', error);
            throw new Error('Error updating movie');
        }
    }

}







/*Instalar la dependencia de MySql con NodeJs 
npm install --save mysql2
*/