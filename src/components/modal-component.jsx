import {useState} from "react";
import Button from "./items/buttonElement";

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
                                        <Button kind='default' content='cancel' onClick={toggleModal} />
                                    ) : (
                                        <CloseButton onClick={toggleModal} />
                                    )}

                                    <Button type='submit' kind='success' content='confirm' style={{marginLeft: 10}} />
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