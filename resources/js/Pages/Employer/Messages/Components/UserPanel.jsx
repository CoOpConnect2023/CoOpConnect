import * as React from "react";
import styled from "styled-components";
import { Div70, Div71, Div72, Div73, Div74, Div75, Div76, Div77, Img12, Img13, Img14, Img15 } from "../../Styling/UserPanel.styles";

export default function UserPanel({ conversation, currentUser, darkMode, fontSize }) {
    if (!conversation || !conversation.users || conversation.users.length < 2) {
        return <div>No second user found</div>;
    }

    const secondUser = conversation.users.length > 1 ? conversation.users.find(user => user.id !== currentUser) : null;
    return (
        <Div70 darkMode={darkMode}
        fontSize={fontSize}>

            <Div71 darkMode={darkMode}
        fontSize={fontSize}>
            {secondUser && secondUser.profile_image ? (
                    <img
                        loading="lazy"
                        src={secondUser.profile_image}
                        alt={secondUser.name}
                        style={{ width: '100px', height: '100px' }} // Adjust styles as needed
                    />
                ) : (
                    <Img12 darkMode={darkMode}
        fontSize={fontSize}
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/c47a81d89b80af54f5476e14879bb84b3496b020df7bb399a343744b681844d6?apiKey=d66532d056b14640a799069157705b77&"
                    />
                )}
                <Div72 darkMode={darkMode}
        fontSize={fontSize}>
                    <Div73 darkMode={darkMode}
        fontSize={fontSize}>{secondUser ? secondUser.name : 'No second user'}</Div73>
                    <Div74 darkMode={darkMode}
        fontSize={fontSize}>
                        <Div75 darkMode={darkMode}
        fontSize={fontSize} />
                        <Div76 darkMode={darkMode}
        fontSize={fontSize}>Online</Div76>
                    </Div74>
                </Div72 >
            </Div71>

            <Div77 darkMode={darkMode}
        fontSize={fontSize}>
                <Img13
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/c18b30724b21e718cecd79e9d58a4751dc9d29c80e72a3b1d737245d749bb9fa?apiKey=d66532d056b14640a799069157705b77&"
                />
                <Img14
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/3ef2d6651b9e231f5622a1089941388469ca36165ad2ac303cfe7f091df1e521?apiKey=d66532d056b14640a799069157705b77&"
                />
                <Img15
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/dad3c2de01c60c15dc76acc88922a9a3073420dcb807ac85918e4b6a028f0b7e?apiKey=d66532d056b14640a799069157705b77&"
                />
            </Div77>
        </Div70>
    );
}

