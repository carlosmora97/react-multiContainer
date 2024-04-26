import axios from "axios";


export const getIndexes = async () => {
   

    const resp = await axios.get('/api/values/all');
    console.log('resp', resp);
    
    if(resp.status){
        const {data} = resp;
        console.log('data', data);
        return data.map((element: { number: any; }) => element.number);
    }
    console.log('Error en peticion');
    
    return [];
    

}