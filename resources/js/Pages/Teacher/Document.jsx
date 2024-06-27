import * as React from "react";
import styled from "styled-components";
import NavBar from "./Components/NavBar";
import downarrow from "@/Pages/Images/Icon.svg";
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
    Input,
    FileDropContainer,
    DropText,
    FileTypes,
    SecurityNote,
    SubmitButton,
} from "./Styling/Document.styles";

const TabMenu = ({ tabs }) => (
    <TabList>
        {tabs.map((tab, index) => (
            <TabItem key={index} className={index === 0 ? "active" : ""}>
                {tab}
            </TabItem>
        ))}
    </TabList>
);

const FileItem = ({ title, size }) => (
    <FileContainer>
        <FileIcons>
            <img
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
                <FileSize>{size}</FileSize>
            </div>
            <FileActions>
                <ActionButton>
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

const Document = () => (
    <NavBar header={"Documents"}>
        <Wrapper>
            <Content>
                <FileSection>
                    <SectionHeader>
                        <TabMenu
                            tabs={[
                                "Progress Reports",
                                "Student Logs",
                                "Student Documents",
                                "All Files",
                            ]}
                        />
                    </SectionHeader>
                    <FileList>
                        <FileItem
                            title="1 - Alex Norton Progress Report"
                            size="7.05 MB"
                        />
                        <FileItem
                            title="2 - Alex Norton Progress Report"
                            size="5.05 MB"
                        />
                        <FileItem
                            title="3 - Alex Norton Progress Report"
                            size="3.05 MB"
                        />
                        <FileItem
                            title="4 - Alex Norton Progress Report"
                            size="4.05 MB"
                        />
                        <FileItem
                            title="5 - Alex Norton Progress Report"
                            size="2.05 MB"
                        />
                        <FileItem
                            title="6 - Alex Norton Progress Report"
                            size="1.05 MB"
                        />
                    </FileList>
                </FileSection>
                <FormSection>
                    <Form>
                        <Title>Add Documents</Title>
                        <Label htmlFor="documentTitle">Document Title</Label>
                        <Input
                            type="text"
                            id="documentTitle"
                            aria-label="Document Title"
                        />
                        <Label htmlFor="fileUpload">Attach Documents</Label>
                        <FileDropContainer>
                            <img
                                loading="lazy"
                                src="https://cdn.builder.io/api/v1/image/assets/TEMP/7b639287ff19d9cea52b278a5c41582ed4e1bf799e4a4826575e0a9b46474d1b?apiKey=d66532d056b14640a799069157705b77&"
                                alt=""
                            />
                            <DropText>Drag and Drop here</DropText>
                        </FileDropContainer>
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                            }}
                        >
                            <FileTypes>
                                Accepted File Types: .doc, .docx, .pdf only
                            </FileTypes>
                            <SecurityNote>
                                <img
                                    loading="lazy"
                                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/8b7ec72c66d30f8ec5c35d4cec5db08f1877f1a7d86ea8b6c08df8054b4a9a85?apiKey=d66532d056b14640a799069157705b77&"
                                    alt=""
                                />
                                Secure
                            </SecurityNote>
                        </div>
                        <SubmitButton>Upload</SubmitButton>
                    </Form>
                </FormSection>
            </Content>
        </Wrapper>
    </NavBar>
);

export default Document;
