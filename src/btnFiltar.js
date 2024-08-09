import cargandoDatosFiltros from "./cargarDatosFiltros";
import cargarPeliculas from "./mostrarDatos";

const btnFiltro= document.getElementById('btn-buscar');

btnFiltro.addEventListener('click',async (e)=>{
    const datosFiltro= await cargandoDatosFiltros()
    cargarPeliculas(datosFiltro);
});
