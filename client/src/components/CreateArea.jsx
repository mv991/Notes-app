import React, { useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';
import Zoom from '@mui/material/Zoom';
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
function CreateArea(props) {
  const [isExpanded, setExpanded] = useState(false);

  const [note, setNote] = useState({
    title: "",
    content: ""
  });

  function handleChange(event) {
    const { name, value } = event.target;
   
    setNote(prevNote => {
      return {
        ...prevNote,
        [name]: value
      };
    });
  }

  async function submitNote(event) {
    // if(!note.title || !note.content) {
    //   // alert("fields cant be empty")
    //      return toast("Fields can't be empty");
    // }
    props.onAdd(note);
    setNote({
      title: "",
      content: ""
    });
    event.preventDefault();
  }

  function expand() {
    setExpanded(true);
  }

  return (
    <div>
      <form className="create-note">
        {isExpanded && (
          <input
            name="title"
            onChange={handleChange}
            value={note.title}
            placeholder="Title"
            required={true}
          />
        )}

        <textarea
          name="content"
          onClick={expand}
          onChange={handleChange}
          value={note.content}
          placeholder="Take a note..."
          rows={isExpanded ? 3 : 1}
          required={true}
        />
        <Zoom in={isExpanded} >
          <Fab sx={{":hover":{bgcolor: "#d69f08"}}}>
            <AddIcon  onClick={submitNote}/>
          </Fab>
        </Zoom>
      </form>
      </div>
  );
}

export default CreateArea;
