import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import NavBar from "./Components/NavBar";
const appUrl = import.meta.env.VITE_APP_URL;

function ClassesPage() {
    const [classes, setClasses] = useState([]);
    const [user, setUser] = useState(null);
    const [newClass, setNewClass] = useState({ name: "", startDate: "", endDate: "" });
    const [editingClass, setEditingClass] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(`${appUrl}/api/user-id`);
                setUser(response.data.user);
            } catch (error) {
                console.error("Error fetching user:", error);
            }
        };
        fetchUser();
    }, []);

    useEffect(() => {
        const fetchClasses = async () => {
            try {
                if (user) {
                    const response = await axios.get(`http://127.0.0.1:8000/api/v1/courses/teacher/${user.id}`);
                    setClasses(response.data.data);
                }
            } catch (error) {
                console.error("Error fetching classes:", error);
            }
        };
        fetchClasses();
    }, [user]);

    const handleCreateClass = async () => {
        try {
            const response = await axios.post(`http://127.0.0.1:8000/api/v1/courses`, {
                ...newClass,
                teacher_id: user.id,
                school_id: user.school_id
            });
            setClasses([...classes, response.data]);
            setNewClass({ name: "", startDate: "", endDate: "" });
        } catch (error) {
            console.error("Error creating class:", error);
        }
    };

    const handleEditClass = async (classId) => {
        if (user) {
            const editedClassData = {
                ...editingClass,
                teacher_id: user.id,
                school_id: user.school_id
            };

            try {
                const response = await axios.put(`${appUrl}/api/v1/courses/${classId}`, editedClassData);
                setClasses(classes.map(cls => cls.id === classId ? response.data : cls));
                setEditingClass(null);
            } catch (error) {
                console.error("Error editing class:", error);
            }
        } else {
            console.error("User not found.");
        }
    };

    const handleDeleteClass = async (classId) => {
        try {
            await axios.delete(`http://127.0.0.1:8000/api/v1/courses/${classId}`);
            setClasses(classes.filter(cls => cls.id !== classId));
        } catch (error) {
            console.error("Error deleting class:", error);
        }
    };

    const handleInputChange = (e, isEditing = false) => {
        const { name, value } = e.target;
        if (isEditing) {
            setEditingClass({ ...editingClass, [name]: value });
        } else {
            setNewClass({ ...newClass, [name]: value });
        }
    };

    return (
        <NavBar header={"Manage Classes"}>
            <Section>
                <SectionTitle>Classes Taught</SectionTitle>
                <StyledTable>
                    <thead>
                        <tr>
                            <th>Class ID</th>
                            <th>Class Name</th>
                            <th>Start Date</th>
                            <th>End Date</th>
                            <th>Students</th>
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
                                <td>{classItem.users.length}</td>
                                <td>
                                    <Button onClick={() => setEditingClass(classItem)}>Edit</Button>
                                    <DeleteButton onClick={() => handleDeleteClass(classItem.id)}>Delete</DeleteButton>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </StyledTable>

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
            </Section>
        </NavBar>
    );
}

const Section = styled.section`
    border-radius: 10px;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
    background-color: #fff;
    display: flex;
    flex-direction: column;
    padding: 20px;
    gap: 20px;
`;

const SectionTitle = styled.h1`
    color: var(--Schemes-Primary, #6b538c);
    font: 500 24px/133% Poppins, sans-serif;
`;

const StyledTable = styled.table`
    width: 100%;
    border-collapse: collapse;
    text-align: left;
    border-radius: 10px;
    border: 1px solid var(--gray-200, #e2e8f0);
    background: var(--white, #fff);
    th, td {
        padding: 12px;
        border-bottom: 1px solid var(--gray-200, #e2e8f0);
        color: var(--gray-700, #2d3748);
    }
    th {
        color: var(--gray-600, #4a5568);
    }
    tbody {
        max-height: 300px;
        overflow-y: auto;
    }
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: 20px;
`;

const Input = styled.input`
    padding: 10px;
    border: 1px solid var(--gray-300, #cbd5e0);
    border-radius: 6px;
    font-size: 16px;
    font-family: Poppins, sans-serif;
`;

const Button = styled.button`
    padding: 10px 20px;
    margin-right: 10px; /* Added margin to separate buttons */
    border: none;
    border-radius: 6px;
    background-color: var(--Schemes-Primary, #6b538c);
    color: #fff;
    font-size: 16px;
    font-family: Poppins, sans-serif;
    cursor: pointer;
    &:hover {
        background-color: #543e6c;
    }
`;

const DeleteButton = styled(Button)`
    background-color: #e53e3e; /* Red color for delete button */
    &:hover {
        background-color: #c53030; /* Darker red on hover */
    }
`;

export default ClassesPage;
