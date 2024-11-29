import React, { useEffect } from 'react';
import styled, { css } from 'styled-components';
import { Link } from '@inertiajs/inertia-react';  // Import Link from Inertia.js
import background from "@/Pages/Images/Landing-removebg.png";
import darkbackground from "../Images/Landing-removebg.png";
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
    background-image:
      linear-gradient(
        to bottom,
        rgba(131, 70, 210, 1), /* #8346D2 solid */
        ${darkMode ? 'rgba(0, 0, 0, 0.2)' : 'rgba(255, 255, 255, 0.3)'}
      ),
      url(${darkMode ? darkbackground : background});
    height: 100vh;
    background-size: cover;
    background-position: bottom;

    @media (max-width: 1024px) {
      background-position: center;
      background-size: cover;
    }
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

  @media (max-width: 1024px) {
    padding: 20px;
    gap: 10px;
  }
`;

const TextContainer = styled.div`
  font-weight: bold;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 50%;

  @media (max-width: 1024px) {
    width: 90%;
  }
`;

const Title = styled.h1`
  font-family: 'Poppins', sans-serif;
  font-weight: 700;
  font-size: clamp(2rem, 5vw, 3.25rem); /* Adjust font size dynamically */
  color: ${({ darkMode }) => (darkMode ? "#FFF" : "#FFF")};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;

  @media (max-width: 1024px) {
    font-size: clamp(1.5rem, 5vw, 2.5rem);
    gap: 5px;
  }
`;

const Logo = styled.img`
  width: 150px; /* Adjust the logo size */
  height: auto;

  @media (max-width: 1024px) {
    width: 100px;
  }
`;

const Subtitle = styled.h2`
  margin-top: 1rem;
  font-size: 2.25rem;
  font-weight: 400;
  margin-bottom: 1rem;
  color: ${({ darkMode }) => (darkMode ? "#EDDCFF" : "#6B538C")};

  span {
    color: ${({ darkMode }) => (darkMode ? "#FFF" : "#FFF")};
  }

  @media (max-width: 1024px) {
    font-size: 1.5rem;
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
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

  @media (max-width: 1024px) {
    font-size: 1rem;
    padding: 6px 12px;
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
          <Title darkMode={darkMode}>
              CoopConnect by <Logo src="/images/MagnifyLogo.png" alt="CoopConnect Logo" />
            </Title>
            <Subtitle darkMode={darkMode}>
              Where Students, Educators and Employers{" "}
              <span>Thrive Together</span>
            </Subtitle>

            <Link
              href={route("register")}
              className="ms-4 font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
            >

            </Link>
          </TextContainer>
        </ContentWrapper>
      </div>
    </Container>
  );
}
