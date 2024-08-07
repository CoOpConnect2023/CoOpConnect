import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import axios from "axios";
import NavBar from "./Components/NavBar";
import { useDispatch, useSelector } from "react-redux";
import { getUser, selectUser } from "@/Features/users/userSlice";
import { getStudents, getSchools, selectSchoolslist, selectStudents, getCourses, deleteStudent, selectCourses, createStudent, createClass, editClass, deleteClass } from "@/Features/schools/schoolsSlice";
import { MainContainer, Section, SectionTitle, StyledTable, FormContainer, Form, Input, Button, DeleteButton } from "./Styling/ManageClasses.styles";


function ClassesPage() {

    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    const classes = useSelector(selectCourses);
    const [newClass, setNewClass] = useState({ name: "", startDate: "", endDate: "" });
    const [editingClass, setEditingClass] = useState(null);

    useEffect(() => {
        dispatch(getUser());
    }, [dispatch]);

    useEffect(() => {
        if (user?.id) {

            dispatch(getCourses(user.id));
        }
    }, [dispatch, user?.id]);

    const handleCreateClass = () => {
        dispatch(createClass({ newClass, user }));
        setNewClass({ name: "", startDate: "", endDate: "" });
    };

    const handleEditClass = (classId) => {
        const editedClassData = { ...editingClass };
        dispatch(editClass({ classId, editedClassData, user }));
        setEditingClass(null);
    };

    const handleDeleteClass = (classId) => {
        dispatch(deleteClass(classId));
    };

    useEffect(() => {
    }, [classes]);

    const handleInputChange = (e, isEditing = false) => {
        const { name, value } = e.target;
        if (isEditing) {
            setEditingClass({ ...editingClass, [name]: value });
        } else {
            setNewClass({ ...newClass, [name]: value });
        }
    };

    if (!user || !classes) {
        return <LoadingScreen><Spinner /></LoadingScreen>;;
    }

    return (
        <NavBar header={"Manage Classes"}>
            <MainContainer>
                <Section>
                    <SectionTitle>Classes Taught</SectionTitle>
                    <StyledTable>
                        <thead>
                            <tr>
                                <th>Class ID</th>
                                <th>Class Name</th>
                                <th>Start Date</th>
                                <th>End Date</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {classes.map((classItem, index) => (
                                <tr key={index}>
                                    <td>{classItem.id}</td>
                                    <td>{classItem.name}</td>
                                    <td>{classItem.startDate}</td>
                                    <td>{classItem.endDate}</td>
                                    <td>
                                        <Button onClick={() => setEditingClass(classItem)}>Edit</Button>
                                        <DeleteButton onClick={() => handleDeleteClass(classItem.id)}>Delete</DeleteButton>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </StyledTable>
                </Section>
                <FormContainer>
                    {editingClass ? (
                        <Form>
                            <Input
                                type="text"
                                name="name"
                                value={editingClass.name}
                                onChange={(e) => handleInputChange(e, true)}
                                placeholder="Class Name"
                            />
                            <Input
                                type="date"
                                name="startDate"
                                value={editingClass.startDate}
                                onChange={(e) => handleInputChange(e, true)}
                                placeholder="Start Date"
                            />
                            <Input
                                type="date"
                                name="endDate"
                                value={editingClass.endDate}
                                onChange={(e) => handleInputChange(e, true)}
                                placeholder="End Date"
                            />
                            <Button onClick={() => handleEditClass(editingClass.id)}>Save Changes</Button>
                        </Form>
                    ) : (
                        <Form>
                            <Input
                                type="text"
                                name="name"
                                value={newClass.name}
                                onChange={(e) => handleInputChange(e)}
                                placeholder="Class Name"
                            />
                            <Input
                                type="date"
                                name="startDate"
                                value={newClass.startDate}
                                onChange={(e) => handleInputChange(e)}
                                placeholder="Start Date"
                            />
                            <Input
                                type="date"
                                name="endDate"
                                value={newClass.endDate}
                                onChange={(e) => handleInputChange(e)}
                                placeholder="End Date"
                            />
                            <Button onClick={handleCreateClass}>Create Class</Button>
                        </Form>
                    )}
                </FormContainer>
            </MainContainer>
        </NavBar>
    );
}



const spin = keyframes`
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
`;

const LoadingScreen = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    font-size: 20px;
    background-color: #f0f0f0;
    color: #333;
`;

const Spinner = styled.div`
    border: 4px solid rgba(0, 0, 0, 0.1);
    border-top: 4px solid #3498db;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    animation: ${spin} 1s linear infinite;
`;

export default ClassesPage;
