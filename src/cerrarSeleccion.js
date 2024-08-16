const btnCerrar= document.getElementById('media');

btnCerrar.addEventListener('click',(e)=>{
    if (e.target.closest('button')) {
        btnCerrar.classList.remove('media--active') 
        document.body.style.overflow='auto';
    }
})


