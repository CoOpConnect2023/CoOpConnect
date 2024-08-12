import React from "react";
import styled, { keyframes } from "styled-components";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { useSelector } from "react-redux";

// Define the keyframes for the slide-in animations
const slideInFromSide = keyframes`
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

const Container = styled.section`
  border-radius: 10px;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  background-color: ${({ darkMode }) => (darkMode ? "#2D2D2D" : "#fdfdfd")};
  color: ${({ darkMode }) => (darkMode ? "#f1f1f1" : "#1a1919")};
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 16px;
  font-weight: 400;
  line-height: 150%;
width: 36.95%;
height: 100%;
padding: 20px;




  border: 1px solid rgba(123, 117, 127, 1);

  transition: background-color 0.3s, color 0.3s;

  @media (max-width: 991px) {
    height: 450px;
    width: 100%;
  }
`;

const Title = styled.h2`
  text-align: center;
  color: ${({ darkMode }) => (darkMode ? "#EDDCFF" : "#6b538c")};
  font: 500 24px/133% Poppins, sans-serif;
  transition: color 0.3s;
`;

const COLORS = ["#006aff", "#52c93f", "#ff2727"];

function StudentStatus({ percentages }) {
  const darkMode = useSelector((state) => state.accessibility.darkMode);

  const data = [
    { name: "Working", value: Math.round(percentages.working) },
    { name: "Interviewing", value: Math.round(percentages.interviewing) },
    { name: "Searching", value: Math.round(percentages.searching) },
  ];

  return (
    <Container darkMode={darkMode}>
      <Title darkMode={darkMode}>Student Status</Title>

      <ResponsiveContainer width="100%" aspect={1}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"  // Center the chart horizontally
            cy="50%"  // Center the chart vertically
            labelLine={false}
            label={({ value }) => `${value}%`}
            outerRadius="80%"
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </Container>
  );
}

export default StudentStatus;
