import React from 'react';
import { Link } from "@inertiajs/react";
import styled from 'styled-components';
import logo from "@/Pages/Images/COOPCONNECTLOGO.png";
import { useSelector } from "react-redux";

const Header = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: ${({ darkMode }) => (darkMode ? "#2C2C2C" : "var(--Schemes-Background, #fff7ff)")};
  padding: 10px 20px;
`;

const Logo = styled.img`
  height: 60px;
`;

const NavLinks = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  color: ${({ darkMode }) => (darkMode ? "#EDDCFF" : "#6B538C")};
`;

const AuthLinks = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  align-items: center;
`;

const LinkButton = styled(Link)`
  font-weight: 600;
  color: ${({ darkMode }) => (darkMode ? "white" : "#6B538C")};
  padding: 10px 20px;
  border: none;
  border-radius: 25px;
  background: ${({ darkMode, bgColor }) => bgColor || (darkMode ? "linear-gradient(45deg, #6B538C, #9C85D8)" : "linear-gradient(45deg, #D3BDF2, #EDDCFF)")};
  text-align: center;
  text-decoration: none;
  font-size: 1rem;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease-in-out;
  cursor: pointer;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.2);
  }

  &:focus {
    outline: 2px solid red;
    border-radius: 4px;
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  }
`;
const navLinks = [
  { label: "Contact Us", href: "./contactus" },
  { label: "About Us", href: "./about" },
  { label: "Guide", href: "./guide" },
  // Add more links as needed
];

export default function DesktopLayout({ auth }) {
  const darkMode = useSelector(state => state.accessibility.darkMode);

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
    <Header darkMode={darkMode}>
      <Link href="/">
        <Logo src={logo} alt="Logo" />
      </Link>
      <NavLinks darkMode={darkMode}>
        {navLinks.map(link => (
          <LinkButton key={link.label} href={link.href} darkMode={darkMode}>
            {link.label}
          </LinkButton>
        ))}
      </NavLinks>
      <AuthLinks>
        {auth.user ? (
          <LinkButton href={userLinks.dashboard} darkMode={darkMode}>
            Dashboard
          </LinkButton>
        ) : (
          <>
            
            <LinkButton href={route("login")} darkMode={darkMode}>
              Sign In
            </LinkButton>
          </>
        )}
      </AuthLinks>
    </Header>
  );
}
