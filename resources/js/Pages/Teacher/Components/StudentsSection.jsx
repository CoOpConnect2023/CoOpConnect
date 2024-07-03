import * as React from "react";
import styled from "styled-components";
import { useState, useEffect } from "react";

function StudentsSection() {
    const [students, setStudents] = useState([]);
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get(
                    `http://127.0.0.1:8000/api/usersindex`
                );
                console.log(response.data);
                setStudents(response.data.slice(0, 4));
            } catch (error) {
                console.error("Error fetching user ID:", error);
            }
        };
        fetchUsers();
    }, []);

    return (
        <Section>
            <SectionTitle>Current Students</SectionTitle>
            <StyledTable>
                <thead>
                    <tr>
                        <th>Student</th>
                        <th>Classroom</th>
                        <th
                            style={{
                                textAlign: "center",
                            }}
                        >
                            Email
                        </th>
                        <th
                            style={{
                                textAlign: "center",
                            }}
                        >
                            Student ID
                        </th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {students.map((student, index) => (
                        <tr key={index}>
                            <td>
                                <StudentImageWrapper>
                                    <StudentImage
                                        loading="lazy"
                                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/cb388c4792d2da12914aa0e249254d3a981fcff8dd25ec90cae6e0e0a59e3cbb?apiKey=d66532d056b14640a799069157705b77&"
                                        alt={`Image of ${student.name}`}
                                    />
                                    <StudentName>{student.name}</StudentName>
                                </StudentImageWrapper>
                            </td>
                            <td>{student.class}</td>
                            <td
                                style={{
                                    textAlign: "center",
                                }}
                            >
                                {student.email}
                            </td>
                            <td
                                style={{
                                    textAlign: "center",
                                }}
                            >
                                {student.id}
                            </td>
                            <td>
                                <StudentViewButton>
                                    View Student
                                </StudentViewButton>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </StyledTable>
        </Section>
    );
}

const Section = styled.section`
    border-radius: 10px;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
    background-color: #fff;
    display: flex;
    height: 364px;
    flex-direction: column;
    padding: 20px;
    gap: 20px;
`;

const SectionTitle = styled.h1`
    color: var(--Schemes-Primary, #6b538c);
    font: 500 24px/133% Poppins, sans-serif;
    @media (max-width: 991px) {
        max-width: 100%;
    }
`;

const StyledTable = styled.table`
    width: 100%;
    border-collapse: collapse;
    text-align: left;
    border-radius: 10px;
    border: 1px solid var(--gray-200, #e2e8f0);
    background: var(--white, #fff);
    th {
        padding: 12px;
        border-bottom: 1px solid var(--gray-200, #e2e8f0);
        color: var(--gray-600, #4a5568);
    }
    td {
        padding: 12px;
        border-bottom: 1px solid var(--gray-200, #e2e8f0);
        color: var(--gray-700, #2d3748);
    }
`;

const StudentImageWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 16px;
`;

const StudentImage = styled.img`
    aspect-ratio: 1;
    object-fit: cover;
    object-position: center;
    width: 32px;
    border: 1px solid rgba(123, 117, 127, 1);
    border-radius: 50%;
`;

const StudentName = styled.p`
    margin: 0;
    font-family: Inter, sans-serif;
`;

const StudentViewButton = styled.button`
    font-family: Inter, sans-serif;
    display: flex;
    height: 24px;
    padding: 0px 8px;
    justify-content: center;
    align-items: center;
    gap: 6px;
    border-radius: 6px;
    background: var(--Schemes-Primary, #6b538c);
    color: #fff;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 16px;
    cursor: pointer;
    &:hover {
        background-color: #543e6c;
    }
`;

export default StudentsSection;
