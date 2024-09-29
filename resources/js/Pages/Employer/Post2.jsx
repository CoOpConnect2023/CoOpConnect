import React, { useState, useEffect } from "react";
import NavBar from "./Components/NavBar";
import { useDispatch, useSelector } from "react-redux";
import { postJob, updateJobFormData, selectJobFormData, resetJobFormData } from "@/Features/jobs/jobsSlice";
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
    CorrectTag
} from "./Styling/Post2.styles";

const appUrl = import.meta.env.VITE_APP_URL;

function Post2() {
    const dispatch = useDispatch();
    const darkMode = useSelector(state => state.accessibility.darkMode);
    const fontSize = useSelector(state => state.accessibility.textSize);
    const jobFormData = useSelector(selectJobFormData);

    const [questions, setQuestions] = useState([]);
    const [newQuestion, setNewQuestion] = useState({ type: 'text', question: '', options: [], correctOption: null });

    // Add new question to the end of the list
    const addQuestion = () => {
        setQuestions([...questions, newQuestion]);  // Add new question to the list
        setNewQuestion({ type: 'text', question: '', options: [], correctOption: null });  // Reset the input fields
    };

    // Handle question input change
    const handleQuestionChange = (e) => {
        setNewQuestion({ ...newQuestion, [e.target.name]: e.target.value });
    };

    // Handle multiple choice options input
    const handleOptionChange = (e, index) => {
        const updatedOptions = [...newQuestion.options];
        updatedOptions[index] = e.target.value;
        setNewQuestion({ ...newQuestion, options: updatedOptions });
    };

    // Add new option for multiple choice
    const addOption = () => {
        setNewQuestion({ ...newQuestion, options: [...newQuestion.options, ''] });
    };

    // Handle correct option selection
    const handleCorrectOptionChange = (index) => {
        setNewQuestion({ ...newQuestion, correctOption: index });
    };

    // Submit the form
    const handleSubmit = () => {
        dispatch(postJob({ ...jobFormData, questions }));
        dispatch(resetJobFormData());
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

                            <Form darkMode={darkMode} fontSize={fontSize}>
                                {/* Question Input */}
                                <div>
                                    <Label darkMode={darkMode} fontSize={fontSize}>Question Type</Label>
                                    <StyledInput
                                        as="select"
                                        name="type"
                                        value={newQuestion.type}
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
                                        name="question"
                                        value={newQuestion.question}
                                        onChange={handleQuestionChange}
                                        placeholder="Enter your question"
                                        darkMode={darkMode}
                                        fontSize={fontSize}
                                    />

                                    {newQuestion.type === "multipleChoice" && (
                                        <NewQuestionDiv>
                                            <Label darkMode={darkMode} fontSize={fontSize}>Multiple Choice Options</Label>
                                            {newQuestion.options.map((option, index) => (
                                                <OptionWrapper key={index}>
                                                    <StyledInput
                                                        type="text"
                                                        value={option}
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
                                                    <Label darkMode={darkMode} fontSize={fontSize}>
                                                        Correct Answer
                                                    </Label>
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

                                  {/* Display Added Questions in a Styled List */}
                                  <QuestionList darkMode={darkMode} fontSize={fontSize}>
                                    {questions.map((q, index) => (
                                        <QuestionItem key={index} darkMode={darkMode} fontSize={fontSize}>
                                            <strong>{q.question}</strong> ({q.type})
                                            {q.type === 'multipleChoice' && (
                                                <OptionList darkMode={darkMode} fontSize={fontSize}>
                                                    {q.options.map((opt, i) => (
                                                        <OptionItem key={i} darkMode={darkMode} fontSize={fontSize}>
                                                            {opt}
                                                            {q.correctOption === i && <CorrectTag>(Correct)</CorrectTag>}
                                                        </OptionItem>
                                                    ))}
                                                </OptionList>
                                            )}
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
}

export default Post2;
