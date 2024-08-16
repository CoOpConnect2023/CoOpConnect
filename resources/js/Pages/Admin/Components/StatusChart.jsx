import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Container, Title, COLORS } from "../Styling/StatusChart.styles";
const StatusChart = ({ percentages, users, fontSize, darkMode }) => {
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
        <Container fontSize={fontSize} darkMode={darkMode}>
            <Title fontSize={fontSize} darkMode={darkMode}>Status</Title>
            <ResponsiveContainer fontSize={fontSize} darkMode={darkMode} width="100%" height="80%">
                <PieChart fontSize={fontSize} darkMode={darkMode}>
                    <Pie fontSize={fontSize} darkMode={darkMode}
                        data={data}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ value }) => `${value}%`}
                        outerRadius="80%"
                        fill="#8884D8"
                        dataKey="value"
                    >
                        {data.map((entry, index) => (
                            <Cell fontSize={fontSize} darkMode={darkMode}
                                key={`cell-${index}`}
                                fill={COLORS[index % COLORS.length]}
                            />
                        ))}
                    </Pie>
                    <Tooltip fontSize={fontSize} darkMode={darkMode} />
                    <Legend fontSize={fontSize} darkMode={darkMode} verticalAlign="bottom" height={36} />
                </PieChart>
            </ResponsiveContainer>
        </Container>
    );
};
export default StatusChart;
