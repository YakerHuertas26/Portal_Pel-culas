import { generosPeliculas, ObtenerGenero } from "./cargarDatos";

const cargandoDatosFiltros = async (pagina=1)=>{
    const opcionFiltro= document.querySelector('.main__filtros .btn--active').id;
    const generoIdFiltro=document.querySelector('#filtro-generos .btn--active')?.dataset.id;
    const fechaInicio= document.getElementById('años-min').value ||1950;
    const fechaMax= document.getElementById('años-max').value || 2024;
    
    let url;
    if (opcionFiltro==='movie') {
        url= `https://api.themoviedb.org/3/discover/movie?api_key=c3fbcfa3f23c9ca7c1133c86f1351ca2&include_adult=false&include_video=false&language=es-PER&page=${pagina}&region=PER&release_date.gte=${fechaInicio}&release_date.lte=${fechaMax}&sort_by=popularity.desc&with_genres=${generoIdFiltro}`
    }
    else if(opcionFiltro==='tv'){
        url=`https://api.themoviedb.org/3/discover/tv?api_key=c3fbcfa3f23c9ca7c1133c86f1351ca2&first_air_date.gte=${fechaInicio}&first_air_date.lte=${fechaMax}&include_adult=false&include_null_first_air_dates=false&language=es-PER&page=${pagina}&sort_by=popularity.desc&with_genres=${generoIdFiltro}`
    }

    try {
        const respuesta=await fetch(url);
        const datos= await respuesta.json();
        const peliculas= datos.results;
        const genero= await generosPeliculas();

        peliculas.forEach((element) => {
            let generosPeliculas =ObtenerGenero(element.genre_ids[0], genero);
            let generosPeliculas1 =ObtenerGenero(element.genre_ids[1], genero);
            

            element.genero= generosPeliculas;
            element.genero1= generosPeliculas1;
        });
        
        return peliculas ;
        
        
    } catch (error) {
        console.log(error);
        
    }
    
    
}

export default cargandoDatosFiltros;