import { Head } from "@inertiajs/react";
import LandingLayout from "@/Layouts/LandingLayout";
import styled from "styled-components";
import { useSelector } from "react-redux";
import background from "@/Pages/Images/Landing-removebg.png"; // Import the background image

// Main container with a two-column layout and background image at the bottom
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  /* Combine gradient with background image */
  background-image:
    linear-gradient(
      to bottom,
      rgba(131, 70, 210, 1), /* #8346D2 solid */
      ${({ darkMode }) => (darkMode ? 'rgba(0, 0, 0, 0.2)' : 'rgba(255, 255, 255, 0.3)')} /* Adjust contrast */
    ),
    url(${background});

  background-repeat: no-repeat;
  background-position: bottom;
  background-size: cover;
  padding: 40px;
  min-height: 100vh;
`;

// Section wrapper for two-column layout with adjusted width for mobile
const SectionWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 80%; /* Default width for larger screens */
  gap: 40px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 20px;
    width: 100%; /* Increase width to 100% on mobile */
  }
`;

// Column container for left and right sections
const Column = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

// Title styling with higher contrast and moved down on desktop
const Title = styled.h1`
  font-family: 'Poppins', sans-serif;
  font-weight: 800;
  font-size: 3rem;
  color: white; /* Make the title white regardless of darkMode */
  text-align: center;
  margin-bottom: 20px;

  /* Move title down on desktop */
  @media (min-width: 1024px) {
    margin-top: 50px;
  }
`;

// Subtitle (Section Heading) styling with higher contrast and white text
const SectionTitle = styled.h2`
  font-family: 'Poppins', sans-serif;
  font-weight: 700;
  font-size: 2rem;
  color: white; /* Make section titles white regardless of darkMode */
  margin-bottom: 20px;
  margin-top: 50px;
`;

// Text content styling with higher contrast
const Text = styled.p`
  font-size: 1.2rem;
  line-height: 1.75;
  color: ${({ darkMode }) => (darkMode ? "#E5E5E5" : "#2C2C2C")}; /* Brighter for dark mode, darker for light mode */
  margin-bottom: 20px;
`;

// Bullet point list styling with higher contrast
const List = styled.ul`
  list-style-type: disc;
  padding-left: 20px;
  color: ${({ darkMode }) => (darkMode ? "#E5E5E5" : "#2C2C2C")}; /* Same as text */
`;

const ListItem = styled.li`
  margin-bottom: 10px;
  font-size: 1.2rem;
`;

export default function About({ auth }) {
  const darkMode = useSelector(state => state.accessibility.darkMode);

  return (
    <>
      <Head darkMode={darkMode} title="About" />
      <LandingLayout darkMode={darkMode} auth={auth} />
      <Container darkMode={darkMode}>

        <SectionWrapper>
          {/* Left Column */}
          <Column>
            <SectionTitle>Our Mission</SectionTitle>
            <Text darkMode={darkMode}>
              At Co-op Connect, we strive to bridge the gap between <strong>education</strong> and the <strong>workplace</strong>.
              Our mission is to empower students, educators, and employers by providing a platform where they can <strong>collaborate, learn, and grow together</strong>.
            </Text>

            <SectionTitle>What We Offer</SectionTitle>
            <Text darkMode={darkMode}>
              We offer a comprehensive platform that serves as a bridge between education and employment. Our services include:
            </Text>
            <List darkMode={darkMode}>
              <ListItem>
                <strong>Co-op placements</strong> that align with students’ academic goals and career aspirations.
              </ListItem>
              <ListItem>
                <strong>Educational resources</strong> that support both students and educators in navigating the co-op process.
              </ListItem>
              <ListItem>
                <strong>Employer tools</strong> to help businesses find and train the talent they need for the future.
              </ListItem>
            </List>
          </Column>

          {/* Right Column */}
          <Column>
            <SectionTitle>Why Co-op Connect?</SectionTitle>
            <Text darkMode={darkMode}>
              What sets us apart is our commitment to creating lasting connections. We're not just a platform; we’re a community.
            </Text>
            <List darkMode={darkMode}>
              <ListItem>
                <strong>For Students:</strong> We provide hands-on experiences that align with your academic goals and prepare you for the workforce.
              </ListItem>
              <ListItem>
                <strong>For Educators:</strong> We offer resources and support to help you guide your students toward meaningful career opportunities.
              </ListItem>
              <ListItem>
                <strong>For Employers:</strong> We connect you with top talent and provide tools to help you nurture the next generation of industry leaders.
              </ListItem>
            </List>

            <Text darkMode={darkMode}>
              By working together, we ensure that students, educators, and employers thrive.
            </Text>
          </Column>
        </SectionWrapper>

      </Container>
    </>
  );
}
