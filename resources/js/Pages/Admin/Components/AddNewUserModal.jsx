import React, { useState } from 'react';
import axios from 'axios';
import { Modal, ModalBody, ModalFooter, Input, Button, CancelButton, Select } from '../Styling/AddNewUserModal.styles';
import styled from 'styled-components';

const roles = ['Student', 'Employee', 'Teacher', 'Admin']; // Role options

const AddUserModal = ({ isOpen, onClose, fontSize, darkMode, appUrl, companies, schools }) => {
    const [newUser, setNewUser] = useState({
        name: '',
        email: '',
        company_name: '',
        school_name: '',
        password: 'password', // Default password
        role: '', // Selected role
    });
    const [companyId, setCompanyId] = useState(null); // To store selected company ID
    const [schoolId, setSchoolId] = useState(null);   // To store selected school ID
    const [errorMessage, setErrorMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [filteredCompanies, setFilteredCompanies] = useState([]);
    const [filteredSchools, setFilteredSchools] = useState([]);
    const [showCompanyDropdown, setShowCompanyDropdown] = useState(false);
    const [showSchoolDropdown, setShowSchoolDropdown] = useState(false);

    // Handle input change
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewUser({ ...newUser, [name]: value });

        if (name === 'company_name') {
            // Filter companies based on input using the company name
            const filtered = companies.filter(company =>
                company.name.toLowerCase().includes(value.toLowerCase()) // Access 'name' property of the company object
            );
            setFilteredCompanies(filtered);
            setShowCompanyDropdown(true);
        }

        if (name === 'school_name') {
            // Filter schools based on input using the school name
            const filtered = schools.filter(school =>
                school.name.toLowerCase().includes(value.toLowerCase()) // Access 'name' property of the school object
            );
            setFilteredSchools(filtered);
            setShowSchoolDropdown(true);
        }
    };

    // Handle selecting a company from the dropdown
    const handleCompanySelect = (companyName, companyId) => {
        setNewUser({ ...newUser, company_name: companyName });
        setCompanyId(companyId); // Store company ID
        setShowCompanyDropdown(false); // Hide the company dropdown
    };

    // Handle selecting a school from the dropdown
    const handleSchoolSelect = (schoolName, schoolId) => {
        setNewUser({ ...newUser, school_name: schoolName });
        setSchoolId(schoolId); // Store school ID
        setShowSchoolDropdown(false); // Hide the school dropdown
    };

    // Handle form submission
    const handleAddUser = async () => {
        setIsLoading(true);
        setErrorMessage(null);

        try {
            const response = await axios.post(`${appUrl}/api/upload-users`, {
                users: [{
                    name: newUser.name,
                    email: newUser.email,
                    company_id: companyId, // Send company ID instead of name
                    school_id: schoolId,   // Send school ID instead of name
                    password: newUser.password,
                    role: newUser.role,
                    class: "b",
                }],
                schools: [] // Additional data if needed
            });

            console.log('User added successfully:', response.data);
            onClose(); // Close modal on success
        } catch (error) {
            console.error('Error adding user:', error);
            setErrorMessage('Failed to add the user. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    if (!isOpen) return null; // Render nothing if modal is not open

    return (
        <Modal>
            <ModalBody>
                <h2>Add New User</h2>
                {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

                {/* Name Field */}
                <Input
                    type="text"
                    name="name"
                    value={newUser.name}
                    onChange={handleInputChange}
                    placeholder="User Name"
                    fontSize={fontSize}
                    darkMode={darkMode}
                />

                {/* Email Field */}
                <Input
                    type="email"
                    name="email"
                    value={newUser.email}
                    onChange={handleInputChange}
                    placeholder="User Email"
                    fontSize={fontSize}
                    darkMode={darkMode}
                />

                {/* Role Selector */}
                <Select
                    name="role"
                    value={newUser.role}
                    onChange={handleInputChange}
                    fontSize={fontSize}
                    darkMode={darkMode}
                >
                    <option value="">Select Role</option>
                    {roles.map((role) => (
                        <option key={role} value={role}>
                            {role}
                        </option>
                    ))}
                </Select>

                {/* Company Field with Autocomplete */}
                <InputContainer>
                    <Input
                        type="text"
                        name="company_name"
                        value={newUser.company_name}
                        onChange={handleInputChange}
                        placeholder="Company Name"
                        fontSize={fontSize}
                        darkMode={darkMode}
                    />
                    {showCompanyDropdown && filteredCompanies.length > 0 && (
                        <Dropdown>
                            {filteredCompanies.map((company, index) => (
                                <DropdownItem key={index} onClick={() => handleCompanySelect(company.name, company.id)}>
                                    {company.name}
                                </DropdownItem>
                            ))}
                        </Dropdown>
                    )}
                </InputContainer>

                {/* School Field with Autocomplete */}
                <InputContainer>
                    <Input
                        type="text"
                        name="school_name"
                        value={newUser.school_name}
                        onChange={handleInputChange}
                        placeholder="School Name"
                        fontSize={fontSize}
                        darkMode={darkMode}
                    />
                    {showSchoolDropdown && filteredSchools.length > 0 && (
                        <Dropdown>
                            {filteredSchools.map((school, index) => (
                                <DropdownItem key={index} onClick={() => handleSchoolSelect(school.name, school.id)}>
                                    {school.name}
                                </DropdownItem>
                            ))}
                        </Dropdown>
                    )}
                </InputContainer>

                {/* Password Field */}
                <Input
                    type="password"
                    name="password"
                    value={newUser.password}
                    onChange={handleInputChange}
                    placeholder="Password"
                    fontSize={fontSize}
                    darkMode={darkMode}
                />
            </ModalBody>

            <ModalFooter>
                {/* Add User Button */}
                <Button
                    fontSize={fontSize}
                    darkMode={darkMode}
                    onClick={handleAddUser}
                    disabled={isLoading}
                >
                    {isLoading ? 'Adding...' : 'Add User'}
                </Button>

                {/* Cancel Button */}
                <CancelButton fontSize={fontSize} darkMode={darkMode} onClick={onClose}>
                    Cancel
                </CancelButton>
            </ModalFooter>
        </Modal>
    );
};

export default AddUserModal;

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
