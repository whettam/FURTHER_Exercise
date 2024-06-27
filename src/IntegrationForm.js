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

  // Function to remove HTML tags
  const removeHtmlTags = (unsafe) => {
    console.log("Original value:", unsafe); 
    const sanitizedValue = unsafe.replace(/<\/?[^>]+(>|$)/g, "");
    console.log("Sanitized value:", sanitizedValue);
    return sanitizedValue;
  };

  // Sanitize the form data before submission
  const sanitizeFormData = () => {
    const sanitizedFormData = {
      firstName: removeHtmlTags(formData.firstName.trim()),
      lastName: removeHtmlTags(formData.lastName.trim()),
      email: removeHtmlTags(formData.email.trim()),
      phone: removeHtmlTags(formData.phone.replace(/\s+/g, '')) // Remove spaces from phone number
    };
    console.log('Sanitized Form Data:', sanitizedFormData); // Debug: Log the sanitized form data
    return sanitizedFormData;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Sanitize the form data before submission
    const sanitizedData = sanitizeFormData();
    console.log('Sanitized Data on Submit:', sanitizedData); // Debug: Log sanitized data on submit

    // proxy URL to be run with node
    const proxyUrl = 'http://localhost:3001/submit';

    // Send the event to Google Tag Manager with additional parameters
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'formSubmission',
      formData: sanitizedData
    });

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
        if (data.error) {
          alert('Form submission failed! Please try again later.');
          console.error('Submission Error:', data.error);
        } else {
          alert('Form submitted successfully!');
          console.log('Response from proxy server:', data);
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
