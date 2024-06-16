import React from "react";
import styled from "styled-components";

function AddDocuments() {
    return (
        <Container>
            <DocTitle>
                <TitleContainer>
                    <h2 className="title">Add Documents</h2>
                </TitleContainer>
                <InputField>
                    <LabelDocument>Document Title</LabelDocument>
                    <InputDocument
                        type="text"
                        id="documentTitle"
                        className="input-field"
                        aria-label="Document Title"
                    />
                </InputField>
            </DocTitle>
            <DocUpload>
                <Label htmlFor="attachDocuments" className="form-label">
                    Attach Documents
                </Label>
                <DragDropArea>
                    <FileUpload>
                        <Icon
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/57cab00a337e1dd7e1e09972d4ceb8563bd7a55863172a506c9b32fa9baf6730?apiKey=d66532d056b14640a799069157705b77&"
                            alt="Drag and Drop"
                        />
                        <DragDropText>Drag and Drop here</DragDropText>
                    </FileUpload>
                </DragDropArea>
                <InfoContainer>
                    <InfoText>
                        Accepted File Types: .doc, .docx, .pdf only
                    </InfoText>
                    <SecurityInfo>
                        <SecurityIcon
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/8b7ec72c66d30f8ec5c35d4cec5db08f1877f1a7d86ea8b6c08df8054b4a9a85?apiKey=d66532d056b14640a799069157705b77&"
                            alt="Secure"
                        />
                        <SecurityText>Secure</SecurityText>
                    </SecurityInfo>
                </InfoContainer>
            </DocUpload>
            <UploadButton type="button">Upload</UploadButton>
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    padding: 20px;
    flex-direction: column;
    align-items: flex-start;
    gap: 40px;
    align-self: stretch;
    border-radius: 10px;
    background: #fff;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
`;

const DocTitle = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
`;

const TitleContainer = styled.div`
    color: var(--Schemes-Primary, #6b538c);
    font-size: 24px;
    font-style: normal;
    font-weight: 500;
    line-height: 32px; /* 133.333% */
`;

const InputField = styled.div`
    display: flex;
    width: 320px;
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-start;
    gap: 8px;
`;

const LabelDocument = styled.div`
    display: flex;
    align-items: flex-start;
    gap: 10px;
    align-self: stretch;
    flex: 1 0 0;
    color: var(--Schemes-Outline, #7b757f);
    font-feature-settings: "calt" off;
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: 16px; /* 114.286% */
    letter-spacing: -0.14px;
`;

const InputDocument = styled.form`
    height: 48px;
    align-self: stretch;
    border-radius: 6px;
    border: 2px solid var(--Schemes-Outline, #7b757f);
    background: var(--WF-Base-White, #fff);
`;

const DocUpload = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
    align-self: stretch;
`;

const Label = styled.div`
    color: var(--Schemes-Outline, #7b757f);
    font-feature-settings: "calt" off;
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: 16px; /* 114.286% */
    letter-spacing: -0.14px;
`;

const DragDropArea = styled.div`
    display: flex;
    height: 139px;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
    align-self: stretch;
`;

const FileUpload = styled.div`
    display: flex;
    padding: 40px;
    height: 139px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
    flex: 1 0 0;
    align-self: stretch;
    border-radius: 10px;
    border: 2px dashed var(--Schemes-Primary, #6b538c);
    background: var(--Schemes-Primary-Container, #eddcff);
`;

const Icon = styled.img`
    width: 62px;
    height: 62px;
`;

const DragDropText = styled.div`
    color: var(--Schemes-Primary, #6b538c);
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 24px; /* 150% */
    letter-spacing: 0.5px;
`;

const InfoContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    align-self: stretch;
`;

const InfoText = styled.div`
    color: var(--Schemes-Outline, #7b757f);
    font-feature-settings: "calt" off;
    font-size: 10px;
    font-style: normal;
    font-weight: 400;
    line-height: 16px; /* 160% */
    letter-spacing: -0.1px;
`;

const SecurityInfo = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 5px;
`;

const SecurityIcon = styled.img`
    width: 12px;
    height: 12px;
`;

const SecurityText = styled.div`
    color: var(--Schemes-Outline, #7b757f);
    font-feature-settings: "calt" off;
    font-size: 10px;
    font-style: normal;
    font-weight: 500;
    line-height: 16px; /* 160% */
    letter-spacing: -0.1px;
`;

const UploadButton = styled.button`
    display: flex;
    height: 48px;
    padding: 0px 24px;
    justify-content: center;
    align-items: center;
    gap: 8px;
    align-self: stretch;
    border-radius: 6px;
    background: #6b538c;
    color: #fff;
    font-size: 18px;
    font-style: normal;
    font-weight: 600;
    line-height: 28px; /* 155.556% */
`;

export default AddDocuments;
