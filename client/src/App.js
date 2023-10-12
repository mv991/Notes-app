import React, { useState,useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Note from "./components/Note";
import CreateArea from "./components/CreateArea";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import AddModal from "./components/AddModal";
function App() {
    const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies([]);
   const [notes, setNotes] = useState([]);
  const [user,setUser] =   useState({});
  const [modalShow, setModalShow] = React.useState(false);

     useEffect(() => {
    const verifyCookie = async () => {
      if (!cookies.token) {
        navigate("/");
      }
      const { data } = await axios.post(
        "https://notes-app-4edo.onrender.com/",
        {},
        { withCredentials: true }
      );
     
      const { status, user } = data;
      setUser(user);
      return status
        ? toast(`Hello ${user.firstName}`, {
            position: "top-right",
          })
        : (removeCookie("token"), navigate("/"));
    };
    verifyCookie();
  }, [cookies, navigate, removeCookie]);

     useEffect( () => {
      const getData = async() => {
        await axios.get(
        "https://notes-app-4edo.onrender.com/notes",
        { withCredentials: true }
      ).then(res => setNotes(res.data))
       .catch(e => console.log(e))
        
      }
    getData();
 
  }, []);
  const Logout = () => {
    removeCookie("token");
    navigate("/");
  };
  async function addNote(note) {
        await axios.post(
        "https://notes-app-4edo.onrender.com/note",
       { data: {  note, user}},
        
        { withCredentials: true }
      ).then(res => res.data.note)
       .then(res =>setNotes(prevNotes => { return [...prevNotes, res]}))
       .catch(e => toast.error(e.response.data.message, { position: "bottom-left",}))
  }
  async function deleteNote(noteId) {
    setNotes(prevNotes => {
      return prevNotes.filter((noteItem, index) => {
        return noteItem._id !== noteId;
      });
    });
    await axios.delete(
      `https://notes-app-4edo.onrender.com/note/${noteId}`,
        { withCredentials: true }
      )
      .catch(e =>  toast.error(e.response.data.message, { position: "bottom-left" }))

  }
  async function editNote(noteId,title,content) {
     const newNotes  = notes.map(note => {
          if(note._id===noteId) {
            return({title:title,content:content,_id:noteId})
          }
          return note;
       })
      setNotes(newNotes);
    await axios.put(
      `https://notes-app-4edo.onrender.com/note/${noteId}`,
         {title,content},
        { withCredentials: true }
      )
      .catch(e =>  toast.error(e.response.data.message, { position: "bottom-left" })) 
  }
  console.log(notes)
  return (
    <div className="App">
       <Header user={user.firstName} logout={Logout} onAdd={addNote}/>
      <CreateArea onAdd={addNote} />
      {/* {notes?.map((noteItem, index) => {
        return (
          <Note
            key={index}
            id={noteItem._id}
            title={noteItem.title}
            content={noteItem.content}
            onDelete={deleteNote}
            editNote={editNote}
          />
        );
      })} */}
      <div className="mobile-add-button" >
          <Fab sx={{position:"absolute", bottom:"20px", right: "15px",backgroundColor:"#f5ba13", color:"white",":hover":{bgcolor: "#d69f08"}}} onClick={() => setModalShow(true)} size="small" >
            <AddIcon />
          </Fab>
      </div>
       {modalShow && <AddModal onClose={() => {setModalShow(false)}} />}
       <ToastContainer/>
      <Footer />
    </div>
  );
}

export default App;
