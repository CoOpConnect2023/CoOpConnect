import React, { useEffect } from 'react';
import styled, { css } from 'styled-components';
import { Link } from '@inertiajs/inertia-react';  // Import Link from Inertia.js
import background from "@/Pages/Images/Landing.png";
import darkbackground from "../Images/DarkBackground.png";
import LandingLayout from "@/Layouts/LandingLayout";
import { useSelector } from "react-redux";

// Your styled components...


const PageTitle = ({ title }) => {
  useEffect(() => {
    document.title = title;
  }, [title]);

  return null;
};

const Container = styled.div`
  ${({ darkMode }) => css`
    background-image: url(${darkMode ? darkbackground : background});
    height: 100vh;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: bottom;
  `}
`;

const ContentWrapper = styled.div`
  min-height: 70vh;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 5px;
`;

const TextContainer = styled.div`
  font-weight: bold;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 50%;
`;

const Title = styled.h1`
  font-family: 'Poppins', sans-serif;
  font-weight: 700;
  font-size: 3.25rem;
  color: ${({ darkMode }) => (darkMode ? "#EDDCFF" : "#6B538C")};
`;

const Subtitle = styled.h2`
  margin-top: 1rem;
  font-size: 2.25rem;
  font-weight: 400;
  color: ${({ darkMode }) => (darkMode ? "#EDDCFF" : "#6B538C")};
  span {
    color: ${({ darkMode }) => (darkMode ? "#D3BDF2" : "#9C85D8")};
  }
`;

const Button = styled.button`
  background-color: #6B538C;
  border-radius: 8px;
  color: white;
  padding: 8px 16px;
  font-size: 1.25rem;
  font-weight: 600;
  margin-top: 1rem;
  opacity: 1;
  &:hover {
    opacity: 0.8;
  }
`;

export default function Landing({ auth, laravelVersion, phpVersion }) {
  const darkMode = useSelector(state => state.accessibility.darkMode);

  return (
    <Container darkMode={darkMode}>
      <PageTitle title="Welcome" />
      <div>
        <LandingLayout auth={auth} />
        <ContentWrapper>
          <TextContainer>
            <Title darkMode={darkMode}>CO-OP CONNECT</Title>
            <Subtitle darkMode={darkMode}>
              Where Students, Educators and Employers{" "}
              <span>Thrive Together</span>
            </Subtitle>
            <Link
              href={route("register")}
              className="ms-4 font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
            >
              <Button>Get Started</Button>
            </Link>
          </TextContainer>
        </ContentWrapper>
      </div>
    </Container>
  );
}
