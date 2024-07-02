import React, { useState, useEffect } from "react";
import styled from "styled-components";
import NavBar from "./Components/NavBar";
import ReflectionDocuments from "../Employer/Components/ReflectionDocuments";
import { useDropzone } from "react-dropzone";
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
    const [fullName, setFullName] = React.useState("John Doe");
    const [email, setEmail] = React.useState("email123@gmail.com");
    const [accountType, setAccountType] = React.useState(
        "Employer, Teacher, Student"
    );
    const [company, setCompany] = React.useState("Microsoft");
    const [position, setPosition] = React.useState("IT Department Manager");

    const [user, setUser] = useState(null);
    const [droppedImage, setDroppedImage] = useState(null);

    const handleDrop = (acceptedFiles) => {
        if (acceptedFiles && acceptedFiles.length > 0) {
            const file = acceptedFiles[0];
            const imageUrl = URL.createObjectURL(file);
            setDroppedImage(imageUrl);
        }
    };

    useEffect(() => {

        const fetchUserId = async () => {
            try {
                const response = await axios.get(`${appUrl}/api/user-id`);
                const userData = response.data.user;
                userData.skills = userData.skills || "[]";
                setUser(userData);
                console.log(response.data.user);
            } catch (error) {
                console.error("Error fetching user ID:", error);
            }
        };

        fetchUserId();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const addSkill = () => {
        if (user.newSkill.trim() !== "") {
            setUser((prevData) => ({
                ...prevData,
                skills: [...prevData.skills, prevData.newSkill.trim()],
                newSkill: "", // Clear the input field after adding the skill
            }));
        }
    };

    const removeSkill = (index) => {
        const updatedSkills = [...user.skills];
        updatedSkills.splice(index, 1);
        setUser((prevData) => ({
            ...prevData,
            skills: updatedSkills,
        }));
    };

    const handleSubmit = async () => {
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

            // Append other form fields
            formData.append("description", user.description);
            formData.append("name", user.name);
            formData.append("email", user.email);
            formData.append("role", user.role);
            formData.append("school", user.school);
            formData.append("positiontitle", user.positiontitle);
            formData.append("company_name", user.company_name);
            formData.append("skills", user.skills);

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

            console.log("Profile updated:", response.data);
            window.location.reload();
        } catch (error) {
            console.error("Error updating profile:", error);
        }
    };

    const handleClear = () => {
        // Update user state to clear profile image
        setUser({ ...user, profile_image: null });
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
                                ) : user.profile_image ? (
                                    <div>
                                        <ProfileImage
                                            loading="lazy"
                                            src={user.profile_image}
                                            alt="ProfileIMG"
                                        />
                                        <ClearProfileButton
                                            onClick={handleClear}
                                        >
                                            Clear
                                        </ClearProfileButton>
                                    </div>
                                ) : (
                                    <Dropzone onDrop={handleDrop} />
                                )}
                            </ProfileImageWrapper>
                            <BioSection>
                                <BioTitle>Bio:</BioTitle>
                                <DetailValue
                                    name="description"
                                    value={user.description}
                                    onChange={handleChange}
                                    placeholder="Add a few words about yourself..."
                                />
                            </BioSection>
                        </ProfileDetails>
                    </ProfileWrapper>
                    <FieldTitle>Full Name</FieldTitle>
                    <Input
                        type="text"
                        name="name"
                        value={user.name}
                        onChange={handleChange}
                    />
                    <FieldTitle>Email</FieldTitle>
                    <Input
                        type="email"
                        name="email"
                        value={user.email}
                        onChange={handleChange}
                    />
                    <FieldTitle>Account Type</FieldTitle>
                    <Input value={user.role} onChange={handleChange} />
                    <FieldTitle>Company</FieldTitle>
                    <Input
                        type="text"
                        name="company_name"
                        value={user.company_name}
                        onChange={handleChange}
                    />
                    <FieldTitle>Position</FieldTitle>
                    <Input
                        type="text"
                        name="positiontitle"
                        value={user.positiontitle}
                        onChange={handleChange}
                    />
                    <EditProfileButton onClick={handleSubmit}>
                        Edit Profile
                    </EditProfileButton>
                </Section>
                <RightContainer>
                    <ReflectionDocuments />
                </RightContainer>
            </Main>
        </NavBar>
    );
}

export default Profile;
