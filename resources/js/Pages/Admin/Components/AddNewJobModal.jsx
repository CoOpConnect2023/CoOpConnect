import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { postJob } from '@/Features/jobs/jobsSlice'; // Import the postJob thunk action
import { Modal, ModalBody, ModalFooter, Input, Button, CancelButton, Select } from '../Styling/AddNewUserModal.styles';
import styled from 'styled-components';

const jobTypes = ['Full-Time', 'Part-Time', 'Contract', 'Temporary'];
const postingStatuses = ['Open', 'Closed', 'Paused'];

const AddJobModal = ({ isOpen, onClose, fontSize, darkMode, companies }) => {
    const [newJob, setNewJob] = useState({
        userId: '', // User ID Field
        jobTitle: '',
        jobType: '',
        location: '',
        postingStatus: '',
        skills: '',
        description: '',
        startDate: '',
        endDate: '',
        companyId: null, // Company ID to be sent in POST request
        companyName: '' // Company name for the dropdown
    });
    const [errorMessage, setErrorMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [filteredCompanies, setFilteredCompanies] = useState([]);
    const [showCompanyDropdown, setShowCompanyDropdown] = useState(false);

    const dispatch = useDispatch(); // Initialize dispatch

    // Handle input change
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewJob({ ...newJob, [name]: value });

        // Filter companies based on input
        if (name === 'companyName') {
            const filtered = companies.filter(company =>
                company.name.toLowerCase().includes(value.toLowerCase())
            );
            setFilteredCompanies(filtered);
            setShowCompanyDropdown(true);
        }
    };

    // Handle selecting a company from the dropdown
    const handleCompanySelect = (companyName, companyId) => {
        setNewJob({ ...newJob, companyName, companyId });
        setShowCompanyDropdown(false); // Hide the company dropdown after selection
    };

    // Handle form submission
    const handleAddJob = async () => {
        setIsLoading(true);
        setErrorMessage(null);

        // Format skills to array
        const formattedSkills = newJob.skills.split(',').map(skill => skill.trim());

        try {
            // Dispatch the postJob action with the newJob data
            const result = await dispatch(postJob({
                userId: newJob.userId,
                title: newJob.jobTitle,
                jobType: newJob.jobType,
                location: newJob.location,
                postingStatus: newJob.postingStatus,
                skills: formattedSkills,
                description: newJob.description,
                startDate: newJob.startDate,
                endDate: newJob.endDate,
                company_id: newJob.companyId // Send the company ID
            })).unwrap();

            console.log('Job added successfully:', result);
            onClose(); // Close modal on success
        } catch (error) {
            console.error('Error adding job:', error);
            setErrorMessage('Failed to add the job. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    if (!isOpen) return null; // Render nothing if modal is not open

    return (
        <Modal>
            <ModalBody>
                <h2>Add New Job</h2>
                {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

                {/* User ID Field */}
                <Input
                    type="text"
                    name="userId"
                    value={newJob.userId}
                    onChange={handleInputChange}
                    placeholder="User ID"
                    fontSize={fontSize}
                    darkMode={darkMode}
                />

                {/* Job Title Field */}
                <Input
                    type="text"
                    name="jobTitle"
                    value={newJob.jobTitle}
                    onChange={handleInputChange}
                    placeholder="Job Title"
                    fontSize={fontSize}
                    darkMode={darkMode}
                />

                {/* Company Field with Autocomplete */}
                <InputContainer>
                    <Input
                        type="text"
                        name="companyName"
                        value={newJob.companyName}
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

                {/* Job Type Selector */}
                <Select
                    name="jobType"
                    value={newJob.jobType}
                    onChange={handleInputChange}
                    fontSize={fontSize}
                    darkMode={darkMode}
                >
                    <option value="">Select Job Type</option>
                    {jobTypes.map((type) => (
                        <option key={type} value={type}>
                            {type}
                        </option>
                    ))}
                </Select>

                {/* Location Field */}
                <Input
                    type="text"
                    name="location"
                    value={newJob.location}
                    onChange={handleInputChange}
                    placeholder="Location"
                    fontSize={fontSize}
                    darkMode={darkMode}
                />

                {/* Posting Status Selector */}
                <Select
                    name="postingStatus"
                    value={newJob.postingStatus}
                    onChange={handleInputChange}
                    fontSize={fontSize}
                    darkMode={darkMode}
                >
                    <option value="">Select Posting Status</option>
                    {postingStatuses.map((status) => (
                        <option key={status} value={status}>
                            {status}
                        </option>
                    ))}
                </Select>

                {/* Skills Field (Comma-Separated String) */}
                <Input
                    type="text"
                    name="skills"
                    value={newJob.skills}
                    onChange={handleInputChange}
                    placeholder="Skills (comma-separated)"
                    fontSize={fontSize}
                    darkMode={darkMode}
                />

                {/* Description Field */}
                <Input
                    type="text"
                    name="description"
                    value={newJob.description}
                    onChange={handleInputChange}
                    placeholder="Job Description"
                    fontSize={fontSize}
                    darkMode={darkMode}
                />

                {/* Start Date Field */}
                <Input
                    type="date"
                    name="startDate"
                    value={newJob.startDate}
                    onChange={handleInputChange}
                    fontSize={fontSize}
                    darkMode={darkMode}
                />

                {/* End Date Field */}
                <Input
                    type="date"
                    name="endDate"
                    value={newJob.endDate}
                    onChange={handleInputChange}
                    fontSize={fontSize}
                    darkMode={darkMode}
                />
            </ModalBody>

            <ModalFooter>
                {/* Add Job Button */}
                <Button
                    fontSize={fontSize}
                    darkMode={darkMode}
                    onClick={handleAddJob}
                    disabled={isLoading}
                >
                    {isLoading ? 'Adding...' : 'Add Job'}
                </Button>

                {/* Cancel Button */}
                <CancelButton fontSize={fontSize} darkMode={darkMode} onClick={onClose}>
                    Cancel
                </CancelButton>
            </ModalFooter>
        </Modal>
    );
};

export default AddJobModal;

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
