'use strict';

// Crear una función asincorna para realizar una petición a la API 

const peliculasPopulares= async (tipo='movie', pagina=1)=>{
        const filtro= tipo==='movie'?'movie':'tv';

        const url= `https://api.themoviedb.org/3/${filtro}/popular?api_key=c3fbcfa3f23c9ca7c1133c86f1351ca2&language=es-PER&page=${pagina}`;
        
        const peticion=await fetch(url); //consulta a la API mediante el endpoint 
        const datos= await peticion.json(); //guardo los datos
        const peliculas= datos.results;
        const genero= await generosPeliculas();
        

        peliculas.forEach((element) => {
                let generosPeliculas =ObtenerGenero(element.genre_ids[0], genero);
                let generosPeliculas1 =ObtenerGenero(element.genre_ids[1], genero);
                let generosPeliculas2 =ObtenerGenero(element.genre_ids[2], genero);

                element.genero= generosPeliculas;
                element.genero1= generosPeliculas1;
                element.genero2= generosPeliculas2;
        });

        return peliculas ;
        
};

// crea una función asincrona para obtener los géneros
const generosPeliculas =async (tipo='movie')=>{
        const filtro= tipo==='movie'? 'movie':'tv';
        const url= `https://api.themoviedb.org/3/genre/${filtro}/list?api_key=c3fbcfa3f23c9ca7c1133c86f1351ca2&language=es`;

        const peticion=await fetch(url);
        const datos=  await peticion.json();
        
        return datos.genres;
};

// función para optener el 1er género
const ObtenerGenero= (idGenero, generos)=>{
        let nombreGenero;
        generos.forEach((element) => {
                if (idGenero===element.id) {
                        nombreGenero=element.name;
                }
        });
        return nombreGenero;
};

const contenedorFiltroGenero= document.querySelector('#filtro-generos');

const filtrosGeneros= async (tipo)=>{
    const genero= await generosPeliculas(tipo);
    contenedorFiltroGenero.innerHTML='';
    genero.forEach(element => {
        const btn= document.createElement('button');
        btn.classList.add('btn');
        btn.innerText=element.name;
        btn.setAttribute('data-id',element.id);
        contenedorFiltroGenero.append(btn);
    });
    
};

// creo una función para cargar y mostar los datos en el DOM 

const contenedor$1= document.querySelector('#populares .main__grid');

const cargarPeliculas= (datos)=>{
    contenedor$1.innerHTML='';
    datos.forEach((element) => {
        // genero undefile
        const nuevoGenero1= element.genero===undefined? '':element.genero;
        const nuevoGenero2= element.genero1===undefined? '':element.genero1;
        const nuevoGenero3= element.genero2===undefined? '':element.genero2;
        
        const plantillaHTML= `
        <div class="main__media" data-id=${element.id}>
            <a href="#" class="main__media-thumb">
                <img class="main__media-img" src='https://image.tmdb.org/t/p/w500/${element.backdrop_path}' alt="" />
            </a>
            <p class="main__media-titulo">${element.title||element.name} </p>
            <div class='main__mediaGenero'>
                <p class="main__media-genero">${nuevoGenero1} </p>
                <p class="main__media-genero">${nuevoGenero2} </p>
                <p class="main__media-genero">${nuevoGenero3} </p>
            </div>
            <p class="main__media-fecha">${element.release_date||element.first_air_date} </p>
        </div>        
    `;
        // inserta la plantilla en el contenedor 
        contenedor$1.insertAdjacentHTML('beforeend',plantillaHTML);
        
    });
    
};

const filtroSeriesTv = document.getElementById('tv');
const filtroPeliculas= document.getElementById('movie');

// btn peliculas
filtroPeliculas.addEventListener('click', async (e)=>{
    e.preventDefault();
    filtrosGeneros('movie');
    const peliculas=await peliculasPopulares('movie');
    cargarPeliculas(peliculas);

    document.querySelector('#populares .main__titulo').innerText='Peliculas Populares';

    filtroSeriesTv.classList.remove('btn--active');
    filtroPeliculas.classList.add('btn--active');
});



// btn series
filtroSeriesTv.addEventListener('click',async (e)=>{
    e.preventDefault();
    filtrosGeneros('tv');

    const series=await peliculasPopulares('tv');
    cargarPeliculas(series);
    

    document.querySelector('#populares .main__titulo').innerText='Series Populares';

    filtroPeliculas.classList.remove('btn--active');
    filtroSeriesTv.classList.add('btn--active');
});

// const cargarSeries= (datos)=>{
//     const contenedor= document.querySelector('#populares .main__grid');
//     contenedor.innerHTML=''; 
//     datos.forEach((element) => {
//         const genero= element.genero===undefined ?'...':element.genero;
        
//         const plantillaHTML= `
//         <div class="main__media">
//             <a href="#" class="main__media-thumb">
//                 <img class="main__media-img" src='https://image.tmdb.org/t/p/w500/${element.backdrop_path}' alt="" />
//             </a>
//             <p class="main__media-titulo">${element.name} </p>
//             <p class="main__media-genero">${genero} </p>
//             <p class="main__media-fecha">${element.first_air_date
//             } </p>    
//     `;
//         // inserta la plantilla en el contenedor 
//         contenedor.insertAdjacentHTML('beforeend',plantillaHTML);
//     });
    
// }

const filtrosContenedor= document.getElementById('filtro-generos');

filtrosContenedor.addEventListener('click',(e)=>{
    e.preventDefault();

    if (e.target.closest('button')) {
        // si existe un btn con la clase activa lo elimino
        filtrosContenedor.querySelector('.btn--active')?.classList.remove('btn--active');

        // activo la clase activo 
        e.target.classList.add('btn--active');
        
    }
});

const cargandoDatosFiltros = async (pagina=1)=>{
    const opcionFiltro= document.querySelector('.main__filtros .btn--active').id;
    const generoIdFiltro=document.querySelector('#filtro-generos .btn--active')?.dataset.id;
    const fechaInicio= document.getElementById('años-min').value ||1950;
    const fechaMax= document.getElementById('años-max').value || 2024;
    
    let url;
    if (opcionFiltro==='movie') {
        url= `https://api.themoviedb.org/3/discover/movie?api_key=c3fbcfa3f23c9ca7c1133c86f1351ca2&include_adult=false&include_video=false&language=es-PER&page=${pagina}&region=PER&release_date.gte=${fechaInicio}&release_date.lte=${fechaMax}&sort_by=popularity.desc&with_genres=${generoIdFiltro}`;
    }
    else if(opcionFiltro==='tv'){
        url=`https://api.themoviedb.org/3/discover/tv?api_key=c3fbcfa3f23c9ca7c1133c86f1351ca2&first_air_date.gte=${fechaInicio}&first_air_date.lte=${fechaMax}&include_adult=false&include_null_first_air_dates=false&language=es-PER&page=${pagina}&sort_by=popularity.desc&with_genres=${generoIdFiltro}`;
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
    
    
};

const btnFiltro= document.getElementById('btn-buscar');




btnFiltro.addEventListener('click',async (e)=>{
    const generoActivo= document.querySelector('#filtro-generos .btn--active');
    const contendorBusqueda= document.querySelector('.sidebar__contenedor');

    if (generoActivo) {
        const datosFiltro= await cargandoDatosFiltros();
    cargarPeliculas(datosFiltro);
    window.scrollTo(0,0);
    }
    if (contendorBusqueda) {
        contendorBusqueda.classList.add('sidebar__contenedor--active');
        if (generoActivo) {
        const datosFiltro= await cargandoDatosFiltros();
    cargarPeliculas(datosFiltro);
    window.scrollTo(0,0);

    setTimeout(()=>{
        contendorBusqueda.classList.remove('sidebar__contenedor--active');
    },500);
    
    }
        }
});

document.getElementById('pagina-anterior');
const siguiente = document.getElementById('pagina-siguiente');


siguiente.addEventListener('click',async (e)=>{
    const paginaActual= document.getElementById('populares').dataset.pagina;

    const opcionFiltro= document.querySelector('#filtro-generos .btn--active')?.dataset.id;
    try {
        const datos= await peliculasPopulares(opcionFiltro,(parseInt(paginaActual)+1));

        document.getElementById('populares').setAttribute('data-pagina',parseInt(paginaActual)+1);
        
        if (!opcionFiltro) {
            // cargo por peliculas o series
        cargarPeliculas(datos);
        window.scrollTo(0,0);
            
        }
        else {
            const porFiltro= await cargandoDatosFiltros(paginaActual+1);
        cargarPeliculas(porFiltro);
        window.scrollTo(0,0);
        }
        
    } catch (error) {
        
    }
});

const contenedor = document.querySelector('.main__grid');


const media= document.getElementById('media');

contenedor.addEventListener('click',async (e)=>{
    
    if (e.target.closest('.main__media')) {
        const dataID= e.target.closest('.main__media').dataset.id;
        
        media.classList.add('media--active');

        const datos =await peticionSeleccion(dataID);
        
        
        const plantillaHTML= `
        <div class="media__contenedor">
                <div class="media__backdrop">
                <img
                        src="https://image.tmdb.org/t/p/w500//${datos.backdrop_path}"
                class="media__backdrop-image"
                />
                </div>
            <div class="media__imagen">
                    <img
                        src="https://image.tmdb.org/t/p/w500//${datos.poster_path}"
                        class="media__poster"
                    />
                </div>
                <div class="media__info">
                    <h1 class="media__titulo">${datos.title}</h1>
                    <p class="media__fecha">${datos.release_date}</p>
                    <p class="media__overview">${datos.overview}</p>
                </div>
                <button class="media__btn" id='cerrar'>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        viewBox="0 0 16 16"
                        class="media__btn-icono"
                    >
                        <path
                            d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"
                        />
                    </svg>
                </button>
            </div>
        `;
        media.innerHTML=plantillaHTML;
        document.body.style.overflow='hidden';
        
    } 

});


const peticionSeleccion= async(id)=>{
    try {
        const tipoFiltro= document.querySelector('.main__filtros .btn--active').id;
    const url= `https://api.themoviedb.org/3/${tipoFiltro}/${id}?api_key=c3fbcfa3f23c9ca7c1133c86f1351ca2&language=es-PER`;

    const peticion= await fetch (url);
    const datos= await peticion.json();

    
    return datos;
    } catch (error) {
        console.log(error);
        
    }
    
};

const btnCerrar= document.getElementById('media');

btnCerrar.addEventListener('click',(e)=>{
    if (e.target.closest('button')) {
        btnCerrar.classList.remove('media--active'); 
        document.body.style.overflow='auto';
    }
});

// mediante una funciión asincrona muestro los datos

const cargarDatos= async ()=>{
    const peliculas=await peliculasPopulares('movie');
    cargarPeliculas(peliculas);
    filtrosGeneros('movie');

};
cargarDatos();
//# sourceMappingURL=bundle.js.map
