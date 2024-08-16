import React from 'react';
import Card from './Card';
import StatusChart from './StatusChart';
import { useState, useEffect } from "react";
import UserModal from './ViewUserModal';
import { SectionContainer, SectionTitle, SectionContent, CardList, StatusContainer } from '../Styling/Section.styles';
const Section = ({ title, percentages, users, handleDeleteUser, fontSize, darkMode }) => {
    const [selectedUser, setSelectedUser] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = (user) => {
        setSelectedUser(user);
        setIsModalOpen(true);
    };
    const closeModal = () => {
        setIsModalOpen(false);
    };
    return (
        <SectionContainer fontSize={fontSize} darkMode={darkMode}>
            <SectionTitle fontSize={fontSize} darkMode={darkMode}>{title}</SectionTitle>
            <SectionContent fontSize={fontSize} darkMode={darkMode}>
                <CardList fontSize={fontSize} darkMode={darkMode}>
                    {users && users.map(user => (
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
                            onViewClick={() => openModal(user)}
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
            <UserModal fontSize={fontSize} darkMode={darkMode} isOpen={isModalOpen} onClose={closeModal} user={selectedUser} />
        </SectionContainer>
    );
};
export default Section;
