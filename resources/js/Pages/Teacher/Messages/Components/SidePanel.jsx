import * as React from "react";
import styled from "styled-components";
import { Div15, Div16, Div17, Div18, Div19, Img4, Div20, Div21, Div22, Div23, Div24, Div67, Div68 } from "../../Styling/SidePanel.styles";

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


