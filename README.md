# Rick and Morty Company Project

## Table of Contents

1. [Overview](#overview)
2. [Project Structure](#project-structure)
3. [Features](#features)
4. [Installation](#installation)
5. [Usage](#usage)
6. [API Endpoints](#api-endpoints)
7. [Middleware](#middleware)
8. [Testing](#testing)
9. [Deployment](#deployment)
10. [Contributing](#contributing)
11. [License](#license)

## Overview

This is a Next.js 14 project developed using TypeScript, Apollo Client, and Chakra UI. The project demonstrates effective use of both Server and Client Components, custom middleware, and integration with public GraphQL APIs. It includes user authentication, page redirections using middleware, and a responsive design for both desktop and mobile devices.

## Project Structure

```plaintext
next-rick-morty/
├── app/
│   ├── layout.tsx               # Root layout component
│   ├── page.tsx                 # Home page
│   ├── info/
│   │   ├── page.tsx             # Info page with paginated data
├── components/
│   ├── EditProfileModal.tsx     # Modal component for editing user
├── lib/
│   └── apolloClient.ts          # Apollo Client setup
|── public/                      # Static assets
├── middleware.ts                # Next.js middleware for custom redirection
│───favicon.ico                  # Favicon for the project
│───globals.css                  # Global CSS styles
├── README.md                    # Project documentation
├── next.config.js               # Next.js configuration
├── tsconfig.json                # TypeScript configuration
└── package.json                 # Project dependencies and scripts
```

## Features

- **TypeScript Integration**: Built using TypeScript for type safety and better developer experience.
- **GraphQL Data Fetching**: Uses Apollo Client to query a public GraphQL API.
- **Middleware for Redirections**: Manages user authentication and page access using middleware.
- **Responsive Design**: Created with Chakra UI, ensuring a great experience on both desktop and mobile devices.
- **Server and Client Components**: Combines Server and Client Components for optimized rendering.
- **Custom State Management**: Stores user information (username and job title) in cookies.

## Installation

### Prerequisites

- [Node.js](https://nodejs.org/) (version 18 or higher)
- [yarn](https://yarnpkg.com/)

### Clone the Repository

```bash
git clone https://github.com/your-username/my-next-app.git
```

### Install Dependencies

Navigate to the project directory

```bash
yarn install
```

## Usage

### Running the Development Server

Start the development server on `http://localhost:3000`:

Or with Yarn:

```bash
yarn dev
```

### Building for Production

Build the project for production:

```bash
yarn build
```

### Starting the Production Server

Run the production server:

```bash
yarn start
```

## API Endpoints

### `/api/save-user` [POST]

Saves the user’s `username` and `jobTitle` in cookies and redirects to the `/info` page.

- **Request Body**:

  ```json
  {
    "username": "JohnDoe",
    "jobTitle": "Software Engineer"
  }
  ```

- **Response**:
  - `200 OK`: Successfully set cookies and redirected.
  - `400 Bad Request`: Missing `username` or `jobTitle`.
  - `500 Internal Server Error`: Error handling the request.

## Middleware

The project uses custom middleware to handle user authentication and access control.

### Middleware Logic

- **File**: `middleware.ts`
- **Purpose**: Check for `username` and `jobTitle` cookies.
- **Redirect**: If missing, redirect to the home page (`/`).

### Configured Routes

The middleware only applies to the following routes:

```typescript
export const config = {
  matcher: ["/info/:path*"],
};
```

## Testing

This project uses `@testing-library/react` for unit testing components.

### Running Tests

To run the tests, use:

```bash
yarn test
```

### Integrated into CI pipeline

The process of testing has been integrated into pipeline which would run when every push into master.

### Sample Test File Structure

```plaintext
next-rick-morty/
├── components/
│   └── __tests__/
│       └── EditProfileModal.test.tsx      # Test file for EditProfileModal component
```

## Deployment

### Vercel Deployment

This project has been deployed to [https://next-rick-morty-red.vercel.app/](https://next-rick-morty-red.vercel.app/)

If you want to deploy to your own vercel, pleaase follow these steps to deploy:

1. Log in to your [Vercel account](https://vercel.com/).
2. Import the project from your GitHub repository.
3. Set the environment variables in the Vercel dashboard.
4. Deploy and access your project via the generated URL.

## Contributing

1. Fork the repository.
2. Create a feature branch (`git checkout -b feature/my-feature`).
3. Commit your changes (`git commit -m 'Add new feature'`).
4. Push to the branch (`git push origin feature/my-feature`).
5. Create a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
