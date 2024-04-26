import axios from "axios";


export const getValues = async () => {
   

    const resp = await axios.get('/api/values/current');

    console.log('resp', resp);

    if(resp.status){
        
    
        return resp.data;
    }
    console.log('Error en peticion');
    
    return {};
}