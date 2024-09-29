import * as React from "react";
import styled, { css } from "styled-components";
import { Link } from "@inertiajs/react";
import { useSelector } from "react-redux";

function AdminPanel({ fontSize }) {
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
      title: "Employer List",
      color: "#10B981",
      borderColor: "rgba(16, 185, 129, 1)",
      img1:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/f474a9a0efc63e36a8e2ebf868817d0acb7861f27210e4bf925071f66d37a8b1?apiKey=d66532d056b14640a799069157705b77&",
      img2:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/3aab50ecf840a92f5b846963731b815e28c31a094136a80ccd9d58a84c3cea97?apiKey=d66532d056b14640a799069157705b77&",
      desc: "View and edit employers that are added to the platform.",
      alt1: "Message Students Icon",
      alt2: "Message Icon",
      link: "/teacher/employers",
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
    <MainContainer fontSize={fontSize} darkMode={darkMode}>
      <Header fontSize={fontSize}>Management</Header>
      <Content fontSize={fontSize}>
        <Section fontSize={fontSize}>
          <PanelsContainer fontSize={fontSize}>
            {panels.map((panel, index) => (
              <Link fontSize={fontSize} key={index} href={panel.link}>
                <PanelSection fontSize={fontSize} darkMode={darkMode} borderColor={panel.borderColor}>
                  <PanelHeader fontSize={fontSize} darkMode={darkMode} backgroundColor={panel.color}>
                    <Title fontSize={fontSize}>{panel.title}</Title>
                    <Img src={panel.img1} alt={panel.alt1} />
                  </PanelHeader>
                  <PanelBody fontSize={fontSize} darkMode={darkMode}>
                    <Icon fontSize={fontSize} src={panel.img2} alt={panel.alt2} />
                    <Description fontSize={fontSize}>{panel.desc}</Description>
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

const calculateFontSize = (minSize, preferredSize, maxSize) => {
  return `clamp(${minSize}, ${preferredSize}, ${maxSize})`;
};

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-self: stretch;
  width: 100%;
  background-color: ${({ darkMode }) => (darkMode ? "#2D2D2D" : "#fff")};
  color: ${({ darkMode }) => (darkMode ? "#EDDCFF" : "#6b538c")};
  border-radius: 10px;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  border: 1px solid rgba(123, 117, 127, 1);
  padding: 0.5%;
  box-sizing: border-box;
  transition: background-color 0.3s;
  flex-grow: 1;

`;

const Header = styled.header`
  font: 500 ${({ fontSize }) => calculateFontSize("1.5rem", "2vw", "2rem")} Poppins, sans-serif;
  @media (max-width: 991px) {
    max-width: 100%;
  }
`;

const Content = styled.main`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  justify-content: space-between;
  gap: 10px;
  box-sizing: border-box;

  @media (max-width: 991px) {
    padding: 0 20px;
  }
`;

const Section = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-sizing: border-box;

  @media (max-width: 991px) {
    height: 100%;
  }
`;

const PanelsContainer = styled.div`
  display: flex;
  flex-grow: 1;
  gap: 30px;
  align-items: stretch;
  box-sizing: border-box;

  @media (max-width: 991px) {
    flex-direction: column;
    gap: 15px;
  }
`;

const PanelSection = styled.article`
  border-radius: 10px;
  border: 2px solid ${(props) => props.borderColor};
  background-color: ${({ darkMode }) => (darkMode ? "#3C3C3C" : "#fff")};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-grow: 1;
  margin: 10px 0;
  padding: 10px;
  box-sizing: border-box;
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
  font-size: ${({ fontSize }) => calculateFontSize("0.8rem", "1.3vw", "1.9rem")};
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
  font-size: ${({ fontSize }) => calculateFontSize("0.8rem", "1.2vw", "2.1rem")};
`;

const Img = styled.img`
  aspect-ratio: 1;
  object-fit: cover;
  width: 24px;
  margin: auto 0;
`;

const PanelBody = styled.div`
  display: flex;
  gap: 5px;
  font-size: ${({ fontSize }) => calculateFontSize("0.5rem", "0.9vw", "1.7rem")};
  color: ${({ darkMode }) => (darkMode ? "#CCCCCC" : "#7b757f")};
  font-weight: 500;
  letter-spacing: 0.25px;
  line-height: 1.5;
  padding: 10px;
  box-sizing: border-box;
  transition: color 0.3s;
  flex-wrap: wrap;

  @media (max-width: 991px) {
    flex-direction: column;
    gap: 15px;
  }
`;

const Icon = styled.img`
  aspect-ratio: 1;
  object-fit: cover;
  width: 32px;
  margin: auto 0;
`;

const Description = styled.p`
  font-family: Poppins, sans-serif;

  padding: 10px;
  font-size: ${({ fontSize }) => calculateFontSize("0.7rem", "1.0vw", "1.8rem")};

  word-wrap: break-word;

  @media (max-width: 991px) {
    padding: 15px;
  }
`;

export default AdminPanel;
