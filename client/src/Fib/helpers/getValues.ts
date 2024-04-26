import axios from "axios";


export const getValues = async () => {
   

    const resp = await axios.get('/api/values/current');


    if(resp.status){
        console.log('resp', resp);
        
    
        return resp.data;
    }
    console.log('Error en peticion');
    
    return {};
}