import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import NavBar from "./Components/NavBar";
import downarrow from "@/Pages/Images/Icon.svg";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FileItem } from "./Documents/FileItem";
import { TabMenu } from "./Documents/TabMenu";
import { DocumentDropZone } from "./Documents/DocumentDropZone";
import userImage from "@/Pages/Images/user.svg";
import {
    getUser, selectUser, selectUserStatus
} from "@/Features/users/userSlice";
import { selectDocuments, getDocuments, patchDocument, postDocument, getUserDocuments, downloadDocument, deleteDocument, uploadDocuments } from "@/Features/documents/documentsSlice";

import { selectUserDocuments, getDocumentsForUserWithUser, createUserDocumentsFromEmails, getDocumentsSharedWithUser, selectSharedUserDocuments } from "@/Features/userdocumentsSlice/userDocumentsSlice";
import {
    Wrapper,
    Content,
    FileSection,
    SectionHeader,
    TabList,
    TabItem,
    FileList,
    FormSection,
    Form,
    Title,
    Label,
    Input,
    FileDropContainer,
    DropText,
    FileTypes,
    SecurityNote,
    SubmitButton,
    ShareSection,
    BackButton,
    EmailInput,
    EmailList,
    EmailItem,
    RemoveEmailButton,
    ShareButton,
    ButtonContainerUpload,
    ToggleSwitch,
    Slider,
    ScrollableContainer,
    ShareBackContainer,
    ProfileImage,
} from "./Styling/Document.styles";
import wordlogo from "../Images/worddocicon.png";
import pdflogo from "../Images/pdf-icon.png";
const appUrl = import.meta.env.VITE_APP_URL;









const Document = () => {
    const dispatch = useDispatch();
    const sharedDocuments = useSelector(selectUserDocuments);
    const sharedDocumentsWithMe = useSelector(selectSharedUserDocuments);
    const documents = useSelector(selectDocuments);
    const [filesToUpload, setFilesToUpload] = useState([]);
    const [clearPreviewsTrigger, setClearPreviewsTrigger] = useState(false);
    const [userId, setUserId] = useState(null);
    const [userDocuments, setUserDocuments] = useState([]);
    const [activeTab, setActiveTab] = useState("My Files");
    const [shareMode, setShareMode] = useState(false);
    const [emailInput, setEmailInput] = useState('');
    const [selectedDocumentId, setSelectedDocumentId] = useState(null);
    const [selectedDocumentName, setSelectedDocumentName] = useState(null);
    const darkMode = useSelector(state => state.accessibility.darkMode);
    const fontSize = useSelector(state => state.accessibility.textSize);
    const [searchQuery, setSearchQuery] = useState('');
    const [emailList, setEmailList] = useState([]);






    useEffect(() => {
        // Fetch the XSRF token from cookies and set it in Axios headers
        const csrfToken = document.cookie
            .split('; ')
            .find(row => row.startsWith('XSRF-TOKEN='))
            ?.split('=')[1];
        axios.defaults.headers.common['X-XSRF-TOKEN'] = csrfToken;

        // Fetch the user ID, only allows if token is correct
        const fetchUserId = async () => {
            try {
                const response = await axios.get(`${appUrl}/api/user-id`);
                setUserId(response.data.user.id);

            } catch (error) {
                console.error("Error fetching user ID:", error);
            }
        };

        fetchUserId();
    }, []);


    useEffect(() => {
        if (userId) {
            dispatch(getUserDocuments({ userId }));
        }
    }, [dispatch, userId]);





    useEffect(() => {
        if (selectedDocumentId) {
            dispatch(getDocumentsForUserWithUser({ documentID: selectedDocumentId }));
        }
    }, [dispatch, selectedDocumentId]);


    const handleTabChange = (tab) => {
        setActiveTab(tab);

        // Check if the selected tab is "Shared With Me" and dispatch the action
        if (tab === "Shared With Me") {
            dispatch(getDocumentsSharedWithUser({ userId }));
        }
    };

    console.log(sharedDocumentsWithMe);










    const handleFileDrop = async (files) => {
        setFilesToUpload((prevFiles) => [...prevFiles, ...files]);
        setClearPreviewsTrigger(false);

    };

    const handleDelete = async (id) => {
        dispatch(deleteDocument({ documentId: id }));
    };

    const handleUpload = (e) => {
        e.preventDefault();
        dispatch(uploadDocuments({ filesToUpload, userId }))
            .then(() => {
                // Clear files and reset state after successful upload
                setFilesToUpload([]);
                setClearPreviewsTrigger(true);
            })
            .catch((error) => {
                console.error('Error uploading files:', error);
            });
    };

    const handleDownload = (id, title) => {
        dispatch(downloadDocument({ id, title }));
    };

    const userStatus = useSelector(selectUserStatus);
    if (userStatus === 'loading') {
        return <LogoLoadingComponent darkMode={darkMode} />;
    }



    const handleShareClick = (documentId, documentName) => {
        setShareMode(true);
        setSelectedDocumentId(documentId);
        setSelectedDocumentName(documentName); // Set the selected document name
        dispatch(getDocumentsForUserWithUser({ documentID: documentId }));
    };


    useEffect(() => {
        if (sharedDocuments) {
            setEmailList(sharedDocuments.map(item => ({
                email: item.user?.email,
                profile_image: item.user?.profile_image
            })));
        }
    }, [sharedDocuments]);


    const handleBackToDocuments = () => {
        setShareMode(false);
        setSelectedDocumentId(false);
        setSelectedDocumentName(null);
    };

    const handleEmailInputChange = (e) => {
        setEmailInput(e.target.value);
    };

    const handleAddEmail = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();

            // Trim the email input and check if it's valid
            const trimmedEmail = emailInput.trim();

            // Check if the email is valid and doesn't already exist in the list
            if (trimmedEmail !== '' && !emailList.some(item => (typeof item === 'object' ? item.email : item) === trimmedEmail)) {
                console.log("Adding email to list:", trimmedEmail);

                setEmailList((prevEmails) => {
                    // Add the email in the format of { email: trimmedEmail, profile_image: null }
                    const updatedList = [...prevEmails, { email: trimmedEmail, profile_image: null }];
                    console.log("Updated email list:", updatedList);
                    return updatedList;
                });

                // Reset the email input field after adding
                setEmailInput('');
                console.log("Email input cleared.");
            } else {
                if (trimmedEmail === '') {
                    console.log("Email input is empty after trimming.");
                } else if (emailList.some(item => (typeof item === 'object' ? item.email : item) === trimmedEmail)) {
                    console.log("Email already exists in the list:", trimmedEmail);
                }
            }
        }
    };



    const handleRemoveEmailClick = (e, index) => {
        e.preventDefault();
        handleRemoveEmail(index);
    };

    const handleShare = (e) => {
        e.preventDefault();

        // Extract only the email addresses from emailList
        const emailAddresses = emailList
            .map(item => (typeof item === 'object' ? item.email : item))  // Extract email from object or string
            .filter(email => email); // Ensure no null or undefined values

        // Dispatch the action with only the email addresses
        dispatch(createUserDocumentsFromEmails({ emailList: emailAddresses, selectedDocumentId }));
    };


    const handleRemoveEmail = (index) => {
        setEmailList((prevEmails) => prevEmails.filter((_, i) => i !== index));
    };



    const filteredEmailList = emailList.filter(item => item?.email && item.email.toLowerCase().includes(searchQuery.toLowerCase()));

    console.log(filteredEmailList)

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };
    console.log(sharedDocumentsWithMe);

    return (
        <NavBar header={"Documents"}>
            <Wrapper fontSize={fontSize} darkMode={darkMode}>
                <Content fontSize={fontSize} darkMode={darkMode}>
                    <FileSection fontSize={fontSize} darkMode={darkMode}>
                        <SectionHeader fontSize={fontSize} darkMode={darkMode}>
                            <TabMenu fontSize={fontSize} darkMode={darkMode}
                                tabs={[
                                    "Progress Reports",
                                    "Student Logs",
                                    "Shared With Me",
                                    "My Files",
                                ]}
                                activeTab={activeTab}
                                setActiveTab={setActiveTab}
                                handleTabChange={handleTabChange}
                            />
                        </SectionHeader>
                        <FileList fontSize={fontSize} darkMode={darkMode}>
                            {(activeTab === 'Shared With Me' && sharedDocumentsWithMe.length > 0) &&
                                sharedDocumentsWithMe.map((doc, index) => (
                                    <FileItem fontSize={fontSize} darkMode={darkMode}
                                        key={index}
                                        title={doc.document.title}
                                        type={doc.document.id}

                                        visible={doc.document.visibile}
                                        activeTab={activeTab}
                                        handleDownload={() => handleDownload(doc.document.id, doc.document.title)}

                                        doc={doc.document}

                                    />
                                ))}
                            {(activeTab === 'My Files' && documents.length > 0) &&
                                documents.map((doc, index) => (
                                    <FileItem fontSize={fontSize} darkMode={darkMode}
                                        key={index}
                                        title={doc.title}
                                        type={doc.id}
                                        visible={doc.visibile}

                                        handleDownload={() => handleDownload(doc.id, doc.title)}
                                        handleDelete={() => handleDelete(doc.id)}
                                        doc={doc}
                                        handleShareClick={handleShareClick}
                                    />
                                ))}
                        </FileList>
                    </FileSection>
                    <FormSection fontSize={fontSize} darkMode={darkMode}>
                        <Form fontSize={fontSize} darkMode={darkMode}>

                            {!shareMode ? (
                                <>
                                    <Title fontSize={fontSize} darkMode={darkMode}>Add Documents</Title>
                                    <Label fontSize={fontSize} darkMode={darkMode} htmlFor="fileUpload">Attach Documents</Label>
                                    <DropZoneWrapper fontSize={fontSize} darkMode={darkMode}>
                                        <DocumentDropZone fontSize={fontSize} darkMode={darkMode}
                                            onFileDrop={handleFileDrop}
                                            clearPreviewsTrigger={clearPreviewsTrigger}
                                        />
                                    </DropZoneWrapper>
                                    <div
                                        style={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                        }}
                                    >
                                        <FileTypes fontSize={fontSize} darkMode={darkMode}>
                                            Accepted File Types: .doc, .docx, .pdf, xlsx only
                                        </FileTypes>
                                        <SecurityNote fontSize={fontSize} darkMode={darkMode}>
                                            <img
                                                loading="lazy"
                                                src="https://cdn.builder.io/api/v1/image/assets/TEMP/8b7ec72c66d30f8ec5c35d4cec5db08f1877f1a7d86ea8b6c08df8054b4a9a85?apiKey=d66532d056b14640a799069157705b77&"
                                                alt=""
                                            />
                                            Secure
                                        </SecurityNote>
                                    </div>
                                    <ButtonContainerUpload>
                                        <SubmitButton fontSize={fontSize} darkMode={darkMode} onClick={handleUpload}>Upload</SubmitButton>

                                    </ButtonContainerUpload>
                                </>
                            ) : (

                                <>
                                    <Title fontSize={fontSize} darkMode={darkMode}>Share {selectedDocumentName}</Title>
                                    <EmailInput fontSize={fontSize}
                                        darkMode={darkMode}
                                        type="text"
                                        value={searchQuery}
                                        onChange={handleSearchChange}
                                        placeholder="Search emails"
                                    />
                                    <EmailInput fontSize={fontSize} darkMode={darkMode}
                                        type="text"
                                        value={emailInput}
                                        onChange={handleEmailInputChange}
                                        onKeyDown={handleAddEmail}
                                        placeholder="Enter email and press Enter"
                                    />
                                    <ScrollableContainer fontSize={fontSize} darkMode={darkMode}>
                                        <EmailList fontSize={fontSize} darkMode={darkMode}>
                                            {filteredEmailList.map((email, index) => (
                                                <EmailItem fontSize={fontSize} darkMode={darkMode} key={index}><ProfileImage src={email.profile_image} alt={userImage} />

                                                    {email.email}
                                                    <RemoveEmailButton
                                                        fontSize={fontSize}
                                                        darkMode={darkMode}
                                                        onClick={(e) => handleRemoveEmailClick(e, index)}
                                                    >
                                                        X
                                                    </RemoveEmailButton>
                                                </EmailItem>
                                            ))}
                                        </EmailList>
                                    </ScrollableContainer>
                                    <ShareBackContainer> <ShareButton fontSize={fontSize} darkMode={darkMode} onClick={handleShare}>Share</ShareButton>
                                        <BackButton fontSize={fontSize} darkMode={darkMode} onClick={handleBackToDocuments}>Back to Upload Documents</BackButton></ShareBackContainer>
                                </>
                            )}

                        </Form>
                    </FormSection>
                </Content>
            </Wrapper>
        </NavBar>
    );
};




const DropZoneWrapper = styled.div`
    gap: 20px;
    display: flex;
    @media (max-width: 991px) {
        flex-direction: column;
        align-items: stretch;
        gap: 0;
    }
`;



export default Document;
