import { generosPeliculas, peliculasPopulares } from "./cargarDatos";
import { filtrosGeneros } from "./cargarGeneros";
import cargarPeliculas from "./mostrarDatos";

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
    
}

