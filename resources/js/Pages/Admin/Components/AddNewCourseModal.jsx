import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createClass } from '@/Features/schools/schoolsSlice';
import { getCourses } from '@/Features/courses/coursesSlice';
import { Modal, ModalBody, ModalFooter, Input, Button, CancelButton, Select } from '../Styling/AddNewUserModal.styles';
import styled from 'styled-components';

const AddCourseModal = ({ isOpen, onClose, fontSize, darkMode, schools, teachers }) => {
    const [newCourse, setNewCourse] = useState({
        teacherId: '', // Teacher ID Field
        name: '',
        startDate: '',
        endDate: '',
        schoolId: null, // School ID to be sent in POST request
        schoolName: '' // School name for the dropdown
    });
    const [errorMessage, setErrorMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [filteredSchools, setFilteredSchools] = useState([]);
    const [showSchoolDropdown, setShowSchoolDropdown] = useState(false);

    const dispatch = useDispatch(); // Initialize dispatch

    // Handle input change
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewCourse({ ...newCourse, [name]: value });

        // Filter schools based on input
        if (name === 'schoolName') {
            const filtered = schools.filter(school =>
                school.name.toLowerCase().includes(value.toLowerCase())
            );
            setFilteredSchools(filtered);
            setShowSchoolDropdown(true);
        }
    };

    // Handle selecting a school from the dropdown
    const handleSchoolSelect = (schoolName, schoolId) => {
        setNewCourse({ ...newCourse, schoolName, schoolId });
        setShowSchoolDropdown(false); // Hide the school dropdown after selection
    };

    // Handle form submission
    const handleAddCourse = async () => {
        setIsLoading(true);
        setErrorMessage(null);

        try {
            // Dispatch the createClass action with newClass and user data
            const result = await dispatch(createClass({
                newClass: {
                    name: newCourse.name,
                    start_date: newCourse.startDate,
                    end_date: newCourse.endDate,
                },
                user: {
                    id: newCourse.teacherId,
                    school_id: newCourse.schoolId,
                },
            })).unwrap();

           

            // Dispatch getCourses after successfully adding a course
            await dispatch(getCourses());

            onClose(); // Close modal on success
        } catch (error) {
            if (error.response && error.response.status === 422) {

                setErrorMessage('Validation failed. Please check the input fields.');
            } else {
                console.error('Error adding course:', error);
                setErrorMessage('Failed to add the course. Please try again.');
            }
        } finally {
            setIsLoading(false);
        }
    };



    if (!isOpen) return null; // Render nothing if modal is not open

    return (
        <Modal>
            <ModalBody>
                <h2>Add New Course</h2>
                {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

                {/* Teacher ID Field */}
                <Select
                    name="teacherId"
                    value={newCourse.teacherId}
                    onChange={handleInputChange}
                    fontSize={fontSize}
                    darkMode={darkMode}
                >
                    <option value="">Select Teacher</option>
                    {teachers.map((teacher) => (
                        <option key={teacher.id} value={teacher.id}>
                            {teacher.name}
                        </option>
                    ))}
                </Select>

                {/* Course Name Field */}
                <Input
                    type="text"
                    name="name"
                    value={newCourse.name}
                    onChange={handleInputChange}
                    placeholder="Course Name"
                    fontSize={fontSize}
                    darkMode={darkMode}
                />

                {/* School Field with Autocomplete */}
                <InputContainer>
                    <Input
                        type="text"
                        name="schoolName"
                        value={newCourse.schoolName}
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

                {/* Start Date Field */}
                <Input
                    type="date"
                    name="startDate"
                    value={newCourse.startDate}
                    onChange={handleInputChange}
                    fontSize={fontSize}
                    darkMode={darkMode}
                />

                {/* End Date Field */}
                <Input
                    type="date"
                    name="endDate"
                    value={newCourse.endDate}
                    onChange={handleInputChange}
                    fontSize={fontSize}
                    darkMode={darkMode}
                />
            </ModalBody>

            <ModalFooter>
                {/* Add Course Button */}
                <Button
                    fontSize={fontSize}
                    darkMode={darkMode}
                    onClick={handleAddCourse}
                    disabled={isLoading}
                >
                    {isLoading ? 'Adding...' : 'Add Course'}
                </Button>

                {/* Cancel Button */}
                <CancelButton fontSize={fontSize} darkMode={darkMode} onClick={onClose}>
                    Cancel
                </CancelButton>
            </ModalFooter>
        </Modal>
    );
};

export default AddCourseModal;

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
