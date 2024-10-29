import React from 'react';
import SchoolCardComponent from './SchoolCard';
import StatusChart from './StatusChart';
import { useState, useEffect } from "react";
import UserModal from './ViewUserModal';
import { SectionContainer, SectionTitle, SectionContent, CardList, SchoolSearchInput, StatusContainer, SearchAndButtonContainer } from '../Styling/Section.styles';
import { Button } from '../Styling/Card.styles';
import AddSchoolModal from './AddNewSchoolModal';

const appUrl = import.meta.env.VITE_APP_URL;


const SchoolSectionComponent = ({ title, percentages, users, handleDeleteUser, fontSize, darkMode, companies, schools }) => {
    const [selectedUser, setSelectedUser] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [isAddSchoolModalOpen, setIsAddSchoolModalOpen] = useState(false);

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

    const openAddSchoolModal = () => {
        setIsAddSchoolModalOpen(true); // Open the add School modal
    };

    const closeAddSchoolModal = () => {
        setIsAddSchoolModalOpen(false); // Close the add user modal
    };

    // Filter users based on the search query
    const filteredUsers = users?.filter(user =>
        user?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user?.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user?.location?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user?.principalName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user?.id?.toString().includes(searchQuery)
    );

    return (
        <SectionContainer fontSize={fontSize} darkMode={darkMode}>
            <SectionTitle fontSize={fontSize} darkMode={darkMode}>{title}</SectionTitle>
            <SearchAndButtonContainer>
            <SchoolSearchInput
                fontSize={fontSize}
                darkMode={darkMode}
                type="text"
                placeholder="Search schools..."
                value={searchQuery}
                onChange={handleSearchChange}
            />
<Button fontSize={fontSize} darkMode={darkMode} onClick={openAddSchoolModal}>Add a School</Button>
</SearchAndButtonContainer>
            <SectionContent fontSize={fontSize} darkMode={darkMode}>
                <CardList fontSize={fontSize} darkMode={darkMode}>
                    {filteredUsers && filteredUsers.map(user => (
                        <SchoolCardComponent
                            fontSize={fontSize}
                            darkMode={darkMode}
                            key={user.id}
                            name={user.name}
                            classroom={user.class}
                            email={user.contactEmail}
                            phone={user.contactPhone}
                            id={user.id}
                            schoolId={user.id}
                            rememberToken={user.remember_token}
                            principal={user.principalName}
                            location={user.location}
                            emailVerified={user.email_verified_at}
                            role={user.role}
                            description={user.description}
                            company={user.company_name}
                            positiontitle={user.positiontitle}
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

<AddSchoolModal
                fontSize={fontSize}
                darkMode={darkMode}
                companies={companies}
                schools={schools}
                isOpen={isAddSchoolModalOpen}
                onClose={closeAddSchoolModal}
                appUrl={appUrl}

            />
        </SectionContainer>

    );
};

export default SchoolSectionComponent;
