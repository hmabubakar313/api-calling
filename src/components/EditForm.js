import axios from 'axios'
import React,{useState,useEffect} from 'react'

function EditForm({dataToEdit, onClose, onSave}) {
    const [formdata, setFormdata] = useState({})

    useEffect(() => {
        setFormdata(dataToEdit)
        axios.put(`https://jsonplaceholder.typicode.com/posts/${dataToEdit.id}`, formdata)
        .then(res => {
            console.log(res);
            console.log(res.data);
        }
        )

      return () => {
        
      }
    }, [])



    const handleChange = (e) => {
        setFormdata({
            ...formdata,
            [e.target.name]: e.target.value,
        })
    }


    
    const handleSaveClick = () => {
        onSave(formdata)
        onClose()
    }
    
    

    return (
        <div className="modal">
          <div className="modal-content">
            <h2>Edit Data</h2>
            <form>
              <div className="form-group">
                <label htmlFor="Id">Id</label>
                <input type="text" name="Id" id="Id" value={formdata.Id} onChange={handleChange} />
                <label htmlFor="User Id">User Id</label>
                <input type="text" name="User Id" id="User Id" value={formdata.User_Id} onChange={handleChange} />
                <label htmlFor="Title">Title</label>
                <input type="text" name="Title" id="Title" value={formdata.Title} onChange={handleChange} />
                <label htmlFor="Body">Body</label>
                <input type="text" name="Body" id="Body" value={formdata.Body} onChange={handleChange} />
                
              </div>
              
            </form>
            <div className="modal-buttons">
              <button onClick={handleSaveClick}>Save</button>
              <button onClick={onClose}>Cancel</button>
            </div>
          </div>
        </div>
    );
}

export default EditForm