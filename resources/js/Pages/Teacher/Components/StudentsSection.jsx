import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { Link } from "@inertiajs/react";


const calculateFontSize = (basePixelSize, emValue, factor = 1.5) => {
    const em = parseFloat(emValue); // Convert emValue to a number
    if (emValue === '1em') {
      return `${basePixelSize * em}px`;
    }
    if (emValue === '1.07em') {
      return `${basePixelSize * em * 1.3}px`;
    }
    if (emValue === '1.12em') {
      return `${basePixelSize * em * 1.7}px`;
    }
    return `${basePixelSize * em * factor}px`;
  };

  function StudentsSection({ students, fontSize }) {
    const darkMode = useSelector((state) => state.accessibility.darkMode);


    return (
      <Section darkMode={darkMode} fontSize={fontSize}>
        <SectionTitle darkMode={darkMode} fontSize={fontSize}>Current Students</SectionTitle>
        <TableContainer>
          <StyledTable darkMode={darkMode} fontSize={fontSize}>
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
                      <StudentName darkMode={darkMode} fontSize={fontSize}>{student.name}</StudentName>
                    </StudentImageWrapper>
                  </td>
                  <CourseList>
  {student.courses && student.courses.length > 0
    ? student.courses
        .slice(0, 2) // Display only the first two courses
        .map(course => course.name)
        .join(', ') + (student.courses.length > 2 ? ', ...' : '') // Add "..." if there are more than two
    : 'No courses'}
</CourseList>
                  <td style={{ textAlign: "center" }}>{student.email}</td>
                  <td style={{ textAlign: "center" }}>{student.id}</td>
                  <td>
                    <Link href="/teacher/students">
                      <StudentViewButton darkMode={darkMode} fontSize={fontSize}>
                        View Student
                      </StudentViewButton>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </StyledTable>
        </TableContainer>
      </Section>
    );
  }

  export const Section = styled.section`
  border-radius: 10px;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  background-color: ${({ darkMode }) => (darkMode ? "#2D2D2D" : "#fff")};
  color: ${({ darkMode }) => (darkMode ? "#f1f1f1" : "#1a1919")};
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  padding: 20px;
  transition: background-color 0.3s, color 0.3s;
  border: 1px solid rgba(123, 117, 127, 1);
  box-sizing: border-box;
  font-size: ${({ fontSize }) => calculateFontSize(16, fontSize)};
  width: 100%;
  max-height: 60vh;

  @media (max-width: 768px) {
    padding: 10px;
    max-height: none;
    height: auto;
    width: 100%
  }
`;

export const SectionTitle = styled.h1`
  color: ${({ darkMode }) => (darkMode ? "#EDDCFF" : "#6b538c")};
  font: 500 ${({ fontSize }) => calculateFontSize(24, fontSize)} Poppins, sans-serif;
  transition: color 0.3s;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    font-size: ${({ fontSize }) => calculateFontSize(20, fontSize)};
    margin-bottom: 10px;
  }
`;

export const TableContainer = styled.div`
  overflow-x: auto; /* Enable horizontal scrolling */
  flex-grow: 1;
  height: 100%;
  padding-right: 10px;

  @media (max-width: 768px) {
    padding-right: 5px;
    max-height: 400px;
  }
`;

export const StyledTable = styled.table`
  width: 100%; /* Ensure the table takes up full width */

  border-collapse: collapse;
  text-align: left;
  border-radius: 10px;
  border: 1px solid ${({ darkMode }) => (darkMode ? "#555555" : "#e2e8f0")};
  background: ${({ darkMode }) => (darkMode ? "#3C3C3C" : "#fff")};
  transition: background-color 0.3s, border-color 0.3s;
  font-size: ${({ fontSize }) => calculateFontSize(14, fontSize)};

  th, td {
    padding: 12px;
    font-size: ${({ fontSize }) => calculateFontSize(14, fontSize)};
  }

  th {
    position: sticky;
    top: 0;
    background-color: ${({ darkMode }) => (darkMode ? "#3C3C3C" : "#fff")};
    z-index: 1;
  }

  @media (max-width: 768px) {
    th, td {
      padding: 8px;
      font-size: ${({ fontSize }) => calculateFontSize(12, fontSize)};

    }
  }
`;

export const StudentImageWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;

  @media (max-width: 768px) {
    gap: 10px;
  }
`;

export const StudentImage = styled.img`
  aspect-ratio: 1;
  object-fit: cover;
  object-position: center;
  width: 32px;
  border: 1px solid rgba(123, 117, 127, 1);
  border-radius: 50%;

  @media (max-width: 768px) {
    width: 24px;
  }
`;

export const StudentName = styled.p`
  margin: 0;
  font-family: Inter, sans-serif;
  color: ${({ darkMode }) => (darkMode ? "#E0E0E0" : "#000")};
  transition: color 0.3s;
  font-size: ${({ fontSize }) => calculateFontSize(14, fontSize)};

  @media (max-width: 768px) {
    font-size: ${({ fontSize }) => calculateFontSize(12, fontSize)};
  }
`;

export const StudentViewButton = styled.button`
  font-family: Inter, sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: ${({ fontSize }) => calculateFontSize(6, fontSize)};
  border-radius: ${({ fontSize }) => calculateFontSize(6, fontSize)};
  background: ${({ darkMode }) => (darkMode ? "#543e6c" : "#6b538c")};
  color: #fff;
  font-size: ${({ fontSize }) => calculateFontSize(16, fontSize)};
  font-weight: 500;
  padding: ${({ fontSize }) => calculateFontSize(8, fontSize)} ${({ fontSize }) => calculateFontSize(8, fontSize)};
  height: ${({ fontSize }) => calculateFontSize(30, fontSize)};
  cursor: pointer;
  transition: background-color 0.3s, padding 0.3s, height 0.3s;

  &:hover {
    background-color: ${({ darkMode }) => (darkMode ? "#6b538c" : "#543e6c")};
  }

  @media (max-width: 768px) {
    font-size: ${({ fontSize }) => calculateFontSize(14, fontSize)};
    padding: ${({ fontSize }) => calculateFontSize(3, fontSize)} ${({ fontSize }) => calculateFontSize(6, fontSize)};
  }
`;

const CourseList = styled.td`
  max-width: 150px; // Adjust this width as needed for mobile
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;

  @media (max-width: 768px) {
    max-width: 100px; // Adjust width for smaller screens
  }
`;


export default StudentsSection;
