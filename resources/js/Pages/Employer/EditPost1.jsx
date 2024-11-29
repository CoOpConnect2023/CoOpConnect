import * as React from "react";
import { useEffect, useState } from "react";
import styled from "styled-components";
import NavBar from "./Components/NavBar";
import { Link } from "@inertiajs/react";
import { getAllCompanies, selectCompanies } from "@/Features/companies/companySlice";

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
    Dropdown,
    DropdownItem
} from "./Styling/EditPost1.styles";

import {


    FormContainer,

    SectionHeading,
    SectionDescription,
    InputField,
    ProgressBar,
    ProgressItem,

    Tag,
    TagName,
    TagIcon,
    TagContainer,

    StyledQuill,
    NoSkillsText
} from "./Styling/EditPost2.styles";
import { StyledInput, AddOptionButton, QuestionList, QuestionItem, RemoveQuestionButton, NewQuestionDiv, OptionWrapper, CorrectOptionCheckbox, OptionList, OptionItem, CorrectTag } from "./Styling/Post2.styles";

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
    const [currentSkill, setCurrentSkill] = useState("");
    const dispatch = useDispatch();
    const jobFormData = useSelector(selectJobFormData);
const companies = useSelector(selectCompanies)
    const job = useSelector(selectJobs);
    const jobStatus = useSelector(selectJobsStatus);
    const darkMode = useSelector(state => state.accessibility.darkMode);
    const fontSize = useSelector(state => state.accessibility.textSize);
    const [filteredCompanies, setFilteredCompanies] = useState([]);
    const [showCompanyDropdown, setShowCompanyDropdown] = useState(false);


    const handleDescriptionChange = (content, delta, source, editor) => {
        dispatch(updateJobFormData({ description: content }));
    };

    useEffect(() => {
        dispatch(getAllCompanies()); // Fetch companies when the component mounts
    }, [dispatch]);


    useEffect(() => {
        dispatch(selectJob({ jobId })).then((response) => {
            const job = response.payload; // Assuming the response payload contains the job data

                // Extract questions and answers from the job data
                const questions = job?.questions?.map(question => ({
                    id: question.id,
                    question_text: question.question_text, // Ensure this field exists
                    jobs_id: question.jobs_id,
                    question_type: question.question_type,
                    // Extract answers if available
                    answers: question.answers?.map(answer => ({
                        id: answer.id,
                        answer_text: answer.answer_text,
                        is_correct: answer.is_correct
                    })) || [] // Default to an empty array if no answers
                })) || [];

                // Dispatch action to update the job form data with job and question details
                dispatch(
                    updateJobFormData({
                        jobsId: job?.id || "",
                        title: job?.title || "",
                        company: job?.company?.name || "",
                        companyId: job?.company?.id || "",
                        company_id: job?.company?.id || "",
                        description: job?.description || "",
                        postingStatus: job?.postingStatus || "open",
                        jobType: job?.jobType || "hybrid",
                        location: job?.location || "",
                        skills: job?.skills || [],
                        startDate: job?.startDate || "",
                        endDate: job?.endDate || "",
                        questions, // Include questions with answers
                    })
                );

        });
    }, [dispatch, jobId, jobFormData.jobsId]);





    const handleInputChange = (e) => {
        const { name, value } = e.target;
        dispatch(updateJobFormData({ [name]: value }));

        if (name === 'company') {
            const filtered = companies.filter(company =>
                company.name.toLowerCase().includes(value.toLowerCase())
            );
            setFilteredCompanies(filtered);
            setShowCompanyDropdown(true); // Show the dropdown when typing
        }
    };

    console.log(jobFormData)

    const handleCompanySelect = (companyName, companyId) => {
        // Update both the company name and company ID in the form data
        dispatch(updateJobFormData({ company: companyName, company_id: companyId }));
        setShowCompanyDropdown(false); // Hide the company dropdown after selection
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



    return (
        <NavBar header={"Edit Posting"}>
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
                                <FormField>



                            <Label darkMode={darkMode} fontSize={fontSize} htmlFor="skillInput">Add some skill keywords to the job *</Label>
                            <StyledInput darkMode={darkMode} fontSize={fontSize}
                                id="skillInput"
                                name="skill"
                                value={currentSkill}
                                onChange={handleSkillChange}
                                onKeyDown={handleSkillKeyDown}
                            />
                            <TagContainer darkMode={darkMode} fontSize={fontSize}>
                                {Array.isArray(jobFormData?.skills) && jobFormData?.skills.length > 0 ? (
                                    jobFormData.skills.map((skill, index) => (
                                        <Tag darkMode={darkMode} fontSize={fontSize} key={index}>
                                            <TagName darkMode={darkMode} fontSize={fontSize}>{skill}</TagName>
                                            <TagIcon darkMode={darkMode} fontSize={fontSize}
                                                loading="lazy"
                                                src="https://cdn.builder.io/api/v1/image/assets/TEMP/f4297c66e6d9622e462ebb187a46dd67cf9ee2c5dfcfd5088583249a1e3bfc3e?apiKey=d66532d056b14640a799069157705b77&"
                                                alt={`${skill} Icon`}
                                                onClick={() => removeSkill(skill)}
                                            />
                                        </Tag>
                                    ))

                                ) : (
                                    <NoSkillsText>No skills available</NoSkillsText> /* Optional message if no skills */
                                )}
                            </TagContainer>
                            </FormField>



                            </FormRow>


                            <HorizontalRule  darkMode={darkMode} fontSize={fontSize}/>

                            <SectionHeading darkMode={darkMode} fontSize={fontSize}>
                                Add a Job Description
                            </SectionHeading>
                            <SectionDescription darkMode={darkMode} fontSize={fontSize}>
                                Describe the responsibilities of the job. Include
                                details about the daily tasks, requirements, and
                                expectations.
                            </SectionDescription>
                            <Form darkMode={darkMode} fontSize={fontSize}>
                                <StyledQuill darkMode={darkMode} fontSize={fontSize}
                                    value={jobFormData.description}
                                    onChange={handleDescriptionChange}
                                    theme="snow"
                                />

                            </Form>


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
