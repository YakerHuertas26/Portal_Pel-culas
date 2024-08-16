import { peliculasPopulares } from "./cargarDatos";
import cargandoDatosFiltros from "./cargarDatosFiltros";
import cargarPeliculas from "./mostrarDatos";

const anterior=  document.getElementById('pagina-anterior');
const siguiente = document.getElementById('pagina-siguiente');


siguiente.addEventListener('click',async (e)=>{
    const paginaActual= document.getElementById('populares').dataset.pagina;

    const opcionFiltro= document.querySelector('#filtro-generos .btn--active')?.dataset.id;
    try {
        const datos= await peliculasPopulares(opcionFiltro,(parseInt(paginaActual)+1));

        document.getElementById('populares').setAttribute('data-pagina',parseInt(paginaActual)+1)
        
        if (!opcionFiltro) {
            // cargo por peliculas o series
        cargarPeliculas(datos);
        window.scrollTo(0,0)
            
        }
        else{
            const porFiltro= await cargandoDatosFiltros(paginaActual+1);
        cargarPeliculas(porFiltro);
        window.scrollTo(0,0)
        }
        
    } catch (error) {
        console.log(error);
        
    }
});
