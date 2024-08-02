'use strict';

// Crear una función asincorna para realizar una petición a la API 

const peliculasPopulares= async ()=>{
        const url= 'https://api.themoviedb.org/3/movie/popular?api_key=c3fbcfa3f23c9ca7c1133c86f1351ca2&language=es-PER&page=1';
        
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
const generosPeliculas =async ()=>{
        const url= 'https://api.themoviedb.org/3/genre/movie/list?api_key=c3fbcfa3f23c9ca7c1133c86f1351ca2&language=es';

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

const filtrosGeneros= async ()=>{
    const genero= await generosPeliculas();
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

// mediante una funciión asincrona muestro los datos

const cargarDatos= async ()=>{
    const peliculas=await peliculasPopulares();
    cargarPeliculas(peliculas);
};
cargarDatos();
filtrosGeneros();
//# sourceMappingURL=bundle.js.map
