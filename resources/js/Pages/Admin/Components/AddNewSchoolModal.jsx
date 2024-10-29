import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { postSchool } from '@/Features/schools/schoolsSlice';
import { Modal, ModalBody, ModalFooter, Input, Button, CancelButton } from '../Styling/AddNewUserModal.styles';
import styled from 'styled-components';

const AddSchoolModal = ({ isOpen, onClose, fontSize, darkMode }) => {
    const [newSchool, setNewSchool] = useState({
        name: '',
        location: '',
        description: '',
        principal_name: '',
        contact_email: '',
        contact_phone: ''
    });
    const [errorMessage, setErrorMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const dispatch = useDispatch(); // Initialize dispatch

    // Handle input change
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewSchool({ ...newSchool, [name]: value });
    };

    // Handle form submission
    const handleAddSchool = async () => {
        setIsLoading(true);
        setErrorMessage(null);

        try {
            // Dispatch the postSchool action with the newSchool data
            const result = await dispatch(postSchool(newSchool)).unwrap();

            console.log('School added successfully:', result);
            onClose(); // Close modal on success
        } catch (error) {
            console.error('Error adding school:', error);
            setErrorMessage('Failed to add the school. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    if (!isOpen) return null; // Render nothing if modal is not open

    return (
        <Modal>
            <ModalBody>
                <h2>Add New School</h2>
                {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

                {/* Name Field */}
                <Input
                    type="text"
                    name="name"
                    value={newSchool.name}
                    onChange={handleInputChange}
                    placeholder="School Name"
                    fontSize={fontSize}
                    darkMode={darkMode}
                />

                {/* Location Field */}
                <Input
                    type="text"
                    name="location"
                    value={newSchool.location}
                    onChange={handleInputChange}
                    placeholder="School Location"
                    fontSize={fontSize}
                    darkMode={darkMode}
                />

                {/* Description Field */}
                <Input
                    type="text"
                    name="description"
                    value={newSchool.description}
                    onChange={handleInputChange}
                    placeholder="School Description"
                    fontSize={fontSize}
                    darkMode={darkMode}
                />

                {/* Principal Name Field */}
                <Input
                    type="text"
                    name="principal_name"
                    value={newSchool.principal_name}
                    onChange={handleInputChange}
                    placeholder="Principal Name"
                    fontSize={fontSize}
                    darkMode={darkMode}
                />

                {/* Contact Email Field */}
                <Input
                    type="email"
                    name="contact_email"
                    value={newSchool.contact_email}
                    onChange={handleInputChange}
                    placeholder="Contact Email"
                    fontSize={fontSize}
                    darkMode={darkMode}
                />

                {/* Contact Phone Field */}
                <Input
                    type="text"
                    name="contact_phone"
                    value={newSchool.contact_phone}
                    onChange={handleInputChange}
                    placeholder="Contact Phone"
                    fontSize={fontSize}
                    darkMode={darkMode}
                />
            </ModalBody>

            <ModalFooter>
                {/* Add School Button */}
                <Button
                    fontSize={fontSize}
                    darkMode={darkMode}
                    onClick={handleAddSchool}
                    disabled={isLoading}
                >
                    {isLoading ? 'Adding...' : 'Add School'}
                </Button>

                {/* Cancel Button */}
                <CancelButton fontSize={fontSize} darkMode={darkMode} onClick={onClose}>
                    Cancel
                </CancelButton>
            </ModalFooter>
        </Modal>
    );
};

export default AddSchoolModal;
