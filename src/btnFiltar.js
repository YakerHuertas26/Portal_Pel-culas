import cargandoDatosFiltros from "./cargarDatosFiltros";
import cargarPeliculas from "./mostrarDatos";

const btnFiltro= document.getElementById('btn-buscar');




btnFiltro.addEventListener('click',async (e)=>{
    const generoActivo= document.querySelector('#filtro-generos .btn--active');
    const contendorBusqueda= document.querySelector('.sidebar__contenedor')

    if (generoActivo) {
        const datosFiltro= await cargandoDatosFiltros()
    cargarPeliculas(datosFiltro);
    window.scrollTo(0,0)
    }
    if (contendorBusqueda) {
        contendorBusqueda.classList.add('sidebar__contenedor--active')
        if (generoActivo) {
        const datosFiltro= await cargandoDatosFiltros()
    cargarPeliculas(datosFiltro);
    window.scrollTo(0,0)

    setTimeout(()=>{
        contendorBusqueda.classList.remove('sidebar__contenedor--active')
    },500)
    
    }
        }
});
