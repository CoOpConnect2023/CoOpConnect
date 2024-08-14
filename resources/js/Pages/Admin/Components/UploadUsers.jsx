import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios';
import styled from 'styled-components';
const appUrl = import.meta.env.VITE_APP_URL;
import { getUser, getAllUsers, selectAllUsers, selectUser, deleteUser } from '@/Features/users/userSlice';

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
  color: ${({ darkMode }) => (darkMode ? '#b6a1e5' : '#6e3aa7')};
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

const StatusContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Input = styled.input`
  margin-bottom: 20px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: ${({ fontSize }) => calculateFontSize(16, fontSize)};
`;

const Button = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  background-color: #6e3aa7;
  color: white;
  font-size: ${({ fontSize }) => calculateFontSize(16, fontSize)};
  cursor: pointer;
  margin: 0 10px;

  &:hover {
    background-color: #0056b3;
  }
`;

const ClearButton = styled(Button)`
  background-color: #d9534f;

  &:hover {
    background-color: #c9302c;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const SuccessMessage = styled.div`
  color: green;
  margin-top: 10px;
`;

const UploadUsers = ({ fontSize, darkMode }) => {
    const [users, setUsers] = useState([]);
    const [file, setFile] = useState(null);
    const [successMessage, setSuccessMessage] = useState(false);

    const dispatch = useDispatch();

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        setFile(file);
        const reader = new FileReader();

        reader.onload = (e) => {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, { type: 'array' });


            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];


            const sheetData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });


            const keys = sheetData[0];
            const users = sheetData.slice(1).map(row => {
                const user = {};
                keys.forEach((key, index) => {
                    user[key] = row[index];
                });
                return user;
            });

            setUsers(users);


        };

        reader.readAsArrayBuffer(file);
    };

    const clearFile = () => {
        setFile(null);
        setUsers([]);
        document.getElementById('fileInput').value = null;
    };

    const uploadFile = () => {
        if (users.length === 0) {
            alert('No users to upload');
            return;
        }

        axios.post(`${appUrl}/api/upload-users`, { users })
            .then(response => {
                console.log("postedusers", users);
                console.log('Response:', response.data);
                console.log('Users uploaded successfully');
                setFile(null);
                setUsers([]);
                dispatch(getAllUsers());
                document.getElementById('fileInput').value = null;
                setSuccessMessage(true);
                setTimeout(() => setSuccessMessage(false), 3000);
            })
            .catch(error => {
                if (error.response) {

                    console.error('Error data:', error.response.data);
                    console.error('Error status:', error.response.status);
                    console.error('Error headers:', error.response.headers);
                } else if (error.request) {

                    console.error('Error request:', error.request);
                } else {

                    console.error('Error message:', error.message);
                }
                console.error('Error config:', error.config);
            });
    };

    return (
        <SectionContainer fontSize={fontSize} darkMode={darkMode}>
            <SectionTitle fontSize={fontSize} darkMode={darkMode}>Upload Users</SectionTitle>
            <SectionContent fontSize={fontSize} darkMode={darkMode}>
                <CardList fontSize={fontSize} darkMode={darkMode}>
                    <Input fontSize={fontSize} darkMode={darkMode} id="fileInput" type="file" accept=".xlsx, .xls" onChange={handleFileUpload} />
                </CardList>
                <ButtonContainer fontSize={fontSize} darkMode={darkMode}>
                    <Button fontSize={fontSize} darkMode={darkMode} onClick={uploadFile}>Upload File</Button>
                    {file && <ClearButton fontSize={fontSize} darkMode={darkMode} onClick={clearFile}>Clear Current File</ClearButton>}
                </ButtonContainer>
                {successMessage && <SuccessMessage fontSize={fontSize} darkMode={darkMode}>Users uploaded successfully!</SuccessMessage>}
            </SectionContent>
        </SectionContainer>
    );
};

export default UploadUsers;
