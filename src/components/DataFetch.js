import axios from 'axios';
import React, { useEffect, useState } from 'react';




function DataFetch() {
  const [data, setData] = useState([]);
  const [toggle, setToggle] = useState(true)
  const [id,setID]=useState('')
  // const [message, setMessage] = useState("ok");
  const [title,setTitle] = useState('')
  const [isPrice,setUpdatePrice] = useState('')
  const [description,setUpdateDescription] = useState('')
  const [category,setUpdateCategory]=useState('')
  const [image,setImage] = useState('')
  const [tempdata,setTempData] = useState('')


  

 
 
 


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

  // updateData Function 
  // const updateData = (title,isPrice,image,category,description,...tempdataid)=>
  // {
  //   fetch(`https://fakestoreapi.com/products/${id}`,{
  //           method:"PUT",
  //           body:JSON.stringify(
  //               {
  //                   title: title,
  //                   price: isPrice,
  //                   description: description,
  //                   image: image,
  //                   category: category
  //               }
  //           )
  //       })
  //           .then(res=>res.json())
  //           .then(json=>console.log(json))

  // }

  useEffect(()=>{
    console.log('title',title)
    console.log('price',isPrice)
  })

  
    
    let handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
          method: "POST",
          body: JSON.stringify({

            title: title,
            price: isPrice,
            description: description,
            image: image,
            category: category
          }),
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        });
        const resJson = await res.json();
        
    
        if (res.status === 201) { 
          // setTitle('')
          // setUpdateDescription('')
          // setUpdateCategory('')
          // setUpdatePrice('')
          // setImage('')
          // setUpdateCategory('')
          // getting data into table 
          setData([...data, resJson]);
          // setTempData([...data])
 
          // console.log('sadsa',res,json)
          
        } else {
          console.log('Error');
        }
      } catch (err) {
        console.error(err);
      }
    };


   
  // const fetchDataById = (e,id) => {
  //   e.preventDefault()
  //   setID(id)
  //   fetch(`https://jsonplaceholder.typicode.com/users?id=${id}`)
  //     .then(response => {
  //       return response.json()
  //     })
  //     .then(data => {
  //       console.log('asd')
  //       // setUser(data[0].body)
  //     })
  // }
    
    useEffect(() => {
      axios.get('https://fakestoreapi.com/products')
      // console.log('req sent')
        .then((response) => {
          setData(response.data);
          setTempData(response.data)
          
          
      
          
        })
        .catch((error) => {
          console.error(error);
        });
    }, []);
    
  return (
    <div>
       <button className='btn btn-secondary'  onClick={() => setToggle(!toggle)}>Add Data</button>
      {
        toggle && (
      <form onSubmit={handleSubmit}>
        
        
        <label for="title">Title: </label> 
        <input type="text" id="title" name="title" onChange={(e) => setTitle(e.target.value)}/><br/>
        <label for="body">Price : </label>
        <input type="number" id="price" name="price" onChange={(e) => setUpdatePrice(e.target.value)}/><br/>
        <label for="body">Description : </label>
        <input type="text" id="description" name="description" onChange={(e) => setUpdateDescription(e.target.value)}/><br/>
        <label for="body">Image : </label>
        <input type="image" id="image" name="image" onChange={(e) => setImage(e.target.value)}/><br/>
        <label for="body">Category : </label>
        <input type="text" id="category" name="category" onChange={(e) => setUpdateCategory(e.target.value)}/><br/>
        


        <button type='submit' className='btn btn-secondary'>Submit</button>
        
        
      </form>
        )
      }
       <button className='btn btn-secondary'  onClick={() => setToggle(!toggle)}>Edit Data</button>
       {
  toggle && data ? (
  <form >
    <div>
    <input type='text' value={data.id} onChange={(e)=>{setID({...tempdata,name:e.target.value})}}></input>
    <input type='text' value={data.title} onChange={(e)=>{setTitle({...tempdata,name:e.target.value})}}></input>
    <input type='text' value={data.isPrice} onChange={(e)=>{setUpdatePrice({...tempdata,name:e.target.value})}}></input>
    <input type='text' value={data.description} onChange={(e)=>{setUpdateDescription({...tempdata,name:e.target.value})}}></input>
    <input type='text' value={data.category} onChange={(e)=>{setUpdateCategory({...tempdata,name:e.target.value})}}></input>
    <button type='submit'>Save</button>
  </div>
  </form>  
  ) : (
    null
  )
}


      
 
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Id</th>
            <th>Title</th>
            <th>Price</th>
            <th>Description</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
         
          {
            data.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.title}</td>
                <td>{item.price}</td>
                <td>{item.description}</td>
                <td>{item.category}</td>
                <td>
                  <button className="btn btn-danger" onClick={() => deleteData(item.id)}>Delete</button>
                </td>
                <td><button className='btn btn-primary'>
                  Edit
                </button>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>

        
    </div>
  );
}

export default DataFetch;
