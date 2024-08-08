import * as React from "react";
import styled from "styled-components";



function QuickLinks({ darkMode, fontSize }) {
    const quickLinks = [
        {
            title: "Delete account",
            description:
                "Delete your account from the CO-OP Connect platform permanently. This will remove access to the account. Your account information will also be deleted.",
            imgSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/4a571ec3948ab72ab87b17a1fce671e5d4b256b22cec1d30cce879432a5e0880?apiKey=d66532d056b14640a799069157705b77&",
            imgAlt: "Delete account icon",
        },
        {
            title: "Privacy Settings",
            description:
                "Adjust your privacy settings. Private means that your profile and information will not be visible to other users.",
            imgSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/4a571ec3948ab72ab87b17a1fce671e5d4b256b22cec1d30cce879432a5e0880?apiKey=d66532d056b14640a799069157705b77&",
            imgAlt: "Privacy settings icon",
        },
    ];

    return (
        <MainContainer darkMode={darkMode} fontSize={fontSize}>
            <Header darkMode={darkMode} fontSize={fontSize}>Quick Links</Header>
            <Section darkMode={darkMode} fontSize={fontSize}>
                {quickLinks.map((link, index) => (
                    <Article key={index}>
                        <ArticleHeader>
                            <ArticleTitle darkMode={darkMode} fontSize={fontSize}>{link.title}</ArticleTitle>
                            <img
                                loading="lazy"
                                src={link.imgSrc}
                                alt={link.imgAlt}
                            />
                        </ArticleHeader>
                        <ArticleDescription darkMode={darkMode} fontSize={fontSize}>
                            {link.description}
                        </ArticleDescription>
                    </Article>
                ))}
            </Section>
        </MainContainer>
    );
}

const MainContainer = styled.section`
    align-self: stretch;
    border-radius: 10px;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
    background-color: ${({ darkMode }) => (darkMode ? "#1f1f1f" : "#fff")};
    display: flex;
border: 2px solid ${({ darkMode }) => (darkMode ? "#444" : "#e2e8f0")};
    width: 50%;
    flex-direction: column;
    padding: 20px;
    transition: background-color 0.5s ease;
     @media (max-width: 991px) {
        padding: 10px;
        width: 100%;
        flex-direction: column;
    }

`;

const Header = styled.header`
    color: ${({ darkMode }) => (darkMode ? "#f5f5f5" : "var(--Schemes-On-Primary-Container, #260e44)")};
    align-self: center;
    font: 400 28px/129% Poppins, sans-serif;
    transition: color 0.5s ease;

`;

const Section = styled.section`
    display: flex;
    margin-top: 40px;
    flex-direction: column;
    font-size: 24px;
    color: ${({ darkMode }) => (darkMode ? "#ddd" : "var(--Schemes-Primary, #6b538c)")};
    font-weight: 500;
    line-height: 133%;
    padding: 10px;
    transition: color 0.5s ease;
    font-size: ${({ fontSize }) => fontSize};
`;

const Article = styled.article`
    display: flex;
    flex-direction: column;
    margin-top: 20px;
    gap: 10px;
    font-size: ${({ fontSize }) => fontSize};
`;

const ArticleHeader = styled.header`
    display: flex;
    justify-content: space-between;
    font-size: ${({ fontSize }) => fontSize};
`;

const ArticleTitle = styled.h2`
    font-family: Poppins, sans-serif;
    color: ${({ darkMode }) => (darkMode ? "#f5f5f5" : "#000")};
    transition: color 0.5s ease;
    font-size: ${({ fontSize }) => fontSize};
`;

const ArticleDescription = styled.p`
    color: ${({ darkMode }) => (darkMode ? "#bbb" : "var(--Schemes-Outline, #7b757f)")};
    letter-spacing: 0.25px;
    margin-top: 10px;
    font: 400 14px/20px Poppins, sans-serif;
    transition: color 0.5s ease;
    font-size: ${({ fontSize }) => fontSize};
`;

export default QuickLinks;
