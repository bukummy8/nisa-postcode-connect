# NISA Postcode Connect

**A postcode and address workflow prototype by NISA Technology.**

NISA Postcode Connect is a full-stack web application prototype exploring how a simple, accessible digital experience can help users enter postcode and address details for postcode-related workflows in Nigeria.

**Live application:** https://nisa-postcode-connect.vercel.app/

**Backend API:** https://nisa-postcode-connect.onrender.com

**API health check:** https://nisa-postcode-connect.onrender.com/api/health

> **Project status:** Deployed prototype in active development. The frontend and backend are live and connected. Official NIPOST API access and integration remain pending approval and credentials. The current application validates postcode format only; it does not verify postcodes against an official NIPOST database.

## Live Deployment

| Component | Platform | URL |
|---|---|---|
| Frontend | Vercel | https://nisa-postcode-connect.vercel.app/ |
| Backend API | Render | https://nisa-postcode-connect.onrender.com |
| API health check | Render | https://nisa-postcode-connect.onrender.com/api/health |
| Source code | GitHub | https://github.com/bukummy8/nisa-postcode-connect |

The frontend communicates with the Express backend through the `VITE_API_BASE_URL` environment variable. The backend uses `FRONTEND_URL` to configure the allowed frontend origin for CORS.

### Deployment Configuration

**Vercel frontend**
- Root directory: `client`
- Framework: Vite
- Build command: `npm run build`
- Output directory: `dist`
- Environment variable: `VITE_API_BASE_URL`

**Render backend**
- Root directory: `server`
- Build command: `npm ci`
- Start command: `npm start`
- Health-check path: `/api/health`
- Environment variable: `FRONTEND_URL`

Set environment variable values in the hosting provider dashboards. Do not commit credentials or private environment files to Git.

## Project Goals

- Provide a straightforward interface for entering postcode and address information.
- Validate required fields and postcode format before processing.
- Establish a modular React frontend and Express API.
- Apply automated testing and continuous integration.
- Prepare the project for a future, authorized postcode API integration.

## Current Features

- React frontend built with Vite.
- Postcode format validation and normalization.
- Address form validation.
- Express backend with an API health-check endpoint.
- Security middleware using Helmet and CORS.
- Automated frontend and backend tests.
- GitHub Actions workflow for testing, building, and linting.
- Deployed frontend and backend with a working API health check.

## Technology Stack

| Area | Technologies |
|---|---|
| Frontend | React, Vite, JavaScript, CSS |
| Backend | Node.js, Express |
| API security | Helmet, CORS |
| Configuration | dotenv, environment variables |
| Testing | Node.js test runner, Supertest |
| Code quality | Oxlint |
| CI/CD | GitHub Actions |
| Frontend hosting | Vercel |
| Backend hosting | Render |
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
npm run dev --prefix server
```

The API runs locally at:

`http://localhost:5000`

Health endpoint:

`http://localhost:5000/api/health`

### Start the frontend

In a second terminal, from the repository root:

```bash
npm run dev --prefix client
```

Open the local URL printed by Vite, normally:

`http://localhost:5173`

Keep both development servers running while using the application.

The frontend defaults to the local backend URL. To configure a different API endpoint, set `VITE_API_BASE_URL` in the frontend environment.

## Quality Checks

Run these commands from the repository root.

### Run automated tests

```bash
npm test
```

The root test command runs both the backend and frontend test suites.

**Latest verified result:** 12 tests passed — 4 backend tests and 8 frontend validation tests.

### Build the frontend

```bash
npm run build
```

The production build completed successfully in the latest local verification.

### Run lint checks

```bash
npm run lint
```

The latest local verification completed with zero warnings and zero errors.

GitHub Actions runs automated tests, the production build, and lint checks on pushes and pull requests.

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

The timestamp is generated dynamically by the running service.

## Postcode Validation and Official Integration

The current validation logic checks postcode format and required address fields. A format check is not proof that a postcode exists or corresponds to a particular address.

Official NIPOST verification, authoritative postcode lookup, and production API integration are not yet implemented. They require authorized API access, credentials, and integration testing.

The project will only claim official postcode verification after the authorized service has been integrated and its responses have been tested.

## Security Status

The production backend dependency audit has reported zero vulnerabilities:

```bash
npm audit --prefix server --omit=dev
```

The full backend development dependency audit has reported high-severity findings involving the `braces` dependency chain used through Nodemon and Chokidar. These findings remain under investigation; the project should not be described as completely vulnerability-free until they are resolved or appropriately mitigated.

Avoid blindly running `npm audit fix --force`, as forced dependency changes can introduce breaking updates.

Security practices:
- Never commit API keys, access tokens, passwords, private keys, or real `.env` files.
- Store credentials in environment variables or an appropriate secrets manager.
- Review dependency advisories and update packages with compatible, tested versions.
- Restrict CORS to the intended frontend origin.
- Use authorized API access and follow provider data-handling requirements.

## Roadmap

- [ ] Resolve the development dependency security findings.
- [ ] Complete official NIPOST API onboarding.
- [ ] Integrate an authorized postcode lookup API when access is granted.
- [ ] Add authoritative postcode and address verification.
- [ ] Expand automated tests for lookup, network errors, and failure handling.
- [x] Deploy the frontend and backend.
- [x] Verify the API health check and frontend-to-backend connection.
- [x] Establish automated tests, production build, and lint checks.
- [ ] Improve accessibility and user feedback.
- [ ] Add operational monitoring and deployment documentation.

## About NISA Technology

NISA Technology builds software and digital solutions, with a focus on software engineering and DevOps practices.

**Website:** https://nisa-technology.vercel.app/

**GitHub repository:** https://github.com/bukummy8/nisa-postcode-connect

## License

No open-source license has been specified yet. All rights are reserved by the copyright holder unless a license is added to this repository.