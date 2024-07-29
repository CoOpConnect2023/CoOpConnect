import * as React from "react";
import { useState, useEffect } from "react";
import styled from "styled-components";

import { Div4, Div5, Div6, Div7, Div8, Div9, Div10, Div11, Div12, Div13, Div14, Img, Input, SendButton, StyledMessage, StyledSelect  } from "../../Styling/NewMessage.styles";

export default function NewMessage({ newMessage, setNewMessage,  onSendNewMessage, recipientEmail, setRecipientEmail, shortlists, brandNewMessage, setBrandNewMessage}) {


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




    return (
        <Div4>
            <Div5>New Message</Div5>
            <Div6>
                <Div7>
                    <Div8>To: </Div8>
                    <Div9> {hasApplicants ? (
      <StyledSelect value={recipientEmail} onChange={handleSelectChange}>
        {[...uniqueEmails].map(email => (
          <option key={email} value={email}>
            {email}
          </option>
        ))}
      </StyledSelect>) : (
                            <StyledMessage>
                                Add some applicants to your shortlist to message them.
                            </StyledMessage>
                        )}</Div9>
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

                        /></Div13><SendButton onClick={onSendNewMessage}>Send</SendButton>
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

