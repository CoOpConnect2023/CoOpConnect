import React from 'react';
import JobsCardComponent from './JobsCard';
import StatusChart from './StatusChart';
import { useState } from "react";
import UserModal from './ViewUserModal';
import AddJobModal from './AddNewJobModal';
import { SectionContainer, SectionTitle, SectionContent, CardList, SchoolSearchInput, SearchAndButtonContainer } from '../Styling/Section.styles';
import { Button } from '../Styling/Card.styles';
const appUrl = import.meta.env.VITE_APP_URL;
const JobsSectionComponent = ({ title, percentages, users, handleDeleteUser, fontSize, darkMode, companies, schools }) => {
    const [selectedUser, setSelectedUser] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [isAddJobModalOpen, setIsAddJobModalOpen] = useState(false);

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

    const openAddJobModal = () => {
        setIsAddJobModalOpen(true); // Open the add user modal
    };

    const closeAddJobModal = () => {
        setIsAddJobModalOpen(false); // Close the add user modal
    };

    // Filter users based on the search query
    const filteredUsers = users?.filter(user =>
        user?.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user?.company?.name?.toLowerCase().includes(searchQuery.toLowerCase()) || // Fix: access company name directly
        user?.location?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user?.jobType?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user?.skills?.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase())) ||
        user?.id?.toString().includes(searchQuery.toLowerCase()) ||
        user?.userId?.toString().includes(searchQuery.toLowerCase())||
        user?.description?.toString().includes(searchQuery.toLowerCase())
    );

    return (
        <SectionContainer fontSize={fontSize} darkMode={darkMode}>
            <SectionTitle fontSize={fontSize} darkMode={darkMode}>{title}</SectionTitle>
<SearchAndButtonContainer>
            <SchoolSearchInput
                fontSize={fontSize}
                darkMode={darkMode}
                type="text"
                placeholder="Search Courses..."
                value={searchQuery}
                onChange={handleSearchChange}
            />
            <Button fontSize={fontSize} darkMode={darkMode} onClick={openAddJobModal}>Add New Job</Button></SearchAndButtonContainer>
            <SectionContent fontSize={fontSize} darkMode={darkMode}>
                <CardList fontSize={fontSize} darkMode={darkMode}>
                    {filteredUsers && filteredUsers.map(user => (
                        <JobsCardComponent
                            fontSize={fontSize}
                            darkMode={darkMode}
                            key={user.id}
                            name={user.name}
                            classroom={user.class}
                            startDate={user.startDate}
                            endDate={user.endDate}
                            teacherID={user.teacherID}
                            email={user.contactEmail}
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
                            jobTitle={user.title}
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

<AddJobModal
                fontSize={fontSize}
                darkMode={darkMode}
                companies={companies}
                schools={schools}
                isOpen={isAddJobModalOpen}
                onClose={closeAddJobModal}
                appUrl={appUrl}

            />
        </SectionContainer>
    );
};

export default JobsSectionComponent;
