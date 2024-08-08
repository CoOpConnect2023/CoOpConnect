import * as React from "react";
import styled from "styled-components";

function QuickLinks() {
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
        // {
        //     title: "Dummy Data",
        //     description:
        //         "Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content.",
        //     imgSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/4a571ec3948ab72ab87b17a1fce671e5d4b256b22cec1d30cce879432a5e0880?apiKey=d66532d056b14640a799069157705b77&",
        //     imgAlt: "Dummy data icon",
        // },
        // {
        //     title: "Dummy Data",
        //     description:
        //         "Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content.",
        //     imgSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/4a571ec3948ab72ab87b17a1fce671e5d4b256b22cec1d30cce879432a5e0880?apiKey=d66532d056b14640a799069157705b77&",
        //     imgAlt: "Dummy data icon",
        // },
        // {
        //     title: "Dummy Data",
        //     description:
        //         "Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content.",
        //     imgSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/4a571ec3948ab72ab87b17a1fce671e5d4b256b22cec1d30cce879432a5e0880?apiKey=d66532d056b14640a799069157705b77&",
        //     imgAlt: "Dummy data icon",
        // },
    ];

    return (
        <MainContainer>
            <Header>Quick Links</Header>
            <Section>
                {quickLinks.map((link, index) => (
                    <Article key={index}>
                        <ArticleHeader>
                            <ArticleTitle>{link.title}</ArticleTitle>
                            <img
                                loading="lazy"
                                src={link.imgSrc}
                                alt={link.imgAlt}
                            />
                        </ArticleHeader>
                        <ArticleDescription>
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
    background-color: #fff;
    display: flex;
    max-width: 480px;
    width: 100%;
    flex-direction: column;
    padding: 20px;
`;

const Header = styled.header`
    color: var(--Schemes-On-Primary-Container, #260e44);
    align-self: center;
    font: 400 28px/129% Poppins, sans-serif;
`;

const Section = styled.section`
    display: flex;
    margin-top: 40px;
    flex-direction: column;
    font-size: 24px;
    color: var(--Schemes-Primary, #6b538c);
    font-weight: 500;
    line-height: 133%;
    padding: 10px;
`;

const Article = styled.article`
    display: flex;
    flex-direction: column;
    margin-top: 20px;
    gap: 10px;
`;

const ArticleHeader = styled.header`
    display: flex;
    justify-content: space-between;
`;

const ArticleTitle = styled.h2`
    font-family: Poppins, sans-serif;
`;

const ArticleDescription = styled.p`
    color: var(--Schemes-Outline, #7b757f);
    letter-spacing: 0.25px;
    margin-top: 10px;
    font: 400 14px/20px Poppins, sans-serif;
`;

export default QuickLinks;
