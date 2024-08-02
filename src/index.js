import { peliculasPopulares } from "./cargarDatos";
import { filtrosGeneros } from "./cargarGeneros";
import cargarPeliculas from "./mostrarDatos";

// mediante una funciión asincrona muestro los datos

const cargarDatos= async ()=>{
    const peliculas=await peliculasPopulares();
    cargarPeliculas(peliculas);
}
cargarDatos();
filtrosGeneros();

