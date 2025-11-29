# S-Mart

S-Mart is a modern e-commerce web application built with React and Spring Boot. It provides a complete shopping experience with user authentication, product management, and a responsive user interface.

## Features

### 🔐 Authentication
- User registration with comprehensive signup form
- Secure login with password visibility toggle
- Session management and logout functionality

### 🎨 User Interface
- Modern Material-UI design system
- Responsive layout that works on all devices
- Full-screen application with header and footer
- Clean, professional dashboard interface

### 🛒 E-commerce Ready
- Scalable architecture for product catalog
- Shopping cart functionality (ready for implementation)
- Order management system (backend ready)
- Admin panel capabilities

## Tech Stack

### Frontend
- **React 19+** with modern hooks and functional components
- **Material-UI (MUI)** for consistent, professional UI components
- **React Router 7+** for client-side routing
- **Axios** for API communication
- **Vite** for fast development and building

### Backend
- **Java 17+** with Spring Boot framework
- **Spring Web** for RESTful API endpoints
- **Spring Data** for database operations
- **Gradle** for dependency management and builds

### Development Tools
- **ESLint** for code quality
- **Vite** for fast hot-reload development
- **Gradle Wrapper** for consistent builds

## Project Structure

```
S-Mart/
├── smart-ui/                 # React frontend application
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   │   └── Layout/       # App layout with header/footer
│   │   ├── pages/           # Page components
│   │   │   ├── Login/       # User authentication
│   │   │   ├── Signup/      # User registration
│   │   │   └── Dashboard/   # Main landing page
│   │   ├── App.jsx          # Main application component
│   │   └── main.jsx         # Application entry point
│   ├── package.json         # Frontend dependencies
│   └── vite.config.js       # Vite configuration
├── src/main/java/           # Spring Boot backend
│   └── com/shweta/smart/
│       ├── controller/      # REST API endpoints
│       ├── models/          # Data models
│       ├── repository/      # Data access layer
│       ├── service/         # Business logic
│       └── config/          # Application configuration
├── build.gradle             # Backend dependencies
└── README.md                # This file
```

## Prerequisites

- **Java 17+** (for backend development)
- **Node.js 18+** and npm (for frontend development)
- **Git** for version control

## Quick Start

### 1. Clone the Repository
```bash
git clone <repository-url>
cd S-Mart
```

### 2. Backend Setup
```bash
# Build and run the Spring Boot application
./gradlew bootRun

# Or on Windows
gradlew.bat bootRun
```
The backend will start on `http://localhost:8080`

### 3. Frontend Setup
```bash
# Navigate to frontend directory
cd smart-ui

# Install dependencies
npm install

# Start development server
npm run dev
```
The frontend will start on `http://localhost:5173` (Vite default)

## Development

### Frontend Development
```bash
cd smart-ui
npm run dev          # Start development server
npm run build        # Build for production
npm run lint         # Check code quality
npm run preview      # Preview production build
```

### Backend Development
```bash
./gradlew bootRun    # Run in development mode
./gradlew build      # Build the application
./gradlew test       # Run tests
```

## Environment Variables

### Frontend (smart-ui/.env)
```env
VITE_API_URL=http://localhost:8080
```

### Backend (application.properties)
```properties
server.port=8080
# Add database configuration as needed
```

## API Endpoints

### Authentication
- `POST /login` - User login
- `POST /signup` - User registration

### Ready for Extension
The backend structure is prepared for:
- Product management endpoints
- Shopping cart operations
- Order processing
- User profile management

## Production Deployment

### Frontend
```bash
cd smart-ui
npm run build
# Serve the dist/ folder with your preferred web server
```

### Backend
```bash
./gradlew bootJar
java -jar build/libs/smart-*.jar
```

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes and commit: `git commit -m 'Add feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For questions or support, please open an issue in the repository.

---

**S-Mart** - Your modern e-commerce solution 🛍️
