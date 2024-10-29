import React, { useState, useEffect } from "react";
import NavBar from "./Components/NavBar";
import { useDispatch, useSelector } from "react-redux";
import { postJob, updateJobFormData, selectJobFormData, resetJobFormData, postJobWithQuestions } from "@/Features/jobs/jobsSlice";
import { Inertia } from "@inertiajs/inertia";
import { Link } from "@inertiajs/react";
import {
    Container,
    Card,
    FormWrapper,
    Title,
    SectionTitle,
    FormContainer,
    Form,
    Label,
    HorizontalRule,
    ButtonGroup,
    ActionButton,
    SubmitButton,
    StyledInput,
    NewQuestionDiv,
    AddOptionButton,
    OptionWrapper,
    CorrectOptionCheckbox,
    QuestionList,
    QuestionItem,
    OptionList,
    OptionItem,
    CorrectTag,
    RemoveQuestionButton,
} from "./Styling/Post2.styles";
import { FormRow, FormField, Input } from "./Styling/Post1.styles";

const Post2 = () => {
    const dispatch = useDispatch();
    const darkMode = useSelector(state => state.accessibility.darkMode);
    const fontSize = useSelector(state => state.accessibility.textSize);
    const jobFormData = useSelector(selectJobFormData);

    const [newQuestion, setNewQuestion] = useState({ question_text: '', question_type: 'text', answers: [] });

    // Add new question to jobFormData
    const addQuestion = () => {
        const updatedQuestions = [...(jobFormData.questions || []), newQuestion];
        dispatch(updateJobFormData({ questions: updatedQuestions })); // Attach to jobFormData
        setNewQuestion({ question_text: '', question_type: 'text', answers: [] });  // Reset the input fields
    };

    // Handle question input change
    const handleQuestionChange = (e) => {
        const { name, value } = e.target;
        setNewQuestion({ ...newQuestion, [name]: value });
    };

    // Handle multiple-choice options input
    const handleOptionChange = (e, index) => {
        const updatedOptions = [...newQuestion.answers];
        updatedOptions[index] = { ...updatedOptions[index], answer_text: e.target.value };
        setNewQuestion({ ...newQuestion, answers: updatedOptions });
    };

    // Add new option for multiple-choice
    const addOption = () => {
        setNewQuestion({ ...newQuestion, answers: [...newQuestion.answers, { answer_text: '', is_correct: false }] });
    };

    // Handle correct option selection
    const handleCorrectOptionChange = (index) => {
        const updatedOptions = newQuestion.answers.map((option, i) => ({
            ...option,
            is_correct: i === index,
        }));
        setNewQuestion({ ...newQuestion, answers: updatedOptions });
    };

    // Submit the form
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior

        try {
            // Dispatch job and questions data
            await dispatch(postJobWithQuestions({ ...jobFormData }));

            // Reset the form data
            dispatch(resetJobFormData());

            // Redirect to the /employer/home page upon successful submission
            Inertia.visit("/employer/home");

        } catch (error) {
            console.error("Error submitting the form: ", error);
            // Handle any errors if necessary
        }
    };

    // Remove question
    const removeQuestion = (index) => {
        const updatedQuestions = jobFormData.questions.filter((_, i) => i !== index);
        dispatch(updateJobFormData({ questions: updatedQuestions }));
    };

    // Handle option removal
    const handleRemoveOption = (index) => {
        const updatedOptions = newQuestion.answers.filter((_, i) => i !== index);
        setNewQuestion({ ...newQuestion, answers: updatedOptions });
    };

    // Handle date input change for jobFormData
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        dispatch(updateJobFormData({ [name]: value }));
    };

    return (
        <NavBar header={"Posting Jobs"}>
            <Container darkMode={darkMode} fontSize={fontSize}>
                <Card darkMode={darkMode} fontSize={fontSize}>
                    <FormWrapper darkMode={darkMode} fontSize={fontSize}>
                        <Title darkMode={darkMode} fontSize={fontSize}>Create a New Posting</Title>

                        <FormContainer darkMode={darkMode} fontSize={fontSize}>
                            <SectionTitle darkMode={darkMode} fontSize={fontSize}>
                                Part 2 of 2: Job Qualification Questions
                            </SectionTitle>

                            <FormRow>
                                <FormField>
                                    <Label>Start Date</Label>
                                    <Input
                                        darkMode={darkMode}
                                        fontSize={fontSize}
                                        type="date"
                                        name="startDate"
                                        value={jobFormData.startDate || ''}
                                        onChange={handleInputChange}
                                    />
                                </FormField>
                                <FormField>
                                    <Label>End Date</Label>
                                    <Input
                                        darkMode={darkMode}
                                        fontSize={fontSize}
                                        type="date"
                                        name="endDate"
                                        value={jobFormData.endDate || ''}
                                        onChange={handleInputChange}
                                    />
                                </FormField>
                            </FormRow>

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
                        checked={option.is_correct}
                        onChange={() => handleCorrectOptionChange(index)}
                        darkMode={darkMode}
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
                                            <RemoveQuestionButton darkMode={darkMode} fontSize={fontSize} onClick={() => removeQuestion(index)}>
                                                X
                                            </RemoveQuestionButton>
                                        </QuestionItem>
                                    ))}
                                </QuestionList>

                                <HorizontalRule darkMode={darkMode} fontSize={fontSize} />

                                {/* Submit Form */}
                                <ButtonGroup darkMode={darkMode} fontSize={fontSize}>
                                    <Link darkMode={darkMode} fontSize={fontSize} href="/employer/post1">
                                        <ActionButton darkMode={darkMode} fontSize={fontSize}>Go Back</ActionButton>
                                    </Link>
                                    <SubmitButton darkMode={darkMode} fontSize={fontSize} onClick={handleSubmit}>
                                        Finished
                                    </SubmitButton>
                                </ButtonGroup>
                            </Form>
                        </FormContainer>
                    </FormWrapper>
                </Card>
            </Container>
        </NavBar>
    );
};

export default Post2;
