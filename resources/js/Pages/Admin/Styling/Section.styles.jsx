import styled from 'styled-components';

export const SectionContainer = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;

  @media (max-width: 768px) {
    padding: 15px;
  }
`;

export const SectionTitle = styled.h2`
  color: #6e3aa7;
  margin-bottom: 10px;
`;

export const SectionContent = styled.div`
  display: flex;
  justify-content: space-between;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const CardList = styled.div`
  flex: 3;
  max-height: 40vh;
  overflow-y: auto;
  padding-right: 10px;

  @media (max-width: 768px) {
    max-height: unset;
    padding-right: 0;
    margin-bottom: 15px;
     max-height: 40vh;
  overflow-y: auto;
  }
`;

export const StatusContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 768px) {
    justify-content: flex-start;
  }
`;
