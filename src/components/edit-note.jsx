import { useState } from 'react';
import axiosInstance from "../lib/axiosInstance.js";
import {DAILY_CREATE_URL} from "../constants/routeConstants.js";
import {ZodError} from "zod";
import {createNoteSchema} from "../schemas/createNoteSchema.js";
import Alert from "./alert.jsx";
import Button from "./ui/buttonElement.jsx";
import { toast } from 'react-toastify';

function EditNote({editNote,note}) {

    const [showNoteCreateModal, setNoteCreateModal] = useState(false);
    const [localNote, setLocalNote] = useState(note);
    const [errors, setErrors] = useState();

    const toastOption = {
        theme: "dark"
    }

    const toggleNoteCreateModal = () => {
        setNoteCreateModal(!showNoteCreateModal)
        setErrors(null)
    }

    const handleEdit = async () => {
        setErrors(null)
            try {
                const validated= await createNoteSchema.parseAsync({content: localNote.content})
                const response = await axiosInstance.patch(DAILY_CREATE_URL + note._id,{content:validated.content})
                if(!response.data.is_error && response.status === 200){
                    setLocalNote();
                    toggleNoteCreateModal();
                    editNote(note._id,response.data.data)
                    toast.success('Note edited successfully!', toastOption)
                }
            }catch (e) {
                if(e instanceof ZodError){
                    var messages = [];
                    e.errors.map(obj => messages.push(obj.message))
                    setErrors(messages)
                }
                if(e.response?.data.is_error){
                    toast.error(e.response.data.message, toastOption)
                }
            }
    }

    return (
        <div>
            <button className="btn btn-info btn-sm" onClick={toggleNoteCreateModal} data-id={note._id}><i
                className='icon-pencil'></i></button>

            {showNoteCreateModal && (
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
                                            onChange={(e) => setLocalNote({...note,content: e.target.value})}
                                        >
                                            {localNote.content}
                                        </textarea>
                                    </div>
                                </form>
                                <div className="align-right">
                                    <Button kind='default' content='cancel' onClick={toggleNoteCreateModal} />
                                    <Button kind='success' content='Update Note' onClick={handleEdit} style={{marginLeft: 10}} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}

export default EditNote;
