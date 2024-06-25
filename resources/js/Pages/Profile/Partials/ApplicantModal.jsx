import React from 'react';
import styled from 'styled-components';

const ApplicantModal = ({ isOpen, onRequestClose, applicant, isOnShortlist, addToShortlist, removeFromShortlist }) => {
    if (!isOpen || !applicant) {
      return null; // Modal is closed or applicant data is not available
    }

    // Check if applicant.skills is present before parsing
    const skills = applicant.skills ? JSON.parse(applicant.skills) : [];

    const handleAddToShortlist = () => {
        addToShortlist(applicant.id);
         // Close modal after adding to shortlist
      };

      const handleRemoveFromShortlist = () => {
        removeFromShortlist(applicant.id);
         // Close modal after adding to shortlist
      };

    return (
      <ModalOverlay>
        <ModalContent>
          <ModalHeader>
            <h2>{applicant.name}</h2>
            <CloseButton onClick={onRequestClose}>×</CloseButton>
          </ModalHeader>
          <ModalBody>
            <ApplicantImage
              src={applicant.profile_image || "https://via.placeholder.com/150"}
              alt={applicant.name}
            />
            <ApplicantDetails>
              <DetailItem><strong>School:</strong> {applicant.school || "N/A"}</DetailItem>
              <DetailItem><strong>Location:</strong> {applicant.location}</DetailItem>
              <DetailItem><strong>Description:</strong> {applicant.description || "N/A"}</DetailItem>
              {skills.length > 0 && (
                <SkillsList>
                  {skills.map((skill, index) => (
                    <SkillBadge key={index}>{skill}</SkillBadge>
                  ))}
                </SkillsList>
              )}
              {skills.length === 0 && (
                <div>No skills listed</div>
              )}
            </ApplicantDetails>
            {isOnShortlist ? (
              <ShortlistButton onClick={handleRemoveFromShortlist}>Remove from Shortlist</ShortlistButton>
            ) : (
              <ShortlistButton onClick={handleAddToShortlist}>Add to Shortlist</ShortlistButton>
            )}
          </ModalBody>
        </ModalContent>
      </ModalOverlay>
    );
  };

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 80%;
  max-width: 600px;
  max-height: 80%;
  overflow-y: auto;
  position: relative;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ccc;
  padding-bottom: 10px;
  margin-bottom: 20px;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
`;

const ModalBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const ApplicantImage = styled.img`
  aspect-ratio: 1;
  object-fit: auto;
  object-position: center;
  width: 150px;
  border: 2px solid rgba(45, 54, 72, 1);
  align-self: center;
`;

const ApplicantDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const DetailItem = styled.div`
  font-family: Poppins, sans-serif;
  font-size: 16px;
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

    @media (max-width: 991px) {
        white-space: initial;
    }
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

const ShortlistButton = styled.button`
  background-color: #773dc3;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 10px 15px;
  cursor: pointer;
  font-size: 16px;
  margin-top: 20px;

  &:hover {
    background-color: #5a299a;
  }
`;

export default ApplicantModal;
