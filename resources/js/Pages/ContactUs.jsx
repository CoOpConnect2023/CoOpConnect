import React, { useState } from 'react';
import './ContactUs.css'; // Import CSS file for styling

function EmailForm() {
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const handleSubjectChange = (e) => {
    setSubject(e.target.value);
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content') // Include CSRF token if required
        },
        body: JSON.stringify({ subject, message }),
      });
  
      if (response.ok) {
        console.log('Email sent successfully');
      } else {
        console.error('Failed to send email');
      }
    } catch (error) {
      console.error('Error sending email:', error);
    }
  
    // Clear form fields after submission
    setSubject('');
    setMessage('');
  };
  

  return (
    <form className="email-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="subject">Subject:</label>
        <input
          type="text"
          id="subject"
          value={subject}
          onChange={handleSubjectChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="message">Message:</label>
        <textarea
          id="message"
          value={message}
          onChange={handleMessageChange}
          required
        />
      </div>
      <button type="submit">Send Email</button>
    </form>
  );
}

export default EmailForm;
