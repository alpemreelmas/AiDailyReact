import React, { useState, useEffect, useRef } from "react";
import { updateProfileSchema } from "../schemas/updateProfileSchema";
import axiosInstance from "../lib/axiosInstance";
import { ZodError } from "zod";
import Button from "./items/buttonElement";
import InputWithLabel from "./items/inputWithLabel";

export function ProfileDropdown() {
    const [showProfileDropdown, setProfileDropdown] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const dropdownRef = useRef(null);
    const modalRef = useRef(null);


    const [user, setUser] = useState(null)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState();
    const [name, setName] = useState('');



    const toggleModal = () => {
        setShowModal(!showModal)
    }



    const toggleProfileDropdown = () => {
        setProfileDropdown(!showProfileDropdown)
    }

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setProfileDropdown(false);
            }
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                setShowModal(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [dropdownRef, modalRef]);




    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const respone = await axiosInstance.get('/auth/profile');
                setUser(respone.data);
            }catch(error){
                console.log(error)
            }
        }

        fetchUserData();
    }, []);






    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors(null)
        try {
            const validated = await updateProfileSchema.parseAsync({name,password})
            const response = await axiosInstance.post("/auth/profile", validated)
            if (!response.data.is_error && response.status == 200){
                const updatedData = response.data.data; // API'den dönen güncellenmiş veriler
                console.log("Updated data:", updatedData);
            }
        }catch (e) {
            if(e instanceof ZodError) {
                var messages = [];
                e.errors.map(obj => messages.push(obj.message))
                setErrors(messages)
            }
            if(e.response.data.is_error){
                setErrors(Array.isArray(e.response.data.message) ? e.response.data.message : [e.respone.data.message])
            }
        }
      };

    return (
        <div ref={dropdownRef}>
            <button className="dropdown-toggle user-name" onClick={toggleProfileDropdown}>
                <strong>{user ? user.data.name : "User not found"}</strong>
            </button>
            {showProfileDropdown && (
                <ul className="dropdown-menu dropdown-menu-right account vivify flipInY">
                    <li>
                        <a href="{{route('pages.profile')}}">
                        <i className="icon-user" />
                        My Profile
                        </a>
                    </li>


                    <li>
                        <button onClick={toggleModal}>
                        <i className="icon-settings" />
                        Settings
                        </button>
                    </li>


                    <li className="divider" />
                    <li>
                        <a href="{{route('authentication.login')}}">
                        <i className="icon-power" />
                        Logout
                        </a>
                    </li>
                </ul>
            )}
            {showModal && (

                <div className="modal fade default-modal show" tabIndex={-1} role="dialog" aria-labelledby="exampleModalCenterTitle" style={{ display: "block" }} aria-modal="true">
                    <div ref={modalRef} className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-body">
                                <div className="d-flex mb-3">
                                    <div>
                                        <h6 className="mb-0">Settings</h6>
                                    </div>
                                </div>
                                <form className="form-auth-small m-t-20" onSubmit={handleSubmit}>
                                    <div className="form-group">
                                        <InputWithLabel type='text' label='name' id='name' value={name} onChange={(e) => setName(e.target.value)} placeholder='Name' />
                                    </div>
                                    <div className="form-group">
                                        <InputWithLabel type='password' label='Password' id='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' />
                                    </div>
                                    <div className="align-right">
                                    <Button kind='default' content='cancel' onClick={toggleModal} />
                                    <Button type='submit' kind='success' content='confirm' style={{marginLeft: 10}} />
                                </div>
                                </form>

                            </div>
                        </div>
                    </div>
                </div>

            )}
        </div>
    )
}

export default ProfileDropdown;
