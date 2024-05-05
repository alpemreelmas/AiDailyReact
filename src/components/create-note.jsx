import { useState } from 'react';
import axiosInstance from "../lib/axiosInstance.js";
import {DAILY_CREATE_URL, LOGIN_URL} from "../constants/routeConstants.js";
import {loginSchema} from "../schemas/loginSchema.js";
import {ZodError} from "zod";
import {createNoteSchema} from "../schemas/createNoteSchema.js";
import Alert from "./alert.jsx";

function CreateNote({mergeNotes}) {

    const [showNoteCreateModal, setNoteCreateModal] = useState(false);
    const [noteCreateInputValue, setNoteCreateInputValue] = useState('');
    const [errors, setErrors] = useState();
    const [success, setSuccess] = useState();

    const toggleNoteCreateModal = () => {
        setNoteCreateModal(!showNoteCreateModal)
        setErrors(null)
        setNoteCreateInputValue(null)
    }

    const handleCreateNote = async () => {
        setErrors(null)
            try {
                const validated= await createNoteSchema.parseAsync({content: noteCreateInputValue})
                const response = await axiosInstance.post(DAILY_CREATE_URL,{content:validated.content})
                console.log(response.data)
                if(!response.data.is_error && response.status === 201){
                    setSuccess("Note created successfully.")
                    mergeNotes(response.data.data)
                    toggleNoteCreateModal();
                }
            }catch (e) {
                if(e instanceof ZodError){
                    var messages = [];
                    e.errors.map(obj => messages.push(obj.message))
                    setErrors(messages)
                }
                if(e.response?.data.is_error){
                    setErrors(Array.isArray(e.response.data.message) ? e.response.data.message : [e.response.data.message])
                }
            }
    }

    return (
        <div>
            {success?.length > 0 && (<Alert messages={success} type={"success"} />)}
            <button
                onClick={toggleNoteCreateModal}
                style={{ marginBottom: 15 }}
                className="btn-sm createNoteBtn"
            >
                <i className='icon-plus'></i>
            </button>

            {showNoteCreateModal && (
                <div
                    className="modal fade default-modal show"
                    tabIndex={-1}
                    role="dialog"
                    aria-labelledby="exampleModalCenterTitle"
                    style={{ display: "block" }}
                    aria-modal="true"
                >
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-body">
                                <div className="d-flex mb-3">
                                    <div>
                                        <h6 className="mb-0">Create Note</h6>
                                    </div>
                                </div>
                                {errors?.length > 0 && (<Alert messages={errors} type={"danger"} />)}
                                <form className="form-auth-small m-t-20">
                                    <div className="form-group">
                                        <label htmlFor="signin-email" className="control-label sr-only">
                                            Note
                                        </label>
                                        <textarea
                                            placeholder='Type Your Note'
                                            className="form-control p-2 text-white"
                                            rows={10}
                                            onChange={(e) => setNoteCreateInputValue(e.target.value)}
                                        >
                                            {noteCreateInputValue}
                                        </textarea>
                                    </div>
                                </form>
                                <div className="align-right">
                                    <button onClick={toggleNoteCreateModal} className="btn btn-default">
                                        Cancel
                                    </button>
                                    <button onClick={handleCreateNote} className="btn btn-success" style={{ marginLeft: 10 }}>
                                        Create Note
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}

export default CreateNote;
