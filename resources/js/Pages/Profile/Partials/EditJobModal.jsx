import React, { useState } from "react";
import styled from "styled-components";

const EditJobModal = ({ isOpen, onRequestClose, job, onSave }) => {
    const [formData, setFormData] = useState({
        id: job.id || "",
        title: job.title || "",
        company: job.company || "",
        description: job.description || "",
        postingStatus: job.postingStatus || "open",
        jobType: job.jobType || "hybrid",
        location: job.location || "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        isOpen && (
            <ModalOverlay>
                <ModalContent>
                    <ModalHeader>
                        <h2>Edit Job</h2>
                        <CloseButton onClick={onRequestClose}>×</CloseButton>
                    </ModalHeader>
                    <ModalBody>
                        <Form onSubmit={handleSubmit}>
                            <Label>
                                Job Title
                                <Input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    required
                                />
                            </Label>
                            <Label>
                                Company
                                <Input
                                    type="text"
                                    name="company"
                                    value={formData.company}
                                    onChange={handleChange}
                                    required
                                />
                            </Label>
                            <Label>
                                Description
                                <Textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    required
                                />
                            </Label>
                            <Label>
                                Posting Status
                                <Select
                                    name="postingStatus"
                                    value={formData.postingStatus}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="open">Open</option>
                                    <option value="closed">Closed</option>
                                </Select>
                            </Label>
                            <Label>
                                Job Type
                                <Select
                                    name="jobType"
                                    value={formData.jobType}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="hybrid">Full-time</option>
                                    <option value="remote">Part-time</option>
                                    <option value="on-site">Contract</option>
                                </Select>
                            </Label>
                            <Label>
                                Location
                                <Input
                                    type="text"
                                    name="location"
                                    value={formData.location}
                                    onChange={handleChange}
                                    required
                                />
                            </Label>
                            <SaveButton type="submit">Save Changes</SaveButton>
                        </Form>
                    </ModalBody>
                </ModalContent>
            </ModalOverlay>
        )
    );
};

const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
`;

const ModalContent = styled.div`
    background: white;
    padding: 20px;
    border-radius: 8px;
    width: 80%;
    max-width: 600px;
    max-height: 80%;
    overflow-y: auto;
    position: relative;
`;

const ModalHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #ccc;
    padding-bottom: 10px;
    margin-bottom: 20px;
`;

const CloseButton = styled.button`
    background: none;
    border: none;
    font-size: 24px;
    cursor: pointer;
`;

const ModalBody = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 15px;
`;

const Label = styled.label`
    font-family: Poppins, sans-serif;
    font-size: 16px;
    display: flex;
    flex-direction: column;
`;

const Input = styled.input`
    padding: 10px;
    font-size: 16px;
    border-radius: 4px;
    border: 1px solid #ccc;
`;

const Textarea = styled.textarea`
    padding: 10px;
    font-size: 16px;
    border-radius: 4px;
    border: 1px solid #ccc;
    resize: vertical;
    min-height: 150px; /* Increased size */
`;

const Select = styled.select`
    padding: 10px;
    font-size: 16px;
    border-radius: 4px;
    border: 1px solid #ccc;
`;

const SaveButton = styled.button`
    padding: 10px;
    font-size: 16px;
    background-color: #773dc3;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
`;

export default EditJobModal;
