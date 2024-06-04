import * as React from "react";
import styled from "styled-components";

const Container = styled.div`
  align-self: stretch;
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

const Section = styled.section`
  border-radius: 10px;
  background-color: #fff7ff;
  margin-top: 40px;
  @media (max-width: 991px) {
    max-width: 100%;
  }
`;

const ContentWrapper = styled.div`
  gap: 20px;
  display: flex;
  @media (max-width: 991px) {
    flex-direction: column;
    align-items: stretch;
    gap: 0px;
  }
`;

const ColumnMain = styled.div`
  display: flex;
  flex-direction: column;
  width: 76%;
  margin-left: 0px;
  @media (max-width: 991px) {
    width: 100%;
  }
`;

const Card = styled.article`
  border-radius: 10px;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  background-color: #fff;
  display: flex;
  flex-direction: column;
  padding: 20px;
  width: 100%;
  @media (max-width: 991px) {
    max-width: 100%;
    margin-top: 20px;
  }
`;

const Heading = styled.h2`
  color: #6b538c;
  font: 500 24px/133% Poppins, sans-serif;
  @media (max-width: 991px) {
    max-width: 100%;
  }
`;

const ListContainer = styled.div`
  border-radius: 10px;
  border: 1px solid rgba(226, 232, 240);
  background-color: #fff;
  display: flex;
  margin-top: 20px;
  gap: 0px;
  padding: 10px 12px;
  @media (max-width: 991px) {
    max-width: 100%;
    flex-wrap: wrap;
    padding-right: 20px;
  }
`;

const List = styled.ul`
  display: flex;
  flex-direction: column;
  font-size: 14px;
  color: #2d3748;
  font-weight: 500;
  line-height: 143%;
`;

const ListItem = styled.li`
  padding-top: 15px;
  margin-left: 24px;
  @media (max-width: 991px) {
    margin-left: 10px;
  }
`;

const Divider = styled.hr`
  background-color: #e2e8f0;
  height: 1px;
  margin-top: 15px;
`;

const AvatarContainer = styled.div`
  display: flex;
  width: 100%;
  padding-top: 10px;
  flex-direction: column;
`;

const AvatarWrapper = styled.div`
  align-self: center;
  display: flex;
  gap: 16px;
`;

const Avatar = styled.img`
  aspect-ratio: 1;
  object-fit: cover;
  object-position: center;
  width: 32px;
  border: 1px solid rgba(123, 117, 127);
  border-radius: 50%;
`;

const AvatarName = styled.p`
  margin: auto 0;
  font-family: Inter, sans-serif;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  width: 24%;
  margin-left: 20px;
  @media (max-width: 991px) {
    width: 100%;
  }
`;

const StudentStatus = styled.section`
  border-radius: 10px;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  background-color: #fdfdfd;
  display: flex;
  flex-direction: column;
  font-size: 16px;
  color: #1a1919;
  font-weight: 400;
  line-height: 150%;
  margin: 0 auto;
  padding: 24px;
  width: 100%;
  @media (max-width: 991px) {
    margin-top: 20px;
    padding: 0 20px;
  }
`;

const StatusHeading = styled.h2`
  color: #6b538c;
  align-self: center;
  font: 500 24px/133% Poppins, sans-serif;
`;

const StatusImage = styled.img`
  aspect-ratio: 1;
  object-fit: cover;
  object-position: center;
  width: 146px;
  align-self: center;
  margin-top: 10px;
  max-width: 100%;
`;

const StatusList = styled.ul`
  display: flex;
  margin-top: 24px;
  gap: 20px;
  justify-content: space-between;
`;

const StatusItem = styled.li`
  display: flex;
  gap: 12px;
`;

const StatusIcon = styled.div`
  background-color: ${({ color }) => color};
  border-radius: 50%;
  width: 16px;
  height: 16px;
  margin: auto 0;
`;

const StatusName = styled.p`
  font-family: Inter, sans-serif;
`;

function StudentCard({ name, email, id }) {
  return (
    <Card>
      <AvatarContainer>
        <AvatarWrapper>
          <Avatar src="https://cdn.builder.io/api/v1/image/assets/TEMP/cb388c4792d2da12914aa0e249254d3a981fcff8dd25ec90cae6e0e0a59e3cbb?apiKey=d66532d056b14640a799069157705b77&" alt={name} />
          <AvatarName>{name}</AvatarName>
        </AvatarWrapper>
        <Divider />
      </AvatarContainer>
      <p>{email}</p>
      <p>{id}</p>
    </Card>
  );
}

function StudentStatusCard({ status, percentage, color }) {
  return (
    <StatusItem>
      <StatusIcon color={color} />
      <StatusName>{status}</StatusName>
      <StatusName>{percentage}</StatusName>
    </StatusItem>
  );
}

export default function TeacherDashboard() {
  const students = [
    { name: "Alex Norton", email: "alex@co-opconnect.com", id: "01" },
    { name: "Samuel Raltman", email: "samuel@co-opconnect.com", id: "02" },
    { name: "Joshua Chan", email: "joshchan@co-opconnect.com", id: "03" },
    { name: "Navdeep Singh", email: "navdeep@co-opconnect.com", id: "04" }
  ];

  const statusData = [
    { status: "Currently Working", percentage: "54%", color: "#006aff" },
    { status: "Interviewing", percentage: "20%", color: "#52c93f" },
    { status: "Still Searching", percentage: "26%", color: "#ff2727" }
  ];

  return (
    <Container>
      <Section>
        <ContentWrapper>
          <ColumnMain>
            <Card>
              <Heading>Current Students</Heading>
              <ListContainer>
                <List>
                  {students.map((student, index) => (
                    <ListItem key={index}>
                      <StudentCard {...student} />
                    </ListItem>
                  ))}
                </List>
              </ListContainer>
            </Card>
          </ColumnMain>
          <Column>
            <StudentStatus>
              <StatusHeading>Student Status</StatusHeading>
              <StatusImage
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/88fa98e4a7eb9ab5b95b008c117a7d5f3c19965866591848d9d4ebeadc5ffadd?apiKey=d66532d056b14640a799069157705b77&"
                alt="Student Status Visual"
              />
              <StatusList>
                {statusData.map((status, index) => (
                  <StudentStatusCard key={index} {...status} />
                ))}
              </StatusList>
            </StudentStatus>
          </Column>
        </ContentWrapper>
      </Section>
    </Container>
  );
}
