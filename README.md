# Company XYZ Transport Booking System

This repository contains the transport booking system for Company XYZ, designed to manage the transportation needs of a large number of employees with a limited number of vehicles. The system is built to handle high loads, provide real-time booking management, and ensure reliable, secure operations.

## Table of Contents

- [Frontend](#frontend)
  - [Features](#features)
  - [Tech Stack](#tech-stack)
  - [Getting Started](#getting-started)
  - [Installation](#installation)
  - [Running the Application](#running-the-application)

## Frontend

### Features

- **User Authentication**: Secure login and account creation.
- **Booking Management**: Users can view available slots, book transport, and cancel own created.
- **Driver Interaction**: Drivers confirm or reject booking requests.

### Tech Stack

- **Frontend Framework**: Vue.js
- **State Management**: Pinia
- **Styling**: Tailwind CSS
- **API Communication**: Builtin Fetch API
- **Routing**: Vue Router
- **Build Tool**: Vite

### Getting Started

To get a local copy up and running, follow these steps.

#### Prerequisites

- **Node.js**: [Download Node.js](https://nodejs.org/)
- **npm**: Package manager for dependencies.

### Installation

1. **Clone the repository:** Clone the repository to your local machine.

2. **Install dependencies:** Run `npm install` to install all dependencies.

3. **Environment Variables:** Create a `.env` file in the root directory and add the following environment variables:
```VITE_API_BASE_URL="http://localhost:3000"``` (replace with your API base URL)

### Running the Application
1. Make sure the backend server is running. Refer to the [backend repo README](https://github.com/charles-mutabazi/cbs-backend-assignment) for instructions.

2. **Development Mode:** Run `npm run dev` to start the development server.

3. **Production Mode:** Run `npm run build` to build the application for production. THIS IS NOT REQUIRED FOR LOCAL DEVELOPMENT.
