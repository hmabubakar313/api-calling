import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Form from './addDataForm';


function DataFetch() {
  const [data, setData] = useState([]);
  const deleteData = (id) => {
    axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then(res => {
        console.log(res);
        console.log(res.data);
        const newData = data.filter(item => item.id !== id);
        setData(newData);
      });
  }

  

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/posts')
      .then(res => {
        setData(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  return (
    <div>
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
            
              
            </tr>
          ))}
        </tbody>
      </table>
        <Form />   
    </div>
  );
}

export default DataFetch;
