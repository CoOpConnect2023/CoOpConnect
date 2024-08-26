import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateUserProfile, getAllUsers } from '@/Features/users/userSlice';
import { putCourse } from '@/Features/courses/coursesSlice';
import { Description } from '@/Pages/SignUp/EmployerSignUp';
import { CardContainer, CardInfo, Avatar, InfoText, CardActions, Button, Input } from '../Styling/Card.styles';



const CoursesCardComponent = ({ name, email, id, profileImage, schoolId, status, onViewClick, onDeleteClick, role, emailVerified, description, rememberToken, company, positiontitle, fontSize, darkMode, principal, phone, location, startDate, endDate, teacherID }) => {
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
        console.log("Saving course with the following details:", {
            courseId: id,
            name: editName,
            startDate: editStartDate,
            endDate: editEndDate,
            teacherID: teacherID,
            schoolId: schoolId
        });
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
                        {name && <p>Name: {name}</p>}
                        {schoolId && <p>School-ID: {schoolId}</p>}
                        {teacherID && <p>Teacher-ID: {teacherID}</p>}
                        {startDate && <p>Start Date: {startDate}</p>}
                        {endDate && <p>End Date: {endDate}</p>}
                        {phone && <p>Phone: {phone}</p>}
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

export default CoursesCardComponent;
