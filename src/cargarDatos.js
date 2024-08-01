// crear función asincrona para hace la petición a la APIde las películas/populares

const cargarDatos= async ()=>{
        try {
                
                const url= 'https://api.themoviedb.org/3/movie/popular?api_key=c3fbcfa3f23c9ca7c1133c86f1351ca2&language=es-PER&page=1';
        
                const respuesta=await fetch(url)  //petición al servidor
                const datos= await respuesta.json(); //guardo los datos obtenidos de la petición 
                const generos= await cargarGeneros();
                const peliculasPopulares= datos.results;//guardo el array de objetos
                
                // itero todos el array de las peliculas para obtener todos los id de generos
                peliculasPopulares.forEach((element) => {
                        // console.log(element.genre_ids[0]);
                        element.genero=obtenerGeneros(element.genre_ids[0],generos); //le añado el campo genero 
                });
                return peliculasPopulares;
        } catch (error) {
                console.log(error);
        }
}

// crear una función asincrona para cargar los generos de las peliculas

const cargarGeneros= async ()=>{
        try {
                
                const url= 'https://api.themoviedb.org/3/genre/movie/list?api_key=c3fbcfa3f23c9ca7c1133c86f1351ca2&language=es';
                const respuesta= await fetch(url);
                const generos= await respuesta.json();
                return generos.genres;
        } catch (error) {
                console.log(error);
        }
};

const obtenerGeneros=(idGeneroPeliculas,generos)=>{
        let nombreGenero;
        generos.forEach((element)=>{
                if (idGeneroPeliculas===element.id) {
                        nombreGenero=element.name;  
                }
        });
        return nombreGenero
}


export {cargarDatos,cargarGeneros};

