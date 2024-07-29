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

    console.log(jobFormData);

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
            <Container>
                <Card>
                    <FormWrapper>
                        <Title>Edit Your Posting</Title>
                        <Subtitle>
                            Edit your selected posting's information.
                        </Subtitle>
                        <Form>
                            <SectionTitle>
                                Part 1 of 2: Basic Posting Information
                            </SectionTitle>
                            <FormRow>
                                <FormField>
                                    <Label htmlFor="jobTitle">
                                        Job Title *
                                    </Label>
                                    <Input
                                        type="text"
                                        id="title"
                                        name="title"
                                        aria-label="Job Title"
                                        value={jobFormData.title}
                                        onChange={handleInputChange}
                                    />
                                </FormField>
                                <FormField>
                                    <Label htmlFor="companyName">
                                        Company *
                                    </Label>
                                    <Input
                                        type="text"
                                        id="company"
                                        name="company"
                                        aria-label="Company Name"
                                        value={jobFormData.company}
                                        onChange={handleInputChange}
                                    />
                                </FormField>
                            </FormRow>
                            <FormRow>
                                <FormField>
                                    <Label htmlFor="workplaceType">
                                        Workplace Type *
                                    </Label>
                                    <Select
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
                                <FormField>
                                    <Label htmlFor="jobLocation">
                                        Job Location *
                                    </Label>
                                    <Input
                                        type="text"
                                        id="location"
                                        name="location"
                                        aria-label="Job Location"
                                        value={jobFormData.location}
                                        onChange={handleInputChange}
                                    />
                                </FormField>
                            </FormRow>
                            <HorizontalRule />
                            <ButtonGroup>
                                <Link href="/employer/home">
                                    <ActionButton>Go Back</ActionButton>
                                </Link>
                                <Link href={`/employer/editpost2/${jobId}`}>
                                    <SubmitButton>Continue</SubmitButton>
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
