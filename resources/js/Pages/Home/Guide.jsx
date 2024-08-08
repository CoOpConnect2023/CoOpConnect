import React from 'react';
import styled, { css } from 'styled-components';
import { useSelector } from 'react-redux';
import adminDashboard from '../Images/admin-dashboard.png';
import studentuserprofile from '../Images/studentprofile.png';
import studentdocument from '../Images/studentdocument.png';
import studentinterview from '../Images/studentinterview.png';
import studentmessages from '../Images/studentmessages.png';
import studentreflection from '../Images/studentreflection.png';
import studentsettings from '../Images/studentsettings.png';
import studentjobs from '../Images/studentjobs.png';
import studentviewapplication from '../Images/studentviewapplication.png';
import employereditpost from '../Images/employereditpost.png';
import employerdocument from '../Images/employerdocument.png';
import employerhome from '../Images/employerhome.png';
import employerinterview from '../Images/employerinterviewadd.png';
import employermessages from '../Images/employermessages.png';
import employerprofile from '../Images/employerprofile.png';
import employerviewapplicants from '../Images/employerviewapplicants.png';
import employersettings from '../Images/employersettings.png';
import teachercalendar from '../Images/teachercalendar.png';
import teacherdocument from '../Images/teacherdocuments.png';
import teacherhome from '../Images/teacherhome.png';
import teachermanageclasses from '../Images/teachermanageclasses.png';
import teachermanagestudents from '../Images/teachermanagestudents.png';
import teachermessages from '../Images/teachermessages.png';
import teacherprofile from '../Images/teacherprofile.png';
import teachersettings from '../Images/teachersettings.png';

const ParentContainer = styled.div`
  display: flex;
  flex-direction: column;

  height: 100%;
  width: 100%;
`;

const GuideContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 20px;
  flex-grow: 1;

  width: 100%;
  ${({ darkMode }) => css`
    color: ${darkMode ? '#ffffff' : '#333333'};
    background-color: ${darkMode ? '#333333' : '#ffffff'};
  `}
`;

const StepBlock = styled.div`
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 20px;
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  flex-grow: 1;
  ${({ darkMode }) => css`
    border-color: ${darkMode ? '#555555' : '#dddddd'};
    background-color: ${darkMode ? '#444444' : '#ffffff'};
    box-shadow: ${darkMode ? '0 2px 4px rgba(0, 0, 0, 0.2)' : '0 2px 4px rgba(0, 0, 0, 0.1)'};
  `}
`;

const StepImage = styled.img`
  width: auto;
  max-width: 100%;
  height: auto;
  object-fit: cover;
  margin-bottom: 20px;
`;

const StepTitle = styled.h2`
  font-size: 24px;
  margin-bottom: 10px;
  ${({ darkMode }) => css`
    color: ${darkMode ? '#EDDCFF' : '#333'};
  `}
`;

const StepDescription = styled.p`
  font-size: 16px;
  text-align: center;
  ${({ darkMode }) => css`
    color: ${darkMode ? '#cccccc' : '#555'};
  `}
`;

const LinkButton = styled.a`
  margin-top: 10px;
  padding: 10px 15px;
  background-color: #6e3aa7;
  color: #fff;
  text-decoration: none;
  border-radius: 5px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;

const steps = [
  {
    userType: 'admin',
    steps: [
      { name: 'Manage Users', description: 'Admins can add, remove, and update user details. They can view every user on the website easily. Click choose file to upload an excel document that will add the users you have included in the document.', image: adminDashboard, link: '/admin/home' },
    ],
  },
  {
    userType: 'teacher',
    steps: [
      { name: 'Teacher Home', description: 'Teachers can view their students and statuses.', image: teacherhome, link: "/teacher/home" },
      { name: 'Review Students', description: 'Teachers can review and add students to classes.', image: teachermanagestudents, link: "/teacher/students" },
      { name: 'Review Classes', description: 'Teachers can review and add  classes.', image: teachermanagestudents, link: "/teacher/classes" },
      { name: 'Update profile information.', description: 'Teachers can manage their profile from here.', image:teacherprofile, link: '/teacher/profile' },
      { name: 'Message students and teachers', description: 'Teachers can message other students or Teachers/teachers.', image: teachermessages, link: '/teacher/messages' },
      { name: 'Change their password and settings', description: 'Teachers can change their user settings in the setting tab including changing their password, deleting their account and light/dark modes.', image: teachersettings, link: '/teacher/settings' },
      { name: 'View Appointments', description: 'Teachers can view and create their interviews in their calendar by clicking on it.', image: teachercalendar, link: '/teacher/scheduling' },
      { name: 'Upload a document', description: 'Teachers can upload a document and download it later. .', image: teacherdocument, link: '/teacher/documents' },
    ],
  },
  {
    userType: 'employee',
    steps: [
      { name: 'Post Jobs', description: 'Employers can post job openings and view applications.', image: employerhome, link: "/employer/home" },
      { name: 'Review Applications', description: 'Employers can review and shortlist applications.', image: employerviewapplicants, link: "" },
      { name: 'Update profile information.', description: 'Employers can manage their profile from here.', image: employerprofile, link: '/employer/profile' },
      { name: 'Message students and teachers', description: 'Employers can message other students or employers/teachers.', image: employermessages, link: '/employer/messages' },
      { name: 'Change their password and settings', description: 'Employers can change their user settings in the setting tab including changing their password, deleting their account and light/dark modes.', image: employersettings, link: '/employer/settings' },
      { name: 'View Appointments', description: 'Employers can view and create their interviews in their calendar by clicking on it.', image: employerinterview, link: '/employer/interviews' },
      { name: 'Upload a document', description: 'Employers can upload a document and download it later. .', image: employerdocument, link: '/employer/documents' },
    ],
  },
  {
    userType: 'student',
    steps: [
      { name: 'Update profile information.', description: 'Students can enroll in available courses, add skills and manage their profile from here.', image: studentuserprofile, link: '/student/profile' },
      { name: 'Message other classmates', description: 'Students can message other classmates or employers/teachers that message them first.', image: studentmessages, link: '/student/messages' },
      { name: 'Change their password and settings', description: 'Students can change their user settings in the setting tab including changing their password, deleting their account and light/dark modes.', image: studentsettings, link: '/student/settings' },
      { name: 'Accept interviews', description: 'Students can accept an interview that an employer sends to them.', image: studentviewapplication, link: 'student/viewapplications' },
      { name: 'Apply for Jobs', description: 'Students can apply for job openings.', image: studentjobs, link: '/student/jobs' },
      { name: 'View Appointments', description: 'Students can view their interviews in their calendar', image: studentinterview, link: '/student/interviews' },
      { name: 'Upload a document', description: 'Students can upload a document and download it later. It is viewable by their teacher.', image: studentdocument, link: '/student/documents' },
      { name: 'Post a reflection', description: 'Students can post a reflection.', image: studentreflection, link: '/student/reflections' },
    ],
  },
];

const capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1);

const Guide = ({ auth }) => {
  const darkMode = useSelector(state => state.accessibility.darkMode);
  const userType = auth.user.role;
  const userSteps = steps.find(step => step.userType === userType);

  if (!userSteps) return <p>No guide available for this user type.</p>;

  return (
    <ParentContainer>
      <GuideContainer darkMode={darkMode}>
        <h1>{`${capitalizeFirstLetter(userType)} Guide`}</h1>
        {userSteps.steps.map((step, index) => (
          <StepBlock key={index} darkMode={darkMode}>
            {step.image && <StepImage loading="lazy" src={step.image} alt={step.name} />}
            <StepTitle darkMode={darkMode}>{step.name}</StepTitle>
            <StepDescription darkMode={darkMode}>{step.description}</StepDescription>
            {step.link && <LinkButton href={step.link}>Go to Step</LinkButton>}
          </StepBlock>
        ))}
      </GuideContainer>
    </ParentContainer>
  );
};

export default Guide;
