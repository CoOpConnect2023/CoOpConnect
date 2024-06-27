import * as React from "react";
import styled from "styled-components";
import { Head } from "@inertiajs/react";
import NavBar from "./Components/NavBar";
import {
    MainContainer,
    StyledSection,
    Title,
    Description,
    StyledForm,
    FormGroup,
    FormLabel,
    FormInput,
    HelpText,
    FormButton,
} from "./Styling/EmployerSignUp.styles";

function EmployerAccountForm({ auth }) {
    return (
        <>
            <NavBar header={"Employer Sign Up"}>
                <Head title="Employer Sign Up" />
                <MainContainer>
                    <StyledSection>
                        <Title>Create an Employer Account</Title>
                        <Description>
                            In order to create an Employer Account, we’re going
                            to need some more information.
                        </Description>
                        <StyledForm>
                            <FormGroup>
                                <FormLabel htmlFor="companyName">
                                    Your company’s name *
                                </FormLabel>
                                <FormInput type="text" id="companyName" />
                            </FormGroup>
                            <FormGroup>
                                <FormLabel htmlFor="companyEmployees">
                                    Your company’s number of employees *
                                </FormLabel>
                                <FormInput
                                    type="number"
                                    id="companyEmployees"
                                />
                            </FormGroup>
                            <FormGroup>
                                <FormLabel htmlFor="userName">
                                    Your first and last name *
                                </FormLabel>
                                <FormInput type="text" id="userName" />
                            </FormGroup>
                            <FormGroup>
                                <FormLabel htmlFor="phoneNumber">
                                    Your phone number *
                                </FormLabel>
                                <FormInput type="tel" id="phoneNumber" />
                                <HelpText>
                                    For account management purposes. Not visible
                                    to others.
                                </HelpText>
                            </FormGroup>
                            <FormButton type="submit">Save</FormButton>
                        </StyledForm>
                    </StyledSection>
                </MainContainer>
            </NavBar>
        </>
    );
}

export default EmployerAccountForm;
