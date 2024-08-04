Sure! Here's a more straightforward version of the README that focuses on the basic setup and usage instructions for your project.

---

# DoctoPet

DoctoPet is a veterinary appointment management system that allows users to book, manage, and track veterinary appointments online.

## Tech Stack

- **Node.js**: Backend server
- **React**: Frontend user interface
- **Firebase**: Database

## Setup Instructions

### Prerequisites

Ensure you have the following installed:

- **Node.js**: [Download and install Node.js](https://nodejs.org/)
- **npm**: Included with Node.js installation
- **Git**: [Download and install Git](https://git-scm.com/)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/DoctoPet.git
   cd DoctoPet
   ```

2. **Install dependencies for the root project**

   ```bash
   npm install
   ```

3. **Install dependencies for the backend**

   ```bash
   cd backend
   npm install
   ```

4. **Install dependencies for the frontend**

   ```bash
   cd ../frontend
   npm install
   ```

### Environment Variables

Create a `.env` file in the `backend` directory with the following:

```plaintext
FIREBASE_PROJECT_ID=your-firebase-project-id
FIREBASE_PRIVATE_KEY_ID=your-firebase-private-key-id
FIREBASE_PRIVATE_KEY=your-firebase-private-key
FIREBASE_CLIENT_EMAIL=your-firebase-client-email
FIREBASE_CLIENT_ID=your-firebase-client-id
FIREBASE_AUTH_URI=https://accounts.google.com/o/oauth2/auth
FIREBASE_TOKEN_URI=https://oauth2.googleapis.com/token
FIREBASE_AUTH_PROVIDER_CERT_URL=https://www.googleapis.com/oauth2/v1/certs
FIREBASE_CLIENT_CERT_URL=your-firebase-client-cert-url
SECRET_KEY=your-secret-key
```

Replace the placeholder values with your Firebase credentials and a secret key for JWT.

### Running the Project

1. **Start the app**

   Navigate to the root directory and run:

   ```bash
   npm run start
   ```
   
   The backend server will run on `http://localhost:3000`.
   The frontend app will run on `http://localhost:9000`.

## Basic Usage

- **Visit the Home Page**: Navigate to `http://localhost:9000` to access the application.
- **Sign Up**: Create a new account or log in with an existing one.
- **Book Appointments**: Use the application to book and manage veterinary appointments.

## License

This project is licensed under the MIT License.

---

