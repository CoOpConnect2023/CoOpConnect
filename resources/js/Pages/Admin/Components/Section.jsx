import React from 'react';
import Card from './Card';
import StatusChart from './StatusChart';
import { useDispatch } from 'react-redux';
import { updateUserProfile, getAllUsers } from '@/Features/users/userSlice';

import { useState, useEffect } from "react";
import UserModal from './ViewUserModal';
import { SectionContainer, SectionTitle, SectionContent, CardList, StatusContainer, SchoolSearchInput, SearchAndButtonContainer } from '../Styling/Section.styles';
import { Button } from '../Styling/Card.styles';
import AddUserModal from './AddNewUserModal';
const appUrl = import.meta.env.VITE_APP_URL;




const Section = ({ title, percentages, users, handleDeleteUser, fontSize, darkMode, type }) => {
    const [selectedUser, setSelectedUser] = useState(null);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false); // State to handle add user modal
    const [searchQuery, setSearchQuery] = useState('');

    const openViewModal = (user) => {
        setSelectedUser(user);
        setIsViewModalOpen(true);
    };

    const closeViewModal = () => {
        setIsViewModalOpen(false);
    };

    const openAddUserModal = () => {
        setIsAddUserModalOpen(true); // Open the add user modal
    };

    const closeAddUserModal = () => {
        setIsAddUserModalOpen(false); // Close the add user modal
    };

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value); // Update search query as user types
    };

    const filteredUsers = users?.filter(user =>
        user?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user?.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user?.school_id?.toString().includes(searchQuery) ||
        user?.status?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user?.role?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user?.positiontitle?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user?.company_name?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <SectionContainer fontSize={fontSize} darkMode={darkMode}>
            <SectionTitle fontSize={fontSize} darkMode={darkMode}>{title}</SectionTitle>
            <SearchAndButtonContainer>
            <SchoolSearchInput
                fontSize={fontSize}
                darkMode={darkMode}
                type="text"
                placeholder="Search Users..."
                value={searchQuery}
                onChange={handleSearchChange}
            />

            <Button fontSize={fontSize} darkMode={darkMode} onClick={openAddUserModal}>
                Add New User
            </Button> </SearchAndButtonContainer>

            <SectionContent fontSize={fontSize} darkMode={darkMode}>
                <CardList fontSize={fontSize} darkMode={darkMode}>
                    {filteredUsers && filteredUsers.map(user => (
                        <Card fontSize={fontSize} darkMode={darkMode}
                            key={user.id}
                            name={user.name}
                            classroom={user.class}
                            email={user.email}
                            id={user.id}
                            schoolId={user.school_id}
                            rememberToken={user.remember_token}
                            profileImage={user.profile_image}
                            status={user.status}
                            emailVerified={user.email_verified_at}
                            role={user.role}
                            description={user.description}
                            company={user.company_name}
                            positiontitle={user.positiontitle}
                            created={user.created_at}
                            updated={user.updated_at}
                            onViewClick={() => openViewModal(user)}
                            onDeleteClick={() => handleDeleteUser(user.id)}
                        />
                    ))}
                </CardList>
                {users && (
                    <StatusContainer fontSize={fontSize} darkMode={darkMode}>
                        <StatusChart fontSize={fontSize} darkMode={darkMode} percentages={percentages} users={users} />
                    </StatusContainer>
                )}
            </SectionContent>

            <UserModal
                fontSize={fontSize}
                darkMode={darkMode}
                isOpen={isViewModalOpen}
                onClose={closeViewModal}
                user={selectedUser}
            />

            <AddUserModal
                fontSize={fontSize}
                darkMode={darkMode}
                isOpen={isAddUserModalOpen}
                onClose={closeAddUserModal}
                appUrl={appUrl}
                type={type}
            />
        </SectionContainer>
    );
};

export default Section;
