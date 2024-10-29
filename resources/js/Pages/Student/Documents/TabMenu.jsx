import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { TabList, TabItem } from "../Styling/Document.styles";

export const TabMenu = ({ activeTab, handleTabChange }) => {
    const darkMode = useSelector(state => state.accessibility.darkMode);
    const fontSize = useSelector(state => state.accessibility.textSize);


    return (
        <TabList fontSize={fontSize} darkMode={darkMode}>
            <TabItem fontSize={fontSize} darkMode={darkMode} onClick={() => handleTabChange("Progress Reports")} className={activeTab === "Progress Reports" ? "active" : ""}>
                Progress Reports
            </TabItem>
            <TabItem fontSize={fontSize} darkMode={darkMode} onClick={() => handleTabChange("Student Logs")} className={activeTab === "Student Logs" ? "active" : ""}>
                Student Logs
            </TabItem>
            <TabItem fontSize={fontSize} darkMode={darkMode} onClick={() => handleTabChange("Shared With Me")} className={activeTab === "Shared With Me" ? "active" : ""}>
                Shared With Me
            </TabItem>
            <TabItem fontSize={fontSize} darkMode={darkMode} onClick={() => handleTabChange("My Files")} className={activeTab === "My Files" ? "active" : ""}>
                My Files
            </TabItem>
        </TabList>
    );
};
