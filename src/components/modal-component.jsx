import {useState} from "react";

function ModalComponent({children, CloseButton}){
    const [showModal, setShowModal] = useState(false);

    const toggleModal = () => {
        setShowModal(!showModal)
    }
    return (
        <>
            <button onClick={toggleModal} className="icon-menu settings-button">
                <i className="icon-settings"/>
            </button>
            {showModal && (
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
                                {children}
                                <div className="align-right">
                                    {!CloseButton ? (
                                        <button onClick={toggleModal} className="btn btn-default">
                                            Cancel
                                        </button>
                                    ) : (
                                       <CloseButton onClick={toggleModal} />
                                    )}

                                    <button type='submit' className="btn btn-success" style={{marginLeft: 10}}>
                                    Confirm
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            )}
        </>
    )
}

export default ModalComponent