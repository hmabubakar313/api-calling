import axios from 'axios'
import React,{useEffect, useState} from 'react'

function Form() {
    const [data,setData] = useState({})
    const [isFormOpen, setIsFormOpen] = useState(false);
    
    const toggleForm = () => {
    setIsFormOpen(!isFormOpen); // Toggle the form state
    };

    
    useEffect(()=>{
        axios.post('https://jsonplaceholder.typicode.com/posts',data)
        .then(res=>{
            console.log(res)
            setData(res.data)
        })
        .catch(
            err=>{
                console.log('error')
            }
        )
    }
    ,[])


  return (
    <div>
        <button onClick={toggleForm}>Add Data</button>
        {isFormOpen && (
        <form>
            <input type="text" placeholder="Enter User Id"/>
            <input type="text" placeholder="Enter Id"/>
            <input type="text" placeholder="Enter Title"/>
            <input type="text" placeholder="Enter Body"/>
            
        </form>
        )}
    </div>
    )
    
}

export default Form