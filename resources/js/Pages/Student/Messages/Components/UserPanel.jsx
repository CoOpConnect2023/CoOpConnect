import * as React from "react";
import styled from "styled-components";
import { Div70, Div71, Div72, Div73, Div74, Div75, Div76, Div77, Img12, Img13, Img14, Img15 } from "../../Styling/UserPanel.styles";

export default function UserPanel({ userInfo, messages, conversation, currentUser, darkMode, fontSize }) {
    // Log the current user


    if (!conversation || !conversation.users || conversation.users.length < 2) {
        return <div>No second user found</div>;
    }

    const secondUser = conversation.users.length > 1 ? conversation.users.find(user => user.id !== currentUser) : null;
    console.log("Current User:", messages);

    const isOnline = messages.some(message => {
        const messageTime = new Date(message.created_at);
        const currentTime = new Date();
        const fiveMinutesAgo = new Date(currentTime.getTime() - 5 * 60 * 1000); // 5 minutes ago

        return messageTime > fiveMinutesAgo;
    });


    return (
        <Div70 darkMode={darkMode} fontSize={fontSize}>
            <Div71 darkMode={darkMode} fontSize={fontSize}>
                {secondUser && secondUser.profile_image ? (
                    <img
                        loading="lazy"
                        src={secondUser.profile_image}
                        alt={secondUser.name}
                        style={{ width: '100px', height: '100px' }} // Adjust styles as needed
                    />
                ) : (
                    <Img12 darkMode={darkMode} fontSize={fontSize}
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/c47a81d89b80af54f5476e14879bb84b3496b020df7bb399a343744b681844d6?apiKey=d66532d056b14640a799069157705b77&"
                    />
                )}
                <Div72 darkMode={darkMode} fontSize={fontSize}>
                <Div73 darkMode={darkMode} fontSize={fontSize}>
  {secondUser ? (
    <>
      {secondUser.name} {secondUser.pronouns && `(${secondUser.pronouns})`}
    </>
  ) : (
    'No second user'
  )}
</Div73>

                    <Div74 darkMode={darkMode} fontSize={fontSize}>

                    {isOnline && (
                        <>
                        <Div75 darkMode={darkMode}
                        fontSize={fontSize} />
                            <Div76 darkMode={darkMode} fontSize={fontSize}>
                                Online
                            </Div76>
                            </>
                        )}
                    </Div74>
                </Div72>
            </Div71>


        </Div70>
    );
}
