import React, { useState } from "react";
import styled from "styled-components";

const ModalWrapper = styled.div`
    /* Styles for modal wrapper */
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    z-index: 1000;
`;

const ModalBackdrop = styled.div`
    /* Styles for modal backdrop */
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1000;
`;

const Modal = ({ onClose, onSubmit }) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const handleTitleChange = (e) => setTitle(e.target.value);
    const handleDescriptionChange = (e) => setDescription(e.target.value);

    const handleSubmit = () => {
        onSubmit(title, description);
        onClose();
    };

    return (
        <>
            <ModalBackdrop onClick={onClose} />
            <ModalWrapper>
                <h2>Create Event</h2>
                <label>Title:</label>
                <input type="text" value={title} onChange={handleTitleChange} />
                <label>Description:</label>
                <textarea value={description} onChange={handleDescriptionChange} />
                <button onClick={handleSubmit}>Save</button>
                <button onClick={onClose}>Cancel</button>
            </ModalWrapper>
        </>
    );
};

export default Modal;
