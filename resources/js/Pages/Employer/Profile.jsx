import React, { useState, useEffect } from "react";
import styled from "styled-components";
import NavBar from "./Components/NavBar";
import ReflectionDocuments from "../Employer/Components/ReflectionDocuments";
import { useDropzone } from "react-dropzone";
import { useSelector, useDispatch } from "react-redux";
import {

    selectUserStatus,
    selectUser,
    getUser,
    updateUserProfile,
} from "@/Features/users/userSlice";
import {
    Main,
    Section,
    RightContainer,
    Title,
    ProfileWrapper,
    ProfileDetails,
    ProfileImageWrapper,
    ProfileImage,
    ClearProfileButton,
    BioSection,
    BioTitle,
    BioDescription,
    BioLine,
    BioLineGroup,
    SmallBioLine,
    FieldTitle,
    Input,
    EditProfileButton,
    DetailValue,
    DropzoneContainer,
    SuccessMessage
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

    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [accountType, setAccountType] = useState("");
    const [description, setDescription] = useState("");
    const [company, setCompany] = useState(null);
    const [specialty, setSpecialty] = useState("");
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [droppedImage, setDroppedImage] = useState(null);
    const [droppedFile, setDroppedFile] = useState(null);

    const handleDrop = (acceptedFiles) => {
        if (acceptedFiles && acceptedFiles.length > 0) {
            const file = acceptedFiles[0];
            const imageUrl = URL.createObjectURL(file);
            setDroppedImage(imageUrl);
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
            setDescription(user.description || "");
            setSpecialty(user.positiontitle || "");
            setCompany(user.company_name || "");


            if (user.profile_image) {
                setDroppedImage(user.profile_image);
            }
        }
    }, [user]);





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
            formData.append("school_id", user.school_id);
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
                    description: description,
                    company_name: company,
                    profile_image: droppedImage,
                    email,
                    role: accountType,
                    school_id: user.school_id,
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

        setDroppedImage(null)
    };

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <NavBar>
            <Main>
                <Section>
                    <Title>Employer Profile</Title>
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
                            <BioSection>
                                <BioTitle>Bio:</BioTitle>
                                <DetailValue
                                    name="description"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    placeholder="Add a few words about yourself..."
                                />
                            </BioSection>
                        </ProfileDetails>
                    </ProfileWrapper>
                    <FieldTitle>Full Name</FieldTitle>
                    <Input
                        type="text"
                        name="name"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                    />
                    <FieldTitle>Email</FieldTitle>
                    <Input
                        type="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <FieldTitle>Account Type</FieldTitle>
                    <Input value={accountType} onChange={(e) => setAccountType(e.target.value)} />
                    <FieldTitle>Company</FieldTitle>
                    <Input
                        type="text"
                        name="company_name"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                    />
                    <FieldTitle>Position</FieldTitle>
                    <Input
                        type="text"
                        name="positiontitle"
                        value={specialty}
                        onChange={(e) => setSpecialty(e.target.value)}
                    />
                    <EditProfileButton onClick={handleUpdateProfile}>
                        Edit Profile
                    </EditProfileButton>
                    {showSuccessMessage && <SuccessMessage>Profile updated successfully!</SuccessMessage>}
                </Section>
                <RightContainer>
                    <ReflectionDocuments />
                </RightContainer>
            </Main>
        </NavBar>
    );
}

export default Profile;
