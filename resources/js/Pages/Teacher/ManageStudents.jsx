import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import NavBar from "./Components/NavBar";

const appUrl = import.meta.env.VITE_APP_URL;

function StudentsPage() {
    const [students, setStudents] = useState([]);
    const [user, setUser] = useState(null);
    const [newStudent, setNewStudent] = useState({ name: "", email: "", courses: [] });
    const [editingStudent, setEditingStudent] = useState(null);
    const [courses, setCourses] = useState([]);

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


    const fetchStudents = async () => {
        try {
            if (user) {
                const response = await axios.get(`http://127.0.0.1:8000/api/students/teacher/${user.id}`);
                setStudents(response.data.students);
            }
        } catch (error) {
            console.error("Error fetching students:", error);
        }
    };

    useEffect(() => {

        fetchStudents();
    }, [user]);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                if (user) {
                    const response = await axios.get(`http://127.0.0.1:8000/api/v1/courses/teacher/${user.id}`);
                    setCourses(response.data.data);
                    console.log("courses",response.data)
                }
            } catch (error) {
                console.error("Error fetching courses:", error);
            }
        };
        fetchCourses();
    }, [user]);

    const handleCreateStudent = async () => {
        try {
            const courseId = newStudent.courses.length > 0 ? newStudent.courses[0].id : null;

            console.log("Creating student with data:", {
                userId: newStudent.id,
                coursesId: courseId
            });

            // Send the POST request
            const response = await axios.post(`http://127.0.0.1:8000/api/v1/usercourses`, {
                userId: newStudent.id,
                coursesId: courseId
            });

            fetchStudents();
            setStudents([...students, response.data]);
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
            await axios.delete(`http://127.0.0.1:8000/api/v1/usercourses/student/${studentId}`);
            setStudents(students.filter(std => std.id !== studentId));
        } catch (error) {
            console.error("Error deleting student:", error);
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

    return (
        <NavBar header={"Manage Students"}>
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
                                    <Button onClick={() => setEditingStudent(student)}>Edit</Button>
                                    <DeleteButton onClick={() => handleDeleteStudent(student.id)}>Delete</DeleteButton>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </StyledTable>

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

const Select = styled.select`
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

export default StudentsPage;
