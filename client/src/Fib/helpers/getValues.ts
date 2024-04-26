import axios from "axios";


export const getValues = async () => {
   
    try {
        const {data} = await axios.get('/api/values/current');

        console.log('resp', data);
    
        if(data.status){
            
        
            return data.data;
        }
        console.log('Error en peticion');
        
        return {};
    } catch (error) {
        console.log('Error en peticion');
        
        return {};
    }
   
}