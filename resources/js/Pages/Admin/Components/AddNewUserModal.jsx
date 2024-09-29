import React, { useState } from 'react';
import axios from 'axios';
import { Modal, ModalBody, ModalFooter, Input, Button, CancelButton } from '../Styling/AddNewUserModal.styles';


const AddUserModal = ({ isOpen, onClose, fontSize, darkMode, appUrl }) => {
    const [newUser, setNewUser] = useState({ name: '', email: '', company_name: '' });
    const [errorMessage, setErrorMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewUser({ ...newUser, [name]: value });
    };

    const handleAddUser = async () => {
        setIsLoading(true); // Set loading state
        setErrorMessage(null); // Reset error message

        try {
            // API call to upload new user data to the backend
            const response = await axios.post(`${appUrl}/api/upload-users`, {
                users: [{
                    name: newUser.name,
                    email: newUser.email,
                    company_name: newUser.company_name,
                }],
                schools: [] // If you need to send other data like schools, add it here
            });

            console.log('User added successfully:', response.data);

            // Handle success (e.g., close the modal, refetch users)
            onClose(); // Close the modal
        } catch (error) {
            console.error('Error adding user:', error);
            setErrorMessage('Failed to add the user. Please try again.');
        } finally {
            setIsLoading(false); // Stop loading state
        }
    };

    if (!isOpen) return null; // Render nothing if the modal is not open

    return (
        <Modal>
            <ModalBody>
                <h2>Add New User</h2>
                {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>} {/* Display error message */}
                <Input
                    type="text"
                    name="name"
                    value={newUser.name}
                    onChange={handleInputChange}
                    placeholder="User Name"
                    fontSize={fontSize}
                    darkMode={darkMode}
                />
                <Input
                    type="email"
                    name="email"
                    value={newUser.email}
                    onChange={handleInputChange}
                    placeholder="User Email"
                    fontSize={fontSize}
                    darkMode={darkMode}
                />
                <Input
                    type="text"
                    name="company_name"
                    value={newUser.company_name}
                    onChange={handleInputChange}
                    placeholder="Company Name"
                    fontSize={fontSize}
                    darkMode={darkMode}
                />
            </ModalBody>
            <ModalFooter>
                <Button
                    fontSize={fontSize}
                    darkMode={darkMode}
                    onClick={handleAddUser}
                    disabled={isLoading} // Disable the button while loading
                >
                    {isLoading ? 'Adding...' : 'Add User'}
                </Button>
                <CancelButton fontSize={fontSize} darkMode={darkMode} onClick={onClose}>
                    Cancel
                </CancelButton>
            </ModalFooter>
        </Modal>
    );
};

export default AddUserModal;
