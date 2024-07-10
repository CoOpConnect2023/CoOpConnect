import * as React from "react";
import styled from "styled-components";

export default function SidePanel({ conversations, setConversationsID, currentUser }) {

    const handleConversationClick = (conversationId) => {
        // Pass the conversationId to the parent component (Chat) when clicked
        setConversationsID(conversationId);
        
    };


    return (
        <Div15>
            <Div16>Conversations</Div16>
            <Div17>
                <Div18>
                    {conversations.map((conversation) => {

                        const otherUser = conversation.users.find(user => user.id !== currentUser);


                        if (!otherUser) {
                            return null;
                        }

                        return (
                            <Div19 key={conversation.id} onClick={() => handleConversationClick(conversation.id)}>

                                <Img4
                                    loading="lazy"
                                    src={otherUser.profile_image || 'https://cdn.builder.io/api/v1/image/assets/TEMP/09e638f41d9cedf8e1726ebb22929c2117cfca2ff217e39a0120741dcaace204?apiKey=d66532d056b14640a799069157705b77&'}
                                />
                                <Div20>
                                    <Div21>
                                        <Div22>{otherUser.name}</Div22>
                                        {/* You may need to format the timestamp to match your desired format */}
                                        <Div23>{new Date(conversation.latest_message.updated_at).toLocaleString()}</Div23>
                                    </Div21>
                                    {/* Display last message content here if available */}
                                    <Div24>{conversation.latest_message ? conversation.latest_message.content : 'No messages yet'}</Div24>
                                </Div20>
                            </Div19>
                        );
                    })}
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
