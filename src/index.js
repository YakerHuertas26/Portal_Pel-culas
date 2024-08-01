import  {cargarGeneros,cargarDatos} from "./cargarDatos";
import mostarDatos from "./mostrarDatos";
// crar una función asincróna para cargar los datos de la api 

const datosPopulares= async ()=>{
    const peliculasPopulares=await cargarDatos();
    mostarDatos(peliculasPopulares);
}
datosPopulares();

