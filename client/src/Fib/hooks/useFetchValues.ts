
import { useEffect, useState } from 'react'
import { getValues } from '../helpers/getValues';

export const useFetchValues = () => {
  
    
    const [values, setValues] = useState<{ [key: string]: string }>({});

    const [isLoading, setIsLoading] = useState(true)

    const getValue = async() => {
        const valuesResp = await getValues();
        console.log('values', valuesResp);
        
        setValues(valuesResp);
        setIsLoading(false);
    }

    useEffect(() => {
        getValue();
    }, [])


    return {
        values,
        isLoading,
        getValue
    }
}
