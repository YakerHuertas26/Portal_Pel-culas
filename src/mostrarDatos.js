const contenedor= document.querySelector('#populares .main__grid')

const mostarDatos= (datos)=>{
    // recorro mi array para insertar y modificar el don 
    datos.forEach((element) => {
        console.log(element);
        const pantillaHTML= `
        <div class="main__media"> 
            <a href="#" class="main__media-thumb">
                <img class="main__media-img" src=https://image.tmdb.org/t/p/w500/${element.
                    backdrop_path} alt="" />
            </a>
            <p class="main__media-titulo">${element.title}</p>
            <p class="main__media-genero">${element.genero} </p></p>
            <p class="main__media-fecha">${element.release_date} </p></p>
        `;
    contenedor.insertAdjacentHTML('beforeend', pantillaHTML)
    
    });

}

export default mostarDatos;