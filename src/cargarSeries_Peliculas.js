import { generosPeliculas, peliculasPopulares } from "./cargarDatos";
import { filtrosGeneros } from "./cargarGeneros";
import cargarPeliculas from "./mostrarDatos";

const filtroSeriesTv = document.getElementById('tv');
const filtroPeliculas= document.getElementById('movie')

// btn peliculas
filtroPeliculas.addEventListener('click', async (e)=>{
    e.preventDefault();
    filtrosGeneros('movie');
    const peliculas=await peliculasPopulares('movie');
    cargarPeliculas(peliculas);

    document.querySelector('#populares .main__titulo').innerText='Peliculas Populares'

    filtroSeriesTv.classList.remove('btn--active');
    filtroPeliculas.classList.add('btn--active')
})



// btn series
filtroSeriesTv.addEventListener('click',async (e)=>{
    e.preventDefault();
    filtrosGeneros('tv');

    const series=await peliculasPopulares('tv');
    cargarPeliculas(series)
    console.log(series);
    

    document.querySelector('#populares .main__titulo').innerText='Series Populares'

    filtroPeliculas.classList.remove('btn--active');
    filtroSeriesTv.classList.add('btn--active')
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

