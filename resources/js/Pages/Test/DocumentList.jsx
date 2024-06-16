import * as React from "react";
import styled from "styled-components";
import NavBar from "./NavBar";

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

const DocumentList = () => (
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

export default DocumentList;
