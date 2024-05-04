import {useEffect, useState} from 'react';
import CreateNote from '../components/create-note.jsx';
import axiosInstance from "../lib/axiosInstance.js";
import {DAILY_LIST_URL} from "../constants/routeConstants.js";
import Alert from "../components/alert.jsx";
import EditNote from "../components/edit-note.jsx";

function Daily() {
    const [notes, setNotes] = useState([]);
    const [errors, setErrors] = useState();
    const [success, setSuccess] = useState();

    useEffect(()=>{
        const fetchData = async ()=>{
            setErrors(null)
            try {
                const response = await axiosInstance.get(DAILY_LIST_URL)
                if(!response.data.is_error && response.status === 200){
                    console.log(notes)
                    setNotes(response.data.data)
                }
            }catch (e) {
                if(e.response?.data.is_error){
                    setErrors(e.response.data.message)
                }
            }
        }

        fetchData()
    },[])

    const mergeNotes = (data)=>{
        setNotes([...notes,data])
    }

    const editNote = (noteId,data)=>{
        const index = notes.findIndex((note) => note._id === noteId);
        let newEl = notes[index]
        newEl.content = data.content
        const newArr = notes.filter((el)=> el._id !== noteId)
        newArr.push(newEl)
        setNotes(newArr)
    }

    const handleRemove = async (e)=>{
        const noteId =e.currentTarget.getAttribute('data-id');
        try {
            /*TODO: fix naming of url*/
            const response = await axiosInstance.delete(`${DAILY_LIST_URL}${noteId}`)
            if(!response.data.is_error && response.status === 200){
                setSuccess("Removed successfully.")
                setNotes(notes.filter((note)=> note._id !== noteId))
            }
        }catch (e) {
            if(e.response?.data.is_error){
                setErrors(e.response.data.message)
            }
        }
    }


    return (
        <div style={{ margin: "15px 15px 50px" }}>
            {success?.length > 0 && (<Alert messages={success} type={"success"} />)}
            {errors?.length > 0 && (<Alert messages={errors} type={"danger"} />)}
            <CreateNote mergeNotes={mergeNotes} />

            {notes.length === 0 ? (
                <p>No notes available. Create a new note to get started!</p>
            ) : (
                <>
                    <h6>05.04.2024</h6>
                    <ul className="list-group">
                        {notes.map(note => (
                            <li className="list-group-item d-flex justify-content-between align-items-center" key={note.id}>
                                <span>{note.content}</span>
                                <div>
                                    <div style={{display: 'flex'}}>
                                        <EditNote editNote={editNote} note={note} />
                                        <button className="btn btn-danger btn-sm" onClick={handleRemove} data-id={note._id}
                                                style={{marginLeft: 10}}><i className='icon-trash'></i></button>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </>
            )}
        </div>
    );
}

export default Daily;
