import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import NavBar from "./Components/NavBar";
import wordlogo from "../Images/worddocicon.png"
import pdflogo from "../Images/pdf-icon.png"

function DocumentDropZone({ onFileDrop, imgSrc, altText, description, clearPreviewsTrigger }) {
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
        setFilesPreview(files.map((file) => ({
            file,
            preview: URL.createObjectURL(file),
            type: file.type
        })));
    };

    useEffect(() => {
        if (clearPreviewsTrigger) {
            setFilesPreview([]);
        }
    }, [clearPreviewsTrigger]);

    const getIconForFileType = (fileType) => {
        if (fileType.includes('pdf')) {
            return pdflogo;
        } else if (fileType.includes('word')) {
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
                            <PreviewImage key={index} src={icon ? icon : fileObj.preview} />
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

    const handleFileDrop = async (files) => {
        setFilesToUpload((prevFiles) => [...prevFiles, ...files]);
        setClearPreviewsTrigger(false);

    };

    const handleUpload = async () => {
        const formData = new FormData();
        filesToUpload.forEach((file) => {
            formData.append("files[]", file);
        });
        formData.append("user_id", 2); // Static user ID for testing

        try {
            const response = await axios.post("/api/uploaddocs", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            console.log("Upload successful:", response.data);
            setFilesToUpload([]);
            setClearPreviewsTrigger(true);
        } catch (error) {
            console.error("Error uploading files:", error);
        }
    };

    return (
        <NavBar header={"Document Upload"}>
            <MainContainer>
                <Section>
                    <DropZoneWrapper>
                        {documentData.slice(0, 3).map((doc, index) => (
                            <DocumentDropZone
                                key={index}
                                {...doc}
                                onFileDrop={handleFileDrop}
                                clearPreviewsTrigger={clearPreviewsTrigger}
                            />
                        ))}
                    </DropZoneWrapper>
                </Section>
                <Section>
                    <DropZoneWrapper>
                        {documentData.slice(3).map((doc, index) => (
                            <DocumentDropZone
                                key={index}
                                {...doc}
                                onFileDrop={handleFileDrop}
                                clearPreviewsTrigger={clearPreviewsTrigger}
                            />
                        ))}
                    </DropZoneWrapper>
                </Section>
            </MainContainer>
            {filesToUpload.length > 0 && (
                <UploadButton onClick={handleUpload}>Upload Files</UploadButton>
            )}
        </NavBar>
    );
}

const MainContainer = styled.main`
    display: flex;
    flex-direction: column;
    padding: 20px;
    padding-top: 0px;
`;

const Section = styled.section`
    justify-content: center;
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
    background-color: #fff;
    display: flex;
    margin-top: 40px;
    flex-direction: column;
    padding: 80px 35px;
    @media (max-width: 991px) {
        max-width: 100%;
        padding: 0 20px;
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
    width: 33%;
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

const UploadButton = styled.button`
    margin-top: 20px;
    padding: 10px 20px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
`;

export default Document;
