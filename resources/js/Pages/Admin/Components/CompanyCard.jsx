import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { putCompany, postCompany } from '@/Features/companies/companySlice';
import { CardContainer, CardInfo, InfoText, CardActions, Button, Input } from '../Styling/Card.styles';
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

const CompanyCardComponent = ({
    id, name, description, address, website, email, onViewClick, onDeleteClick, fontSize, darkMode,
}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

    // State variables for each editable field
    const [editName, setEditName] = useState(name);
    const [editDescription, setEditDescription] = useState(description);
    const [editAddress, setEditAddress] = useState(address);
    const [editWebsite, setEditWebsite] = useState(website);
    const [editEmail, setEditEmail] = useState(email);

    const dispatch = useDispatch();

    const handleViewClick = () => {
        onViewClick();
    };

    const handleDeleteClick = () => {
        setShowDeleteConfirmation(true);
    };

    const confirmDelete = () => {
        onDeleteClick(id); // Pass the company id to delete to the parent component
        setShowDeleteConfirmation(false);
    };

    const cancelDelete = () => {
        setShowDeleteConfirmation(false);
    };

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSaveClick = () => {
        // Prepare the updated company data
        const updatedCompanyData = {
            name: editName,
            description: editDescription,
            address: editAddress,
            website: editWebsite,
            email: editEmail,
        };

        // Dispatch the putCompany action with the companyId and updated data
        dispatch(putCompany({ companyId: id, updatedCompanyData }));

        setIsEditing(false); // Exit editing mode
    };


    const handleCancelEdit = () => {
        setIsEditing(false);
        // Revert changes by resetting state variables to original values
        setEditName(name);
        setEditDescription(description);
        setEditAddress(address);
        setEditWebsite(website);
        setEditEmail(email);
    };

    return (
        <>
            <CardContainer fontSize={fontSize} darkMode={darkMode}>
                <CardInfo fontSize={fontSize} darkMode={darkMode}>
                    {isEditing ? (
                        <InfoText fontSize={fontSize} darkMode={darkMode}>
                            <Input fontSize={fontSize} darkMode={darkMode} type="text" value={editName} onChange={(e) => setEditName(e.target.value)} placeholder="Company Name" />
                            <Input fontSize={fontSize} darkMode={darkMode} type="text" value={editDescription} onChange={(e) => setEditDescription(e.target.value)} placeholder="Description" />
                            <Input fontSize={fontSize} darkMode={darkMode} type="text" value={editAddress} onChange={(e) => setEditAddress(e.target.value)} placeholder="Address" />
                            <Input fontSize={fontSize} darkMode={darkMode} type="text" value={editWebsite} onChange={(e) => setEditWebsite(e.target.value)} placeholder="Website" />
                            <Input fontSize={fontSize} darkMode={darkMode} type="email" value={editEmail} onChange={(e) => setEditEmail(e.target.value)} placeholder="Email" />
                        </InfoText>
                    ) : (
                        <InfoText fontSize={fontSize} darkMode={darkMode}>
                            {id && <p>Company-ID: {id}</p>}
                            {name && <p>Name: {name}</p>}
                            {description && <p>Description: {description}</p>}
                            {address && <p>Address: {address}</p>}
                            {website && <p>Website: {website}</p>}
                            {email && <p>Email: {email}</p>}
                        </InfoText>
                    )}
                </CardInfo>
                <CardActions fontSize={fontSize} darkMode={darkMode}>
                    <Button fontSize={fontSize} darkMode={darkMode} onClick={handleViewClick}>View</Button>
                    {isEditing ? (
                        <>
                            <Button fontSize={fontSize} darkMode={darkMode} onClick={handleSaveClick}>Save</Button>
                            <Button fontSize={fontSize} darkMode={darkMode} onClick={handleCancelEdit}>Cancel</Button>
                        </>
                    ) : (
                        <Button fontSize={fontSize} darkMode={darkMode} onClick={handleEditClick}>Edit</Button>
                    )}
                    <Button fontSize={fontSize} darkMode={darkMode} onClick={handleDeleteClick}>Delete</Button>
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

export default CompanyCardComponent;
