const filtrosContenedor= document.getElementById('filtro-generos');

filtrosContenedor.addEventListener('click',(e)=>{
    e.preventDefault();

    if (e.target.closest('button')) {
        // si existe un btn con la clase activa lo elimino
        filtrosContenedor.querySelector('.btn--active')?.classList.remove('btn--active');

        // activo la clase activo 
        e.target.classList.add('btn--active');
        
    }
})


