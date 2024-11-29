import * as React from "react";
import { useState, useEffect } from "react";
import styled from "styled-components";
import NavBar from "./Components/NavBar";
import downarrow from "@/Pages/Images/Icon.svg";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "@inertiajs/react";
import {
    patchJob,
    updateJobFormData,
    selectJobFormData,
    resetJobFormData,
    patchJobWithQuestions
} from "@/Features/jobs/jobsSlice";
import {
    Container,
    Card,
    FormWrapper,
    Title,
    Subtitle,
    FormContainer,
    Form,
    SectionTitle,
    SectionHeading,
    SectionDescription,
    InputField,
    ProgressBar,
    ProgressItem,
    StyledInput,
    Tag,
    TagName,
    TagIcon,
    TagContainer,
    Label,
    HorizontalRule,
    ButtonGroup,
    ActionButton,
    SubmitButton,
    StyledQuill,
    NoSkillsText
} from "./Styling/EditPost2.styles";

import {
    selectJob,



} from "@/Features/jobs/jobsSlice";
import { usePage } from "@inertiajs/react";

import { AddOptionButton, QuestionList, QuestionItem, RemoveQuestionButton, NewQuestionDiv, OptionWrapper, CorrectOptionCheckbox, OptionList, OptionItem, CorrectTag } from "./Styling/Post2.styles";
import {







    FormRow,
    FormField,

    Input,
    Select,




    Dropdown,
    DropdownItem
} from "./Styling/EditPost1.styles";

function EditPost2() {
    const { props } = usePage();
    const { jobId } = props;


    const darkMode = useSelector(state => state.accessibility.darkMode);
    const fontSize = useSelector(state => state.accessibility.textSize);
    const dispatch = useDispatch();
    const jobFormData = useSelector(selectJobFormData);
    const [newQuestion, setNewQuestion] = useState({ question_text: '', question_type: 'text', answers: [] });

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

                    company: job?.company?.name || "",
                    companyId: job?.company?.id || "",
                    company_id: job?.company?.id || "",

                    startDate: job?.startDate || "",
                    endDate: job?.endDate || "",
                    questions, // Include questions with answers
                })
            );

        });
    }, [dispatch, jobId, jobFormData.jobsId]);

    const handleSubmit = (e) => {
        // Dispatch postJob action with jobFormData
        dispatch(patchJobWithQuestions(jobFormData));
        dispatch(resetJobFormData());
    };



    const handleDescriptionChange = (content, delta, source, editor) => {
        dispatch(updateJobFormData({ description: content }));
    };

    console.log(jobFormData);

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

    const handleOptionChange = (e, index) => {
        const updatedOptions = [...newQuestion.answers];
        updatedOptions[index] = { ...updatedOptions[index], answer_text: e.target.value };
        setNewQuestion({ ...newQuestion, answers: updatedOptions });
    };

    return (
        <NavBar header={"Edit Postings"}>
            <Container darkMode={darkMode} fontSize={fontSize}>
                <Card darkMode={darkMode} fontSize={fontSize}>
                    <FormWrapper darkMode={darkMode} fontSize={fontSize}>


                        <FormContainer darkMode={darkMode} fontSize={fontSize}>
                            <SectionTitle darkMode={darkMode} fontSize={fontSize}>
                                Part 2 of 2: Job Details
                            </SectionTitle>

                            <HorizontalRule darkMode={darkMode} fontSize={fontSize} />

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
                                        min={new Date().toISOString().split("T")[0]}
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
                                        min={new Date().toISOString().split("T")[0]}
                                    />
                                </FormField>
                            </FormRow>


                            <HorizontalRule darkMode={darkMode} fontSize={fontSize} />
                            <FormRow>
                                <Form darkMode={darkMode} fontSize={fontSize}>
                                    {/* Question Input */}
                                    <div style={{
                                        display: 'flex',
                                        gap: '16px',
                                        width: '100%',
                                        flexDirection: 'column',
                                    }}>
                                        <Label darkMode={darkMode} fontSize={fontSize}>Question Type *</Label>
                                        <StyledInput style={{
                                            display: 'flex',

                                            width: '100%',

                                        }}
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

                                        <Label darkMode={darkMode} fontSize={fontSize}>Question *</Label>
                                        <StyledInput style={{
                                            display: 'flex',

                                            width: '100%',

                                        }}
                                            type="text"
                                            name="question_text"
                                            value={newQuestion.question_text}
                                            onChange={handleQuestionChange}
                                            placeholder="Enter your question"
                                            darkMode={darkMode}
                                            fontSize={fontSize}
                                        />

                                        {newQuestion.question_type === "multipleChoice" && (
                                            <NewQuestionDiv >
                                                <Label darkMode={darkMode} fontSize={fontSize}>Multiple Choice Options</Label>
                                                {newQuestion.answers.map((option, index) => (
                                                    <OptionWrapper key={index}>
                                                        <StyledInput style={{
                                                            display: 'flex',

                                                            width: '100%',

                                                        }}
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
                            </FormRow>
                            <ButtonGroup darkMode={darkMode} fontSize={fontSize}>
                                <Link darkMode={darkMode} fontSize={fontSize} href={`/employer/editpost1/${jobId}`}>
                                    <ActionButton>Go Back</ActionButton>
                                </Link>
                                <Link darkMode={darkMode} fontSize={fontSize} href="/employer/home">
                                    <SubmitButton darkMode={darkMode} fontSize={fontSize} onClick={handleSubmit}>
                                        Finished
                                    </SubmitButton>
                                </Link>
                            </ButtonGroup>
                        </FormContainer>
                    </FormWrapper>
                </Card>
            </Container>
        </NavBar>
    );
}



export default EditPost2;
