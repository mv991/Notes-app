import React,{useState} from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import Fab from '@mui/material/Fab';


function Note(props) {
 const [edit,setEdit] = useState(false);
 const [newTitle,setNewTitle] = useState(props.title);
 const [newDes,setDes] = useState(props.content);

  function handleClick() {
    props.onDelete(props.id);
  }

  return (
    <div className="note">
     {edit ?  
     
     <div className="edit-div">
        <input value={newTitle} onChange={(e) => {setNewTitle(e.target.value)}}/>
        <textarea value={newDes}  onChange={(e) => {setDes(e.target.value)}} rows={5}/>
        <Fab color="secondary" aria-label="save" className="save-button"  size="small" style={{  position: "absolute"}} sx={{background:"#f5ba13",":hover":{bgcolor: "#d69f08"}}}> 
        <SaveIcon onClick={() => {setEdit(false); props.editNote(props.id,newTitle,newDes)}} />
        </Fab>
     </div>
     : 
      <div>
      <h1>{props.title}</h1>
      <p>{props.content}</p>
      <Fab onClick={handleClick} className="delete-button" size="small" sx={{background:"#f5ba13",color:"white"}} color="error">
         <DeleteIcon  />
      </Fab>
     <Fab  aria-label="edit" className="edit-button"  size="small" color="success" sx={{background:"#f5ba13",}} > 
        <EditIcon onClick={() => {setEdit(true)}}/>
     </Fab>
      </div>

    }
       


    </div>
  );
}

export default Note;
