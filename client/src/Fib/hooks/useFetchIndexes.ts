
import React, { useEffect, useState } from 'react'
import { getIndexes as getIndexApi } from '../helpers/getIndexes';

interface index{
    number: number;
}

export const useFetchIndexes = () => {
  
    
    const [indexes, setIndexes] = useState<[]>([]);

    const [isLoading, setIsLoading] = useState(true)

    const getIndexes = async() => {
        const newIndexes = await getIndexApi();
        setIndexes(newIndexes);
        setIsLoading(false);
    }

    useEffect(() => {
        getIndexes();
    }, [])
   
    


    return {
        indexes,
        isLoading,
        getIndexes
    }
}
