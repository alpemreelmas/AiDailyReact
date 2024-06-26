import {useEffect, useState} from 'react';
import CreateNote from '../components/create-note.jsx';
import axiosInstance from "../lib/axiosInstance.js";
import {DAILY_CREATE_URL, DAILY_LIST_URL, DAILY_ORDER_URL} from "../constants/routeConstants.js";
import Alert from "../components/alert.jsx";
import {createNoteSchema} from "../schemas/createNoteSchema.js";
import {ZodError} from "zod";
import SadSvg from "../../public/sad.svg";
import SortableList, {SortableItem} from "react-easy-sort";
import {arrayMoveImmutable} from "array-move";
import {toast} from "react-toastify";
import { useLoading } from '../hooks/loadingContext.jsx';
import Loading from '../components/layout/Loading.jsx';

function Daily() {
    const [showNoteEditModal, setNoteEditModal] = useState(false);
    const [editNote, setEditNote] = useState();
    const [notes, setNotes] = useState([]);
    const [errors, setErrors] = useState();
    const [showFullNote, setShowFullNote] = useState(null);

    const toastOption = {
        theme: "dark"
    }

    const { loading, setLoading } = useLoading();

    useEffect(() => {
        
        const fetchData = async () => {
            setLoading(true);
            setErrors(null)
            try {
                const response = await axiosInstance.get(DAILY_LIST_URL)
                if (!response.data.is_error && response.status === 200) {
                    setNotes(response.data.data)
                }
            } catch (e) {
                if (e.response?.data.is_error) {
                    setErrors(e.response.data.message)
                }
            }
            setLoading(false);
        }

        fetchData()
    }, [])

    const mergeNotes = (data) => {
        setNotes([...notes, data])
    }

    const handleRemove = async (e) => {
        const noteId = e.currentTarget.getAttribute('data-id');
        try {
            /*TODO: fix naming of url*/
            const response = await axiosInstance.delete(`${DAILY_LIST_URL}${noteId}`)
            if (!response.data.is_error && response.status === 200) {
                toast.success("Removed successfully", toastOption);
                setNotes(notes.filter((note) => note._id !== noteId))
            }
        } catch (e) {
            if (e.response?.data.is_error) {
                setErrors(e.response.data.message)
            }
        }
    }

    const toggleNoteEditModal = (e) => {
        setNoteEditModal(!showNoteEditModal)
        editNote ? setEditNote() : setEditNote(notes.find((el) => el._id === e.currentTarget.getAttribute('data-id')))
    }

    const handleEdit = async () => {
        setErrors(null)
        try {
            const validated = await createNoteSchema.parseAsync({content: editNote.content})
            const response = await axiosInstance.patch(DAILY_CREATE_URL + editNote._id, {content: validated.content})
            if (!response.data.is_error && response.status === 200) {
                toggleNoteEditModal();
                setEditNote({...editNote, content: validated.content})
                const updatedNotes = notes.map(note => {
                    if (note._id === editNote._id) {
                        // Return a new object with updated content
                        return {...note, content: validated.content};
                    }
                    return note; // Return unchanged note
                });
                setEditNote(null)
                setNotes(updatedNotes); // Update state with the new array
            }
        } catch (e) {
            if (e instanceof ZodError) {
                var messages = [];
                e.errors.map(obj => messages.push(obj.message))
                setErrors(messages)
            }
            if (e.response?.data.is_error) {
                toast.error(e.response.data.message, toastOption)
            }
        }
    }

    const onSortEnd = async (oldIndex, newIndex)=> {
        /*notes[oldIndex].orderId = newIndex*/
        let newNotes = arrayMoveImmutable(notes, oldIndex, newIndex)
        newNotes.map((e, i) => e.orderId = i)
        newNotes.sort((a,b) => a.orderId-b.orderId) 
        setNotes(newNotes)
        console.log(newNotes)
        const response = await axiosInstance.post(DAILY_ORDER_URL, newNotes.map(i => {
            return { orderId: i.orderId, id: i._id}
        }))
        if (!response.data.is_error && response.status === 200) {
            toast.success("Reorder success !", toastOption)
        }
    }

    const handleShowFullNote = (note) => {
        setShowFullNote(note);
    };

    const truncateText = (text, maxLength) => {
        if (text.length <= maxLength) {
            return text;
        }
        return text.substring(0, maxLength) + '...';
    };

    if(loading){
        return <Loading />
    }

    return (
        <div style={{margin: "15px 15px 50px"}}>
            
            
            {errors?.length > 0 && (<Alert messages={errors} type={"warning"}/>)}

            {notes.length === 0 ? (

                <div className='noNotes'>
                    <img className='sadLogo' src={SadSvg} alt=""/>
                    <p>Create a new note to keep your notes organized power of AI</p>
                    <CreateNote mergeNotes={mergeNotes} notes={notes}/>
                </div>
            ) : (

                <div className={"h-screen p-b-60"}>
                    <CreateNote mergeNotes={mergeNotes} notes={notes}/>
                    <SortableList onSortEnd={onSortEnd} className="list" draggedItemClassName="dragged" lockAxis={"y"}>
                        {notes.map((note) => (
                            <SortableItem key={note}>
                                <li className="list-group-item d-flex justify-content-between align-items-center"
                                    key={note._id} style={{ cursor: 'pointer' }} onClick={(e) => {
                                        if (!e.target.closest('.btn')) {
                                            handleShowFullNote(note);
                                        }
                                    }}>
                                    <span>{truncateText(note.content, 50)}</span>
                                    <div>
                                        <div style={{display: 'flex'}}>
                                            <button className="btn btn-info btn-sm" onClick={toggleNoteEditModal}
                                                    data-id={note._id}><i
                                                className='icon-pencil'></i></button>
                                            <button className="btn btn-danger btn-sm" onClick={handleRemove}
                                                    data-id={note._id}
                                                    style={{marginLeft: 10}}><i className='icon-trash'></i></button>
                                        </div>
                                    </div>
                                </li>
                            </SortableItem>
                        ))}
                    </SortableList>
                </div>
            )}
            {showNoteEditModal && (
                <div
                    className="modal fade default-modal show"
                    tabIndex={-1}
                    role="dialog"
                    aria-labelledby="exampleModalCenterTitle"
                    style={{display: "block"}}
                    aria-modal="true"
                >
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-body">
                                <div className="d-flex mb-3">
                                    <div>
                                        <h6 className="mb-0">Edit Note</h6>
                                    </div>
                                </div>
                                {errors?.length > 0 && (<Alert messages={errors} type={"warning"}/>)}
                                <form className="form-auth-small m-t-20">
                                    <div className="form-group">
                                        <label htmlFor="signin-email" className="control-label sr-only">
                                            Note
                                        </label>
                                        <textarea
                                            placeholder='Type Your Note'
                                            className="form-control p-2 text-white"
                                            rows={10}
                                            onChange={(e) => setEditNote({...editNote, content: e.target.value})}
                                        >
                                            {editNote.content}
                                        </textarea>
                                    </div>
                                </form>
                                <div className="align-right">
                                    <button onClick={toggleNoteEditModal} className="btn btn-default">
                                        Cancel
                                    </button>
                                    <button onClick={handleEdit} className="btn btn-success"
                                            style={{marginLeft: 10}}>
                                        Update Note
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {showFullNote && (
                <div
                    className="modal fade default-modal show"
                    tabIndex={-1}
                    role="dialog"
                    style={{ display: "block" }}
                    aria-modal="true"
                >
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Note Details</h5>
                                <button type="button" className="close" onClick={() => setShowFullNote(null)}>
                                    <span>&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <p>{showFullNote.content}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>

    );
}

export default Daily;
