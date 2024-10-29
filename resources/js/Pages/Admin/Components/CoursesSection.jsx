import React from 'react';
import CoursesCardComponent from './CoursesCard';
import StatusChart from './StatusChart';
import { useState, useEffect } from "react";
import AddCourseModal from './AddNewCourseModal';
import UserModal from './ViewUserModal';
import { SectionContainer, SectionTitle, SectionContent, CardList, SchoolSearchInput, StatusContainer, SearchAndButtonContainer } from '../Styling/Section.styles';
import { Button } from '../Styling/Card.styles';
const appUrl = import.meta.env.VITE_APP_URL;



const CourseSectionComponent = ({ title, percentages, users, handleDeleteUser, fontSize, darkMode, schools, companies, teachers }) => {
    const [selectedUser, setSelectedUser] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [isAddCourseModalOpen, setIsAddCourseModalOpen] = useState(false);

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

    const openAddCourseModal = () => {
        setIsAddCourseModalOpen(true); // Open the add user modal
    };

    const closeAddCourseModal = () => {
        setIsAddCourseModalOpen(false); // Close the add user modal
    };




    // Filter users based on the search query
    const filteredUsers = users?.filter(user =>
        user?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user?.teacherID?.toString().includes(searchQuery.toLowerCase()) ||
        user?.id?.toString().includes(searchQuery.toLowerCase())

    );

    return (
        <SectionContainer fontSize={fontSize} darkMode={darkMode}>
            <SectionTitle fontSize={fontSize} darkMode={darkMode}>{title}</SectionTitle><SearchAndButtonContainer>
            <SchoolSearchInput
                fontSize={fontSize}
                darkMode={darkMode}
                type="text"
                placeholder="Search Courses..."
                value={searchQuery}
                onChange={handleSearchChange}
            /><Button onClick={openAddCourseModal} fontSize={fontSize} darkMode={darkMode}>Add a Course</Button></SearchAndButtonContainer>
            <SectionContent fontSize={fontSize} darkMode={darkMode}>
                <CardList fontSize={fontSize} darkMode={darkMode}>
                    {filteredUsers && filteredUsers.map(user => (
                        <CoursesCardComponent
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
                            schoolId={user.schoolID}
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
                schools={schools}
            />

<AddCourseModal
                fontSize={fontSize}
                darkMode={darkMode}
                companies={companies}
                schools={schools}
                isOpen={isAddCourseModalOpen}
                onClose={closeAddCourseModal}
                appUrl={appUrl}
                teachers={teachers}

            />
        </SectionContainer>
    );
};

export default CourseSectionComponent;
