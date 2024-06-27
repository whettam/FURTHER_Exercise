import React, { useState } from 'react';

const IntegrationForm = () => {
  // Initialize state for form data
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  });

  // Handle changes in form input fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Sanitize the form data before submission
  const sanitizeFormData = () => {
    // Trim whitespace and remove spaces from phone number
    let sanitizedFormData = {
      firstName: formData.firstName.trim(),
      lastName: formData.lastName.trim(),
      email: formData.email.trim(),
      phone: formData.phone.replace(/\s+/g, '') // Remove spaces from phone number
    };

    // HTML character escaping
    sanitizedFormData = {
      ...sanitizedFormData,
      firstName: escapeHtml(sanitizedFormData.firstName),
      lastName: escapeHtml(sanitizedFormData.lastName),
      email: escapeHtml(sanitizedFormData.email),
      phone: escapeHtml(sanitizedFormData.phone)
    };

    return sanitizedFormData;
  };

  // Function to escape HTML characters
  const escapeHtml = (unsafe) => {
    return unsafe.replace(/[&<"']/g, (m) => {
      switch (m) {
        case '&':
          return '&amp;';
        case '<':
          return '&lt;';
        case '>':
          return '&gt;';
        case '"':
          return '&quot;';
        case "'":
          return '&#039;';
        default:
          return m;
      }
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Sanitize the form data before submission
    const sanitizedData = sanitizeFormData();
    console.log('Sanitized Form Data:', sanitizedData);

    // proxy URL to be run with node
    const proxyUrl = 'http://localhost:3001/submit';

    // Send the event to Google Tag Manager with additional parameters
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'formSubmission',
      formData: sanitizedData
    });

    // Log the form data being sent
    console.log('Form Data:', sanitizedData);

    // Send data to proxy server
    fetch(proxyUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(sanitizedData)
    })
      .then(response => response.json())
      .then(data => {
        console.log('Response from proxy server:', data);
        if (data.error) {
          alert('Form submission failed! Please try again later.');
          console.log('Submission Error:', data.error);
        } else {
          alert('Form submitted successfully!');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        alert('Form submission failed! Please try again later.');
      });
  };

  return (
    <div className="App">
      <header className="header">
        <div className="header-content">
          <h1 className="title-text">Attune</h1>
          <nav className="nav-links">
            <a href="#home" className="nav-link home-link">Home</a>
            <a href="#services" className="nav-link services-link">Services</a>
            <a href="#contact" className="nav-link contact-link">Contact</a>
          </nav>
        </div>
      </header>

      <main className="main-content">
        <div className="form-container">
          <div className="image-section"></div>
          <div className="form-section">
            <h1 className="form-title">Contact</h1>
            <form id="integrationForm" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="firstName">First Name</label>
                <input type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label htmlFor="lastName">Last Name</label>
                <input type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <button type="submit" className="submit-button">Submit</button>
              </div>
            </form>
          </div>
        </div>
      </main>

      <footer className="footer">
        &copy; 2024 ATTUNE
      </footer>
    </div>
  );
};

export default IntegrationForm;
