import axios from "axios";


export const getIndexes = async () => {
   

    const {data} = await axios.get('/api/values/all');

    console.log('data', data);
    
    

    return data.map((element: { number: any; }) => element.number);
}