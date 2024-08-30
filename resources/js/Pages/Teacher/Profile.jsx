import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import NavBar from "./Components/NavBar";
import { useDropzone } from 'react-dropzone';
import { useSelector, useDispatch } from "react-redux";
import {

    selectUserStatus,
    selectUser,
    getUser,
    updateUserProfile,
} from "@/Features/users/userSlice";
import { getSchools, selectSchoolslist } from "@/Features/schools/schoolsSlice";
import axios from "axios";
import {
    Main,
    Section,
    Title,
    ProfileWrapper,
    ProfileDetails,
    ProfileImageWrapper,
    ProfileImage,
    DropzoneContainer,
    ClearProfileButton,
    SuccessMessage,
    FieldTitle,
    Input,
    EditProfileButton,
    SuggestionsList,
    SuggestionItem,
    StyledParagraph
} from "./Styling/Profile.styles";
import LogoLoadingComponent from "../Common/LogoSpinnerAnimation";

const appUrl = import.meta.env.VITE_APP_URL;


const Dropzone = ({ onDrop }) => {
    const { getRootProps, getInputProps } = useDropzone({ onDrop });
    const darkMode = useSelector(state => state.accessibility.darkMode);
    const fontSize = useSelector(state => state.accessibility.textSize);

    return (
        <DropzoneContainer {...getRootProps()}>
            <input {...getInputProps()} />
            <StyledParagraph darkMode={darkMode} fontSize={fontSize} >Drop a profile image here</StyledParagraph>
        </DropzoneContainer>
    );
};




function Profile() {
    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    const schools = useSelector(selectSchoolslist);
    const darkMode = useSelector(state => state.accessibility.darkMode);
    const fontSize = useSelector(state => state.accessibility.textSize);

    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [accountType, setAccountType] = useState("");
    const [school, setSchool] = useState("");
    const [schoolId, setSchoolId] = useState(null);
    const [specialty, setSpecialty] = useState("");
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [droppedImage, setDroppedImage] = useState(null);
    const [droppedFile, setDroppedFile] = useState(null);
    const [filteredSchools, setFilteredSchools] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);

    const handleDrop = (acceptedFiles) => {
        if (acceptedFiles && acceptedFiles.length > 0) {
            const file = acceptedFiles[0];
            const imageUrl = URL.createObjectURL(file);
            setDroppedImage(imageUrl);
            setDroppedFile(file);
        }
    };

    useEffect(() => {
        dispatch(getUser());
        dispatch(getSchools());
    }, [dispatch]);

    useEffect(() => {
        if (user) {
            setFullName(user.name || "");
            setEmail(user.email || "");
            setAccountType(user.role || "");
            setSpecialty(user.positiontitle || "");
            setSchoolId(user.school_id || null);

            if (user.profile_image) {
                setDroppedImage(user.profile_image);
            }
        }
    }, [user]);

    useEffect(() => {
        if (schools && schools.length > 0 && schoolId) {
            const selectedSchool = schools.find(sch => sch.id === schoolId);
            if (selectedSchool) {
                setSchool(selectedSchool.name);
            }
        }
    }, [schools, schoolId]);

    const handleUpdateProfile = async () => {
        try {
            const formData = new FormData();

            if (droppedImage) {
                if (droppedImage instanceof File) {
                    formData.append("profile_image", droppedImage);
                } else {
                    const response = await fetch(droppedImage);
                    const blob = await response.blob();
                    formData.append("profile_image", blob, "profile_image.png");
                }
            }
            formData.append("id", user.id);
            formData.append("description", user.description);
            formData.append("name", user.name);
            formData.append("email", user.email);
            formData.append("role", user.role);
            formData.append("school_id", schoolId);
            formData.append("positiontitle", user.positiontitle);
            formData.append("company_name", user.company_name);

            await axios.post(
                `${appUrl}/api/update-profile/${user.id}`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                    },
                }
            );

            dispatch(
                updateUserProfile({
                    id: user.id,
                    name: fullName,
                    profile_image: droppedImage,
                    email,
                    role: accountType,
                    school_id: schoolId,
                    positiontitle: specialty,
                })
            );
            setShowSuccessMessage(true);

            setTimeout(() => {
                setShowSuccessMessage(false);
            }, 2000);
        } catch (error) {
            console.error("Error updating profile:", error);
        }
    };

    const handleClear = () => {
        setDroppedImage(null);
    };

    const handleSchoolChange = (e) => {
        const value = e.target.value;
        setSchool(value);
        if (value) {
            const filtered = schools.filter((sch) =>
                sch.name.toLowerCase().includes(value.toLowerCase())
            );
            setFilteredSchools(filtered);
            setShowSuggestions(true);
        } else {
            setShowSuggestions(false);
        }
    };

    const handleSchoolSelect = (schoolName, schoolId) => {
        setSchool(schoolName);
        setSchoolId(schoolId);
        setShowSuggestions(false);
    };

    if (!user || !schools) {
        return <LogoLoadingComponent darkMode={darkMode}/>;;
    }

    return (
        <NavBar darkMode={darkMode} fontSize={fontSize} header={"My Profile"}>
            <Main darkMode={darkMode} fontSize={fontSize}>
                <Section darkMode={darkMode} fontSize={fontSize}>
                    <Title darkMode={darkMode} fontSize={fontSize}>Teacher Profile</Title>
                    <ProfileWrapper darkMode={darkMode} fontSize={fontSize}>
                        <ProfileDetails darkMode={darkMode} fontSize={fontSize}>
                            <ProfileImageWrapper darkMode={darkMode} fontSize={fontSize}>
                                {droppedImage ? (
                                    <ProfileImage darkMode={darkMode} fontSize={fontSize}
                                        loading="lazy"
                                        src={droppedImage}
                                        alt="Profile"
                                    />
                                ) : (
                                    <Dropzone darkMode={darkMode} fontSize={fontSize} onDrop={handleDrop} />
                                )}
                                {droppedImage && (
                                    <ClearProfileButton darkMode={darkMode} fontSize={fontSize} onClick={handleClear}>
                                        Clear
                                    </ClearProfileButton>
                                )}
                            </ProfileImageWrapper>
                        </ProfileDetails>
                    </ProfileWrapper>
                    <FieldTitle darkMode={darkMode} fontSize={fontSize}>Full Name</FieldTitle>
                    <Input darkMode={darkMode} fontSize={fontSize}
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                    />
                    <FieldTitle darkMode={darkMode} fontSize={fontSize}>Email</FieldTitle>
                    <Input darkMode={darkMode} fontSize={fontSize}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <FieldTitle darkMode={darkMode} fontSize={fontSize}>Account Type</FieldTitle>
                    <Input darkMode={darkMode} fontSize={fontSize}
                        value={accountType}
                        onChange={(e) => setAccountType(e.target.value)}
                    />
                    <FieldTitle darkMode={darkMode} fontSize={fontSize}>School</FieldTitle>
                    <Input darkMode={darkMode} fontSize={fontSize}
                        value={school}
                        onChange={handleSchoolChange}
                        onFocus={() => setShowSuggestions(true)}
                        onBlur={() => setTimeout(() => setShowSuggestions(false), 100)} // Delay to allow click event
                    />
                    {showSuggestions && (
                        <SuggestionsList darkMode={darkMode} fontSize={fontSize}>
                            {filteredSchools.map((sch) => (
                                <SuggestionItem darkMode={darkMode} fontSize={fontSize}
                                    key={sch.id}
                                    onClick={() => handleSchoolSelect(sch.name, sch.id)}
                                >
                                    {sch.name}
                                </SuggestionItem>
                            ))}
                        </SuggestionsList>
                    )}
                    <FieldTitle darkMode={darkMode} fontSize={fontSize}>Specialty</FieldTitle>
                    <Input darkMode={darkMode} fontSize={fontSize}
                        value={specialty}
                        onChange={(e) => setSpecialty(e.target.value)}
                    />
                    <EditProfileButton darkMode={darkMode} fontSize={fontSize} onClick={handleUpdateProfile}>
                        Save Profile Changes
                    </EditProfileButton>
                    {showSuccessMessage && <SuccessMessage darkMode={darkMode} fontSize={fontSize}>Profile updated successfully!</SuccessMessage>}
                </Section>
            </Main>
        </NavBar>
    );
}






export default Profile;




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
