import { peliculasPopulares } from "./cargarDatos";
import { filtrosGeneros } from "./cargarGeneros";
import cargarPeliculas from "./mostrarDatos";
import './cargarSeries_Peliculas.js';
import './filtros.js';
import './btnFiltar.js'
import './cargarDatosFiltros.js'
import './paginacion.js';

// mediante una funciión asincrona muestro los datos

const cargarDatos= async ()=>{
    const peliculas=await peliculasPopulares('movie');
    cargarPeliculas(peliculas);
    filtrosGeneros('movie');

}
cargarDatos();

