import * as React from "react";
import { useEffect, useState } from "react";
import styled from "styled-components";
import NavBar from "./Components/NavBar";
import { Link } from "@inertiajs/react";

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
    ButtonGroup,
    ActionButton,
    SubmitButton,
} from "./Styling/EditPost1.styles";

import { useDispatch, useSelector } from "react-redux";
import {
    selectJob,
    selectJobs,
    updateJobFormData,
    selectJobFormData,
    selectJobsStatus,
} from "@/Features/jobs/jobsSlice";
import { usePage } from "@inertiajs/react";

function EditPost1() {
    const { props } = usePage();
    const { jobId } = props;

    const dispatch = useDispatch();
    const jobFormData = useSelector(selectJobFormData);
    const job = useSelector(selectJobs);
    const jobStatus = useSelector(selectJobsStatus);
    const darkMode = useSelector(state => state.accessibility.darkMode);
    const fontSize = useSelector(state => state.accessibility.textSize);



    useEffect(() => {
        dispatch(selectJob({ jobId })).then((response) => {
            const job = response.payload; // Assuming the response payload contains the job data
            if (jobFormData.jobsId == "") {
                dispatch(
                    updateJobFormData({
                        jobsId: job?.id || "",
                        title: job?.title || "",
                        company: job?.company || "",
                        description: job?.description || "",
                        postingStatus: job?.postingStatus || "open",
                        jobType: job?.jobType || "hybrid",
                        location: job?.location || "",
                        skills: job?.skills || "",
                    })
                );
            }
        });
    }, [dispatch, jobId]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        dispatch(updateJobFormData({ [name]: value }));
    };

    return (
        <NavBar header={"Edit Posting"}>
            <Container darkMode={darkMode} fontSize={fontSize}>
                <Card darkMode={darkMode} fontSize={fontSize}>
                    <FormWrapper darkMode={darkMode} fontSize={fontSize}>
                        <Title darkMode={darkMode} fontSize={fontSize}>Edit Your Posting</Title>
                        <Subtitle darkMode={darkMode} fontSize={fontSize}>
                            Edit your selected posting's information.
                        </Subtitle>
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
                                    <Label darkMode={darkMode} fontSize={fontSize} htmlFor="companyName">
                                        Company *
                                    </Label>
                                    <Input darkMode={darkMode} fontSize={fontSize}
                                        type="text"
                                        id="company"
                                        name="company"
                                        aria-label="Company Name"
                                        value={jobFormData.company}
                                        onChange={handleInputChange}
                                    />
                                </FormField>
                            </FormRow>
                            <FormRow darkMode={darkMode} fontSize={fontSize}>
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
                            </FormRow>
                            <HorizontalRule  darkMode={darkMode} fontSize={fontSize}/>
                            <ButtonGroup darkMode={darkMode} fontSize={fontSize}>
                                <Link darkMode={darkMode} fontSize={fontSize} href="/employer/home">
                                    <ActionButton darkMode={darkMode} fontSize={fontSize}>Go Back</ActionButton>
                                </Link>
                                <Link darkMode={darkMode} fontSize={fontSize} href={`/employer/editpost2/${jobId}`}>
                                    <SubmitButton darkMode={darkMode} fontSize={fontSize}>Continue</SubmitButton>
                                </Link>
                            </ButtonGroup>
                        </Form>
                    </FormWrapper>
                </Card>
            </Container>
        </NavBar>
    );
}

export default EditPost1;
