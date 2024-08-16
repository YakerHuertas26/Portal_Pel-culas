const contenedor = document.querySelector('.main__grid');


const media= document.getElementById('media');

contenedor.addEventListener('click',async (e)=>{
    
    if (e.target.closest('.main__media')) {
        const dataID= e.target.closest('.main__media').dataset.id;
        
        media.classList.add('media--active')

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
    
}

