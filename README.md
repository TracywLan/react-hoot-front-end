# Hoot: Blogging for Night Owls
![Landing Page Screenshot](public/images/landing-screenshoot.png)

Hoot is a front-end blogging application built with React and JWT Authentication. Paired with an Express API backend and MongoDB database, it forms a complete MERN stack application.

JWT Authentication enables users to sign up, sign in, and sign out. Authenticated users can create, read, update, and delete "hoots" (blog posts) and manage comments on individual hoots.

## Key Features

- Client-side routing with React Router
- Permission-based content rendering
- Reusable React components
- Full CRUD operations for hoots
- Comment system for hoots

## User Stories

- As a guest, I can create an account.
- As a new user, I can log in to my account.
- As a user, I can create a hoot post.
- As a user, I can see a list of all hoots on the List page.
- As a user, clicking a hoot on the List page takes me to its Details page with comments.
- As a user, I can add comments on a hoot's Details page.
- As the hoot author, I see an Edit link on the Details page to modify the hoot and return to Details after saving.
- As the hoot author, I see a Delete button on the Details page that removes the hoot and redirects to the List page.

## Getting Started

### Prerequisites

- Node.js (v16+)
- npm or yarn
- Express API backend (separate repo)
- MongoDB database

### Installation

1. Clone the repository
```bash
git clone <your-repo-url>
cd hoot-frontend
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
Create a `.env` file in the root:
```
REACT_APP_API_URL=http://localhost:5000/api
```

4. Start the development server
```bash
npm start
```

The app will run on `http://localhost:3000`.

## Project Structure

```
src/
├── components/     # Reusable UI components
├── pages/          # Page components (List, Details, Edit)
├── services/       # API calls and auth logic
├── utils/          # Helpers and constants
└── App.js          # Main app with routing
```

## Available Scripts

| Script | Description |
|--------|-------------|
| `npm start` | Start development server |
| `npm run build` | Build for production |
| `npm test` | Run tests |
| `npm run eject` | Eject Create React App config (irreversible) |

## Tech Stack

- **Frontend**: React 18, React Router
- **Auth**: JWT tokens
- **Styling**: CSS Modules / Styled Components
- **HTTP**: Axios
- **Build**: Create React App

## Backend Integration

This frontend connects to an Express API at `REACT_APP_API_URL`. Required endpoints:

```
POST /api/auth/signup
POST /api/auth/login  
GET  /api/hoots
POST /api/hoots
GET  /api/hoots/:id
PUT  /api/hoots/:id
DELETE /api/hoots/:id
POST /api/hoots/:id/comments
GET  /api/hoots/:id/comments
```

## Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).