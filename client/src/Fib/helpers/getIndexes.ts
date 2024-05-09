import axios from "axios";


export const getIndexes = async () => {
    
    try {
        
        const {data} = await axios.get('/api/values/all');
        console.log('respIndexes', data);
        
        if(data.status){
            const {data : datos} = data;
            console.log('data', datos);
            return datos.map((element: { number: any; }) => element.number);
        }
        console.log('Error en peticion');
        
        return [];
    } catch (error) {
        console.log('Error en peticion');
        
        return [];
    }

    

}