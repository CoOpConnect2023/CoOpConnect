import React from 'react';
import styled from 'styled-components';


const JobCard = ({ job }) => {
    const [showModal, setShowModal] = useState(false);

    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    return (
        <CardContainer>
            <JobTitle>{job.title}</JobTitle>
            <CompanyName>{job.company}</CompanyName>
            <Location>{job.location}</Location>
            {/* Other job details */}
            <JobDescription>{job.description}</JobDescription>
            <Divider />
            <JobButton onClick={openModal}>VIEW POSTING</JobButton>

            {showModal && (
                <JobModal job={job} onClose={closeModal} />
            )}
        </CardContainer>
    );
};

export default JobCard;
