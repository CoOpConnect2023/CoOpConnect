import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { postCompany } from '@/Features/companies/companySlice'; // Import the postCompany thunk action
import { Modal, ModalBody, ModalFooter, Input, Button, CancelButton } from '../Styling/AddNewUserModal.styles';
import styled from 'styled-components';

const AddCompanyModal = ({ isOpen, onClose, fontSize, darkMode }) => {
    const [newCompany, setNewCompany] = useState({
        name: '',
        email: '',
        description: '',
        address: '',
        website: ''
    });
    const [errorMessage, setErrorMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const dispatch = useDispatch(); // Initialize dispatch

    // Handle input change
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewCompany({ ...newCompany, [name]: value });
    };

    // Handle form submission
    const handleAddCompany = async () => {
        setIsLoading(true);
        setErrorMessage(null);

        try {
            // Dispatch the postCompany action with the newCompany data
            const result = await dispatch(postCompany(newCompany)).unwrap();

           
            onClose(); // Close modal on success
        } catch (error) {
            console.error('Error adding company:', error);
            setErrorMessage('Failed to add the company. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    if (!isOpen) return null; // Render nothing if modal is not open

    return (
        <Modal>
            <ModalBody>
                <h2>Add New Company</h2>
                {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

                {/* Name Field */}
                <Input
                    type="text"
                    name="name"
                    value={newCompany.name}
                    onChange={handleInputChange}
                    placeholder="Company Name"
                    fontSize={fontSize}
                    darkMode={darkMode}
                />

                {/* Email Field */}
                <Input
                    type="email"
                    name="email"
                    value={newCompany.email}
                    onChange={handleInputChange}
                    placeholder="Company Email"
                    fontSize={fontSize}
                    darkMode={darkMode}
                />

                {/* Description Field */}
                <Input
                    type="text"
                    name="description"
                    value={newCompany.description}
                    onChange={handleInputChange}
                    placeholder="Company Description"
                    fontSize={fontSize}
                    darkMode={darkMode}
                />

                {/* Address Field */}
                <Input
                    type="text"
                    name="address"
                    value={newCompany.address}
                    onChange={handleInputChange}
                    placeholder="Company Address"
                    fontSize={fontSize}
                    darkMode={darkMode}
                />

                {/* Website Field */}
                <Input
                    type="text"
                    name="website"
                    value={newCompany.website}
                    onChange={handleInputChange}
                    placeholder="Company Website"
                    fontSize={fontSize}
                    darkMode={darkMode}
                />
            </ModalBody>

            <ModalFooter>
                {/* Add Company Button */}
                <Button
                    fontSize={fontSize}
                    darkMode={darkMode}
                    onClick={handleAddCompany}
                    disabled={isLoading}
                >
                    {isLoading ? 'Adding...' : 'Add Company'}
                </Button>

                {/* Cancel Button */}
                <CancelButton fontSize={fontSize} darkMode={darkMode} onClick={onClose}>
                    Cancel
                </CancelButton>
            </ModalFooter>
        </Modal>
    );
};

export default AddCompanyModal;

// Styled Components for Dropdown and positioning

const InputContainer = styled.div`
    position: relative;
    width: 100%;
`;

const Dropdown = styled.ul`
    position: absolute;
    top: 100%; /* Places dropdown right below the input */
    left: 0;
    right: 0;
    z-index: 1000; /* Ensures it appears above other content */
    background-color: #fff;
    border: 1px solid #ccc;
    max-height: 200px;
    overflow-y: auto;
    list-style: none;
    padding: 0;
    margin: 0;
    border-radius: 4px;
`;

const DropdownItem = styled.li`
    padding: 8px 12px;
    cursor: pointer;
    &:hover {
        background-color: #f0f0f0;
    }
`;
