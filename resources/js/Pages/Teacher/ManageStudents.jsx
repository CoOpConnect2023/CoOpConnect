import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import axios from "axios";
import NavBar from "./Components/NavBar";
import { useDispatch, useSelector } from "react-redux";
import { getStudents, getSchools, selectSchoolslist, selectStudents, getCourses, deleteStudent, selectCourses, createStudent } from "@/Features/schools/schoolsSlice";
import { getUser, selectUser } from "@/Features/users/userSlice";
import { MainContainer, Section, SectionTitle, StyledTable, Form, Input, Select, Button, DeleteButton, FixedBottom } from "./Styling/ManageStudents.styles";


const appUrl = import.meta.env.VITE_APP_URL;

function StudentsPage() {
    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    const students = useSelector(selectStudents);
    const courses = useSelector(selectCourses);

    const [newStudent, setNewStudent] = useState({ name: "", email: "", courses: [] });
    const [editingStudent, setEditingStudent] = useState(null);


    useEffect(() => {
        dispatch(getUser());
    }, [dispatch]);

    useEffect(() => {
        if (user?.id) {
            dispatch(getStudents(user.id));
            dispatch(getCourses(user.id));
        }
    }, [dispatch, user?.id]);



    const handleCreateStudent = async () => {
        try {
            const courseId = newStudent.courses.length > 0 ? newStudent.courses[0].id : null;


            await dispatch(createStudent({ id: newStudent.id, courses: newStudent.courses }));


            dispatch(getStudents(user?.id));

            setNewStudent({ id: "", email: "", courses: [] });
        } catch (error) {
            console.error("Error creating student:", error);
        }
    };
    const handleEditStudent = async (studentId) => {
        if (user) {
            const editedStudentData = {
                ...editingStudent,
                teacher_id: user.id,
                school_id: user.school_id,
                courses: editingStudent.courses.map(course => course.id)
            };

            try {
                const response = await axios.put(`${appUrl}/api/v1/students/${studentId}`, editedStudentData);
                setStudents(students.map(std => std.id === studentId ? response.data : std));
                setEditingStudent(null);
            } catch (error) {
                console.error("Error editing student:", error);
            }
        } else {
            console.error("User not found.");
        }
    };

    const handleDeleteStudent = async (studentId) => {
        try {
            dispatch(deleteStudent(studentId));
            dispatch(getStudents(user.id));
        } catch (error) {
            console.error('Error deleting student:', error);
        }
    };

    const handleInputChange = (e, isEditing = false) => {
        const { name, value } = e.target;
        if (isEditing) {
            setEditingStudent({ ...editingStudent, [name]: value });
        } else {
            if (name === "courses") {
                const selectedCourses = Array.from(e.target.selectedOptions, option => ({ id: parseInt(option.value), name: option.label }));
                setNewStudent({ ...newStudent, [name]: selectedCourses });
            } else {
                setNewStudent({ ...newStudent, [name]: value });
            }
        }
    };

    if (!user || !courses || !students) {
        return <LoadingScreen><Spinner /></LoadingScreen>;;
    }

    return (
        <NavBar header={"Manage Students"}>
            <MainContainer>
                <Section>
                    <SectionTitle>Students Enrolled</SectionTitle>
                    <StyledTable>
                        <thead>
                            <tr>
                                <th>Student ID</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Courses</th> {/* Added Courses column */}
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {students && students.map((student, index) => (
                                <tr key={index}>
                                    <td>{student.id}</td>
                                    <td>{student.name}</td>
                                    <td>{student.email}</td>
                                    <td>
                                        <ul>
                                            {student.courses && student.courses.map((course, idx) => (
                                                <li key={idx}>{course.name}</li>
                                            ))}
                                        </ul>
                                    </td>
                                    <td>

                                        <DeleteButton onClick={() => handleDeleteStudent(student.id)}>Delete</DeleteButton>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </StyledTable>
                </Section>

                <FixedBottom>
                    {editingStudent ? (
                        <Form>
                            <Input
                                type="text"
                                name="name"
                                value={editingStudent.name}
                                onChange={(e) => handleInputChange(e, true)}
                                placeholder="Student Name"
                            />
                            <Input
                                type="email"
                                name="email"
                                value={editingStudent.email}
                                onChange={(e) => handleInputChange(e, true)}
                                placeholder="Student Email"
                            />
                            <label htmlFor="courses">Courses:</label>
                            <Select
                                id="courses"
                                name="courses"
                                multiple
                                value={editingStudent.courses.map(course => course.id)}
                                onChange={(e) => handleInputChange(e, true)}
                            >
                                {courses.map(course => (
                                    <option key={course.id} value={course.id}>{course.name}</option>
                                ))}
                            </Select>
                            <Button onClick={() => handleEditStudent(editingStudent.id)}>Save Changes</Button>
                        </Form>
                    ) : (
                        <Form>
                            <Input
                                type="text"
                                name="id"
                                value={newStudent.id}
                                onChange={(e) => handleInputChange(e)}
                                placeholder="Student ID"
                            />

                            <label htmlFor="courses">Courses:</label>
                            <Select
                                id="courses"
                                name="courses"
                                multiple
                                value={newStudent.courses.map(course => course.id)}
                                onChange={(e) => handleInputChange(e)}
                            >
                                {courses.map(course => (
                                    <option key={course.id} value={course.id}>{course.name}</option>
                                ))}
                            </Select>
                            <Button type="button" onClick={handleCreateStudent}>Add Student</Button>
                        </Form>
                    )}
                </FixedBottom>
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

export default StudentsPage;
