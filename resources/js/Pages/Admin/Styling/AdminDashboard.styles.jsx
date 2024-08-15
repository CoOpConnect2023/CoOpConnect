import styled, { keyframes } from "styled-components";




const fadeIn = keyframes`
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
`;

export const HomePageContainer = styled.div`
  padding: 20px;
  animation: ${fadeIn} 0.8s ease-in-out;
 background-color: ${({ darkMode }) => (darkMode ? 'black' : '#fff')};
 transition: background-color 0.3s ease, transform 0.3s ease;
  @media (max-width: 768px) {
    padding: 15px;
  }
`;

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  @media (max-width: 768px) {
    gap: 15px;
  }
`;

