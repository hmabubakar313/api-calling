import axios from 'axios';
import React, { useEffect, useState } from 'react';
// import EditForm from './EditForm';




function DataFetch() {
  const [data, setData] = useState([]);
  const [toggle, setToggle] = useState(true)
  // const [message, setMessage] = useState("ok");
  const [title,setTitle] = useState('')
  const [body,setBody] = useState('')
  

 
 
 


  // for Deleting the Data from the table
  const deleteData = (id) => {
    axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then(res => {
        console.log(res);
        console.log(res.data);
        const newData = data.filter(item => item.id !== id);
        setData(newData);
      });
    }
    
    let handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
          method: "POST",
          body: JSON.stringify({
            
            userId: 1,
            title: title,
            body: body,
          }),
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        });
        const resJson = await res.json();
    
        if (res.status === 201) { 
          setBody('');
          setTitle('');
          setData([...data, resJson]);
          
        } else {
          console.log('Error');
        }
      } catch (err) {
        console.error(err);
      }
    };
    
    useEffect(() => {
      axios.get('https://jsonplaceholder.typicode.com/posts')
        .then((response) => {
          setData(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }, []);
    
  return (
    <div>
      <button class='btn-secondary'  onClick={() => setToggle(!toggle)}>Add Data</button>
      {
        toggle && (
      <form onSubmit={handleSubmit}>
        
        
        <label for="title">Title: </label> 
        <input type="text" id="title" name="title" onChange={(e) => setTitle(e.target.value)}/><br/>
        <label for="body">Body : </label>
        <input type="text" id="body" name="body" onChange={(e) => setBody(e.target.value)}/><br/>
        <button type='submit'>Submit</button>
        
        
      </form>
        )
      }
 
      <table className="table table-striped">
        <thead>
          <tr>
            <th>User Id</th>
            <th>Id</th>
            <th>Title</th>
            <th>Body</th>
          </tr>
        </thead>
        <tbody>
         
          {data.map(item => (
            <tr key={item.id}>
              <td>{item.userId}</td>
              <td>{item.id}</td>
              <td>{item.title}</td>
              <td>{item.body}</td>
              <td><button onClick={() => deleteData(item.id)} className='btn-danger'>Delete</button></td>
              <td>
                <button>Edit</button>
              </td>
              
            </tr>
          ))}
        </tbody>
      </table>

        
    </div>
  );
}

export default DataFetch;
