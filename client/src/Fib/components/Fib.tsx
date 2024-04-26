import { useState } from "react";
import { useFetchIndexes } from "../hooks/useFetchIndexes";
import { useFetchValues } from "../hooks/useFetchValues"
import axios from "axios";

export const Fib = () => {


    const {values, isLoading : isLoadingValues, getValue} = useFetchValues();
    const {indexes, isLoading : isLoadingIndexes, getIndexes} = useFetchIndexes();

    const [index, setIndex] = useState('')
    

    const handleSubmit = async(event : React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if(index.length < 1) return;
        await axios.post('/api/values',{
            index
        });
        getValue();
        getIndexes();
        setIndex('');
    }


    return (
        <div>
            <h1>Fibonacci!!!!!</h1>
            <form onSubmit={(e) => handleSubmit(e)}>
                <label>Enter your index:</label>
                <input type="text" 
                    value={index}
                    onChange={event => setIndex(event.target.value)}
                />
                <button>Submit</button>
            </form>

            <h3>Calculated values:</h3>
            {
                !isLoadingValues && 

                Object.entries(values).map(([key,value]) => (
                    <div key={key}>
                        <h3>{key} - {value}</h3>
                    </div>
                ))
            }
            <h3>Indexes I have seen:</h3>
            <div style={{
                display: "flex",
                flexDirection: "row"
            }}>
                {
                    !isLoadingIndexes && 
                    
                    indexes.join(', ')
                }

            </div>

        </div>
    )
}
