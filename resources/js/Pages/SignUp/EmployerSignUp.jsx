import * as React from "react";
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
} from "./EmployerSignUp.styled";
import LandingLayout from "@/Layouts/LandingLayout";
import { Head } from "@inertiajs/react";

function EmployerAccountForm({ auth }) {
    return (
        <>
            <Head title="Employer Sign Up" />
            <MainContainer>
            <LandingLayout auth={auth} />

                <StyledSection>
                    <Title>Create an Employer Account</Title>
                    <Description>
                        In order to create an Employer Account, we’re going to
                        need some more information.
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
                            <FormInput type="number" id="companyEmployees" />
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
                                For account management purposes. Not visible to
                                others.
                            </HelpText>
                        </FormGroup>
                        <FormButton type="submit">Save</FormButton>
                    </StyledForm>
                </StyledSection>
            </MainContainer>
        </>
    );
}

export default EmployerAccountForm;
