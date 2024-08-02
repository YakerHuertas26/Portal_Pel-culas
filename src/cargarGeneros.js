import { generosPeliculas } from "./cargarDatos";

const contenedorFiltroGenero= document.querySelector('#filtro-generos')

const filtrosGeneros= async ()=>{
    const genero= await generosPeliculas();
    genero.forEach(element => {
        const btn= document.createElement('button');
        btn.classList.add('btn');
        btn.innerText=element.name
        btn.setAttribute('data-id',element.id);
        contenedorFiltroGenero.append(btn);
    });
    
}
export {filtrosGeneros}
