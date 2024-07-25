# Update Tracker

Update Tracker is a work-in-progress project aimed at helping users track the release of new versions for GitHub repositories. Developed as a learning project for Next.js and TypeScript, it allows users to add repositories, track their versions, and update to the latest releases.

## Table of Contents

1. [Introduction](#introduction)
2. [Features](#features)
3. [Demonstration](#demonstration)
4. [Getting Started](#getting-started)
5. [Architecture](#architecture)
6. [Technologies Used](#technologies-used)
7. [Project Status](#project-status)
8. [License](#license)
9. [Contact Information](#contact-information)

## Introduction

Update Tracker is designed to help users keep track of updates for their favorite GitHub repositories. Users can add repositories with a name, GitHub URL, logo URL, and current version. The application stores this information in a MySQL database and allows users to update to the latest version or modify tracked repositories.

## Features

- Form to add new repositories for tracking
- Display repository information
- Update to the latest version
- Modify tracked repository details

## Demonstration

![Screenshot](https://github.com/yourusername/update-tracker/raw/main/public/images/screenshot.png)
![GIF](https://github.com/yourusername/update-tracker/raw/main/public/images/demo.gif)
[Video Demo](https://github.com/yourusername/update-tracker/raw/main/public/videos/demo.mp4)

## Getting Started

### Prerequisites

- Web browser (e.g., Chrome, Firefox)
- Node.js and npm
- MySQL

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/Alin1233/update-tracker.git
    ```
2. Navigate to the project directory:
    ```bash
    cd update-tracker
    ```
3. Install dependencies using npm:
    ```bash
    npm install
    ```
4. Set up the database:
    - Create a MySQL database named `dev.db`.
    - Configure your `.env` file with the following:
      ```
      GITHUB_TOKEN="your_github_token"
      ```
5. Run database migrations:
    ```bash
    npx prisma migrate dev
    ```
6. Start the development server:
    ```bash
    npm run dev
    ```

### Usage

- Open your web browser and navigate to `http://localhost:3000` to access the Update Tracker application.
- Use the form to add a repository by providing a name, GitHub URL, logo URL, and the current version.
- View the list of tracked repositories and update or modify their details as needed.

## Architecture

Update Tracker is structured with a front-end and a back-end to manage different aspects of the application.

### Frontend

- **Framework**: Next.js
- **Languages**: TypeScript
- **UI Library**: ShadCN UI

### Backend

- **Database**: MySQL
- **ORM**: Prisma

### Diagrams

![Flowchart](https://github.com/yourusername/update-tracker/raw/main/public/images/flowchart.png)

## Technologies Used

- **Frontend Languages**: TypeScript, HTML, CSS
- **Framework**: Next.js
- **UI Library**: ShadCN UI

- **Backend Languages**: TypeScript
- **ORM**: Prisma
- **Database**: MySQL

## Project Status

Update Tracker is a work in progress. The current version includes basic functionality for adding and managing tracked repositories. Future improvements will include enhanced user interface, real-time notifications for new releases, and more advanced repository management features.

## License

This project is licensed under the MIT License.

## Contact Information

For any inquiries, please contact [herciualin10@gmail.com](mailto:herciualin10@gmail.com) or connect with me on [LinkedIn](https://linkedin.com/in/alin-herciu-22a550284/).
