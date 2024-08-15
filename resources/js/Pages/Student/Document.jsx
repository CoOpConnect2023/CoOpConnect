import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import NavBar from "./Components/NavBar";
import wordlogo from "../Images/worddocicon.png";
import pdflogo from "../Images/pdf-icon.png";
import {
    MainContainer,
    Section,
    DropZoneWrapper,
    DropZoneContainer,
    DropZone,
    DropZoneText,
    DropZoneDescription,
    PreviewImage,
    UploadButton,
    DocumentWrapper,
    DocumentItem,
    ButtonContainer,
    PreviewImageDownload,
    DownloadButton,
    DeleteButton,
    MessageContainer,
    Message,
    FileContainer,
    FileIcons,
    FileDetails,
    FileTitle,
    FileSize,
    FileActions,
    ActionButton,






} from "./Styling/Document.styles";
import { useSelector, useDispatch } from "react-redux";


const appUrl = import.meta.env.VITE_APP_URL;

function DocumentDropZone({
    onFileDrop,
    imgSrc,
    altText,
    description,
    clearPreviewsTrigger,
    dataTestId
}) {
    const [isDragging, setIsDragging] = useState(false);
    const [filesPreview, setFilesPreview] = useState([]);
    const darkMode = useSelector(state => state.accessibility.darkMode);
    const fontSize = useSelector(state => state.accessibility.textSize);

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
        <DropZoneContainer darkMode={darkMode} fontSize={fontSize}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            isDragging={isDragging}
            data-test-id={dataTestId}
        >
            <DropZone darkMode={darkMode} fontSize={fontSize}>
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
                <DropZoneText darkMode={darkMode} fontSize={fontSize}>Drag your files here</DropZoneText>
            </DropZone>
            <DropZoneDescription darkMode={darkMode} fontSize={fontSize}>{description}</DropZoneDescription>
        </DropZoneContainer>
    );
}

const FileItem = ({ title, type, downloadDocument, doc, handleDelete, darkMode, fontSize }) => (
    <FileContainer darkMode={darkMode} fontSize={fontSize}>
        <FileIcons darkMode={darkMode} fontSize={fontSize}>
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
        <FileDetails darkMode={darkMode} fontSize={fontSize}>
            <div>
                <FileTitle darkMode={darkMode} fontSize={fontSize}>{title}</FileTitle>
                <FileSize darkMode={darkMode} fontSize={fontSize}>{type}</FileSize>
            </div>
            <FileActions darkMode={darkMode} fontSize={fontSize}>
                <ActionButton darkMode={darkMode} fontSize={fontSize} onClick={() => downloadDocument(type, title)}>
                    Download{" "}
                    <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/2af48e24c34a904b3b5a3559caeea0ddb30ee829cab8a5c4740ff86e9c992067?apiKey=d66532d056b14640a799069157705b77&"
                        alt="Download icon"
                    />
                </ActionButton>
                <ActionButton darkMode={darkMode} fontSize={fontSize} outline>
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
    const documentData = [
        {
            imgSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/906419841746a1732713efefc5675f404b543de3dd88203c7d384fc92193a9c9?apiKey=d66532d056b14640a799069157705b77&",
            altText: "Upload Zone 1",
            description: "Document 1",
        },
        {
            imgSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/2be66a00f7af6f4de8a52f78e488702758db936f19f83e7cdf4e5d364c3d5980?apiKey=d66532d056b14640a799069157705b77&",
            altText: "Upload Zone 2",
            description: "Document 2",
        },
        {
            imgSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/68d58af99d26ef77eebd68a3c053d0bde9718f44bdef04efbe9ae7634110a91c?apiKey=d66532d056b14640a799069157705b77&",
            altText: "Upload Zone 3",
            description: "Document 3",
        },
    ];

    const [filesToUpload, setFilesToUpload] = useState([]);
    const [clearPreviewsTrigger, setClearPreviewsTrigger] = useState(false);
    const [userId, setUserId] = useState(null);
    const [userDocuments, setUserDocuments] = useState([]);
    const darkMode = useSelector(state => state.accessibility.darkMode);
    const fontSize = useSelector(state => state.accessibility.textSize);

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


        } catch (error) {
            console.error("Error downloading document:", error);
        }
    };

    return (
        <NavBar header={"Document Upload"}>
            <MainContainer darkMode={darkMode} fontSize={fontSize}>
                <Section darkMode={darkMode} fontSize={fontSize} >
                    <DropZoneWrapper darkMode={darkMode} fontSize={fontSize}>
                        {documentData.slice(0, 3).map((doc, index) => (
                            <DocumentDropZone darkMode={darkMode} fontSize={fontSize}
                                key={index}
                                {...doc}
                                onFileDrop={handleFileDrop}
                                clearPreviewsTrigger={clearPreviewsTrigger}
                                dataTestId={`drop-zone-${index}`}
                            />
                        ))}
                    </DropZoneWrapper>
                </Section>
                <Section darkMode={darkMode} fontSize={fontSize}>
                    {userDocuments.length > 0 ? (
                        <DocumentWrapper darkMode={darkMode} fontSize={fontSize}>
                            {userDocuments.map((doc, index) => (
                               <FileItem darkMode={darkMode} fontSize={fontSize}
                               key={index}
                               title={doc.title}
                               type={doc.id}
                               downloadDocument={() => downloadDocument(doc.id, doc.title)}
                               handleDelete={() => handleDelete(doc.id)}
                               doc={doc}
                           />
                            ))}
                        </DocumentWrapper>
                    ) : (
                        <MessageContainer darkMode={darkMode} fontSize={fontSize}>
                            <Message darkMode={darkMode} fontSize={fontSize}>
                                No documents uploaded. Upload some documents to
                                view.
                            </Message>
                        </MessageContainer>
                    )}
                </Section>
            </MainContainer>
            {filesToUpload.length > 0 && (
                <UploadButton onClick={handleUpload}>Upload Files</UploadButton>
            )}
        </NavBar>
    );
}

export default Document;


