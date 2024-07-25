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
    SuggestionItem
} from "./Styling/Profile.styles";

const appUrl = import.meta.env.VITE_APP_URL;


const Dropzone = ({ onDrop }) => {
    const { getRootProps, getInputProps } = useDropzone({ onDrop });

    return (
        <DropzoneContainer {...getRootProps()}>
            <input {...getInputProps()} />
            <p>Drop a profile image here</p>
        </DropzoneContainer>
    );
};




function Profile() {
    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    const schools = useSelector(selectSchoolslist);


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
        return <LoadingScreen><Spinner /></LoadingScreen>;;
    }

    return (
        <NavBar header={"My Profile"}>
            <Main>
                <Section>
                    <Title>Teacher Profile</Title>
                    <ProfileWrapper>
                        <ProfileDetails>
                            <ProfileImageWrapper>
                                {droppedImage ? (
                                    <ProfileImage
                                        loading="lazy"
                                        src={droppedImage}
                                        alt="Profile"
                                    />
                                ) : (
                                    <Dropzone onDrop={handleDrop} />
                                )}
                                {droppedImage && (
                                    <ClearProfileButton onClick={handleClear}>
                                        Clear
                                    </ClearProfileButton>
                                )}
                            </ProfileImageWrapper>
                        </ProfileDetails>
                    </ProfileWrapper>
                    <FieldTitle>Full Name</FieldTitle>
                    <Input
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                    />
                    <FieldTitle>Email</FieldTitle>
                    <Input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <FieldTitle>Account Type</FieldTitle>
                    <Input
                        value={accountType}
                        onChange={(e) => setAccountType(e.target.value)}
                    />
                    <FieldTitle>School</FieldTitle>
                    <Input
                        value={school}
                        onChange={handleSchoolChange}
                        onFocus={() => setShowSuggestions(true)}
                        onBlur={() => setTimeout(() => setShowSuggestions(false), 100)} // Delay to allow click event
                    />
                    {showSuggestions && (
                        <SuggestionsList>
                            {filteredSchools.map((sch) => (
                                <SuggestionItem
                                    key={sch.id}
                                    onClick={() => handleSchoolSelect(sch.name, sch.id)}
                                >
                                    {sch.name}
                                </SuggestionItem>
                            ))}
                        </SuggestionsList>
                    )}
                    <FieldTitle>Specialty</FieldTitle>
                    <Input
                        value={specialty}
                        onChange={(e) => setSpecialty(e.target.value)}
                    />
                    <EditProfileButton onClick={handleUpdateProfile}>
                        Edit Profile
                    </EditProfileButton>
                    {showSuccessMessage && <SuccessMessage>Profile updated successfully!</SuccessMessage>}
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
