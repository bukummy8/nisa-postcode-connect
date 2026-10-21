# NISA Postcode Connect

**A postcode and address workflow prototype by NISA Technology.**

NISA Postcode Connect explores how a simple, accessible digital experience can help users enter postcode and address details and prepare information for postcode-related workflows in Nigeria.

> **Project status:** Prototype in active development. Official NIPOST API access and integration are pending approval and credentials. The current application validates postcode format only; it does not verify postcodes against an official NIPOST database.

## Project Goals

- Provide a straightforward interface for entering postcode and address information.
- Validate required fields and postcode format before processing.
- Establish a modular React frontend and Express API.
- Apply automated testing and continuous integration.
- Prepare the project for a future, authorized postcode API integration.

## Current Features

- React-based frontend built with Vite.
- Postcode format validation and normalization.
- Address form validation.
- Express backend with a health-check endpoint.
- Security middleware using Helmet and CORS.
- Automated frontend and backend tests.
- GitHub Actions workflow for testing, building, and linting.

## Technology Stack

| Area | Technologies |
| --- | --- |
| Frontend | React, Vite, JavaScript, CSS |
| Backend | Node.js, Express |
| API security | Helmet, CORS |
| Testing | Node.js test runner, Supertest |
| Code quality | Oxlint |
| CI/CD | GitHub Actions |
| Version control | Git and GitHub |

## Project Structure

```text
nisa-postcode-connect/
├── .github/
│   └── workflows/
│       └── ci.yml
├── client/
│   ├── public/
│   └── src/
│       ├── test/
│       ├── App.jsx
│       └── validation.js
├── server/
│   ├── test/
│   └── index.js
├── .gitignore
├── package.json
└── README.md
```

## Requirements

- Node.js 22 or a compatible supported version
- npm
- Git

## Run Locally

Clone the repository:

```bash
git clone https://github.com/bukummy8/nisa-postcode-connect.git
cd nisa-postcode-connect
```

Install dependencies for the root, backend, and frontend:

```bash
npm ci
npm ci --prefix server
npm ci --prefix client
```

### Start the backend

In one terminal:

```bash
cd ~/Projects/nisa-postcode-connect
npm run dev --prefix server
```

The API runs at:

`http://localhost:5000`

Health endpoint:

`http://localhost:5000/api/health`

### Start the frontend

In a second terminal:

```bash
cd ~/Projects/nisa-postcode-connect
npm run dev --prefix client
```

Open the local URL printed by Vite, normally:

`http://localhost:5173`

Keep both development servers running while using the application.

## Quality Checks

Run these commands from the repository root.

### Run automated tests

```bash
npm test
```

The root test command runs the backend and frontend test suites.

### Build the frontend

```bash
npm run build
```

### Run lint checks

```bash
npm run lint
```

GitHub Actions runs the automated tests, production build, and lint checks on pushes and pull requests.

## API Health Check

The backend provides:

`GET /api/health`

Example response:

```json
{
  "status": "ok",
  "service": "NISA Postcode Connect API",
  "message": "Backend is running",
  "timestamp": "ISO-8601 timestamp"
}
```

The timestamp returned by the running service is generated dynamically.

## Postcode Validation and Official Integration

The current validation logic checks the format of the entered postcode. A format check is not proof that a postcode exists or that it corresponds to a particular address.

Official NIPOST verification, authoritative postcode lookup, and production API integration are not yet implemented. They require authorized API access, credentials, and integration testing.

## Security Notes

- Never commit API keys, access tokens, passwords, private keys, or real `.env` files.
- Store future credentials in environment variables or an appropriate secrets manager.
- Review the repository's security and configuration settings before production deployment.
- Use authorized API access and follow the provider's terms and data-handling requirements.

## Roadmap

- [ ] Complete official NIPOST API onboarding.
- [ ] Integrate an authorized postcode lookup API when access is granted.
- [ ] Add authoritative postcode and address verification.
- [ ] Expand automated tests for lookup and error-handling flows.
- [ ] Prepare production deployment and operational monitoring.
- [ ] Improve accessibility and user feedback.

## About NISA Technology

NISA Technology builds software and digital solutions, with a focus on software engineering and DevOps practices.

Website: https://nisa-technology.vercel.app/

## License

No open-source license has been specified yet. All rights are reserved by the copyright holder unless a license is added to this repository.
