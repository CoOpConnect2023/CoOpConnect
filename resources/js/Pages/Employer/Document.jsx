import React, { useState, useEffect } from "react";
import styled from "styled-components";
import NavBar from "./Components/NavBar";
import downarrow from "@/Pages/Images/Icon.svg";
import wordlogo from "../Images/worddocicon.png";
import pdflogo from "../Images/pdf-icon.png";
const appUrl = import.meta.env.VITE_APP_URL;
import {
    Wrapper,
    Content,
    FileSection,
    SectionHeader,
    TabList,
    TabItem,
    FileList,
    FileContainer,
    FileIcons,
    FileDetails,
    FileTitle,
    FileSize,
    FileActions,
    ActionButton,
    FormSection,
    Form,
    Title,
    Label,
    FileDropContainer,
    DropText,
    FileTypes,
    SecurityNote,
    SubmitButton,
    DropZoneWrapper,
    DropZoneContainer,
    DropZone,
    DropZoneText,
    DropZoneDescription,
    PreviewImage,
} from "./Styling/Document.styles";

function DocumentDropZone({
    onFileDrop,
    imgSrc,
    altText,
    description,
    clearPreviewsTrigger,
}) {
    const [isDragging, setIsDragging] = useState(false);
    const [filesPreview, setFilesPreview] = useState([]);

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        const files = Array.from(e.dataTransfer.files);
        onFileDrop(files);
        setFilesPreview(
            files.map((file) => ({
                file,
                preview: URL.createObjectURL(file),
                type: file.type,
            }))
        );
    };

    useEffect(() => {
        if (clearPreviewsTrigger) {
            setFilesPreview([]);
        }
    }, [clearPreviewsTrigger]);

    const getIconForFileType = (fileType) => {
        if (fileType.includes("pdf")) {
            return pdflogo;
        } else if (fileType.includes("word")) {
            return wordlogo;
        } else {
            return null;
        }
    };

    return (
        <DropZoneContainer
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            isDragging={isDragging}
        >
            <DropZone>
                {filesPreview.length > 0 ? (
                    filesPreview.map((fileObj, index) => {
                        const icon = getIconForFileType(fileObj.type);
                        return (
                            <PreviewImage
                                key={index}
                                src={icon ? icon : fileObj.preview}
                            />
                        );
                    })
                ) : (
                    <img
                        src={imgSrc}
                        alt={altText}
                        style={{
                            width: "100px",
                            height: "100px",
                        }}
                    />
                )}
                <DropZoneText>Drag your files here</DropZoneText>
            </DropZone>
            <DropZoneDescription>{description}</DropZoneDescription>
        </DropZoneContainer>
    );
}


const TabMenu = ({ activeTab, handleTabChange }) => (
    <TabList>
      <TabItem onClick={() => handleTabChange("Employer Documents")} className={activeTab === "Employer Documents" ? "active" : ""}>
        Employer Documents
      </TabItem>
      <TabItem onClick={() => handleTabChange("Shortlist Documents")} className={activeTab === "Shortlist Documents" ? "active" : ""}>
        Shortlist Documents
      </TabItem>
      <TabItem onClick={() => handleTabChange("Applicant Documents")} className={activeTab === "Applicant Documents" ? "active" : ""}>
        Applicant Documents
      </TabItem>
    </TabList>
  );



const FileItem = ({ title, type, downloadDocument, doc, handleDelete }) => (
    <FileContainer>
        <FileIcons>
            <img
                onClick={() => handleDelete(type)}
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/a4cdb93b18319c472265cce9eb4f7345c821b3f3e0269b1464d286a7094472e4?apiKey=d66532d056b14640a799069157705b77&"
                alt=""
                style={{ width: "24px", height: "24px" }}
            />
            <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/3a9403df13b2dd9b0c6d623620f8e8a11ded89bf005c81d6d7336457cda636ca?apiKey=d66532d056b14640a799069157705b77&"
                alt=""
                style={{ width: "24px", height: "24px" }}
            />
        </FileIcons>
        <FileDetails>
            <div>
                <FileTitle>{title}</FileTitle>
                <FileSize>{type}</FileSize>
            </div>
            <FileActions>
                <ActionButton onClick={() => downloadDocument(type, title)}>
                    Download{" "}
                    <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/2af48e24c34a904b3b5a3559caeea0ddb30ee829cab8a5c4740ff86e9c992067?apiKey=d66532d056b14640a799069157705b77&"
                        alt="Download icon"
                    />
                </ActionButton>
                <ActionButton outline>
                    Share{" "}
                    <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/8a625fb433ce98b0d17f96a94179431e6cdfe22a98d39394247a5eaf65fd6856?apiKey=d66532d056b14640a799069157705b77&"
                        alt="Share icon"
                    />
                </ActionButton>
            </FileActions>
        </FileDetails>
    </FileContainer>
);

function Document() {
    const [filesToUpload, setFilesToUpload] = useState([]);
    const [clearPreviewsTrigger, setClearPreviewsTrigger] = useState(false);
    const [userId, setUserId] = useState(null);
    const [userDocuments, setUserDocuments] = useState([]);
    const [activeTab, setActiveTab] = useState("Progress Reports");
    const [shortlistDocuments, setShortlistDocuments] = useState([]);





    useEffect(() => {
        // Fetch the XSRF token from cookies and set it in Axios headers
        const csrfToken = document.cookie
            .split("; ")
            .find((row) => row.startsWith("XSRF-TOKEN="))
            ?.split("=")[1];
        axios.defaults.headers.common["X-XSRF-TOKEN"] = csrfToken;

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
        const fetchDocuments = async () => {
            try {
                if (!userId) {
                    return; // Exit early if userId is null or undefined
                }

                const response = await axios.get(`${appUrl}/api/fetchdocs`, {
                    params: {
                        user_id: userId,
                    },
                });

                if (response.data.status === 1) {
                    setUserDocuments(response.data.data);
                    console.log(
                        "Documents fetched successfully:",
                        response.data.data
                    );
                } else {
                    console.error(
                        "Error fetching documents:",
                        response.data.message
                    );
                }
            } catch (error) {
                console.error("Error fetching documents:", error);
            }
        };

        fetchDocuments();
    }, [userId]);

    const fetchShortlistDocuments = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/users/${userId}/shortlists`);

            if (response.data && response.data.shortlists && response.data.shortlists.length > 0) {
                const allDocuments = response.data.shortlists.flatMap(shortlist =>
                    shortlist.applicants.flatMap(applicant =>
                        applicant.documents.map(doc => ({
                            ...doc,
                            applicantName: applicant.name,
                        }))
                    )
                );
                setShortlistDocuments(allDocuments);
                console.log('Shortlist documents fetched successfully:', allDocuments);
            } else {
                console.error('No shortlist documents found in the response:', response);
            }
        } catch (error) {
            console.error('Error fetching shortlist documents:', error);
        }
    };

    const handleFileDrop = async (files) => {
        setFilesToUpload((prevFiles) => [...prevFiles, ...files]);
        setClearPreviewsTrigger(false);
    };

    const handleDelete = async (id) => {
        try {
            const response = await axios.delete(
                `${appUrl}/api/deletedoc/${id}`
            );
            if (response.data.status === 1) {
                setUserDocuments((prevDocuments) =>
                    prevDocuments.filter((doc) => doc.id !== id)
                );
                console.log("Document deleted successfully");
            } else {
                console.error(
                    "Error deleting document:",
                    response.data.message
                );
            }
        } catch (error) {
            console.error("Error deleting document:", error);
        }
    };

    const handleUpload = async () => {
        const formData = new FormData();

        filesToUpload.forEach((file) => {
            let fileType;

            // Determine the file type based on the file's MIME type
            if (file.type === "application/pdf") {
                fileType = "pdf";
            } else if (file.type === "application/docx") {
                fileType = "word";
            } else {
                // Handle other file types as needed
                fileType = "other";
            }

            // Append the file with its type to formData
            formData.append("files[]", file);
            formData.append("file_types[]", fileType);
        });

        formData.append("user_id", userId);

        try {
            const response = await axios.post(
                `${appUrl}/api/uploaddocs`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            console.log("Upload successful:", response.data);
            setFilesToUpload([]);
            setClearPreviewsTrigger(true);
            window.location.reload();
        } catch (error) {
            console.error("Error uploading files:", error);
        }
    };

    const downloadDocument = async (id, title) => {
        try {
            const response = await axios.get(`${appUrl}/api/download/${id}`, {
                responseType: "blob",
            });

            // Create a blob URL for the response data
            const blob = new Blob([response.data], {
                type: response.data.type,
            });
            const url = window.URL.createObjectURL(blob);

            // Create a link element to trigger the download
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", title);
            document.body.appendChild(link);

            // Trigger the download
            link.click();

            link.parentNode.removeChild(link);
            window.URL.revokeObjectURL(url);

        console.log("Download successful");
    } catch (error) {
        console.error("Error downloading document:", error);
    }
};

const handleTabChange = (tab) => {
    setActiveTab(tab);

    // Fetch shortlist documents when Shortlist Documents tab is clicked
    if (tab === 'Shortlist Documents') {
        fetchShortlistDocuments();
    }
};

return(

    <NavBar header={"Documents"}>
            <Wrapper>
                <Content>
                    <FileSection>
                        <SectionHeader>
                            <TabMenu
                                tabs={[
                                    "Employer Documents",
                                    "Shortlist Documents",
                                    "Applicant Documents",
                                    "Progress Reports",
                                ]}
                                activeTab={activeTab}
                                setActiveTab={setActiveTab}
                                handleTabChange={handleTabChange}
                            />
                        </SectionHeader>
                        <FileList>
                            {(activeTab === 'Employer Documents' && userDocuments.length > 0) &&
                                userDocuments.map((doc, index) => (
                                    <FileItem
                                        key={index}
                                        title={doc.title}
                                        type={doc.id}
                                        downloadDocument={() => downloadDocument(doc.id, doc.title)}
                                        handleDelete={() => handleDelete(doc.id)}
                                        doc={doc}
                                    />
                                ))}
                            {(activeTab === 'Shortlist Documents' && shortlistDocuments.length > 0) &&
                                shortlistDocuments.map((doc, index) => (
                                    <FileItem
                                        key={index}
                                        title={doc.title}
                                        type={doc.applicantName}
                                        downloadDocument={() => downloadDocument(doc.id, doc.title)}

                                        doc={doc}
                                    />
                                ))}
                        </FileList>
                    </FileSection>
                    <FormSection>
                        <Form>
                            <Title>Add Documents</Title>
                            <Label htmlFor="fileUpload">Attach Documents</Label>
                            <DropZoneWrapper>
                                <DocumentDropZone
                                    onFileDrop={handleFileDrop}
                                    clearPreviewsTrigger={clearPreviewsTrigger}
                                />
                            </DropZoneWrapper>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <FileTypes>Accepted File Types: .doc, .docx, .pdf only</FileTypes>
                                <SecurityNote>
                                    {/* Security icon */}
                                    Secure
                                </SecurityNote>
                            </div>
                            <SubmitButton onClick={handleUpload}>Upload</SubmitButton>
                        </Form>
                    </FormSection>
                </Content>
            </Wrapper>
        </NavBar>
    );
};

const Wrapper = styled.main`
    display: flex;
    flex-direction: column;
    padding: 20px;
`;

const Content = styled.div`
    display: flex;
    justify-content: center;
    @media (max-width: 991px) {
        flex-direction: column;
    }
`;

const FileSection = styled.section`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    align-self: stretch;
    flex: 1 0 0;
    padding: 20px 0px;
    border-radius: 10px;
    background: #fff;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
    @media (max-width: 991px) {
        padding: 0;
        width: 100%;
    }
`;

const SectionHeader = styled.header`
    display: flex;
    justify-content: center;
    margin-bottom: 40px;
`;

const TabList = styled.nav`
    display: flex;
    justify-content: space-between;
    border: 1px solid #000;
    border-radius: 6px;
    padding: 5px 10px;
    font-size: 14px;
    font-weight: 500;
    color: #334155;
    @media (max-width: 991px) {
      flex-wrap: wrap;
    }
  `;

  const TabItem = styled.div`
    padding: 6px 20px;
    position: relative;
    cursor: pointer;
    &.active {
      border-bottom: 2px solid #6b538c;
      color: #0f172a;
    }
  `;

const FileList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 0 80px;
    @media (max-width: 991px) {
        padding: 0 20px;
    }
`;

const FileContainer = styled.article`
    display: flex;
    gap: 10px;
    padding: 20px 10px;
    border: 1px solid #7b757f;
    border-radius: 10px;
    @media (max-width: 991px) {
        flex-wrap: wrap;
    }
`;

const FileIcons = styled.div`
    display: flex;
    gap: 20px;
    border-right: 1px solid #7b757f;
    padding-right: 10px;
`;

const FileDetails = styled.div`
    flex-grow: 1;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: 10px;
`;

const FileTitle = styled.h2`
    font-weight: 500;
    font-size: 14px;
    color: #000;
`;

const FileSize = styled.p`
    font-size: 12px;
    font-weight: 400;
    color: #7b757f;
`;

const FileActions = styled.div`
    display: flex;
    gap: 10px;
    align-self: end;
`;

const ActionButton = styled.button`
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 6px 12px;
    font-size: 14px;
    font-weight: 600;
    border-radius: 10px;
    cursor: pointer;
    background-color: ${({ outline }) => (outline ? "transparent" : "#6b538c")};
    color: ${({ outline }) => (outline ? "#6b538c" : "#fff")};
    border: ${({ outline }) => (outline ? "1px solid #6b538c" : "none")};

    img {
        width: 14px;
    }
`;

const FormSection = styled.section`
    width: 28%;
    margin-left: 20px;
    @media (max-width: 991px) {
        margin-left: 0;
        width: 100%;
    }
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    padding: 20px;
    margin: 0 auto;
    border-radius: 10px;
    background: #fff;
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
    color: #7b757f;
`;

const Title = styled.h2`
    font-size: 24px;
    font-weight: 500;
    color: #6b538c;
`;

const Label = styled.label`
    font-size: 14px;
    font-weight: 600;
    margin-top: 20px;
`;

const Input = styled.input`
    height: 48px;
    margin-top: 8px;
    border: 2px solid #7b757f;
    border-radius: 6px;
    background: #fff;
`;

const FileDropContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    padding: 22px 40px;
    margin-top: 10px;
    border: 2px dashed #6b538c;
    border-radius: 10px;
    background-color: #eddcff;
    font-size: 16px;
    font-weight: 600;
    color: #6b538c;
    @media (max-width: 991px) {
        padding: 20px;
    }
`;

const DropText = styled.p`
    margin-top: 10px;
`;

const FileTypes = styled.p`
    margin-top: 10px;
    font-size: 10px;
    font-weight: 400;
`;

const SecurityNote = styled.div`
    display: flex;
    align-items: center;
    gap: 5px;
    font-weight: 500;
    margin-top: 10px;
`;

const SubmitButton = styled.button`
    align-self: center;
    margin-top: 40px;
    padding: 10px 24px;
    font-size: 18px;
    font-weight: 600;
    color: #fff;
    background: #6b538c;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    @media (max-width: 991px) {
        padding: 20px;
    }
`;


const DropZoneWrapper = styled.div`
    gap: 20px;
    display: flex;
    @media (max-width: 991px) {
        flex-direction: column;
        align-items: stretch;
        gap: 0;
    }
`;

const DropZoneContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-left: 20px;
    @media (max-width: 991px) {
        width: 100%;
        margin-left: 0;
        margin-top: 20px;
    }
`;

const DropZone = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    border: 2px dashed rgba(107, 83, 140, 1);
    background-color: #eddcff;
    font-size: 23px;
    color: #000;
    line-height: 40px;
    padding: 40px;
    @media (max-width: 991px) {
        padding: 0 20px;
    }
`;

const DropZoneText = styled.div`
    font-family: Poppins, sans-serif;
    margin-top: 10px;
    @media (max-width: 991px) {
        margin: 0 8px;
    }
`;

const DropZoneDescription = styled.p`
    color: #6b538c;
    align-self: center;
    margin-top: 10px;
    font: bold 28px Poppins, sans-serif;
`;

const PreviewImage = styled.img`
    width: 100px;
    height: 100px;
    object-fit: cover;
    border-radius: 5px;
    margin-bottom: 10px;
`;

export default Document;
