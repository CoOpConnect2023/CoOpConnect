import React, { useState } from 'react';
import { Link } from "@inertiajs/react";
import styled from 'styled-components';
import logo from "@/Pages/Images/COOPCONNECTLOGO.png";
import { useSelector } from "react-redux";

const MobileHeader = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: ${({ darkMode }) => (darkMode ? "#2C2C2C" : "var(--Schemes-Background, #fff7ff)")};
  padding: 10px 20px;
  z-index: 1000;
`;

const Logo = styled.img`
  height: 40px;
`;

const Hamburger = styled.div`
  display: flex;
  flex-direction: column;
  cursor: pointer;

  span {
    width: 25px;
    height: 3px;
    background-color: ${({ darkMode }) => (darkMode ? "#fff" : "#000")};
    margin: 4px 0;
    transition: all 0.3s ease;
  }

  ${({ isOpen }) =>
    isOpen &&
    `
    span:nth-child(1) {
      transform: rotate(-45deg) translate(-5px, 5px);
    }
    span:nth-child(2) {
      opacity: 0;
    }
    span:nth-child(3) {
      transform: rotate(45deg) translate(-5px, -5px);
    }
  `}
`;

const NavLinks = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  width: 40%; /* Limit the width to 40% of the screen */
  background-color: ${({ darkMode }) => (darkMode ? "#2C2C2C" : "#fff")};
  overflow: hidden;
  max-height: ${({ isOpen }) => (isOpen ? '300px' : '0')};
  opacity: ${({ isOpen }) => (isOpen ? '1' : '0')};
  transition: max-height 0.5s ease, opacity 0.5s ease;
  display: flex;
  flex-direction: column;
  align-items: flex-end; /* Align items to the right */
  padding-right: 10px; /* Add some padding to space out the links from the edge */
`;

const LinkButton = styled(Link)`
  padding: 12px 18px;
  color: ${({ darkMode }) => (darkMode ? "#fff" : "#6B538C")};
  text-decoration: none;
  margin-top: 5px;
  text-align: center;
  display: block;
  width: 100%;
  border-radius: 8px;
  background: ${({ darkMode }) => darkMode ? "linear-gradient(45deg, #6B538C, #9C85D8)" : "linear-gradient(45deg, #D3BDF2, #EDDCFF)"};
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.2);
    opacity: 0.9;
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    opacity: 1;
  }
`;

// Styled component for Sign In button
const SignInButton = styled(LinkButton)`
  background: ${({ darkMode }) => darkMode ? "#B384E0" : "#FF8585"}; /* Different background for Sign In */
  color: #fff; /* White text for contrast */
`;

// Styled component for Dashboard button
const DashboardButton = styled(LinkButton)`
  background: ${({ darkMode }) => darkMode ? "#4CAF50" : "#81C784"}; /* Different background for Dashboard */
  color: #fff; /* White text for contrast */
`;

export default function MobileLayout({ auth }) {
  const darkMode = useSelector(state => state.accessibility.darkMode);
  const [isOpen, setIsOpen] = useState(false);

  function toggleMenu() {
    setIsOpen(!isOpen);
  }

  function getUserLinks(userType) {
    switch (userType) {
      case 'student':
        return { dashboard: '/student/home' };
      case 'employee':
        return { dashboard: '/employer/home' };
      case 'teacher':
        return { dashboard: '/teacher/home' };
      case 'admin':
        return { dashboard: '/admin/home' };
      default:
        return {};
    }
  }

  const userLinks = getUserLinks(auth?.user?.role);

  return (
    <MobileHeader darkMode={darkMode}>
      <Link href="/">
        <Logo src={logo} alt="Logo" />
      </Link>
      <Hamburger onClick={toggleMenu} isOpen={isOpen} darkMode={darkMode}>
        <span></span>
        <span></span>
        <span></span>
      </Hamburger>
      <NavLinks isOpen={isOpen} darkMode={darkMode}>
        <LinkButton href="./contactus" darkMode={darkMode}>
          Contact Us
        </LinkButton>
        <LinkButton href="./about" darkMode={darkMode}>
          About Us
        </LinkButton>
        {auth.user && (
          <LinkButton href="./guide" darkMode={darkMode}>
            Guide
          </LinkButton>
        )}
        {auth.user ? (
          <DashboardButton href={userLinks.dashboard} darkMode={darkMode}>
            Dashboard
          </DashboardButton>
        ) : (
          <SignInButton href={route("login")} darkMode={darkMode}>
            Sign In
          </SignInButton>
        )}
      </NavLinks>
    </MobileHeader>
  );
}
