import React from 'react';
import CompaniesCardComponent from './CompanyCard';
import StatusChart from './StatusChart';
import { useState } from "react";
import UserModal from './ViewUserModal';
import AddCompanyModal from './AddNewCompanyModal';
import { SectionContainer, SectionTitle, SectionContent, CardList, SchoolSearchInput, SearchAndButtonContainer } from '../Styling/Section.styles';
import { Button } from '../Styling/Card.styles';

const appUrl = import.meta.env.VITE_APP_URL;

const CompaniesSectionComponent = ({ title, percentages, users, handleDeleteUser, fontSize, darkMode, companies, schools }) => {
    const [selectedUser, setSelectedUser] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);

    const openModal = (user) => {
        setSelectedUser(user);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value); // Update search query as user types
    };

    const openAddUserModal = () => {
        setIsAddUserModalOpen(true); // Open the add user modal
    };

    const closeAddUserModal = () => {
        setIsAddUserModalOpen(false); // Close the add user modal
    };


    // Filter users based on the search query
    const filteredUsers = users?.filter(user =>
        user?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user?.description?.toLowerCase().includes(searchQuery.toLowerCase()) || // Fix: access company name directly
        user?.address?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user?.website?.toLowerCase().includes(searchQuery.toLowerCase())  ||
        user?.id?.toString().includes(searchQuery.toLowerCase()) ||
        user?.email?.toString().includes(searchQuery.toLowerCase())
    );

    return (
        <SectionContainer fontSize={fontSize} darkMode={darkMode}>
            <SectionTitle fontSize={fontSize} darkMode={darkMode}>{title}</SectionTitle>
            <SearchAndButtonContainer>
            <SchoolSearchInput
                fontSize={fontSize}
                darkMode={darkMode}
                type="text"
                placeholder="Search Companies..."
                value={searchQuery}
                onChange={handleSearchChange}
            />

<Button fontSize={fontSize} darkMode={darkMode} onClick={openAddUserModal} >
                Add New Company
            </Button>
            </SearchAndButtonContainer>
            <SectionContent fontSize={fontSize} darkMode={darkMode}>
                <CardList fontSize={fontSize} darkMode={darkMode}>
                    {filteredUsers && filteredUsers.map(user => (
                        <CompaniesCardComponent
                            fontSize={fontSize}
                            darkMode={darkMode}
                            key={user.id}
                            name={user.name}
                            email={user.email}
                            address={user.address}
                            website={user.website}
                            startDate={user.startDate}
                            endDate={user.endDate}
                            teacherID={user.teacherID}

                            phone={user.contactPhone}
                            id={user.id}
                            userID={user.userId}
                            schoolId={user.schoolID}
                            rememberToken={user.remember_token}
                            principal={user.principalName}
                            location={user.location}
                            emailVerified={user.email_verified_at}
                            role={user.role}
                            postingStatus={user.postingStatus}
                            description={user.description}
                            companyName={user.company?.name} // Fix: access company name directly
                            companyDescription={user.company?.description} // Fix: access company description
                            jobType={user.jobType}
                            skills={user.skills}
                            created={user.created_at}
                            updated={user.updated_at}
                            onViewClick={() => openModal(user)}
                            onDeleteClick={() => handleDeleteUser(user.id)}
                        />
                    ))}
                </CardList>
            </SectionContent>
            <UserModal
                fontSize={fontSize}
                darkMode={darkMode}
                isOpen={isModalOpen}
                onClose={closeModal}
                user={selectedUser}
            />

<AddCompanyModal
                fontSize={fontSize}
                darkMode={darkMode}
                companies={companies}
                schools={schools}
                isOpen={isAddUserModalOpen}
                onClose={closeAddUserModal}
                appUrl={appUrl}

            />
        </SectionContainer>
    );
};

export default CompaniesSectionComponent;
