import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateUserProfile, getAllUsers } from '@/Features/users/userSlice';
import { putCourse } from '@/Features/courses/coursesSlice';
import { Description } from '@/Pages/SignUp/EmployerSignUp';
import { CardContainer, CardInfo, Avatar, InfoText, CardActions, Button, Input } from '../Styling/Card.styles';

import styled from 'styled-components';




const ConfirmModal = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
`;

const ModalContent = styled.div`
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    text-align: center;
    max-width: 400px;
    width: 100%;
`;

const ModalButton = styled(Button)`
    margin: 0 10px;
`;




const JobsCardComponent = ({ name, email, id, profileImage, schoolId, status, onViewClick, onDeleteClick, role, emailVerified, description, rememberToken, company, positiontitle, fontSize, darkMode, principal, phone, location, startDate, endDate, teacherID, jobTitle, userID, jobType, postingStatus, skills, title, jobCompany }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

    // State variables for each editable field
    const [editName, setEditName] = useState(name);
    const [editStartDate, setEditStartDate] = useState(startDate);
    const [editEndDate, setEditEndDate] = useState(endDate);
    const [editTeacherID, setEditTeacherID] = useState(teacherID);
    const [editStudentId, setEditStudentId] = useState(schoolId);



    const dispatch = useDispatch();

    const handleViewClick = () => {
        onViewClick();
    };

    const handleDeleteClick = () => {
        setShowDeleteConfirmation(true);
    };

    const confirmDelete = () => {
        onDeleteClick(id); // Pass the user id to delete to the parent component
        setShowDeleteConfirmation(false);
        console.log(id)
    };

    const cancelDelete = () => {
        setShowDeleteConfirmation(false);
    };


    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSaveClick = () => {

        dispatch(
            putCourse({
                courseId: id,
                name: editName,
                startDate: editStartDate,
                endDate: editEndDate,
                teacherID: editTeacherID,
                schoolID: editStudentId



            })
        );
        setIsEditing(false);
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
        // Revert changes by resetting state variables to original values
        setEditName(name);
        setEditEndDate(endDate);
        setEditStartDate(startDate);
        setEditStudentId(schoolId);
        setEditTeacherID(teacherID);






    };

    return (
        <>
            <CardContainer fontSize={fontSize} darkMode={darkMode} data-testid={`user-card-${email}`}>
                <CardInfo fontSize={fontSize} darkMode={darkMode}>
                    {isEditing ? (
                        <InfoText fontSize={fontSize} darkMode={darkMode}>
                            <Input fontSize={fontSize} darkMode={darkMode} type="text" value={editName} onChange={(e) => setEditName(e.target.value)} />

                            <Input fontSize={fontSize} darkMode={darkMode} type="text" value={editStudentId} onChange={(e) => setEditStudentId(e.target.value)} />
                            <Input fontSize={fontSize} darkMode={darkMode} type="text" value={editTeacherID} onChange={(e) => setEditTeacherID(e.target.value)} />
                            <Input fontSize={fontSize} darkMode={darkMode} type="text" value={editStartDate} onChange={(e) => setEditStartDate(e.target.value)} />
                            <Input fontSize={fontSize} darkMode={darkMode} type="text" value={editEndDate} onChange={(e) => setEditEndDate(e.target.value)} />




                        </InfoText>
                    ) : (
                        <InfoText fontSize={fontSize} darkMode={darkMode}>
                            {jobTitle && <p>Title: {jobTitle}</p>}
                            {id && <p>Job-ID: {id}</p>}
                            {userID && <p>User-ID: {userID}</p>}
                            {jobType && <p>Type: {jobType}</p>}
                            {location && <p>Location: {location}</p>}
                            {postingStatus && <p>Post Status: {postingStatus}</p>}
                            {description && <p>Description: {description}</p>}
                            {skills && <p>Skills: {skills.join(', ')}</p>}
                            {jobCompany && <p>Company: {jobCompany}</p>}
                        </InfoText>
                    )}
                </CardInfo>
                <CardActions fontSize={fontSize} darkMode={darkMode}>
                    <Button fontSize={fontSize} darkMode={darkMode} data-testid={`view-button-${email}`} onClick={handleViewClick}>View</Button>
                    {isEditing ? (
                        <>
                            <Button fontSize={fontSize} darkMode={darkMode} onClick={handleSaveClick}>Save</Button>
                            <Button fontSize={fontSize} darkMode={darkMode} onClick={handleCancelEdit}>Cancel</Button>
                        </>
                    ) : (
                        <Button fontSize={fontSize} darkMode={darkMode} onClick={handleEditClick}>Edit</Button>
                    )}
                    <Button fontSize={fontSize} darkMode={darkMode} data-testid={`delete-button-${email}`} onClick={handleDeleteClick}>Delete</Button>
                </CardActions>
            </CardContainer>

            {showDeleteConfirmation && (
                <ConfirmModal>
                    <ModalContent>
                        <p>Are you sure you want to delete {name}?</p>
                        <ModalButton fontSize={fontSize} darkMode={darkMode} onClick={confirmDelete}>Yes</ModalButton>
                        <ModalButton fontSize={fontSize} darkMode={darkMode} onClick={cancelDelete}>No</ModalButton>
                    </ModalContent>
                </ConfirmModal>
            )}
        </>
    );
};

export default JobsCardComponent;
