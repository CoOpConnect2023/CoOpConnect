import * as React from "react";
import { useState, useEffect } from "react";
import styled from "styled-components";

import { Div4, Div5, Div6, Div7, Div8, Div9, Div10, Div11, Div12, Div13, Div14, Img, Input, SendButton, StyledMessage, StyledSelect } from "../../Styling/NewMessage.styles";

export default function NewMessage({ newMessage, setNewMessage, onSendNewMessage, recipientEmail, setRecipientEmail, shortlists, brandNewMessage, setBrandNewMessage, fontSize, darkMode }) {


    const handleInputChange = (e) => {
        setBrandNewMessage(e.target.value);
    };

    const handleRecipientChange = (e) => {
        setRecipientEmail(e.target.value);
    };

    const handleSelectChange = (e) => {
        setRecipientEmail(e.target.value);
    };



    let uniqueEmails = new Set();

    if (shortlists && Array.isArray(shortlists)) {
        shortlists.forEach(shortlist => {
            if (shortlist && shortlist.email) {
                uniqueEmails.add(shortlist.email);
            }
        });
    }

    // Check if there are any applicants across all shortlists
    const hasApplicants = shortlists && shortlists.some(shortlist => shortlist.email.length > 0);

    useEffect(() => {
        if (uniqueEmails.size > 0 && recipientEmail === '') {
            setRecipientEmail([...uniqueEmails][0]);
        }
    }, [uniqueEmails]);



    return (
        <Div4 darkMode={darkMode}
            fontSize={fontSize}>
            <Div5 darkMode={darkMode}
                fontSize={fontSize}>New Message</Div5>
            <Div6 darkMode={darkMode}
                fontSize={fontSize}>
                <Div7 darkMode={darkMode}
                    fontSize={fontSize}>
                    <Div8 darkMode={darkMode}
                        fontSize={fontSize}>To: </Div8>
                    <Div9 darkMode={darkMode}
                        fontSize={fontSize}> {hasApplicants ? (
                            <StyledSelect darkMode={darkMode} fontSize={fontSize} value={recipientEmail} onChange={handleSelectChange}>
                                {[...uniqueEmails]
                                    .sort((a, b) => a.localeCompare(b)) // Sort the emails alphabetically
                                    .map(email => (
                                        <option key={email} value={email}>
                                            {email}
                                        </option>
                                    ))}
                            </StyledSelect>) : (
                            <StyledMessage darkMode={darkMode}
                                fontSize={fontSize}>
                                Add some applicants to your shortlist to message them.
                            </StyledMessage>
                        )}</Div9>
                </Div7>
            </Div6>
            <Div10 darkMode={darkMode}
                fontSize={fontSize}>
                <Div11 darkMode={darkMode}
                    fontSize={fontSize}>
                    <Div12 darkMode={darkMode}
                        fontSize={fontSize}>
                        {/* <Img
                            loading="lazy"
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/b1fe555b0ffdbe13c397278b479bee6782aab134a4d597d83c876620c9e724f1?apiKey=d66532d056b14640a799069157705b77&"
                        /> */}
                        <Div13 darkMode={darkMode}
                            fontSize={fontSize}><Input darkMode={darkMode}
                                fontSize={fontSize}
                                type="text"
                                placeholder="Type your message"
                                value={brandNewMessage}
                                onChange={handleInputChange}

                            /></Div13><SendButton darkMode={darkMode}
                                fontSize={fontSize} onClick={onSendNewMessage}>Send</SendButton>
                    </Div12>
                    <Div14 darkMode={darkMode}
                        fontSize={fontSize}>

                    </Div14>
                </Div11>
            </Div10>
        </Div4>
    );
}

