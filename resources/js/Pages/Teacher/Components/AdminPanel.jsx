import * as React from "react";
import styled, { css } from "styled-components";
import { Link } from "@inertiajs/react";
import { useSelector } from "react-redux";

function AdminPanel() {
  const darkMode = useSelector((state) => state.accessibility.darkMode);

  const panels = [
    {
      title: "Manage Students",
      color: "#6b538c",
      borderColor: "rgba(107, 83, 140, 1)",
      img1:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/f474a9a0efc63e36a8e2ebf868817d0acb7861f27210e4bf925071f66d37a8b1?apiKey=d66532d056b14640a799069157705b77&",
      img2:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/3aab50ecf840a92f5b846963731b815e28c31a094136a80ccd9d58a84c3cea97?apiKey=d66532d056b14640a799069157705b77&",
      desc: "View student activity. Add, remove, edit, students. View student details.",
      alt1: "Manage Students Icon",
      alt2: "Student Activity Icon",
      link: "/teacher/students",
    },
    {
      title: "Manage Classes",
      color: "#b91c1c",
      borderColor: "rgba(185, 28, 28, 1)",
      img1:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/62229b1ae0ae1dd15db7bca85f8e72568a14455230ec99bf71f86e2712aa9623?apiKey=d66532d056b14640a799069157705b77&",
      img2:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/df3d72c736c4bb7b3c0c21e6b92111b73fb4a85fd89336f55bfb0d730e512caf?apiKey=d66532d056b14640a799069157705b77&",
      desc: "View class activity. Add content to classes, edit grades, etc.",
      alt1: "Manage Classes Icon",
      alt2: "Class Activity Icon",
      link: "/teacher/classes",
    },
    {
      title: "Message Students",
      color: "#1d4ed8",
      borderColor: "rgba(29, 78, 216, 1)",
      img1:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/62229b1ae0ae1dd15db7bca85f8e72568a14455230ec99bf71f86e2712aa9623?apiKey=d66532d056b14640a799069157705b77&",
      img2:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/4cbeccd9b119147a28e707f7c47954844c0962f854035e21fedfee89c4e8d105?apiKey=d66532d056b14640a799069157705b77&",
      desc: "Personally message students and potentially their employers.",
      alt1: "Message Students Icon",
      alt2: "Message Icon",
      link: "/teacher/messages",
    },
  ];

  return (
    <MainContainer darkMode={darkMode}>
      <Header>Management</Header>
      <Content>
        <Section>
          <PanelsContainer>
            {panels.map((panel, index) => (
              <Link key={index} href={panel.link}>
                <PanelSection darkMode={darkMode} borderColor={panel.borderColor}>
                  <PanelHeader darkMode={darkMode} backgroundColor={panel.color}>
                    <Title>{panel.title}</Title>
                    <Img src={panel.img1} alt={panel.alt1} />
                  </PanelHeader>
                  <PanelBody darkMode={darkMode}>
                    <Icon src={panel.img2} alt={panel.alt2} />
                    <Description>{panel.desc}</Description>
                  </PanelBody>
                </PanelSection>
              </Link>
            ))}
          </PanelsContainer>
        </Section>
      </Content>
    </MainContainer>
  );
}

const MainContainer = styled.div`
  align-self: stretch;
  border-radius: 10px;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  background-color: ${({ darkMode }) => (darkMode ? "#2D2D2D" : "#fff")};
  color: ${({ darkMode }) => (darkMode ? "#EDDCFF" : "#6b538c")};
  display: flex;
  flex-direction: column;
  padding: 10px;
  transition: background-color 0.3s;
  border-color: rgba(123, 117, 127, 1);
  border-style: solid;
  border-width: 1px;

  /* Flex and height settings */
  min-height: 20%; /* Minimum height as needed */
  max-height: 40vh; /* Maximum height is 40% of the viewport height */
  height: auto; /* Allow the container to stretch as needed */
  width: 100%; /* Full width */
`;


const Header = styled.header`
  
  font: 500 24px/133% Poppins, sans-serif;
  @media (max-width: 991px) {
    max-width: 100%;
  }
`;

const Content = styled.main`
  justify-content: center;
  align-content: center;
  flex-wrap: wrap;
  display: flex;
  margin-top: 40px;
  flex-direction: column;
  padding: 0 20px;
  @media (max-width: 991px) {
    max-width: 100%;
    padding: 0 20px;
  }
`;

const Section = styled.section`
  @media (max-width: 991px) {
    max-width: 100%;
  }
`;

const PanelsContainer = styled.div`
  gap: 10px;
  display: flex;
  @media (max-width: 991px) {
    flex-direction: column;
    align-items: stretch;
    gap: 0px;
  }
`;

const PanelSection = styled.article`
  border-radius: 10px;
  border: 2px solid ${(props) => props.borderColor};
  background-color: ${({ darkMode }) => (darkMode ? "#3C3C3C" : "#fff")};
  display: flex;
  width: 100%;
  flex-grow: 1;
  flex-direction: column;
  margin: 20px 0;
  transition: background-color 0.3s;
  @media (max-width: 991px) {
    margin-top: 21px;
  }
`;

const PanelHeader = styled.header`
  justify-content: space-between;
  border-radius: 10px 10px 0 0;
  background-color: ${(props) => props.backgroundColor};
  display: flex;
  gap: 8px;
  font-size: 18px;
  color: #fff;
  font-weight: 600;
  line-height: 156%;
  padding: 10px 24px;
  transition: background-color 0.3s;
  @media (max-width: 991px) {
    padding: 0 20px;
  }
`;

const Title = styled.h2`
  font-family: Inter, sans-serif;
`;

const Img = styled.img`
  aspect-ratio: 1;
  object-fit: cover;
  width: 24px;
  margin: auto 0;
`;

const PanelBody = styled.div`
  display: flex;
  gap: 10px;
  font-size: 14px;
  color: ${({ darkMode }) => (darkMode ? "#CCCCCC" : "var(--Schemes-Outline, #7b757f)")};
  font-weight: 500;
  letter-spacing: 0.25px;
  line-height: 20px;
  padding: 20px;
  transition: color 0.3s;
`;

const Icon = styled.img`
  aspect-ratio: 1;
  object-fit: cover;
  width: 32px;
  margin: auto 0;
`;

const Description = styled.p`
  font-family: Poppins, sans-serif;
  flex: 1;
`;

export default AdminPanel;
