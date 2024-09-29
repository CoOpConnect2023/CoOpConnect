import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { putJob, patchJob } from '@/Features/jobs/jobsSlice'; // Assuming you have a job-related action
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

const JobsCardComponent = ({
    jobTitle, id, jobType, userID, location, postingStatus, skills, description, jobCompany, startDate, endDate, onViewClick, onDeleteClick, fontSize, darkMode,
}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

    // State variables for each editable field
    const [editJobTitle, setEditJobTitle] = useState(jobTitle);
    const [editJobType, setEditJobType] = useState(jobType);
    const [editLocation, setEditLocation] = useState(location);
    const [editPostingStatus, setEditPostingStatus] = useState(postingStatus);
    const [editSkills, setEditSkills] = useState(skills.join(', ')); // Convert array to comma-separated string for input
    const [editDescription, setEditDescription] = useState(description);
    const [editStartDate, setEditStartDate] = useState(startDate);
    const [editEndDate, setEditEndDate] = useState(endDate);

    const dispatch = useDispatch();

    // Job type and posting status options
    const jobTypeOptions = ['Full-Time', 'Part-Time', 'Contract', 'Temporary'];
    const postingStatusOptions = ['Open', 'Closed', 'Paused'];

    const handleViewClick = () => {
        onViewClick();
    };

    const handleDeleteClick = () => {
        setShowDeleteConfirmation(true);
    };

    const confirmDelete = () => {
        onDeleteClick(id); // Pass the job id to delete to the parent component
        setShowDeleteConfirmation(false);
    };

    const cancelDelete = () => {
        setShowDeleteConfirmation(false);
    };

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSaveClick = () => {
        // Ensure editSkills is a string before splitting
        const formattedSkills = typeof editSkills === 'string' ? editSkills.split(',').map(skill => skill.trim()) : editSkills;

        dispatch(
            patchJob({
                jobsId: id,
                jobTitle: editJobTitle,
                jobType: editJobType,
                location: editLocation,
                postingStatus: editPostingStatus,
                skills: formattedSkills, // Use formatted skills array
                description: editDescription,
                startDate: editStartDate,
                endDate: editEndDate,
            })
        );
        setIsEditing(false);
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
        // Revert changes by resetting state variables to original values
        setEditJobTitle(jobTitle);
        setEditJobType(jobType);
        setEditLocation(location);
        setEditPostingStatus(postingStatus);
        setEditSkills(skills.join(', ')); // Convert array to comma-separated string for input
        setEditDescription(description);
        setEditStartDate(startDate);
        setEditEndDate(endDate);
    };

    return (
        <>
            <CardContainer fontSize={fontSize} darkMode={darkMode}>
                <CardInfo fontSize={fontSize} darkMode={darkMode}>
                    {isEditing ? (
                        <InfoText fontSize={fontSize} darkMode={darkMode}>
                            <Input fontSize={fontSize} darkMode={darkMode} type="text" value={editJobTitle} onChange={(e) => setEditJobTitle(e.target.value)} />

                            {/* Job Type Selector */}
                            <select value={editJobType} onChange={(e) => setEditJobType(e.target.value)} fontSize={fontSize} darkMode={darkMode}>
                                {jobTypeOptions.map((option) => (
                                    <option key={option} value={option}>{option}</option>
                                ))}
                            </select>

                            <Input fontSize={fontSize} darkMode={darkMode} type="text" value={editLocation} onChange={(e) => setEditLocation(e.target.value)} />

                            {/* Posting Status Selector */}
                            <select value={editPostingStatus} onChange={(e) => setEditPostingStatus(e.target.value)} fontSize={fontSize} darkMode={darkMode}>
                                {postingStatusOptions.map((option) => (
                                    <option key={option} value={option}>{option}</option>
                                ))}
                            </select>

                            <Input fontSize={fontSize} darkMode={darkMode} type="text" value={editSkills} onChange={(e) => setEditSkills(e.target.value)} />
                            <Input fontSize={fontSize} darkMode={darkMode} type="text" value={editDescription} onChange={(e) => setEditDescription(e.target.value)} />
                            <Input fontSize={fontSize} darkMode={darkMode} type="date" value={editStartDate} onChange={(e) => setEditStartDate(e.target.value)} />
                            <Input fontSize={fontSize} darkMode={darkMode} type="date" value={editEndDate} onChange={(e) => setEditEndDate(e.target.value)} />
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
                            {jobCompany && <p>Company: {jobCompany.name}</p>}
                            {startDate && <p>Start Date: {startDate}</p>}
                            {endDate && <p>End Date: {endDate}</p>}
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
                        <p>Are you sure you want to delete {jobTitle}?</p>
                        <ModalButton fontSize={fontSize} darkMode={darkMode} onClick={confirmDelete}>Yes</ModalButton>
                        <ModalButton fontSize={fontSize} darkMode={darkMode} onClick={cancelDelete}>No</ModalButton>
                    </ModalContent>
                </ConfirmModal>
            )}
        </>
    );
};

export default JobsCardComponent;
