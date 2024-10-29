import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import NavBar from "./Components/NavBar";
import { useDispatch, useSelector } from "react-redux";
import { getEmployers, selectEmployers, deleteEmployer, createEmployer, selectEmployersStatus } from "@/Features/schools/schoolsSlice";
import { getAllCompanies, selectCompanies } from "@/Features/companies/companySlice"; // Assuming you have this set up
import { getUser, selectUser } from "@/Features/users/userSlice";
import { MainContainer, Section, SectionTitle, StyledTable, Form, Input, Button, DeleteButton, FixedBottom, ModalOverlay, LoadingScreen, ModalButtonContainer, ModalTitle, ModalBody, ModalButton, ConfirmButton, CancelButton, ModalContainer, ErrorMessage  } from "./Styling/ManageStudents.styles";
import UploadUsers from "./Components/UploadUsers";

function EmployersPage() {
    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    const employers = useSelector(selectEmployers);
    const employersStatus = useSelector(selectEmployersStatus);
    const companies = useSelector(selectCompanies); // Get companies list
    const darkMode = useSelector(state => state.accessibility.darkMode);
    const fontSize = useSelector(state => state.accessibility.textSize);

    const [errorMessage, setErrorMessage] = useState(null);
    const [loading, setLoading] = useState(true); // Initial loading state
    const [filteredCompanies, setFilteredCompanies] = useState([]); // Filtered company list based on user input
    const [newEmployer, setNewEmployer] = useState({ name: "", email: "", company: "" });
    const [isModalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        dispatch(getUser());
        dispatch(getAllCompanies()); // Fetch companies when the component mounts
    }, [dispatch]);



    useEffect(() => {
        if (user?.id) {
            dispatch(getEmployers(user.id));
        }
    }, [dispatch, user?.id]);

    useEffect(() => {
        if (employersStatus === "succeeded" || employersStatus === "failed") {
            setLoading(false);
        }
    }, [employersStatus]);

    const handleCreateEmployer = async () => {
        try {

            await dispatch(createEmployer({
                teacher_id: user.id,
                employer_email: newEmployer.email,
                employer_name: newEmployer.name,
                company_name: newEmployer.company
            })).unwrap();


            await dispatch(getEmployers(user?.id)).unwrap();


            await dispatch(getAllCompanies()).unwrap();


            setNewEmployer({ name: "", email: "", company: "" });
            setModalVisible(false);
            setErrorMessage(null);
        } catch (error) {
            const validationErrors = error?.employer_email?.[0] || "An unexpected error occurred";
            setErrorMessage(validationErrors);
        }
    };


    const handleDeleteEmployer = async (employerId) => {
        try {
            await dispatch(deleteEmployer({ teacherID: user.id, employerID: employerId }));
            dispatch(getEmployers(user.id));
        } catch (error) {
            console.error("Error deleting employer:", error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewEmployer({ ...newEmployer, [name]: value });
    };

    const handleCompanyInputChange = (e) => {
        const value = e.target.value;
        setNewEmployer({ ...newEmployer, company: value });

        // Filter companies based on the input value
        const filtered = companies.filter(company =>
            company.name.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredCompanies(filtered);
    };

    const handleAddEmployerClick = () => {
        if (!newEmployer.email) {
            alert("Please fill in the email before proceeding.");
        } else {
            setModalVisible(true);
        }
    };

    const handleModalConfirm = () => {
        handleCreateEmployer();
    };

    const handleModalCancel = () => {
        setModalVisible(false);
    };

    return (
        <NavBar header={"Employers"}>
            <MainContainer fontSize={fontSize} darkMode={darkMode}>
                {loading ? (
                    <LoadingScreen fontSize={fontSize} darkMode={darkMode}>
                        Loading employers data, please wait...
                    </LoadingScreen>
                ) : (
                    <>
                        <Section fontSize={fontSize} darkMode={darkMode}>
                            <SectionTitle fontSize={fontSize} darkMode={darkMode}>
                                Employer List
                            </SectionTitle>
                            <StyledTable fontSize={fontSize} darkMode={darkMode}>
                                <thead>
                                    <tr>
                                        <th>Employer ID</th>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Company</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {employers && employers.map((employer, index) => (
                                        <tr key={index}>
                                            <td>{employer?.id ? employer.id : 'N/A'}</td>
                                            <td>{employer?.employerName || 'Unknown'}</td>
                                            <td>{employer?.employerEmail || 'No Email'}</td>
                                            <td>{employer?.companyName || 'No Company'}</td>
                                            <td>
                                                {employer.id && (
                                                    <DeleteButton onClick={() => handleDeleteEmployer(employer.id)}>
                                                        Delete
                                                    </DeleteButton>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </StyledTable>
                        </Section>

                        <FixedBottom fontSize={fontSize} darkMode={darkMode}>
                            <UploadUsers user={user} fontSize={fontSize} darkMode={darkMode}/>
                            <Form fontSize={fontSize} darkMode={darkMode}>
                                <Input
                                    fontSize={fontSize}
                                    darkMode={darkMode}
                                    type="text"
                                    name="name"
                                    value={newEmployer.name}
                                    onChange={handleInputChange}
                                    placeholder="Employer Name"
                                />
                                <Input
                                    fontSize={fontSize}
                                    darkMode={darkMode}
                                    type="email"
                                    name="email"
                                    value={newEmployer.email}
                                    onChange={handleInputChange}
                                    placeholder="Employer Email - If the employer has an account, you can use this field only to add them."
                                />
                                <Input
                                    fontSize={fontSize}
                                    darkMode={darkMode}
                                    type="text"
                                    name="company"
                                    value={newEmployer.company}
                                    onChange={handleCompanyInputChange}
                                    placeholder="Employer Company"
                                    list="company-options" // Enable suggestions
                                />
                                <datalist id="company-options">
                                    {filteredCompanies.map((company, index) => (
                                        <option key={index} value={company.name} />
                                    ))}
                                </datalist>
                                <Button
                                    fontSize={fontSize}
                                    darkMode={darkMode}
                                    type="button"
                                    onClick={handleAddEmployerClick}
                                >
                                    Add Employer
                                </Button>
                            </Form>
                            {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
                        </FixedBottom>

                        {/* Confirmation Modal */}
                        {isModalVisible && (
                            <ModalOverlay>
                                <ModalContainer darkMode={darkMode}>
                                    <ModalTitle>Confirm Employer Addition</ModalTitle>
                                    <ModalBody darkMode={darkMode}>
                                        Are you sure you want to add this employer? A welcome email will be sent if they don’t already exist.
                                    </ModalBody>
                                    <ModalButtonContainer>
                                        <ConfirmButton onClick={handleModalConfirm}>Confirm</ConfirmButton>
                                        <CancelButton onClick={handleModalCancel}>Cancel</CancelButton>
                                    </ModalButtonContainer>
                                </ModalContainer>
                            </ModalOverlay>
                        )}
                    </>
                )}
            </MainContainer>
        </NavBar>
    );
}

export default EmployersPage;
