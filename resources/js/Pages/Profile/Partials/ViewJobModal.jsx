import React, { useState, useEffect } from "react";
import styled from "styled-components";
const appUrl = import.meta.env.VITE_APP_URL;

const JobModal = ({ job, onClose }) => {
    const [applied, setApplied] = useState(false);
    const parseJSONSkills = (skills) => {
        try {
            return JSON.parse(skills);
        } catch (error) {
            console.error('Error parsing skills JSON:', error);
            return [];
        }
    };

    // Conditionally parse job.skills if it's a string
    const parsedSkills = typeof job.skills === 'string' ? parseJSONSkills(job.skills) : job.skills;


    useEffect(() => {
        const checkApplicationStatus = async () => {
            try {
                const response = await axios.get(`${appUrl}/api/check-application/${job.id}`);
                setApplied(response.data.applied);
            } catch (error) {
                console.error('Error checking application status:', error);
            }
        };

        checkApplicationStatus();
    }, [job.id]);

    const handleApply = async () => {
        try {
            const response = await axios.post(`${appUrl}/api/apply/${job.id}`);
            alert(response.data.message);
            if (response.data.applied === false) {
                setApplied(true);
            }
        } catch (error) {
            alert(error.response.data.message || 'Error applying for the job.');
        }
    };

    const skills = typeof job.skills === 'string' ? JSON.parse(job.skills) : job.skills;

    return (
        <ModalBackground>
            <ModalContent>
                <CloseButton onClick={onClose}>Close</CloseButton>
                <ModalHeader>{job.title}</ModalHeader>
                <JobCardContainer>
                    <CompanyName>{job.company}</CompanyName>
                    <Location>{job.location}</Location>
                    <SkillsList>
                        {skills.map((tag, index) => (
                            <SkillBadge key={index}>{tag}</SkillBadge>
                        ))}
                    </SkillsList>
                    <JobDescription>{job.description}</JobDescription>
                    <Divider />
                    <ApplyButton onClick={handleApply} applied={applied} disabled={applied}>
                        {applied ? 'Applied' : 'Apply Now'}
                    </ApplyButton>
                </JobCardContainer>
            </ModalContent>
        </ModalBackground>
    );
};

const ModalBackground = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
`;

const ModalContent = styled.div`
    background-color: #fff;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    max-width: 90%;
    max-height: 90%;
    overflow-y: auto;
    position: relative;
    text-align: center;
`;

const CloseButton = styled.button`
    position: absolute;
    top: 10px;
    right: 10px;
    background-color: transparent;
    border: none;
    cursor: pointer;
    font-size: 16px;
    color: #aaa;
`;

const ModalHeader = styled.h2`
    font-size: 24px;
    margin-top: 0;
`;

const JobCardContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const CompanyName = styled.p`
    font-family: Poppins, sans-serif;
    letter-spacing: 0.15px;
    margin-top: 18px;
`;

const Location = styled.p`
    font-family: Poppins, sans-serif;
    letter-spacing: 0.15px;
`;

const SkillsList = styled.div`
    display: flex;
    justify-content: space-between;
    align-content: space-between;
    align-self: stretch;
    flex-wrap: wrap;
    margin-top: 17px;
    gap: 10px;
    font-size: 12px;
    color: #773dc3;
    letter-spacing: 0.4px;
    line-height: 133%;
`;

const SkillBadge = styled.span`
    font-family: Poppins, sans-serif;
    border: 1px solid #773dc3;
    border-radius: 40px;
    padding: 8px 10px;
    text-align: center;

    &:nth-child(4) {
        background-color: #773dc3;
        color: #fff;
        box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.25);
    }
`;

const JobDescription = styled.p`
    text-align: center;
    letter-spacing: 0.25px;
    margin-top: 15px;
    font: 400 14px/20px Poppins, sans-serif;
    text-overflow: ellipsis;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
`;

const Divider = styled.hr`
    width: 86px;
    height: 1px;
    margin-top: 14px;
    background-color: #260e44;
    border: none;
    align-self: center;
`;

const ApplyButton = styled.button`
    background-color: #6b538c;
    color: #fff;
    font-family: Roboto, sans-serif;
    font-weight: 700;
    border-radius: 12px;
    letter-spacing: 0.5px;
    padding: 8px 16px;
    margin-top: 15px;
    cursor: pointer;
`;

export default JobModal;
