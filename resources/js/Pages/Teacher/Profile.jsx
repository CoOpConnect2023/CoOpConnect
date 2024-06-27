import * as React from "react";
import styled from "styled-components";
import NavBar from "./Components/NavBar";
import {
    Main,
    Section,
    Title,
    ProfileWrapper,
    ProfileDetails,
    ProfileImageWrapper,
    ProfileImage,
    BioSection,
    BioTitle,
    BioDescription,
    BioLine,
    BioLineGroup,
    SmallBioLine,
    FieldTitle,
    Input,
    EditProfileButton,
} from "./Styling/Profile.styles";

function Profile() {
    const [fullName, setFullName] = React.useState("John Doe");
    const [email, setEmail] = React.useState("email123@gmail.com");
    const [accountType, setAccountType] = React.useState(
        "Employer, Teacher, Student"
    );
    const [school, setSchool] = React.useState("Microsoft Secondary School");
    const [specialty, setSpecialty] = React.useState("Teaches IT");

    return (
        <NavBar header={"My Profile"}>
            <Main>
                <Section>
                    <Title>Teacher Name</Title>
                    <ProfileWrapper>
                        <ProfileDetails>
                            <ProfileImageWrapper>
                                <ProfileImage
                                    loading="lazy"
                                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/494aedb62fd8412da67a4596baf8d98d8d50133601f1ad66dd714781f065006f?apiKey=d66532d056b14640a799069157705b77&"
                                />
                            </ProfileImageWrapper>
                            <BioSection>
                                <BioTitle>Bio:</BioTitle>
                                <BioDescription>
                                    <BioLine />
                                    <BioLine />
                                    <BioLineGroup>
                                        <SmallBioLine />
                                        <SmallBioLine />
                                    </BioLineGroup>
                                </BioDescription>
                            </BioSection>
                        </ProfileDetails>
                    </ProfileWrapper>
                    <FieldTitle>Full Name</FieldTitle>
                    <Input
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                    />
                    <FieldTitle>Email</FieldTitle>
                    <Input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <FieldTitle>Account Type</FieldTitle>
                    <Input
                        value={accountType}
                        onChange={(e) => setAccountType(e.target.value)}
                    />
                    <FieldTitle>School</FieldTitle>
                    <Input
                        value={school}
                        onChange={(e) => setSchool(e.target.value)}
                    />
                    <FieldTitle>Specialty</FieldTitle>
                    <Input
                        value={specialty}
                        onChange={(e) => setSpecialty(e.target.value)}
                    />
                    <EditProfileButton>Edit Profile</EditProfileButton>
                </Section>
            </Main>
        </NavBar>
    );
}

export default Profile;
