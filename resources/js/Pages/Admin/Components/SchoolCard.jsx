import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateUserProfile, getAllUsers } from '@/Features/users/userSlice';
import { editSchool } from '@/Features/schools/schoolsSlice';
import { Description } from '@/Pages/SignUp/EmployerSignUp';
import { CardContainer, CardInfo, Avatar, InfoText, CardActions, Button, Input } from '../Styling/Card.styles';



const SchoolCardComponent = ({ name, email, id, profileImage, schoolId, status, onViewClick, onDeleteClick, role, emailVerified, description, rememberToken, company, positiontitle, fontSize, darkMode, principal, phone, location }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

    // State variables for each editable field
    const [editName, setEditName] = useState(name);
    const [editEmail, setEditEmail] = useState(email);
    const [editLocation, setEditLocation] = useState(location);
    const [editDescription, setEditDescription] = useState(description);
    const [editPrincipal, setEditPrincipal] = useState(principal);
    const [editPhone, setEditPhone] = useState(phone);


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
        onDeleteClick(id); // Pass the school id to delete to the parent component
        setShowDeleteConfirmation(false);
    };

    const cancelDelete = () => {
        setShowDeleteConfirmation(false);
    };

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSaveClick = () => {
        // Dispatch editSchool instead of updateUserProfile
        dispatch(
            editSchool({
                schoolId: id,
                editedSchoolData: {
                    name: editName,
                    contact_email: editEmail,
                    location: editLocation,
                    description: editDescription,
                    principal_name: editPrincipal,
                    contact_phone: editPhone,

                },
            })
        );
        setIsEditing(false);
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
        // Revert changes by resetting state variables to original values
        setEditName(name);
        setEditEmail(email);
        setEditLocation(location);
        setEditDescription(description);
        setEditPrincipal(principal);
        setEditPhone(phone);

    };

    return (
        <CardContainer fontSize={fontSize} darkMode={darkMode} data-testid={`user-card-${email}`}>
            <CardInfo fontSize={fontSize} darkMode={darkMode}>
                {isEditing ? (
                    <InfoText fontSize={fontSize} darkMode={darkMode}>
                        <Input fontSize={fontSize} darkMode={darkMode} type="text" value={editName} onChange={(e) => setEditName(e.target.value)} />
                        <Input fontSize={fontSize} darkMode={darkMode} type="text" value={editLocation} onChange={(e) => setEditLocation(e.target.value)} />
                        <Input fontSize={fontSize} darkMode={darkMode} type="text" value={editPrincipal} onChange={(e) => setEditPrincipal(e.target.value)} />
                        <Input fontSize={fontSize} darkMode={darkMode} type="text" value={editEmail} onChange={(e) => setEditEmail(e.target.value)} />
                        <Input fontSize={fontSize} darkMode={darkMode} type="text" value={editPhone} onChange={(e) => setEditPhone(e.target.value)} />
                        <Input fontSize={fontSize} darkMode={darkMode} type="text" value={editDescription} onChange={(e) => setEditDescription(e.target.value)} />



                    </InfoText>
                ) : (
                    <InfoText fontSize={fontSize} darkMode={darkMode}>
                        {name &&<p>Name: {name}</p>}
                       {schoolId && <p>SchoolID: {schoolId}</p>}
                       {location &&<p>Location: {location}</p>}
                        {principal &&<p>Current Principal: {principal}</p>}
                      {email && <p>Email: {email}</p>}
                      {phone &&  <p>Phone: {phone}</p>}
                       {description && <p>Description: {description}</p>}
                       {positiontitle && <p>Position Title: {positiontitle}</p>}
                        {company && <p>Company: {company}</p>}
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
    );
};

export default SchoolCardComponent;
