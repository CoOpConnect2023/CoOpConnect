import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import wordlogo from "../../Images/worddocicon.png";
import pdflogo from "../../Images/pdf-icon.png";
import excellogo from "../../Images/excellogo.png";

export function DocumentDropZone({ onFileDrop, imgSrc, altText, description, clearPreviewsTrigger }) {
    const [isDragging, setIsDragging] = useState(false);
    const [filesPreview, setFilesPreview] = useState([]);
    const darkMode = useSelector(state => state.accessibility.darkMode);
    const fontSize = useSelector(state => state.accessibility.textSize);
    const fileInputRef = useRef(null); // Reference for the file input

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

    // Handle file selection via file input (click method)
    const handleFileSelect = (e) => {
        const files = Array.from(e.target.files);
        onFileDrop(files);
        setFilesPreview(files.map((file) => ({
            file,
            preview: URL.createObjectURL(file),
            type: file.type
        })));
    };

    // Open file dialog on drop zone click (especially for mobile)
    const handleClick = () => {
        fileInputRef.current.click();
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
        } else if (fileType.includes('csv')) {
            return excellogo;
        } else if (fileType.includes('csv') || fileType.includes('excel') || fileType.includes('spreadsheetml')) {
            return excellogo;
        } else {
            return null;
        }
    };

    return (
        <DropZoneContainer fontSize={fontSize} darkMode={darkMode}>
            <DropZone
                fontSize={fontSize}
                darkMode={darkMode}
                isDragging={isDragging}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={handleClick} // Trigger file input on click
            >
                {/* Hidden input for file selection */}
                <input
                    ref={fileInputRef}
                    type="file"
                    style={{ display: 'none' }}
                    onChange={handleFileSelect}
                    multiple // Allow multiple file selection
                />

                {filesPreview.length > 0 ? (
                    filesPreview.map((fileObj, index) => {
                        const icon = getIconForFileType(fileObj.type);
                        return (
                            <PreviewImage fontSize={fontSize} darkMode={darkMode} key={index} src={icon ? icon : fileObj.preview} />
                        );
                    })
                ) : (
                    <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/7b639287ff19d9cea52b278a5c41582ed4e1bf799e4a4826575e0a9b46474d1b?apiKey=d66532d056b14640a799069157705b77&"
                        alt="Drop your files here"
                    />
                )}
                <DropZoneText fontSize={fontSize} darkMode={darkMode}>Drag your files here or click to upload</DropZoneText>
            </DropZone>
            <DropZoneDescription fontSize={fontSize} darkMode={darkMode}>{description}</DropZoneDescription>
        </DropZoneContainer>
    );
}

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
    cursor: pointer; // Add cursor to indicate it's clickable
    @media (max-width: 991px) {
        padding: 20px;
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
