import React, { useState, useEffect } from "react";
import styled from "styled-components";
import NavBar from "./Components/NavBar";
import ReflectionDocuments from "../Employer/Components/ReflectionDocuments";
import { useDropzone } from "react-dropzone";
import { useSelector, useDispatch } from "react-redux";
import { usePrompt } from "@/Hooks/usePrompt";
import { useBeforeUnload } from "@/Hooks/useBeforeUnload";
import {

    selectUserStatus,
    selectUser,
    getUser,
    updateUserProfile,
} from "@/Features/users/userSlice";
import { getAllCompanies, selectCompanies } from "@/Features/companies/companySlice";
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
    SuccessMessage,
    StatusContainer,
    StatusLabel,
    StatusRadioButton,
    LeftSide,
    RightSide,
    InputSection,
    ProfileDetailValue,
    ProfileDetailSection,
} from "./Styling/Profile.styles";

const appUrl = import.meta.env.VITE_APP_URL;

const Dropzone = ({ onDrop }) => {
    const darkMode = useSelector(state => state.accessibility.darkMode);
    const fontSize = useSelector(state => state.accessibility.textSize);
    const { getRootProps, getInputProps } = useDropzone({ onDrop });

    return (
        <DropzoneContainer fontSize={fontSize} darkMode={darkMode} {...getRootProps()}>
            <input {...getInputProps()} />
            <p>Drop a profile image here</p>
        </DropzoneContainer>
    );
};

const AutocompleteList = styled.ul`
  background-color: ${({ darkMode }) => (darkMode ? '#2C2C2C' : '#fff')};
  border: 1px solid ${({ darkMode }) => (darkMode ? '#444' : '#ccc')};
  color: ${({ darkMode }) => (darkMode ? '#f1f1f1' : '#000')};
  max-height: 150px;
  overflow-y: auto;
  margin: 0;
  padding: 0;
  list-style: none;
`;

const AutocompleteItem = styled.li`
  padding: 10px;
  cursor: pointer;
  background-color: ${({ darkMode }) => (darkMode ? '#3C3C3C' : '#fff')};
  &:hover {
    background-color: ${({ darkMode }) => (darkMode ? '#555' : '#f0f0f0')};
  }
  color: ${({ darkMode }) => (darkMode ? '#f1f1f1' : '#000')};
`;


function Profile() {

    const darkMode = useSelector(state => state.accessibility.darkMode);
    const fontSize = useSelector(state => state.accessibility.textSize);
    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    const companies = useSelector(selectCompanies);
    const [userStatus, setUserStatus] = useState("");
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [accountType, setAccountType] = useState("");
    const [description, setDescription] = useState("");
    const [companyName, setCompanyName] = useState(""); // The company name entered by the user
    const [filteredCompanies, setFilteredCompanies] = useState([]); // To store the filtered companies based on input
    const [selectedCompanyId, setSelectedCompanyId] = useState(null);
    const [specialty, setSpecialty] = useState("");
    const [pronouns, setPronouns] = useState("");
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [droppedImage, setDroppedImage] = useState(null);
    const [droppedFile, setDroppedFile] = useState(null);
    const [status, setStatus] = useState({
        searching: false,
        interviewing: false,
        working: false,
        hiring: false,
        nothiring: false,
    });
    const [isDirty, setIsDirty] = useState(false);

    // Add listeners for unsaved changes
    usePrompt("You have unsaved changes. Do you really want to leave?", isDirty);
    useBeforeUnload(isDirty);

    const handleInputChange = (e) => {
      setIsDirty(true); // Mark as dirty when any input changes
    };


    const handleDrop = (acceptedFiles) => {
        if (acceptedFiles && acceptedFiles.length > 0) {
            const file = acceptedFiles[0];
            const imageUrl = URL.createObjectURL(file);
            setDroppedImage(imageUrl);
        }
    };

    useEffect(() => {
        dispatch(getUser());
        dispatch(getAllCompanies());
    }, [dispatch]);


    useEffect(() => {
        if (user) {
            setFullName(user.name || "");
            setEmail(user.email || "");
            setAccountType(user.role || "");
            setDescription(user.description || "");
            setSpecialty(user.positiontitle || "");

            setPronouns(user.pronouns || "");
            setUserStatus(user.status);

            if (user.company) {
                setCompanyName(user.company.name || "");
                setSelectedCompanyId(user.company.id); // Store the company ID
            }

            // Properly update the status object based on user.status
            setStatus((prevStatus) => ({
                searching: !!user.searching,
                interviewing: !!user.interviewing,
                working: !!user.working,
                hiring: user.status === 'hiring',
                nothiring: user.status === 'nothiring',
            }));

            if (user.profile_image) {
                setDroppedImage(user.profile_image);
            }
        }
    }, [user]);


    useEffect(() => {
        if (companyName) {
            const filtered = companies.filter(company =>
                company.name.toLowerCase().includes(companyName.toLowerCase())
            );
            setFilteredCompanies(filtered);
        } else {
            setFilteredCompanies([]);
        }
    }, [companyName, companies]);

    const handleCompanySelect = (company) => {
        setCompanyName(company.name); // Set the selected company name
        setSelectedCompanyId(company.id); // Store the company ID
        setFilteredCompanies([]); // Hide the dropdown after selection
    };

    const handleStatusChange = (e) => {
        const { name } = e.target;


        setStatus((prevStatus) => ({
            searching: name === "searching" ? 1 : 0,
            interviewing: name === "interviewing" ? 1 : 0,
            working: name === "working" ? 1 : 0,
            hiring: name === "hiring" ? 1 : 0,
            nothiring: name === "nothiring" ? 1 : 0,
        }));


        setUserStatus(name);

    };


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
            formData.append("description", description);
            formData.append("name", fullName);
            formData.append("email", email);
            formData.append("role", accountType);
            formData.append("school_id", null);
            formData.append("positiontitle", specialty);
            formData.append("pronouns", pronouns);
            formData.append("status", userStatus);
            formData.append("company_id", selectedCompanyId);

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
                    pronouns: pronouns,
                    profile_image: droppedImage,
                    email,
                    role: accountType,
                    school_id: user.school_id,
                    positiontitle: specialty,
                    company_id: selectedCompanyId,
                })
            );

            setShowSuccessMessage(true);

            // Reset isDirty after successful update
            setIsDirty(false);

            setTimeout(() => {
                setShowSuccessMessage(false);
            }, 2000);

            // Refresh the user data
            dispatch(getUser());
        } catch (error) {
            console.error("Error updating profile:", error);
            setIsDirty(false);

            // Optionally, you could handle error-specific state updates here.
            // Example:
            // setErrorState(true);
        }
    };


    const handleClear = () => {

        setDroppedImage(null);
    };

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <NavBar header={"Profile"}>
            <Main fontSize={fontSize} darkMode={darkMode}>
                <Section fontSize={fontSize} darkMode={darkMode}>

                    <ProfileWrapper fontSize={fontSize} darkMode={darkMode}>

                            <ProfileImageWrapper fontSize={fontSize} darkMode={darkMode}>
                                {droppedImage ? (
                                    <ProfileImage fontSize={fontSize} darkMode={darkMode}
                                        loading="lazy"
                                        src={droppedImage}
                                        alt="Profile"
                                    />
                                ) : (
                                    <Dropzone fontSize={fontSize} darkMode={darkMode} onDrop={handleDrop} />
                                )}
                                {droppedImage && (
                                    <ClearProfileButton fontSize={fontSize} darkMode={darkMode} onClick={handleClear}>
                                        Clear
                                    </ClearProfileButton>
                                )}
                            </ProfileImageWrapper>




                                {/* <ReflectionDocuments fontSize={fontSize} darkMode={darkMode} /> */}

                    </ProfileWrapper>
                    <InputSection fontSize={fontSize} darkMode={darkMode}><LeftSide> <FieldTitle fontSize={fontSize} darkMode={darkMode}>Description</FieldTitle> <Input fontSize={fontSize} darkMode={darkMode}
                                    name="description"
                                    value={description}
                                    onChange={(e) => {handleInputChange(e);setDescription(e.target.value)}}
                                    placeholder="Add a few words about your company."
                        />



<FieldTitle fontSize={fontSize} darkMode={darkMode}>Full Name</FieldTitle>
                        <Input fontSize={fontSize} darkMode={darkMode}
                            type="text"
                            name="name"
                            value={fullName}
                            onChange={(e) => { handleInputChange(e); setFullName(e.target.value)}}
                        />
                        <FieldTitle fontSize={fontSize} darkMode={darkMode}>Email</FieldTitle>
                        <Input fontSize={fontSize} darkMode={darkMode}
                            type="email"
                            name="email"
                            value={email}
                            onChange={(e) => { handleInputChange(e); setEmail(e.target.value)}}
                        />


                       </LeftSide><RightSide>
                            <FieldTitle fontSize={fontSize} darkMode={darkMode} >Position</FieldTitle>
                            <Input fontSize={fontSize} darkMode={darkMode}
                                type="text"
                                name="positiontitle"
                                value={specialty}
                                onChange={(e) => { handleInputChange(e);  setSpecialty(e.target.value)}}
                            />
                            <FieldTitle fontSize={fontSize} darkMode={darkMode} >Pronouns</FieldTitle>
                            <Input fontSize={fontSize} darkMode={darkMode}
                                type="text"
                                name="pronouns"
                                value={pronouns}
                                onChange={(e) => {handleInputChange(e); setPronouns(e.target.value)}}
                            />

<FieldTitle fontSize={fontSize} darkMode={darkMode}>Company</FieldTitle>
                        <Input fontSize={fontSize} darkMode={darkMode}
                            type="text"
                            value={companyName}
                            onChange={(e) => { handleInputChange(e); setCompanyName(e.target.value)}}
                            placeholder="Type company name"
                        />
                 {companyName != user?.company?.name && filteredCompanies.length > 0 && (
  <AutocompleteList fontSize={fontSize} darkMode={darkMode}>
    {filteredCompanies.map((company) => (
      <AutocompleteItem
        fontSize={fontSize}
        darkMode={darkMode}
        key={company.id}
        onClick={() => handleCompanySelect(company)}  // This will hide the list
      >
        {company.name}
      </AutocompleteItem>
    ))}
  </AutocompleteList>
)}




                            <FieldTitle fontSize={fontSize} darkMode={darkMode}>
                                Current Status
                            </FieldTitle>
                            <StatusContainer fontSize={fontSize}>

                                <StatusLabel fontSize={fontSize} darkMode={darkMode}>
                                    <StatusRadioButton
                                        name="hiring"
                                        checked={status.hiring}
                                        onChange={handleStatusChange}
                                        darkMode={darkMode}
                                    />
                                    Hiring
                                </StatusLabel>
                                <StatusLabel fontSize={fontSize} darkMode={darkMode}>
                                    <StatusRadioButton
                                        name="nothiring"
                                        checked={status.nothiring}
                                        onChange={handleStatusChange}
                                        darkMode={darkMode}
                                    />
                                    Not Hiring
                                </StatusLabel>
                            </StatusContainer>
                        </RightSide>


                        {showSuccessMessage && <SuccessMessage v>Profile updated successfully!</SuccessMessage>}</InputSection>

                    <EditProfileButton fontSize={fontSize} darkMode={darkMode} onClick={handleUpdateProfile}>
                        Save Profile Changes
                    </EditProfileButton>
                </Section>

            </Main>

        </NavBar>
    );
}

export default Profile;
