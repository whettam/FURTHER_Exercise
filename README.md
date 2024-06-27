# Integration Exercise: Form Submission with Google Analytics and Zapier

This project demonstrates how to integrate a form submission process using React, Node.js, Google Analytics (GA), and Zapier. The goal is to capture user input from a web form, track it with Google Analytics for analytics purposes, and forward the data to Zapier for further automated actions.

## Overview

The project consists of two main components:
- **Frontend (React)**: Provides a user-friendly form interface where users can input their information (first name, last name, email, phone number).
- **Backend (Node.js)**: Acts as a proxy server that receives form submissions from the frontend, sanitizes the data, sends an event to Google Tag Manager for tracking via Google Analytics, and forwards the sanitized data to Zapier for automated workflows.

## How It Works

1. **Frontend**: Built with React, the frontend includes a form that collects user information. Input fields include first name, last name, email, and phone number. Input data is sanitized to remove unnecessary whitespace and HTML characters before submission.

2. **Google Analytics Integration**: The sanitized form data triggers an event in Google Tag Manager, which then sends data to Google Analytics for tracking user interactions.

3. **Zapier Integration**: After sanitization, the form data is forwarded securely to Zapier via a Node.js proxy server. Zapier processes this data according to predefined workflows, such as sending email notifications or updating a database.