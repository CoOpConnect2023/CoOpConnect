import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import { useDispatch } from "react-redux";
import styled from 'styled-components';
import { createEmployer, getEmployers } from '@/Features/schools/schoolsSlice';
const appUrl = import.meta.env.VITE_APP_URL;

const calculateFontSize = (basePixelSize, emValue, factor = 1.5) => {
    const em = parseFloat(emValue);
    if (emValue === '1em') return `${basePixelSize * em}px`;
    if (emValue === '1.07em') return `${basePixelSize * em * 1.3}px`;
    if (emValue === '1.12em') return `${basePixelSize * em * 1.7}px`;
    return `${basePixelSize * em * factor}px`;
};

// Styled components
const SectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${({ darkMode }) => (darkMode ? '#2C2C2C' : 'white')};
  transition: background-color 0.5s ease, transform 0.3s ease;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
`;

const SectionTitle = styled.h2`
  color: ${({ darkMode }) => (darkMode ? '#B6A1E5' : '#6E3AA7')};
  transition: color 0.3s ease, transform 0.3s ease;
  font-size: ${({ fontSize }) => calculateFontSize(20, fontSize)};
  margin-bottom: 10px;
`;

const SectionContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const CardList = styled.div`
  margin-bottom: 20px;
  overflow-y: auto;
  padding-right: 10px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const Input = styled.input`
  margin-bottom: 20px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: ${({ fontSize }) => calculateFontSize(16, fontSize)};
  width: 100%;
`;

const Button = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  background-color: ${({ darkMode }) => (darkMode ? '#B6A1E5' : '#6E3AA7')};
  color: white;
  font-size: ${({ fontSize }) => calculateFontSize(16, fontSize)};
  cursor: pointer;
  margin: 0 10px;
  &:hover {
    background-color: #5A2C85;
  }
`;

const ClearButton = styled(Button)`
  background-color: #D9534F;
  &:hover {
    background-color: #C9302C;
  }
`;

const SuccessMessage = styled.div`
  color: green;
  margin-top: 10px;
`;

const UploadUsers = ({ fontSize, darkMode, user }) => {
    const [file, setFile] = useState(null);
    const [parsedData, setParsedData] = useState([]);
    const [successMessage, setSuccessMessage] = useState(false);
    const dispatch = useDispatch();

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        setFile(file);
        const reader = new FileReader();
        reader.onload = (e) => {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, { type: 'array' });

            workbook.SheetNames.forEach(sheetName => {
                const worksheet = workbook.Sheets[sheetName];
                const sheetData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
                const keys = sheetData[0];
                const parsed = sheetData.slice(1).map(row => {
                    const obj = {};
                    keys.forEach((key, index) => {
                        obj[key] = row[index];
                    });
                    return obj;
                });

                if (sheetName.toLowerCase().includes("teacher_employers")) {
                    setParsedData(parsed);
                }
            });
        };
        reader.readAsArrayBuffer(file);
    };

    const handleUpload = async () => {
        if (parsedData.length > 0) {
            try {
                await Promise.all(
                    parsedData.map(record => {
                        const { teacher_id, employer_email, employer_name, company_name } = record;
                        return dispatch(createEmployer({
                            teacher_id,
                            employer_email,
                            employer_name,
                            company_name
                        })).unwrap(); // Unwrap to handle rejections
                    })
                );

                // Ensure user.id is defined before calling getEmployers
                if (user?.id) {
                   
                    await dispatch(getEmployers(user.id));
                } else {
                    console.error("User ID is undefined. Cannot call getEmployers.");
                }

                setSuccessMessage(true);
                setTimeout(() => setSuccessMessage(false), 3000);
            } catch (error) {
                console.error("Error creating employers:", error);
                alert("An error occurred while creating employers.");
            }
        } else {
            alert("No data to upload!");
        }
    };


    const clearFile = () => {
        setFile(null);
        setParsedData([]);
        document.getElementById('fileInput').value = null;
    };

    return (
        <SectionContainer fontSize={fontSize} darkMode={darkMode}>
            <SectionTitle fontSize={fontSize} darkMode={darkMode}>Upload Teacher Employers</SectionTitle>
            <SectionContent fontSize={fontSize} darkMode={darkMode}>
                <CardList fontSize={fontSize} darkMode={darkMode}>
                    <Input fontSize={fontSize} darkMode={darkMode} id="fileInput" type="file" accept=".xlsx, .xls" onChange={handleFileUpload} />
                    {/* Conditionally render download link as a Button if no file is uploaded */}

                </CardList>
                <ButtonContainer fontSize={fontSize} darkMode={darkMode}>
                    <Button fontSize={fontSize} darkMode={darkMode} onClick={handleUpload}>Upload File</Button>
                    {!file && (
                        <Button
                            as="a"
                            href={appUrl + "/files/testuploademployers.xlsx"}
                            download="EmployerUploadTemplate.xlsx"
                            fontSize={fontSize}
                            darkMode={darkMode}
                        >
                            Download Template
                        </Button>
                    )}
                    {file && <ClearButton fontSize={fontSize} darkMode={darkMode} onClick={clearFile}>Clear Current File</ClearButton>}
                </ButtonContainer>
                {successMessage && <SuccessMessage fontSize={fontSize} darkMode={darkMode}>Data uploaded successfully!</SuccessMessage>}
            </SectionContent>
        </SectionContainer>
    );
};

export default UploadUsers;

