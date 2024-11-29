import * as React from "react";
import styled from "styled-components";
import {
  Div15,
  Div16,
  Div17,
  Div18,
  Div19,
  Img4,
  Div20,
  Div21,
  Div22,
  Div23,
  Div24,
  Div67,
  Div68,
} from "../../Styling/SidePanel.styles";

export default function SidePanel({ conversations, setConversationsID, currentUser, darkMode, fontSize }) {
  const handleConversationClick = (conversationId) => {
    // Pass the conversationId to the parent component (Chat) when clicked
    setConversationsID(conversationId);
  };

  // Function to sort conversations by latest_message timestamp (newest first)
  const sortConversationsByLatestMessage = (conversationsArray) => {
    // Create a shallow copy of the conversations array before sorting
    return [...conversationsArray].sort((a, b) => {
      const dateA = new Date(a.latest_message.updated_at);
      const dateB = new Date(b.latest_message.updated_at);
      return dateB - dateA; // Sort descending (newest first)
    });
  };

  // Sort conversations before rendering
  const sortedConversations = sortConversationsByLatestMessage(conversations);

  return (
    <Div15 darkMode={darkMode} fontSize={fontSize}>
      <Div16 darkMode={darkMode} fontSize={fontSize}>Conversations</Div16>
      <Div17 darkMode={darkMode} fontSize={fontSize}>
        <Div18 darkMode={darkMode} fontSize={fontSize}>
          {sortedConversations.map((conversation) => {
            const otherUser = conversation.users.find((user) => user.id !== currentUser);

            if (!otherUser) {
              return null;
            }

            return (
              <Div19
                darkMode={darkMode}
                fontSize={fontSize}
                key={conversation.id}
                onClick={() => handleConversationClick(conversation.id)}
              >
               <TooltipContainer>
  <Img4
    darkMode={darkMode}
    fontSize={fontSize}
    loading="lazy"
    style={{ borderRadius: "50%" }}
    src={
      otherUser.profile_image ||
      "https://cdn.builder.io/api/v1/image/assets/TEMP/09e638f41d9cedf8e1726ebb22929c2117cfca2ff217e39a0120741dcaace204?apiKey=d66532d056b14640a799069157705b77&"
    }
  />
  <Tooltip darkMode={darkMode}>
  <div>
    <strong>Name:</strong> {otherUser.name || "No name available"}
  </div>
  <div>
    <strong>Email:</strong> {otherUser.email || "No email available"}
  </div>
  <div>
    <strong>Position:</strong> {otherUser.positiontitle || "No position available"}
  </div>
  <div>
    <strong>Company:</strong> {otherUser.company?.name || "No company available"}
  </div>
  <div>
    <strong>School:</strong> {otherUser.school?.name || "No school available"}
  </div>
</Tooltip>
</TooltipContainer>
                <Div20 darkMode={darkMode} fontSize={fontSize}>
                  <Div21 darkMode={darkMode} fontSize={fontSize}>
                    <Div22 darkMode={darkMode} fontSize={fontSize}>{otherUser.name}</Div22>
                    <Div23 darkMode={darkMode} fontSize={fontSize}>
                      {new Date(conversation.latest_message.updated_at).toLocaleString()}
                    </Div23>
                  </Div21>
                  <Div24 darkMode={darkMode} fontSize={fontSize}>
                    {conversation.latest_message ? conversation.latest_message.content : "No messages yet"}
                  </Div24>
                </Div20>
              </Div19>
            );
          })}
        </Div18>
        <Div67 darkMode={darkMode} fontSize={fontSize}>
          <Div68 />
        </Div67>
      </Div17>
    </Div15>
  );
}

// Tooltip styled-component
const TooltipContainer = styled.div`
  position: relative;
  display: inline-block;

  &:hover > div {
    visibility: visible;
    opacity: 1;
  }
`;

const Tooltip = styled.div`
  visibility: hidden;    /* Initially hidden */
  opacity: 0;           /* Initially fully transparent */
  position: absolute;   /* Position relative to TooltipContainer */
           /* Place above the image */


  background-color: ${({ darkMode }) => (darkMode ? "#333" : "#fff")};
  color: ${({ darkMode }) => (darkMode ? "#fff" : "#000")};
  text-align: center;
  padding: 8px;
  border-radius: 5px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 9999;        /* Ensure it appears above other elements */
  font-size: ${({ fontSize }) => fontSize || "0.875rem"};

  transition: opacity 0.3s ease-in-out;
  white-space: nowrap;  /* Prevent tooltip from breaking into multiple lines */
`;
