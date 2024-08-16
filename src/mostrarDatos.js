// creo una función para cargar y mostar los datos en el DOM 

const contenedor= document.querySelector('#populares .main__grid');

const cargarPeliculas= (datos)=>{
    contenedor.innerHTML='';
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
        contenedor.insertAdjacentHTML('beforeend',plantillaHTML);
        
    });
    
}

export default cargarPeliculas;