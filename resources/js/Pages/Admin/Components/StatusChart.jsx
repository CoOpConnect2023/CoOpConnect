import React from "react";

import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Container, Title, COLORS } from "../Styling/StatusChart.styles";



const StatusChart = ({ percentages, users }) => {

    const totalCounts = users.reduce((acc, user) => {
        if (user.status === 'working') {
            acc.working++;
        } else if (user.status === 'interviewing') {
            acc.interviewing++;
        } else if (user.status === 'searching') {
            acc.searching++;
        }
        return acc;
    }, { working: 0, interviewing: 0, searching: 0 });

    const data = [
        { name: "Working", value: Math.round(totalCounts.working) },
        { name: "Interviewing", value: Math.round(totalCounts.interviewing) },
        { name: "Searching", value: Math.round(totalCounts.searching) },
    ];

    return (
        <Container>
            <Title>Status</Title>
            <ResponsiveContainer width="100%" height="80%">
                <PieChart>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
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
                    <Legend verticalAlign="bottom" height={36} />
                </PieChart>
            </ResponsiveContainer>
        </Container>
    );
};

export default StatusChart;
