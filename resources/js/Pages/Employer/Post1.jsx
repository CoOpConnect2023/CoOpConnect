import React from "react";
import { useState, useEffect } from "react";
import styled from "styled-components";
import NavBar from "./Components/NavBar";
import { Link } from "@inertiajs/react";
import { useDispatch, useSelector } from "react-redux";
import ReactQuill from 'react-quill'; // Importing ReactQuill
import 'react-quill/dist/quill.snow.css';

import {
    updateJobFormData,
    selectJobFormData,
} from "@/Features/jobs/jobsSlice";
import { Inertia } from "@inertiajs/inertia";
import {
    Container,
    Card,
    FormWrapper,
    Title,
    Subtitle,
    Form,
    SectionTitle,
    FormRow,
    FormField,
    Label,
    Input,
    Select,
    HorizontalRule,
    SubmitButton,
    BackButton,
    ButtonContainerPost,
    StyledQuill,
} from "./Styling/Post1.styles";

import {
    SectionHeading,
    SectionDescription,
    InputField,
    StyledInput,
    TagContainer,
    Tag,
    TagName,
    TagIcon,



} from "./Styling/Post2.styles";

const appUrl = import.meta.env.VITE_APP_URL;

function Post1() {
    const dispatch = useDispatch();
    const [user, setUser] = useState(null);
    const [currentSkill, setCurrentSkill] = useState("");
    const jobFormData = useSelector(selectJobFormData);
    const darkMode = useSelector(state => state.accessibility.darkMode);
    const fontSize = useSelector(state => state.accessibility.textSize);



    useEffect(() => {
        const fetchUserId = async () => {
            try {
                const response = await axios.get(
                    `${appUrl}/api/user-id`
                );
                setUser(response.data.user);
                dispatch(updateJobFormData({ userId: response.data.user.id, company_id: response.data.user.company.id }));
            } catch (error) {
                console.error("Error fetching user ID:", error);
            }
        };
        fetchUserId();
    }, []);


    console.log(jobFormData);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        dispatch(updateJobFormData({ [name]: value }));
    };

    const handleSubmit = (e) => {
        // Dispatch postJob action with jobFormData
        dispatch(postJob(jobFormData));

        dispatch(resetJobFormData());
    };

    const handleSkillChange = (e) => {
        setCurrentSkill(e.target.value);
    };

    const handleSkillKeyDown = (e) => {
        if (e.key === "Enter" && currentSkill.trim()) {
            e.preventDefault();
            const updatedSkills = [...jobFormData.skills, currentSkill.trim()];
            dispatch(updateJobFormData({ skills: updatedSkills }));
            setCurrentSkill("");
        }
    };

    const removeSkill = (skillToRemove) => {
        const updatedSkills = jobFormData.skills.filter(
            (skill) => skill !== skillToRemove
        );
        dispatch(updateJobFormData({ skills: updatedSkills }));
    };

    const handleDescriptionChange = (content, delta, source, editor) => {
        dispatch(updateJobFormData({ description: content }));
    };

    return (
        <NavBar header={"Posting Jobs"}>
            <Container darkMode={darkMode} fontSize={fontSize}>
                <Card darkMode={darkMode} fontSize={fontSize}>
                    <FormWrapper darkMode={darkMode} fontSize={fontSize}>
                        

                        <Form darkMode={darkMode} fontSize={fontSize}>
                            <SectionTitle darkMode={darkMode} fontSize={fontSize}>
                                Part 1 of 2: Basic Posting Information
                            </SectionTitle>
                            <FormRow darkMode={darkMode} fontSize={fontSize}>
                                <FormField darkMode={darkMode} fontSize={fontSize}>
                                    <Label darkMode={darkMode} fontSize={fontSize} htmlFor="jobTitle">
                                        Job Title *
                                    </Label>
                                    <Input darkMode={darkMode} fontSize={fontSize}
                                        type="text"
                                        id="title"
                                        name="title"
                                        aria-label="Job Title"
                                        value={jobFormData.title}
                                        onChange={handleInputChange}
                                    />
                                </FormField>
                                <FormField darkMode={darkMode} fontSize={fontSize}>
                                    <Label darkMode={darkMode} fontSize={fontSize} htmlFor="workplaceType">
                                        Workplace Type *
                                    </Label>
                                    <Select darkMode={darkMode} fontSize={fontSize}
                                        id="jobType"
                                        name="jobType"
                                        aria-label="Workplace Type"
                                        value={jobFormData.jobType}
                                        onChange={handleInputChange}
                                    >
                                        <option value="Onsite">Onsite</option>
                                        <option value="Remote">Remote</option>
                                        <option value="Hybrid">Hybrid</option>
                                    </Select>
                                </FormField>

                            </FormRow>
                            <FormRow darkMode={darkMode} fontSize={fontSize}>
                                <FormField darkMode={darkMode} fontSize={fontSize}>
                                    <Label darkMode={darkMode} fontSize={fontSize} htmlFor="jobLocation">
                                        Job Location *
                                    </Label>
                                    <Input darkMode={darkMode} fontSize={fontSize}
                                        type="text"
                                        id="location"
                                        name="location"
                                        aria-label="Job Location"
                                        value={jobFormData.location}
                                        onChange={handleInputChange}
                                    />
                                </FormField>
                                <FormField darkMode={darkMode} fontSize={fontSize}>

                                    <Label darkMode={darkMode} fontSize={fontSize}> Add some skill keywords to the job.</Label>

                                    <Input darkMode={darkMode} fontSize={fontSize}
                                        id="skillInput"
                                        name="skills"
                                        value={currentSkill}
                                        onChange={handleSkillChange}
                                        onKeyDown={handleSkillKeyDown}
                                    />
                                    <TagContainer darkMode={darkMode} fontSize={fontSize}>
                                        {jobFormData.skills.map((skill, index) => (
                                            <Tag darkMode={darkMode} fontSize={fontSize} key={index}>
                                                <TagName darkMode={darkMode} fontSize={fontSize}>{skill}</TagName>
                                                <TagIcon darkMode={darkMode} fontSize={fontSize}
                                                    loading="lazy"
                                                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/f4297c66e6d9622e462ebb187a46dd67cf9ee2c5dfcfd5088583249a1e3bfc3e?apiKey=d66532d056b14640a799069157705b77&"
                                                    alt={`${skill} Icon`}
                                                    onClick={() => removeSkill(skill)}
                                                />
                                            </Tag>
                                        ))}
                                    </TagContainer>

                                </FormField>

                            </FormRow>
                            <SectionHeading darkMode={darkMode} fontSize={fontSize}>
                                Add a Job Description
                            </SectionHeading>
                            <SectionDescription darkMode={darkMode} fontSize={fontSize}>
                                Describe the contents of the job. Include details about the daily tasks, requirements, and expectations.
                            </SectionDescription>
                            <StyledQuill darkMode={darkMode} fontSize={fontSize}
                                value={jobFormData.description}
                                onChange={handleDescriptionChange}
                                theme="snow"
                            />



                            <HorizontalRule darkMode={darkMode} fontSize={fontSize} />
                            <ButtonContainerPost darkMode={darkMode} fontSize={fontSize}>
                                <Link darkMode={darkMode} fontSize={fontSize} href="/employer/home">
                                    <BackButton darkMode={darkMode} fontSize={fontSize} tabIndex="0">
                                        Go Back
                                    </BackButton>
                                </Link>
                                <Link darkMode={darkMode} fontSize={fontSize} href="/employer/post2">
                                    <SubmitButton darkMode={darkMode} fontSize={fontSize} tabIndex="0">
                                        Continue
                                    </SubmitButton>
                                </Link>
                            </ButtonContainerPost>
                        </Form>
                    </FormWrapper>
                </Card>
            </Container>
        </NavBar>
    );
}

export default Post1;
