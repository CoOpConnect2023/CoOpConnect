import { Head } from "@inertiajs/react";
import LandingLayout from "@/Layouts/LandingLayout";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";

const Container = styled.div`
  min-height: 70vh;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 20px;
  background-color: ${({ darkMode }) => (darkMode ? "#2C2C2C" : "var(--Schemes-Background, #fff7ff)")};
`;

const ContentWrapper = styled.div`
  font-weight: bold;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 50%;
`;

const Title = styled.h1`
  font-family: "Poppins", sans-serif;
  font-weight: 800;
  font-size: 3rem;
  color: ${({ darkMode }) => (darkMode ? "#d6bcfa" : "#6b21a8")}; /* Adjusted color for dark mode */
`;

const Paragraph = styled.p`
  margin-top: 1.5rem;
  text-align: center;
  line-height: 1.75;
  color: ${({ darkMode }) => (darkMode ? "#a0aec0" : "#4a5568")}; /* Adjusted color for dark mode */
`;

export default function About({ auth }) {
    const darkMode = useSelector(state => state.accessibility.darkMode);
    const fontSize = useSelector(state => state.accessibility.textSize);

    return (
        <>
            <Head title="About" />
            <LandingLayout auth={auth} />
            <Container darkMode={darkMode}>
                <ContentWrapper>
                    <Title darkMode={darkMode}>About CO-OP CONNECT</Title>
                    <Paragraph darkMode={darkMode}>
                        <strong>Who We Are:</strong> CO-OP CONNECT is a leading platform dedicated to bridging the gap between students, educators, and employers. Our mission is to empower the next generation with the tools and opportunities they need to thrive in their careers.
                    </Paragraph>
                    <Paragraph darkMode={darkMode}>
                        <strong>Our Mission:</strong> At CO-OP CONNECT, our mission is to provide a collaborative environment where students can gain real-world experience, educators can enhance their curriculum, and employers can find top talent. We believe in the power of community and collaboration to drive success.
                    </Paragraph>
                    <Paragraph darkMode={darkMode}>
                        <strong>Our Journey:</strong> Founded in [Year], CO-OP CONNECT started with a vision to transform the educational landscape. Over the years, we have grown into a trusted platform that has helped thousands of students and professionals achieve their goals.
                    </Paragraph>
                    <Paragraph darkMode={darkMode}>
                        <strong>What We Do:</strong> We offer a variety of services including internships, job placements, and networking opportunities. Our team is committed to supporting each user on their unique journey to success.
                    </Paragraph>
                    <Paragraph darkMode={darkMode}>
                        <strong>Why Choose Us:</strong> Choosing CO-OP CONNECT means joining a community that values innovation, integrity, and excellence. We are dedicated to helping our users succeed and thrive in their careers.
                    </Paragraph>
                </ContentWrapper>
            </Container>
        </>
    );
}

// Utility function to detect dark mode
function useDarkMode() {
    // You can implement your logic to determine if dark mode is enabled
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
}
