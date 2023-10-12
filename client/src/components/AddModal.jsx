import React from 'react'
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';
const AddModal = (props) => {
  return (
    <div className='backdrop'>
        <div className='modal'>
            <div className='header'>
               <h2>Add a Note</h2>
               <h2 onClick={props.onClose}>X</h2>
            </div>
            <form className='mobile-form'>
          <input
            name="title"
            // onChange={handleChange}
            // value={note.title}
            placeholder="Title"
            required={true}
          />

        <textarea
          name="content"
        //   onClick={expand}
        //   onChange={handleChange}
        //   value={note.content}
          placeholder="Take a note..."
          rows={ 6 }
          required={true}
        />
        <Fab >
            <AddIcon />
          </Fab>
          </form>
        </div>
    </div>
  )
}

export default AddModal