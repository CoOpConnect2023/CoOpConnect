import * as React from "react";
import styled from "styled-components";

const Container = styled.section`
    border-radius: 10px;
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
    background-color: #fdfdfd;
    display: flex;
    flex-direction: column;
    padding: 24px;
    font-size: 16px;
    color: #1a1919;
    font-weight: 400;
    line-height: 150%;
    height: 364px;
    width: 306px;
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

const Status = styled.div`
    display: flex;
    margin-top: 24px;
    gap: 20px;
    justify-content: space-between;
`;

const StatusInfo = styled.div`
    display: flex;
    gap: 12px;
`;

const Circle = styled.div`
    background-color: ${(props) => props.color};
    border-radius: 50%;
    width: 16px;
    height: 16px;
    margin: auto 0;
`;

const Text = styled.span`
    font-family: Inter, sans-serif;
`;

const studentStatus = [
    { label: "Currently Working", percentage: "54%", color: "#006aff" },
    { label: "Interviewing", percentage: "20%", color: "#52c93f" },
    { label: "Still Searching", percentage: "26%", color: "#ff2727" },
];

function StudentStatus() {
    return (
        <Container>
            <Title> Student Status</Title>
            <Image
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/88fa98e4a7eb9ab5b95b008c117a7d5f3c19965866591848d9d4ebeadc5ffadd?apiKey=d66532d056b14640a799069157705b77&"
                alt="Student"
            />
            {studentStatus.map((status, index) => (
                <Status key={index}>
                    <StatusInfo>
                        <Circle color={status.color} />
                        <Text>{status.label}</Text>
                    </StatusInfo>
                    <Text>{status.percentage}</Text>
                </Status>
            ))}
        </Container>
    );
}

export default StudentStatus;
