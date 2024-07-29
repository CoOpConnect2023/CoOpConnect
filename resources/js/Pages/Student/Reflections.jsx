import React, { useState, useEffect } from "react";
import styled from "styled-components";
import NavBar from "./Components/NavBar";
import { useSelector, useDispatch } from "react-redux";
import {
    postReflection,
    selectReflectionsStatus,
    selectReflections,
} from "@/Features/reflections/reflectionsSlice";
import {
    Section,
    Container,
    FormWrapper,
    Header,
    Description,
    FormContainer,
    Form,
    Label,
    TextareaWrapper,
    Textarea,
    Image,
    Button,
    ErrorMessage,
    SuccessMessage,
} from "./Styling/Reflections.styles";

import { Link } from "@inertiajs/react";

const badWords = [
    "bitch",
    "nigger",
    "fuck",
    "cock",
    "pussy",
    "shit",
    "asshole",
    "dick",
    "whore",
    "prick",
    "bullshit",
    "bastard",
];

function Reflections() {
    const [userId, setUserId] = useState(null);
    const [reflectionContent, setReflectionContent] = useState("");
    const [error, setError] = React.useState(null);
    const [successMessage, setSuccessMessage] = useState("");

    useEffect(() => {
        // Fetch the XSRF token from cookies and set it in Axios headers
        const csrfToken = document.cookie
            .split("; ")
            .find((row) => row.startsWith("XSRF-TOKEN="))
            ?.split("=")[1];
        axios.defaults.headers.common["X-XSRF-TOKEN"] = csrfToken;

        // Fetch the user ID
        const fetchUserId = async () => {
            try {
                const response = await axios.get(
                    `http://127.0.0.1:8000/api/user-id`
                );
                setUserId(response.data.user.id);

            } catch (error) {
                console.error("Error fetching user ID:", error);
            }
        };

        fetchUserId();
    }, []);

    const dispatch = useDispatch();

    const reflections = useSelector(selectReflections);
    const reflectionsStatus = useSelector(selectReflectionsStatus);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const hasBadWords = badWords.some((word) =>
            reflectionContent.toLowerCase().includes(word)
        );

        if (hasBadWords) {
            setError("Please remove inappropriate words from your reflection.");
            return; // Prevent submission if bad words are found
        }

        const currentDate = new Date().toISOString();

        dispatch(
            postReflection({
                userId: userId,
                content: reflectionContent,
                jobsId: 4,
                createdAt: currentDate,
                updatedAt: currentDate,
            })
        )
            .then((response) => {
                setSuccessMessage("Reflection posted successfully!");
                setReflectionContent("");
                setError(null);

                setTimeout(() => {
                    setSuccessMessage("");
                }, 5000);
            })
            .catch((error) => {
                console.error("Error posting reflection:", error);
                setError(
                    "There was an error posting your reflection. Please try again."
                );
            });
    };

    return (
        <NavBar header={"Reflections Upload"}>
            <Section className="forum-container">
                <Container className="form-inner-container">
                    <FormWrapper className="form-content-wrapper">
                        <Header className="forum-header">
                            Reflections Forum
                        </Header>
                        <Description className="forum-description">
                            Share your reflections with your teachers and
                            employers!
                        </Description>
                        <FormContainer>
                            <Form onSubmit={handleSubmit}>
                                <Label
                                    htmlFor="reflectionInput"
                                    className="reflection-label"
                                >
                                    Type out your reflection here:
                                </Label>
                                <TextareaWrapper
                                    className="textarea-wrapper"
                                    tabIndex="0"
                                >
                                    <Textarea
                                        id="reflectionInput"
                                        className="reflection-textarea"
                                        value={reflectionContent}
                                        onChange={(e) => {
                                            setReflectionContent(
                                                e.target.value
                                            );
                                            // Clear error message on input change
                                            setError(null);
                                        }}
                                    />

                                    <Image
                                        loading="lazy"
                                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/cdd149d58712b078a844655053653df9d81013ce41c2123353ace40a672efdc3?apiKey=d66532d056b14640a799069157705b77&"
                                        alt=""
                                    />
                                </TextareaWrapper>
                                {error && <ErrorMessage>{error}</ErrorMessage>}
                                <Button type="submit" className="submit-button">
                                    Post Comment
                                </Button>
                                {successMessage && (
                                    <SuccessMessage>
                                        {successMessage}
                                    </SuccessMessage>
                                )}
                                <Link href={`/student/myreflections`}>
                                <Button >
                                    View My Reflections
                                </Button>
                                </Link>
                            </Form>
                        </FormContainer>
                    </FormWrapper>
                </Container>
            </Section>
        </NavBar>
    );
}

export default Reflections;
