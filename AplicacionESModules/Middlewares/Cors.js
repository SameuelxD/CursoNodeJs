import cors from 'cors';

const ACCEPTED_ORIGINS = [
    'http://localhost:8080',
    'http://localhost:1234',
    'https://movies.com',
    'https://midu.dev'
]
export const corsMiddleware = ({ acceptedOrigins=ACCEPTED_ORIGINS } = {}) => cors({
    origin: (origin, callback) => {

        if (acceptedOrigins.includes(origin)) {
            return callback(null, true)
        }

        if (!origin) {
            return callback(null, true)
        }

        return callback(new Error('Not allowed by CORS'))
    }
})

/* Patron de Diseño , patron repetible facil de hacer para solucionar algo en comun , ejemplo Model View Controller (MVC) , y Arquitectura , es aquella de como esta compuesta toda tu aplicacion

Modelo,El modelo representa la logica del negocio , la estructura de datos, las reglas que tiene el negocio de forma interna, es el que se encarga de manipular la informacion en una base de datos o de ver si la integridad de los datos es correcta

Controlador,Es el que actua como intermediario entre el modelo y la vista , es el que responde a las entradas del usuario, y antes de llegar al modelo el controlador es el que se esta encargando de responder ver esas entradas y tratar esas entradas

Vista,Esla mas importante para el usuario , es aquel que le muestra los datos al usuario,que le presenta la informacion, desde la vista vamos a poder la mirar las acciones y el tratamiento de infromacion , como interacturar con la informacion
*/