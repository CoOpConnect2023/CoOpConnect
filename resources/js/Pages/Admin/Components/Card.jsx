import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateUserProfile, getAllUsers } from '@/Features/users/userSlice';
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

const Card = ({
    name,
    classroom,
    email,
    id,
    profileImage,
    schoolId,
    status,
    onViewClick,
    onDeleteClick,
    onEditSave,
    role,
    emailVerified,
    description,
    rememberToken,
    company,
    positiontitle,
    fontSize,
    darkMode
}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [editName, setEditName] = useState(name);
    const [editEmail, setEditEmail] = useState(email);
    const [editStatus, setEditStatus] = useState(status);
    const [editVerified, setEditVerified] = useState(parseDateTime(emailVerified));
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
    };

    const cancelDelete = () => {
        setShowDeleteConfirmation(false);
    };

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSaveClick = () => {
        dispatch(
            updateUserProfile({
                id,
                name: editName,
                email: editEmail,
                status: editStatus,
                role,
                school_id: schoolId,
                profile_image: profileImage,
                company_name: company,
                positiontitle,
                description,
                email_verified_at: unparseDateTime(editVerified),
                remember_token: rememberToken
            })
        );
        setIsEditing(false);
        dispatch(getAllUsers());
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
        setEditName(name);
        setEditEmail(email);
        setEditStatus(status);
        setEditVerified(emailVerified)
    };

    function parseDateTime(datetimeString) {
        const date = new Date(datetimeString);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const seconds = date.getSeconds().toString().padStart(2, '0');

        const formattedDate = `${year}-${month}-${day}`;
        const formattedTime = `${hours}:${minutes}:${seconds}`;

        return `${formattedDate} ${formattedTime}`;
    }


    function unparseDateTime(dateString) {
        const [datePart, timePart] = dateString.split(' ');
        const [year, month, day] = datePart.split('-');
        const [hours, minutes, seconds] = timePart.split(':');

        const date = new Date(year, month - 1, day, hours, minutes, seconds);


        return date.toISOString();
    }

    return (
        <>
            <CardContainer fontSize={fontSize} darkMode={darkMode} data-testid={`user-card-${email}`}>
                <CardInfo fontSize={fontSize} darkMode={darkMode}>
                    <Avatar fontSize={fontSize} darkMode={darkMode} src={profileImage} alt={`${name}'s avatar`} />
                    {isEditing ? (
                        <InfoText fontSize={fontSize} darkMode={darkMode}>
                            <Input fontSize={fontSize} darkMode={darkMode} type="text" value={editName} onChange={(e) => setEditName(e.target.value)} />
                            <Input fontSize={fontSize} darkMode={darkMode} type="text" value={editEmail} onChange={(e) => setEditEmail(e.target.value)} />
                            <Input fontSize={fontSize} darkMode={darkMode} type="text" value={editStatus} onChange={(e) => setEditStatus(e.target.value)} />
                            <Input fontSize={fontSize} darkMode={darkMode} type="text" value={editVerified} onChange={(e) => setEditVerified(e.target.value)} />
                        </InfoText>
                    ) : (
                        <InfoText fontSize={fontSize} darkMode={darkMode}>
                            <p>Name: {name}</p>
                            <p>School-ID: {schoolId}</p>
                            <p>Current Status: {status}</p>
                            <p>Email: {email}</p>
                            <p>Verified: {parseDateTime(emailVerified)}</p>
                            <p>User-ID: {id}</p>
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

export default Card;
