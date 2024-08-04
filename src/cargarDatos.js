// Crear una función asincorna para realizar una petición a la API 

const peliculasPopulares= async (tipo='movie')=>{
        const filtro= tipo==='movie'?'movie':'tv'

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
        
}

// crea una función asincrona para obtener los géneros
const generosPeliculas =async (tipo='movie')=>{
        const filtro= tipo==='movie'? 'movie':'tv';
        const url= `https://api.themoviedb.org/3/genre/${filtro}/list?api_key=c3fbcfa3f23c9ca7c1133c86f1351ca2&language=es`;

        const peticion=await fetch(url);
        const datos=  await peticion.json();
        
        return datos.genres;
}

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


export {peliculasPopulares, generosPeliculas};
        
                

