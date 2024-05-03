import { useState } from 'react';

function CreateNote({ addNote }) {

    const [showNoteCreateModal, setNoteCreateModal] = useState(false);
    const [noteCreateInputValue, setNoteCreateInputValue] = useState('');

    const toggleNoteCreateModal = () => {
        setNoteCreateModal(!showNoteCreateModal)
    }

    const handleCreateNote = () => {
        addNote(noteCreateInputValue);
        setNoteCreateInputValue('');
        toggleNoteCreateModal();
    }

    return (
        <div>
            <button
                onClick={toggleNoteCreateModal}
                style={{ marginBottom: 15 }}
                className="btn btn-success btn-sm"
            >
                Create New Note
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
                                <form className="form-auth-small m-t-20">
                                    <div className="form-group">
                                        <label htmlFor="signin-email" className="control-label sr-only">
                                            Note
                                        </label>
                                        <input
                                            type="text"
                                            placeholder='Type Your Note'
                                            className="form-control round"
                                            value={noteCreateInputValue}
                                            onChange={(e) => setNoteCreateInputValue(e.target.value)}
                                        />
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
