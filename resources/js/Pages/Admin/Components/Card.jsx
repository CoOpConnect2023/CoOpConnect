import React, { useState } from 'react';

import { useDispatch } from 'react-redux';
import { updateUserProfile } from '@/Features/users/userSlice';
import { Description } from '@/Pages/SignUp/EmployerSignUp';
import { CardContainer, CardInfo, Avatar, InfoText, CardActions, Button, Input } from '../Styling/Card.styles';



const Card = ({ name, classroom, email, id, profileImage, schoolId, status, onViewClick, onDeleteClick, onEditSave, role, emailVerified, description, rememberToken, company, positiontitle }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [editName, setEditName] = useState(name);
    const [editEmail, setEditEmail] = useState(email);
    const [editStatus, setEditStatus] = useState(status);
    const dispatch = useDispatch();

    const handleViewClick = () => {
        onViewClick();
    };

    const handleDeleteClick = () => {
        onDeleteClick();
    };

    const beginDelete = () => {
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
                role: role,
                school_id: schoolId,
                profile_image: profileImage,
                company_name: company,
                positiontitle: positiontitle,
                description: description,
                email_verified_at: emailVerified,
                remember_token: rememberToken


            })
        );
        setIsEditing(false);
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
        setEditName(name);
        setEditEmail(email);
        setEditStatus(status);
    };

    return (
        <CardContainer>
            <CardInfo>
                <Avatar src={profileImage} alt={`${name}'s avatar`} />
                {isEditing ? (
                    <InfoText>
                        <Input type="text" value={editName} onChange={(e) => setEditName(e.target.value)} />
                        <Input type="text" value={editEmail} onChange={(e) => setEditEmail(e.target.value)} />
                        <Input type="text" value={editStatus} onChange={(e) => setEditStatus(e.target.value)} />
                    </InfoText>
                ) : (
                    <InfoText>
                        <p>Name: {name}</p>
                        <p>SchoolID: {schoolId}</p>
                        <p>Current Status: {status}</p>
                        <p>Email: {email}</p>
                        <p>UserID: {id}</p>
                    </InfoText>
                )}
            </CardInfo>
            <CardActions>
                <Button onClick={handleViewClick}>View</Button>
                {isEditing ? (
                    <>
                        <Button onClick={handleSaveClick}>Save</Button>
                        <Button onClick={handleCancelEdit}>Cancel</Button>
                    </>
                ) : (
                    <Button onClick={handleEditClick}>Edit</Button>
                )}
                <Button onClick={beginDelete}>Delete</Button>
            </CardActions>


        </CardContainer>
    );
};

export default Card;
