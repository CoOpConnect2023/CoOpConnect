import React from 'react';
import { Link } from "@inertiajs/react";
import styled, { css } from 'styled-components';
import logo from "@/Pages/Images/COOPCONNECTLOGO.png";
import { useSelector } from "react-redux";

const Header = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  text-align: center;
  background-color: ${({ darkMode }) => (darkMode ? "#2C2C2C" : "var(--Schemes-Background, #fff7ff)")};
`;

const Logo = styled.img`
  width: auto;
  height: 50px;
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
  padding: 6px;
  text-align: end;
`;

const LinkButton = styled(Link)`
  font-weight: 600;
  color: ${({ darkMode }) => (darkMode ? "white" : "#6B538C")};
  padding: 8px 12px;
  border: 2px solid white;
  border-radius: 8px;
  background-color: ${({ darkMode, bgColor }) => bgColor || (darkMode ? "#6B538C" : "#D3BDF2")};
  text-align: center;
  text-decoration: none;
  font-size: 1rem;

  &:hover {
    opacity: 0.8;
  }

  &:focus {
    outline: 2px solid red;
    border-radius: 4px;
  }
`;

export default function LandingLayout({ auth }) {
    const darkMode = useSelector(state => state.accessibility.darkMode);
    const fontSize = useSelector(state => state.accessibility.textSize);

  function getUserLinks(userType) {
    switch (userType) {
      case 'student':
        return {
          dashboard: '/student/home',
        };
      case 'employee':
        return {
          dashboard: '/employer/home',
        };
      case 'teacher':
        return {
          dashboard: '/teacher/home',
        };
      case 'admin':
        return {
          dashboard: '/admin/home',
        };
      default:
        return {};
    }
  }

  const userLinks = getUserLinks(auth.userType);

  return (
    <Header darkMode={darkMode}>
      <Link href="/">
        <Logo src={logo} alt="Logo" />
      </Link>
      <NavLinks darkMode={darkMode}>
        <Link href="./contactus">Contact Us</Link>
        <Link href="./about">About Us</Link>
        <Link href="./guide">Guide</Link>
      </NavLinks>
      <AuthLinks>
        {auth.user ? (
          <LinkButton
            href={getUserLinks(auth.user.role).dashboard}
            darkMode={darkMode}
            bgColor={darkMode ? "#1c1c1c" : "#fff"}
          >
            Dashboard
          </LinkButton>
        ) : (
          <>
            <LinkButton
              href={route("register")}
              darkMode={darkMode}
              bgColor={darkMode ? "#6B538C" : "#EDDCFF"}
            >
              Sign Up
            </LinkButton>
            <LinkButton
              href={route("login")}
              darkMode={darkMode}
              bgColor={darkMode ? "#6B538C" : "#9C85D8"}
            >
              Sign In
            </LinkButton>
          </>
        )}
      </AuthLinks>
    </Header>
  );
}
