import React, { useState, useEffect } from "react";
import styled from "styled-components";

export default function SidePanel() {
    const [conversations, setConversations] = useState([]);
    const [userId, setUserId] = useState(null);


    useEffect(() => {
        // Fetch the XSRF token from cookies and set it in Axios headers
        const csrfToken = document.cookie
            .split('; ')
            .find(row => row.startsWith('XSRF-TOKEN='))
            ?.split('=')[1];
        axios.defaults.headers.common['X-XSRF-TOKEN'] = csrfToken;

        // Fetch the user ID, only allows if token is correct
        const fetchUserId = async () => {
            try {
                const response = await axios.get('/api/user-id');
                setUserId(response.data.user.id);

            } catch (error) {
                console.error("Error fetching user ID:", error);
            }
        };

        fetchUserId();
    }, []);

    useEffect(() => {
        const fetchConversations = async () => {
            try {
                if (!userId) {
                    return; // Exit early if userId is null or undefined
                }

                const response = await axios.get(`/api/users/${userId}/conversations`, {
                    params: {
                        user_id: userId,
                    },
                });

                if (response.data.status === 1) {
                    setConversations(response.data.data);
                    console.log("Conversations fetched successfully:", response.data.data);
                } else {
                    console.error("Error fetching Conversations:", response.data.message);
                }
            } catch (error) {
                console.error("Error fetching Conversations:", error);
            }
        };

        fetchConversations();
    }, [userId]);








    const data = [
        {
            imgSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/09e638f41d9cedf8e1726ebb22929c2117cfca2ff217e39a0120741dcaace204?apiKey=d66532d056b14640a799069157705b77&",
            name: "John",
            time: "Today, 9:52pm",
            content:
                "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        },
        {
            imgSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/09e638f41d9cedf8e1726ebb22929c2117cfca2ff217e39a0120741dcaace204?apiKey=d66532d056b14640a799069157705b77&",
            name: "Benjamin",
            time: "Yesterday, 12:22pm",
            content:
                "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        },
        {
            imgSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/09e638f41d9cedf8e1726ebb22929c2117cfca2ff217e39a0120741dcaace204?apiKey=d66532d056b14640a799069157705b77&",
            name: "Bill Gates",
            time: "Wednesday, 9:41am",
            content:
                "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        },
        {
            imgSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/09e638f41d9cedf8e1726ebb22929c2117cfca2ff217e39a0120741dcaace204?apiKey=d66532d056b14640a799069157705b77&",
            name: "Bill Gates",
            time: "Wednesday, 9:41am",
            content:
                "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        },
        {
            imgSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/09e638f41d9cedf8e1726ebb22929c2117cfca2ff217e39a0120741dcaace204?apiKey=d66532d056b14640a799069157705b77&",
            name: "Bill Gates",
            time: "Wednesday, 9:41am",
            content:
                "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        },
        {
            imgSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/09e638f41d9cedf8e1726ebb22929c2117cfca2ff217e39a0120741dcaace204?apiKey=d66532d056b14640a799069157705b77&",
            name: "Bill Gates",
            time: "Wednesday, 9:41am",
            content:
                "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        },
        {
            imgSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/09e638f41d9cedf8e1726ebb22929c2117cfca2ff217e39a0120741dcaace204?apiKey=d66532d056b14640a799069157705b77&",
            name: "Mariam",
            time: "Wednesday, 8:41am",
            content:
                "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        },
        {
            imgSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/09e638f41d9cedf8e1726ebb22929c2117cfca2ff217e39a0120741dcaace204?apiKey=d66532d056b14640a799069157705b77&",
            name: "Joseph",
            time: "Monday, 1:00am",
            content:
                "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        },

        // Add more objects for each data entry including duplicates
    ];

    return (
        <Div15>
            <Div16>Conversations</Div16>
            <Div17>
                <Div18>
                    {data.map((item, index) => (
                        <Div19
                            key={index}
                            style={
                                index === data.length - 1
                                    ? {
                                          borderBottomWidth: "0px",
                                      }
                                    : {}
                            }
                        >
                            <Img4 loading="lazy" src={item.imgSrc} />
                            <Div20>
                                <Div21>
                                    <Div22>{item.name}</Div22>
                                    <Div23>{item.time}</Div23>
                                </Div21>
                                <Div24>{item.content}</Div24>
                            </Div20>
                        </Div19>
                    ))}
                </Div18>
                <Div67>
                    <Div68 />
                </Div67>
            </Div17>
        </Div15>
    );
}

const Div15 = styled.div`
    border-radius: 10px;
    border-color: rgba(123, 117, 127, 1);
    border-style: solid;
    border-width: 1px;
    background-color: var(--Schemes-Background, #fff7ff);
    display: flex;
    margin-top: 20px;
    flex-direction: column;
    padding: 10px 10px 0;
    @media (max-width: 991px) {
        max-width: 100%;
    }
`;

const Div16 = styled.div`
    color: var(--Palettes-Primary-40, #773dc3);
    font: 600 24px/133% Poppins, sans-serif;
    @media (max-width: 991px) {
        max-width: 100%;
    }
`;

const Div17 = styled.div`
    display: flex;
    margin-top: 10px;
    gap: 10px;
    @media (max-width: 991px) {
        max-width: 100%;
        flex-wrap: wrap;
    }
`;

const Div18 = styled.div`
    display: flex;
    flex-direction: column;
    font-size: 12px;
    line-height: 133%;
    flex: 1;
`;

const Div19 = styled.div`
    justify-content: center;
    border-color: rgba(0, 0, 0, 1);
    border-style: solid;
    border-bottom-width: 1px;
    display: flex;
    gap: 10px;
    padding: 10px 5px;
`;

const Img4 = styled.img`
    aspect-ratio: 1;
    object-fit: auto;
    object-position: center;
    width: 50px;
    border-color: rgba(123, 117, 127, 1);
    border-style: solid;
    border-width: 2px;
`;

const Div20 = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    margin: auto 0;
`;

const Div21 = styled.div`
    justify-content: space-between;
    display: flex;
    gap: 20px;
    font-weight: 500;
    letter-spacing: 0.5px;
`;

const Div22 = styled.div`
    color: var(--Schemes-On-Background, #1d1a20);
    font-family: Poppins, sans-serif;
`;

const Div23 = styled.div`
    color: var(--Schemes-Outline, #7b757f);
    font-family: Poppins, sans-serif;
`;

const Div24 = styled.div`
    max-width: 300px;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    color: var(--Schemes-Outline, #7b757f);
    text-overflow: ellipsis;
    font-family: Poppins, sans-serif;
    font-weight: 400;
    letter-spacing: 0.4px;
    margin-top: 10px;
`;

const Div67 = styled.div`
    padding-bottom: 80px;
    border-radius: 100px;
    background-color: var(--Schemes-Primary-Container, #eddcff);
    display: flex;
    flex-direction: column;
`;

const Div68 = styled.div`
    border-radius: 100px;
    background-color: var(--Schemes-Primary, #6b538c);
    height: 33px;
`;
