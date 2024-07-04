import React, { useState, useEffect } from "react";
import styled from "styled-components";
import NavBar from "./Components/NavBar";
import { useDropzone } from 'react-dropzone';
import { useSelector, useDispatch } from "react-redux";
import {

    selectUserStatus,
    selectUser,
    getUser,
    updateUserProfile,
} from "@/Features/users/userSlice";
import axios from "axios";

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
} from "./Styling/Profile.styles";

function Profile() {
    const dispatch = useDispatch();
    const user = useSelector(selectUser);

    // State variables for form inputs
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [accountType, setAccountType] = useState("");
    const [school, setSchool] = useState("");
    const [specialty, setSpecialty] = useState("");
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [droppedImage, setDroppedImage] = useState(null);
    const [droppedFile, setDroppedFile] = useState(null);


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
    }, [dispatch]);


    useEffect(() => {
        if (user) {
            setFullName(user.name || "");
            setEmail(user.email || "");
            setAccountType(user.role || "");
            setSchool(user.school || "");
            setSpecialty(user.positiontitle || "");

            if (user.profile_image) {
                setDroppedImage(user.profile_image);
            }
        }
    }, [user]);

    const handleUpdateProfile = async () => {
        try {
            const formData = new FormData();

            // Check if droppedImage is set and append it to formData
            if (droppedImage) {
                // If droppedImage is a File object (if using Dropzone), directly append it
                if (droppedImage instanceof File) {
                    formData.append("profile_image", droppedImage);
                } else {
                    // If droppedImage is a URL (if using an image preview), fetch the file and append
                    const response = await fetch(droppedImage);
                    const blob = await response.blob();
                    formData.append("profile_image", blob, "profile_image.png"); // Adjust filename as needed
                }
            }

            formData.append("description", user.description);
            formData.append("name", user.name);
            formData.append("email", user.email);
            formData.append("role", user.role);
            formData.append("school", user.school);
            formData.append("positiontitle", user.positiontitle);
            formData.append("company_name", user.company_name);

            const response = await axios.post(
                `${appUrl}/api/update-profile/${user.id}`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: `Bearer ${localStorage.getItem(
                            "accessToken"
                        )}`,
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
                school,
                positiontitle: specialty,
            })
        );
        setShowSuccessMessage(true);

        // Hide success message after 2 seconds
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

    if (!user) {
        return <div>Loading...</div>;
    }


    return (
        <NavBar header={"My Profile"}>
            <Main>
                <Section>
                    <Title>Teacher Name</Title>
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
                        onChange={(e) => setSchool(e.target.value)}
                    />
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
