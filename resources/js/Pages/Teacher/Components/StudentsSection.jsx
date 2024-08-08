import React from "react";
import styled, { css } from "styled-components";
import { useSelector } from "react-redux";
import { Link } from "@inertiajs/react";

function StudentsSection({ students }) {
  const darkMode = useSelector((state) => state.accessibility.darkMode);

  return (
    <Section darkMode={darkMode}>
      <SectionTitle darkMode={darkMode}>Current Students</SectionTitle>
      <StyledTable darkMode={darkMode}>
        <thead>
          <tr>
            <th>Student</th>
            <th>Classroom</th>
            <th style={{ textAlign: "center" }}>Email</th>
            <th style={{ textAlign: "center" }}>Student ID</th>
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
                    src={
                      student.profile_image ||
                      "https://cdn.builder.io/api/v1/image/assets/TEMP/cb388c4792d2da12914aa0e249254d3a981fcff8dd25ec90cae6e0e0a59e3cbb?apiKey=d66532d056b14640a799069157705b77&"
                    }
                    alt={`Image of ${student.name}`}
                  />
                  <StudentName darkMode={darkMode}>{student.name}</StudentName>
                </StudentImageWrapper>
              </td>
              <td>{student.class}</td>
              <td style={{ textAlign: "center" }}>{student.email}</td>
              <td style={{ textAlign: "center" }}>{student.id}</td>
              <td>
                <Link href="/teacher/students">
                  <StudentViewButton darkMode={darkMode}>
                    View Student
                  </StudentViewButton>
                </Link>
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
  background-color: ${({ darkMode }) => (darkMode ? "#2D2D2D" : "#fff")};
  color: ${({ darkMode }) => (darkMode ? "#f1f1f1" : "#1a1919")};
  display: flex;
  height: 367px;
  overflow-y: auto;
  flex-direction: column;
  padding: 20px;
  gap: 20px;
  transition: background-color 0.3s, color 0.3s;
  border-color: rgba(123, 117, 127, 1);
    border-style: solid;
    border-width: 1px;
`;

const SectionTitle = styled.h1`
  color: ${({ darkMode }) => (darkMode ? "#EDDCFF" : "#6b538c")};
  font: 500 24px/133% Poppins, sans-serif;
  transition: color 0.3s;
  @media (max-width: 991px) {
    max-width: 100%;
  }
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  text-align: left;
  border-radius: 10px;
  border: 1px solid ${({ darkMode }) => (darkMode ? "#555555" : "#e2e8f0")};
  background: ${({ darkMode }) => (darkMode ? "#3C3C3C" : "#fff")};
  transition: background-color 0.3s, border-color 0.3s;

  th {
    padding: 12px;
    border-bottom: 1px solid ${({ darkMode }) => (darkMode ? "#555555" : "#e2e8f0")};
    color: ${({ darkMode }) => (darkMode ? "#CCCCCC" : "#4a5568")};
  }

  td {
    padding: 12px;
    border-bottom: 1px solid ${({ darkMode }) => (darkMode ? "#555555" : "#e2e8f0")};
    color: ${({ darkMode }) => (darkMode ? "#E0E0E0" : "#2d3748")};
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
  color: ${({ darkMode }) => (darkMode ? "#E0E0E0" : "#000")};
  transition: color 0.3s;
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
  background: ${({ darkMode }) => (darkMode ? "#543e6c" : "#6b538c")};
  color: #fff;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 16px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${({ darkMode }) => (darkMode ? "#6b538c" : "#543e6c")};
  }
`;

export default StudentsSection;
