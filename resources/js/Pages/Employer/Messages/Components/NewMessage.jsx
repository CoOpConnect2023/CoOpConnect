import * as React from "react";
import { useState, useEffect } from "react";
import styled from "styled-components";
import { Div4, Div5, Div6, Div7, Div8, Div9, Div10, Div11, Div12, Div13, Div14, Img, Input, SendButton, StyledMessage, StyledSelect  } from "../../Styling/NewMessage.styles";



export default function NewMessage({ newMessage, setNewMessage, handleSendNewMessage, recipientEmail, setRecipientEmail, shortlists, brandNewMessage, setBrandNewMessage}) {


    const handleInputChange = (e) => {
        setBrandNewMessage(e.target.value);
    };

    const handleRecipientChange = (e) => {
        setRecipientEmail(e.target.value);
    };





    let uniqueEmails = new Set();

    // Collect unique emails from all shortlists and their applicants
    if (shortlists && Array.isArray(shortlists)) {
        shortlists.forEach(shortlist => {
            if (shortlist && shortlist.applicants && Array.isArray(shortlist.applicants)) {
                shortlist.applicants.forEach(applicant => {
                    if (applicant && applicant.email) {
                        uniqueEmails.add(applicant.email);
                    }
                });
            }
        });
    }
    const hasApplicants = shortlists && shortlists.some(shortlist => shortlist.applicants.length > 0);

    useEffect(() => {
        if (uniqueEmails.size > 0 && recipientEmail === '') {
            setRecipientEmail([...uniqueEmails][0]);
        }
    }, [uniqueEmails]);

    const handleSelectChange = (e) => {
        setRecipientEmail(e.target.value);
    };


    return (
        <Div4 data-testid="new-message-component">
            <Div5>New Message</Div5>
            <Div6>
                <Div7>
                    <Div8>To: </Div8>
                    <Div9> <Input
                                type="email"
                                placeholder="Enter recipient's email"
                                value={recipientEmail}
                                onChange={handleRecipientChange}
                                data-testid="recipient-email-input"
                            /></Div9>
                </Div7>
            </Div6>
            <Div10>
                <Div11>
                    <Div12>
                        <Img
                            loading="lazy"
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/b1fe555b0ffdbe13c397278b479bee6782aab134a4d597d83c876620c9e724f1?apiKey=d66532d056b14640a799069157705b77&"
                        />
                        <Div13><Input
                            type="text"
                            placeholder="Type your message"
                            value={brandNewMessage}
                            onChange={handleInputChange}
                            data-testid="message-input"

                        /></Div13><SendButton data-testid="send-button" onClick={handleSendNewMessage}>Send</SendButton>
                    </Div12>
                    <Div14>
                        <img
                            loading="lazy"
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/429c7b4cb95b7c4e354a15b6ad7cd6acbf0861060a65e20f88c199fd588a121b?apiKey=d66532d056b14640a799069157705b77&"
                        />
                        <img
                            loading="lazy"
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/8ad0c75797c11a3cca0eab47099060da2128dc39e1cbf2928ea5d120dd074356?apiKey=d66532d056b14640a799069157705b77&"
                        />
                    </Div14>
                </Div11>
            </Div10>
        </Div4>
    );
}


