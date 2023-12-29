//Manejando el ls asi podemos pasarle la ruta de la carpeta que quisieramos conocer
const fs=require('node:fs/promises');
const folder=process.argv[2] ?? '.'
fs.readdir(folder)
    .then(files => {
        files.forEach(file => {
            console.log(file);
        })
    })
    .catch(err => {
        if(err){
            console.error('Error al leer el directorio: ', err);
            return;
        }
    })