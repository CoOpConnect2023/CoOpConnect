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

    const dispatch = useDispatch();
    const jobFormData = useSelector(selectJobFormData);
const companies = useSelector(selectCompanies)
    const job = useSelector(selectJobs);
    const jobStatus = useSelector(selectJobsStatus);
    const darkMode = useSelector(state => state.accessibility.darkMode);
    const fontSize = useSelector(state => state.accessibility.textSize);
    const [filteredCompanies, setFilteredCompanies] = useState([]);
    const [showCompanyDropdown, setShowCompanyDropdown] = useState(false);
    const [newQuestion, setNewQuestion] = useState({ question_text: '', question_type: 'text', answers: [] });

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

    const handleOptionChange = (e, index) => {
        const updatedOptions = [...newQuestion.answers];
        updatedOptions[index] = { ...updatedOptions[index], answer_text: e.target.value };
        setNewQuestion({ ...newQuestion, answers: updatedOptions });
    };



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


    const handleQuestionChange = (e) => {
        const { name, value } = e.target;
        setNewQuestion({ ...newQuestion, [name]: value });
    };

    const addOption = () => {
        setNewQuestion({ ...newQuestion, answers: [...newQuestion.answers, { answer_text: '', is_correct: false }] });
    };

    const addQuestion = () => {
        const updatedQuestions = [...(jobFormData.questions || []), newQuestion];
        dispatch(updateJobFormData({ questions: updatedQuestions })); // Attach to jobFormData
        setNewQuestion({ question_text: '', question_type: 'text', answers: [] });  // Reset the input fields
    };

    const handleCorrectOptionChange = (index) => {
        const updatedOptions = newQuestion.answers.map((option, i) => ({
            ...option,
            is_correct: i === index,
        }));
        setNewQuestion({ ...newQuestion, answers: updatedOptions });
    };

    const removeQuestion = (e, index) => {
        e.preventDefault(); // Prevent the default action (e.g., form submission or link navigation)

        const updatedQuestions = jobFormData.questions.filter((_, i) => i !== index);

        dispatch(updateJobFormData({ questions: updatedQuestions }));
    };


    // Handle option removal
    const handleRemoveOption = (index) => {
        const updatedOptions = newQuestion.answers.filter((_, i) => i !== index);
        setNewQuestion({ ...newQuestion, answers: updatedOptions });
    };


    return (
        <NavBar header={"Edit Posting"}>
            <Container darkMode={darkMode} fontSize={fontSize}>
                <Card darkMode={darkMode} fontSize={fontSize}>
                    <FormWrapper darkMode={darkMode} fontSize={fontSize}>
                        <Title darkMode={darkMode} fontSize={fontSize}>Edit Your Posting</Title>

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
        value={jobFormData.company} // Input will display the company name
        onChange={handleInputChange}
    />
    {showCompanyDropdown && filteredCompanies.length > 0 && (
        <Dropdown darkMode={darkMode} fontSize={fontSize}>
            {filteredCompanies.map((company, index) => (
                <DropdownItem
                    darkMode={darkMode}
                    fontSize={fontSize}
                    key={index}
                    onClick={() => handleCompanySelect(company.name, company.id)}>
                    {company.name}
                </DropdownItem>
            ))}
        </Dropdown>
    )}
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
                            <FormRow darkMode={darkMode} fontSize={fontSize}>
    <FormField darkMode={darkMode} fontSize={fontSize}>
        <Label darkMode={darkMode} fontSize={fontSize} htmlFor="startDate">
            Start Date *
        </Label>
        <Input darkMode={darkMode} fontSize={fontSize}
            type="date"
            id="startDate"
            name="startDate"
            aria-label="Start Date"
            value={jobFormData.startDate || ''} // Handle the startDate value from state
            onChange={handleInputChange}
        />
    </FormField>
    <FormField darkMode={darkMode} fontSize={fontSize}>
        <Label darkMode={darkMode} fontSize={fontSize} htmlFor="endDate">
            End Date *
        </Label>
        <Input darkMode={darkMode} fontSize={fontSize}
            type="date"
            id="endDate"
            name="endDate"
            aria-label="End Date"
            value={jobFormData.endDate || ''} // Handle the endDate value from state
            onChange={handleInputChange}
        />
    </FormField>
</FormRow>

                            <HorizontalRule  darkMode={darkMode} fontSize={fontSize}/>

                            <Form darkMode={darkMode} fontSize={fontSize}>
                                {/* Question Input */}
                                <div>
                                    <Label darkMode={darkMode} fontSize={fontSize}>Question Type</Label>
                                    <StyledInput
                                        as="select"
                                        name="question_type"
                                        value={newQuestion.question_type}
                                        onChange={handleQuestionChange}
                                        darkMode={darkMode}
                                        fontSize={fontSize}
                                    >
                                        <option value="text">Text</option>
                                        <option value="multipleChoice">Multiple Choice</option>
                                    </StyledInput>

                                    <Label darkMode={darkMode} fontSize={fontSize}>Question</Label>
                                    <StyledInput
                                        type="text"
                                        name="question_text"
                                        value={newQuestion.question_text}
                                        onChange={handleQuestionChange}
                                        placeholder="Enter your question"
                                        darkMode={darkMode}
                                        fontSize={fontSize}
                                    />

                                    {newQuestion.question_type === "multipleChoice" && (
                                        <NewQuestionDiv>
                                            <Label darkMode={darkMode} fontSize={fontSize}>Multiple Choice Options</Label>
                                            {newQuestion.answers.map((option, index) => (
                                                <OptionWrapper key={index}>
                                                    <StyledInput
                                                        type="text"
                                                        value={option.answer_text}
                                                        onChange={(e) => handleOptionChange(e, index)}
                                                        placeholder={`Option ${index + 1}`}
                                                        darkMode={darkMode}
                                                        fontSize={fontSize}
                                                    />
                                                    <CorrectOptionCheckbox
                                                        type="radio"
                                                        name="correctOption"
                                                        checked={newQuestion.correctOption === index}
                                                        onChange={() => handleCorrectOptionChange(index)}
                                                    />
                                                    <Label darkMode={darkMode} fontSize={fontSize}>Correct Answer</Label>
                                                    <RemoveQuestionButton
                                                        darkMode={darkMode}
                                                        fontSize={fontSize}
                                                        onClick={() => handleRemoveOption(index)}
                                                    >
                                                        X
                                                    </RemoveQuestionButton>
                                                </OptionWrapper>
                                            ))}
                                            <AddOptionButton
                                                type="button"
                                                onClick={addOption}
                                                darkMode={darkMode}
                                                fontSize={fontSize}
                                            >
                                                Add Option
                                            </AddOptionButton>
                                        </NewQuestionDiv>
                                    )}
                                </div>

                                <AddOptionButton
                                    type="button"
                                    onClick={addQuestion}
                                    darkMode={darkMode}
                                    fontSize={fontSize}
                                >
                                    Add Question
                                </AddOptionButton>

                                <HorizontalRule darkMode={darkMode} fontSize={fontSize} />

                                {/* Display Added Questions */}
                                <QuestionList darkMode={darkMode} fontSize={fontSize}>
                                    {jobFormData.questions && jobFormData.questions.map((q, index) => (
                                        <QuestionItem key={index} darkMode={darkMode} fontSize={fontSize}>
                                            <strong>{q.question_text}</strong> ({q.question_type})
                                            {q.question_type === 'multipleChoice' && (
                                                <OptionList darkMode={darkMode} fontSize={fontSize}>
                                                    {q.answers.map((opt, i) => (
                                                        <OptionItem key={i} darkMode={darkMode} fontSize={fontSize}>
                                                            {opt.answer_text}
                                                            {opt.is_correct && <CorrectTag>(Correct)</CorrectTag>}
                                                        </OptionItem>
                                                    ))}
                                                </OptionList>
                                            )}
                                            <RemoveQuestionButton darkMode={darkMode} fontSize={fontSize} onClick={(e) => removeQuestion(e, index)}>
                                                X
                                            </RemoveQuestionButton>
                                        </QuestionItem>
                                    ))}
                                </QuestionList>
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
