'use strict';

// Crear una función asincorna para realizar una petición a la API 

const peliculasPopulares= async (tipo='movie')=>{
        const filtro= tipo==='movie'?'movie':'tv';

        const url= `https://api.themoviedb.org/3/${filtro}/popular?api_key=c3fbcfa3f23c9ca7c1133c86f1351ca2&language=es-PER&page=1`;
        
        const peticion=await fetch(url); //consulta a la API mediante el endpoint 
        const datos= await peticion.json(); //guardo los datos
        const peliculas= datos.results;
        const genero= await generosPeliculas();
        

        peliculas.forEach((element) => {
                let generosPeliculas =ObtenerGenero(element.genre_ids[0], genero);

                element.genero= generosPeliculas;
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

const contenedor= document.querySelector('#populares .main__grid');

const cargarPeliculas= (datos)=>{
    
    datos.forEach((element) => {
        const plantillaHTML= `
        <div class="main__media">
            <a href="#" class="main__media-thumb">
                <img class="main__media-img" src='https://image.tmdb.org/t/p/w500/${element.backdrop_path}' alt="" />
            </a>
            <p class="main__media-titulo">${element.title} </p>
            <p class="main__media-genero">${element.genero} </p>
            <p class="main__media-fecha">${element.release_date} </p>    
    `;
        // inserta la plantilla en el contenedor 
        contenedor.insertAdjacentHTML('beforeend',plantillaHTML);
    });
    
};

const seriesTv = document.getElementById('tv');


seriesTv.addEventListener('click',async (e)=>{
    e.preventDefault();
    filtrosGeneros('tv');

        const series=await peliculasPopulares('tv');
        cargarSeries(series);
        console.log(series);
        
        

    
});

const cargarSeries= (datos)=>{
    const contenedor= document.querySelector('#populares .main__grid');
    contenedor.innerHTML=''; 
    datos.forEach((element) => {
        const genero= element.genero===undefined ?'...':element.genero;
        
        const plantillaHTML= `
        <div class="main__media">
            <a href="#" class="main__media-thumb">
                <img class="main__media-img" src='https://image.tmdb.org/t/p/w500/${element.backdrop_path}' alt="" />
            </a>
            <p class="main__media-titulo">${element.name} </p>
            <p class="main__media-genero">${genero} </p>
            <p class="main__media-fecha">${element.first_air_date
            } </p>    
    `;
        // inserta la plantilla en el contenedor 
        contenedor.insertAdjacentHTML('beforeend',plantillaHTML);
    });
    
};

// mediante una funciión asincrona muestro los datos

const cargarDatos= async ()=>{
    const peliculas=await peliculasPopulares('movie');
    cargarPeliculas(peliculas);
    filtrosGeneros('movie');

};
cargarDatos();
//# sourceMappingURL=bundle.js.map
