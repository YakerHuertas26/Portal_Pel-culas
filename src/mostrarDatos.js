// creo una función para cargar y mostar los datos en el DOM 

const contenedor= document.querySelector('#populares .main__grid');

const cargarPeliculas= (datos)=>{
    contenedor.innerHTML='';
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
    
}

export default cargarPeliculas;