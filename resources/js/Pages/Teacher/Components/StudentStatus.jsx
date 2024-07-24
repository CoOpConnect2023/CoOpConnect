import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
const appUrl = import.meta.env.VITE_APP_URL;

const Container = styled.section`
    border-radius: 10px;
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
    background-color: #fdfdfd;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 24px;
    font-size: 16px;
    color: #1a1919;
    font-weight: 400;
    line-height: 150%;
    height: 400px;
    width: 400px;

    @media (max-width: 991px) {
   height: 450px;
    width: 100%;
  }
`;

const Title = styled.h2`
    text-align: center;
    color: #6b538c;
    font: 500 24px/133% Poppins, sans-serif;
`;

const Image = styled.img`
    aspect-ratio: 1;
    object-fit: cover;
    width: 146px;
    align-self: center;
    margin-top: 10px;
    max-width: 100%;
`;

const COLORS = ["#006aff", "#52c93f", "#ff2727"];

function StudentStatus({percentages}) {

    const data = [
        { name: "Working", value: Math.round(percentages.working) },
        { name: "Interviewing", value: Math.round(percentages.interviewing) },
        { name: "Searching", value: Math.round(percentages.searching) },
    ];

    return (
        <Container>
            <Title>Student Status</Title>
            <PieChart width={350} height={350}>
                <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ value }) => `${value}%`}
                    outerRadius={100}
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
        </Container>
    );
}

export default StudentStatus;
