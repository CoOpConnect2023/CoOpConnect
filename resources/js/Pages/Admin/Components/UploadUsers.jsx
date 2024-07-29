import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import axios from 'axios';
import styled from 'styled-components';
const appUrl = import.meta.env.VITE_APP_URL;

// Styled components
const SectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
`;

const SectionTitle = styled.h2`
  color: #6e3aa7;
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
  font-size: 16px;
`;

const Button = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  background-color: #6e3aa7;
  color: white;
  font-size: 16px;
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

const UploadUsers = () => {
  const [users, setUsers] = useState([]);
  const [file, setFile] = useState(null);
  const [successMessage, setSuccessMessage] = useState(false);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    setFile(file); // Set the file state
    const reader = new FileReader();

    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });

      // Assuming only one sheet, process the first sheet
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];

      // Convert the sheet to JSON with header rows
      const sheetData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

      // First row as keys, rest as data
      const keys = sheetData[0];
      const users = sheetData.slice(1).map(row => {
        const user = {};
        keys.forEach((key, index) => {
          user[key] = row[index];
        });
        return user;
      });

      setUsers(users); // Set users to state for further use


    };

    reader.readAsArrayBuffer(file);
  };

  const clearFile = () => {
    setFile(null);
    setUsers([]);
    document.getElementById('fileInput').value = null; // Reset file input
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
        document.getElementById('fileInput').value = null;
        setSuccessMessage(true);
        setTimeout(() => setSuccessMessage(false), 3000); // Hide message after 3 seconds
      })
      .catch(error => {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.error('Error data:', error.response.data);
          console.error('Error status:', error.response.status);
          console.error('Error headers:', error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          console.error('Error request:', error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.error('Error message:', error.message);
        }
        console.error('Error config:', error.config);
      });
  };

  return (
    <SectionContainer>
      <SectionTitle>Upload Users</SectionTitle>
      <SectionContent>
        <CardList>
          <Input id="fileInput" type="file" accept=".xlsx, .xls" onChange={handleFileUpload} />
        </CardList>
        <ButtonContainer>
          <Button onClick={uploadFile}>Upload File</Button>
          {file && <ClearButton onClick={clearFile}>Clear Current File</ClearButton>}
        </ButtonContainer>
        {successMessage && <SuccessMessage>Users uploaded successfully!</SuccessMessage>}
      </SectionContent>
    </SectionContainer>
  );
};

export default UploadUsers;
