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
    const darkMode = useSelector(state => state.accessibility.darkMode);
    const fontSize = useSelector(state => state.accessibility.textSize);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user?.id) {
            console.log("Fetching courses for user:", user.id);
            dispatch(getCourses(user.id))
                .then(() => setLoading(false))
                .catch((error) => {
                    console.error("Error fetching courses:", error);
                    setLoading(false);
                });
        } else {
            setLoading(false); // Ensure loading state is updated if user is not available
        }
    }, [dispatch, user?.id]);

    const handleCreateClass = () => {
        setLoading(true);
        dispatch(createClass({ newClass, user }))
            .then((action) => {
                console.log("Class created:", action.payload);
                if (action.payload) {
                    dispatch(getCourses(user.id)).finally(() => setLoading(false));
                } else {
                    setLoading(false);
                }
            })
            .catch((error) => {
                console.error("Error creating class:", error);
                setLoading(false);
            });
        setNewClass({ name: "", startDate: "", endDate: "" });
    };

    const handleEditClass = (classId) => {
        dispatch(editClass({ classId, editedClassData: editingClass, user }))
            .then((action) => {
                console.log("Class edited:", action.payload);
                setEditingClass(null);
            })
            .catch((error) => {
                console.error("Error editing class:", error);
            });
    };

    const handleDeleteClass = (classId) => {
        dispatch(deleteClass(classId))
            .then((action) => {
                console.log("Class deleted:", action.payload);
            })
            .catch((error) => {
                console.error("Error deleting class:", error);
            });
    };

    const handleInputChange = (e, isEditing = false) => {
        const { name, value } = e.target;
        if (isEditing) {
            setEditingClass({ ...editingClass, [name]: value });
        } else {
            setNewClass({ ...newClass, [name]: value });
        }
    };

    if (loading) {
        return (
            <LoadingScreen>
                <Spinner />
            </LoadingScreen>
        );
    }

    return (
        <NavBar header={"Manage Classes"}>
            {user && classes && (
                <MainContainer fontSize={fontSize} darkMode={darkMode}>
                    <Section fontSize={fontSize} darkMode={darkMode}>
                        <SectionTitle fontSize={fontSize} darkMode={darkMode}>Classes Taught</SectionTitle>
                        <StyledTable fontSize={fontSize} darkMode={darkMode}>
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
                                            <Button fontSize={fontSize} darkMode={darkMode} onClick={() => setEditingClass(classItem)}>Edit</Button>
                                            <DeleteButton fontSize={fontSize} darkMode={darkMode} onClick={() => handleDeleteClass(classItem.id)}>Delete</DeleteButton>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </StyledTable>
                    </Section>
                    <FormContainer>
                        {editingClass ? (
                            <Form fontSize={fontSize} darkMode={darkMode}>
                                <Input fontSize={fontSize} darkMode={darkMode}
                                    type="text"
                                    name="name"
                                    value={editingClass.name}
                                    onChange={(e) => handleInputChange(e, true)}
                                    placeholder="Class Name"
                                />
                                <Input fontSize={fontSize} darkMode={darkMode}
                                    type="date"
                                    name="startDate"
                                    value={editingClass.startDate}
                                    onChange={(e) => handleInputChange(e, true)}
                                    placeholder="Start Date"
                                />
                                <Input fontSize={fontSize} darkMode={darkMode}
                                    type="date"
                                    name="endDate"
                                    value={editingClass.endDate}
                                    onChange={(e) => handleInputChange(e, true)}
                                    placeholder="End Date"
                                />
                                <Button fontSize={fontSize} darkMode={darkMode} onClick={() => handleEditClass(editingClass.id)}>Save Changes</Button>
                            </Form>
                        ) : (
                            <Form fontSize={fontSize} darkMode={darkMode}>
                                <Input fontSize={fontSize} darkMode={darkMode}
                                    type="text"
                                    name="name"
                                    value={newClass.name}
                                    onChange={handleInputChange}
                                    placeholder="Class Name"
                                />
                                <Input fontSize={fontSize} darkMode={darkMode}
                                    type="date"
                                    name="startDate"
                                    value={newClass.startDate}
                                    onChange={handleInputChange}
                                    placeholder="Start Date"
                                />
                                <Input fontSize={fontSize} darkMode={darkMode}
                                    type="date"
                                    name="endDate"
                                    value={newClass.endDate}
                                    onChange={handleInputChange}
                                    placeholder="End Date"
                                />
                                <Button fontSize={fontSize} darkMode={darkMode} onClick={handleCreateClass}>Create Class</Button>
                            </Form>
                        )}
                    </FormContainer>
                </MainContainer>
            )}
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
