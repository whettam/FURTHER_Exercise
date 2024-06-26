import React, { useState } from 'react';

const IntegrationForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const validateForm = () => {
    // Basic email validation using regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValidEmail = emailRegex.test(formData.email);

    // Basic phone number validation using regex (10 digits)
    const phoneRegex = /^\d{10}$/;
    const isValidPhone = phoneRegex.test(formData.phone);

    let validationMessage = '';

    if (!isValidEmail) {
      validationMessage += 'Invalid Email Address\n';
    }

    if (!isValidPhone) {
      validationMessage += 'Invalid Phone Number\n';
    }

    if (validationMessage) {
      const confirmation = window.confirm(`${validationMessage}\nDo you want to submit anyway?`);

      if (!confirmation) {
        return false; // User chose not to submit
      }
    }

    return true; // Proceed with submission
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return; // Stop submission if form is not valid and user chose not to submit anyway
    }

    // proxy URL to be run with node
    const proxyUrl = 'http://localhost:3001/submit';

    // Send the event to Google Tag Manager with additional parameters
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'formSubmission',
      formData: {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone
      }
    });

    // Log the form data being sent
    console.log('Form Data:', formData);

    // Send data to proxy server
    fetch(proxyUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
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
