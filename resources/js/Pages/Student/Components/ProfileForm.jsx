import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useDropzone } from 'react-dropzone';




const Dropzone = ({ onDrop }) => {
    const { getRootProps, getInputProps } = useDropzone({ onDrop });

    return (
        <DropzoneContainer {...getRootProps()}>
            <input {...getInputProps()} />
            <p>Drop a profile image here</p>
        </DropzoneContainer>
    );
};




function ProfileForm() {
    const [user, setUser] = useState(null);
    const [droppedImage, setDroppedImage] = useState(null);
    const [userData, setUserData] = useState({
        description: user && user.description !== null ? user.description : '',
    });

    const handleDrop = (acceptedFiles) => {
        if (acceptedFiles && acceptedFiles.length > 0) {
            const file = acceptedFiles[0];
            const imageUrl = URL.createObjectURL(file);
            console.log('Dropped image URL:', imageUrl); // Debugging
            setDroppedImage(imageUrl);
        }
    };


    useEffect(() => {
        // Fetch the XSRF token from cookies and set it in Axios headers
        const csrfToken = document.cookie
            .split('; ')
            .find(row => row.startsWith('XSRF-TOKEN='))
            ?.split('=')[1];
        axios.defaults.headers.common['X-XSRF-TOKEN'] = csrfToken;

        // Function to fetch the user ID
        const fetchUserId = async () => {
            try {
                const response = await axios.get(`/api/user-id`);
                setUser(response.data.user);
                console.log('Fetched User :', response.data.user);
                console.log(user,"testuser")
            } catch (error) {
                console.error('Error fetching user ID:', error);
            }
        };

        fetchUserId();
    }, []);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };
    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <ProfileWrapper>
            <ProfileHeader>Student Name</ProfileHeader>
            <ProfileSection>
                <ProfileContainer>
                <ProfileImageWrapper>
                        {droppedImage ? (
                            <ProfileImage loading="lazy" src={droppedImage} alt="Profile" />
                        ) : user.profile_image ? (
                            <ProfileImage loading="lazy" src={user.profile_image} alt="Profile" />
                        ) : (
                            <Dropzone onDrop={handleDrop} />
                        )}
                    </ProfileImageWrapper>
                    <ProfileBio>
                        <BioHeader>Bio:</BioHeader>
                        {user && user.description !== null && user.description !== '' ? (
                    <BioContent>
                        {user.description}
                    </BioContent>
                ) : (
                    <DetailValue
                        name="description"
                        value={userData.description}
                        onChange={handleChange}
                        placeholder="Add a few words about yourself..."
                    />
                )}
            </ProfileBio>
                </ProfileContainer>
            </ProfileSection>
            <ProfileDetail>
                <ProfileDetailItem>
                    <DetailLabel>Full Name</DetailLabel>
                    <DetailValue
                        type="text"
                        name="name"
                        value={user.name}
                        onChange={handleChange}
                    />
                </ProfileDetailItem>
                <ProfileDetailItem>
                    <DetailLabel>Email</DetailLabel>
                    <DetailValue
                        type="email"
                        name="email"
                        value={user.email}
                        onChange={handleChange}
                    />
                </ProfileDetailItem>
                <ProfileDetailItem>
                    <DetailLabel>Account Type</DetailLabel>
                    <DetailValue
                        type="text"
                        name="accountTypes"
                        value={user.role}

                    />
                </ProfileDetailItem>
                <ProfileDetailItem>
                    <DetailLabel>Education Institute</DetailLabel>
                    <DetailValue
                        type="text"
                        name="educationInstitute"
                        value={user.school}
                        onChange={handleChange}
                    />
                </ProfileDetailItem>
                <ProfileDetailItem>
                    <DetailLabel>Preferred Position Title</DetailLabel>
                    <DetailValue
                        type="text"
                        name="preferredPosition"
                        value={user.positiontitle}
                        onChange={handleChange}
                    />
                </ProfileDetailItem>
            </ProfileDetail>
            <EditProfileButton>Edit Profile</EditProfileButton>
        </ProfileWrapper>
    );
}

const ProfileWrapper = styled.section`
    display: flex;
    flex-direction: column;
    align-items: stretch;
    min-width: 300px; /* Set a minimum width */
    border-radius: 10px;
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
    background-color: #fff;
    gap: 40px;
    padding: 40px 30px;
`;
const ProfileHeader = styled.h1`
    color: #6b538c;
    text-decoration: underline;
    align-self: center;
    font-weight: 600;
    font-size: 32px;
    font-family: Poppins, sans-serif;
`;
const ProfileSection = styled.section`
    margin-top: 40px;
    @media (max-width: 991px) {
        max-width: 100%;
    }
`;
const ProfileContainer = styled.div`
    gap: 20px;
    display: flex;
    @media (max-width: 991px) {
        flex-direction: column;
        align-items: stretch;
        gap: 0;
    }
`;
const ProfileImageWrapper = styled.figure`
    display: flex;
    flex-direction: column;
    line-height: normal;
    width: 26%;
    margin: 0 auto;
    @media (max-width: 991px) {
        width: 100%;
        margin-top: 20px;
    }
`;
const ProfileImage = styled.img`
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    border: 2px solid rgba(45, 54, 72, 1);
    background-color: #edf0f7;
    display: block;





    @media (max-width: 991px) {
        padding: 0 20px;
    }
`;
const ProfileBio = styled.div`
    display: flex;
    flex-direction: column;
    width: 74%;
    margin-left: 20px;
    @media (max-width: 991px) {
        width: 100%;
        margin-top: 20px;
    }
`;
const BioHeader = styled.h2`
    color: #2d3648;
    letter-spacing: 0.1px;
    font-weight: 500;
    font-size: 14px;
    font-family: Poppins, sans-serif;
`;
const BioContent = styled.div`
    border-radius: 10px;
    border: 2px solid #7b757f;
    background-color: #eedcff;
    margin-top: 8px;
    display: flex;
    flex-direction: column;
    padding: 12px;
`;
const BioLine = styled.div`
    border-radius: 3px;
    background-color: #260e44;
    height: 16px;
    margin-top: 8px;
    &:first-child {
        margin-top: 0;
    }
`;
const BioStatus = styled.div`
    display: flex;
    margin-top: 8px;
    padding-right: 80px;
    gap: 0;
    @media (max-width: 991px) {
        padding-right: 20px;
    }
`;
const BioStatusItem = styled.div`
    border-radius: 3px;
    background-color: #260e44;
    height: 16px;
    flex: 1;
    &:first-child {
        border-radius: 3px 0 0 3px;
    }
    &:last-child {
        border-radius: 0 3px 3px 0;
    }
`;
const ProfileDetail = styled.section`
    margin-top: 20px;
`;
const ProfileDetailItem = styled.div`
    margin-top: 20px;
`;
const DetailLabel = styled.label`
    color: #6b538c;
    letter-spacing: 0.1px;
    font-weight: 500;
    font-size: 14px;
    font-family: Poppins, sans-serif;
`;
const DetailValue = styled.input`
    align-items: start;
    border-radius: 6px;
    border: 2px solid #260e44;
    background-color: #fff7ff;
    margin-top: 8px;
    color: #7b757f;
    letter-spacing: 0.25px;
    padding: 19px 12px;
    font-size: 14px;
    font-family: Poppins, sans-serif;
    line-height: 143%;
    width: 100%;
    box-sizing: border-box;
    @media (max-width: 991px) {
        max-width: 100%;
        padding-right: 20px;
    }
`;
const EditProfileButton = styled.button`
    justify-content: center;
    border-radius: 12px;
    background: linear-gradient(135deg, #6b538c, #a97bbf);
    align-self: start;
    margin-top: 20px;
    color: #fff;
    letter-spacing: 0.5px;
    padding: 8px 16px;
    font-weight: 700;
    font-size: 16px;
    line-height: 150%;
    font-family: Roboto, sans-serif;
    border: none;
    cursor: pointer;
    transition: background 0.3s ease, transform 0.2s ease;

    &:hover {
        background: linear-gradient(135deg, #543b6f, #8e6aae);
        transform: scale(1.05);
    }
`;


const DropzoneContainer = styled.div`
    border: 2px dashed #6b538c;
    border-radius: 10px;
    padding: 20px;
    text-align: center;
    color: #6b538c;
    font-family: Poppins, sans-serif;
    font-size: 14px;
    font-weight: 500;
    letter-spacing: 0.1px;
    cursor: pointer;
    transition: background-color 0.2s ease-in-out;

    &:hover {
        background-color: #f3e8ff;
    }
`;

export default ProfileForm;
