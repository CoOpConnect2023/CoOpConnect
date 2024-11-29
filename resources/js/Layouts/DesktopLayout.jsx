import React from 'react';
import { Link, usePage } from "@inertiajs/react";
import styled from 'styled-components';
import logo from "@/Pages/Images/COOPCONNECTLOGO.png";
import { useSelector } from "react-redux";

const Header = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: ${({ darkMode }) => (darkMode ? "#8D54D6" : "#8D54D6")}; /* Changed to #8450C9 */
  padding: 10px 20px;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 10;
`;

const Logo = styled.img`
  height: 60px;
`;

const NavLinks = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  color: ${({ darkMode }) => (darkMode ? "#EDDCFF" : "#ffffff")}; /* Links changed to white */
`;

const AuthLinks = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  align-items: center;
`;

const LinkButton = styled(Link)`
  font-weight: 600;
  color: ${({ darkMode, isActive }) => (isActive ? "#fff" : (darkMode ? "#EDDCFF" : "#ffffff"))}; /* Change link colors */
  padding: 10px 20px;
  border: none;
  border-radius: 15px;
  background: none; /* Background removed for regular links */
  text-align: center;
  text-decoration: none;
  font-size: 1rem;
  cursor: pointer;
  position: relative;

  &:hover {
    color: ${({ darkMode }) => (darkMode ? "#D3BDF2" : "#D3BDF2")}; /* Hover color */
  }

  /* Add line underneath the active link */
  &:after {
    content: "";
    display: ${({ isActive }) => (isActive ? "block" : "none")};
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 100%;
    height: 2px;
    background-color: #ffffff; /* White underline */
  }
`;

const SignInButton = styled(LinkButton)`
  background: ${({ darkMode }) => (darkMode ? "linear-gradient(45deg, #8B65BA, #9C85D8)" : "linear-gradient(45deg, #D3BDF2, #EDDCFF)")}; /* Keep the same as the original Sign In button */
  color: ${({ darkMode }) => (darkMode ? "white" : "#6B538C")};
`;

const navLinks = [
    { label: "Home", href: "/" },
  { label: "Contact Us", href: "/contactus" },
  { label: "About Us", href: "/about" },
  { label: "Guide", href: "/guide" },
  
];

export default function DesktopLayout({ auth }) {
  const { url } = usePage(); // Get the current URL
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
          link.label === "Back to Home" && url === "/" ? null : (
            <LinkButton key={link.label} href={link.href} darkMode={darkMode} isActive={url === link.href}>
              {link.label}
            </LinkButton>
          )
        ))}
      </NavLinks>
      <AuthLinks>
        {auth.user ? (
          <SignInButton href={userLinks.dashboard} darkMode={darkMode}>
            Dashboard
          </SignInButton>
        ) : (
          <SignInButton href={route("login")} darkMode={darkMode}>
            Sign In
          </SignInButton>
        )}
      </AuthLinks>
    </Header>
  );
}
