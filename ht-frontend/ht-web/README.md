# Honey Talker Web Frontend (ht-web)

A React TypeScript web application for the Honey Talker AI chat system with Tailwind CSS styling.

## Features

- **🤖 AI Chat Interface**: Real-time conversation with Honey Talker AI
- **🔐 Authentication**: Role-based access control (Admin/User)
- **🏢 Organization Support**: Switch between different organizations
- **📚 Knowledge Management**: Admins can add text knowledge and upload files
- **💬 Modern UI**: Clean, responsive design with Tailwind CSS
- **⚡ Real-time Messaging**: Instant message sending and receiving
- **🔄 Loading States**: Visual feedback during API calls
- **📱 Responsive Design**: Works on desktop and mobile devices

## Tech Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS framework
- **Fetch API** - HTTP requests to backend

## Prerequisites

- Node.js 16+ 
- Honey Talker AI backend running on `http://localhost:8020`

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm start
```

Open [http://localhost:4020](http://localhost:4020) to view it in the browser.

### Production Build

```bash
npm run build
```

Builds the app for production to the `build` folder.

## Configuration

The app connects to the Honey Talker AI backend at `http://localhost:8020`. Make sure the backend is running before starting the frontend.

## Usage

1. **Login**: Use credentials to access the system
2. **Set Organization ID**: Enter your organization ID in the input field (use `test_org` for demo)
3. **Send Messages**: Type your question and press Enter or click Send
4. **View Responses**: AI responses appear in the chat interface
5. **Real-time Updates**: Messages appear instantly with timestamps

## Authentication

The system uses role-based access control with two roles:

### 🔐 Login Credentials
- **Admin**: `admin1` / `admin1`
- **User**: `user1` / `user1`

### 👥 Role Permissions

#### Admin Role
- ✅ Ask questions to AI chat
- ✅ Add text knowledge via interface
- ✅ Upload files (PDF, DOCX, TXT)
- ✅ Manage knowledge base
- ✅ Manage organizations
- ✅ View all chat features

#### User Role
- ✅ Ask questions to AI chat
- ✅ Switch organizations
- ✅ View chat history
- ❌ Cannot manage knowledge base

### 🛡️ Security Features
- Session-based authentication
- Role-based UI components
- Logout functionality
- Protected knowledge management endpoints

## Sample Questions

Try these questions to test the RAG functionality:

### 📚 University Services
- "What are the library hours?"
- "How much is tuition?"
- "Where is the health center located?"
- "What dining options are available?"

### 🏢 Campus Facilities
- "What are the recreation center hours?"
- "How do I access the swimming pool?"
- "What athletic facilities are available?"

### 👥 Student Activities
- "How do I join the engineering club?"
- "What cultural organizations are available?"
- "How can I start a new student organization?"

### 🔬 Academic Research
- "What are the IRB requirements?"
- "How do I report research misconduct?"
- "What are the authorship guidelines?"

### 💻 IT Support
- "How do I connect to campus Wi-Fi?"
- "What software is available for free?"
- "How much does printing cost?"
- "When is the IT Help Desk open?"

**The AI will retrieve relevant information from the knowledge base and provide accurate answers!**

## API Integration

The frontend communicates with the following backend endpoints:

- `POST /chat` - Send messages and receive AI responses

## Admin Features

### Knowledge Management
- **Grid/Table Layout** with sortable columns
- **Add Knowledge** via modal dialog with form validation
- **Edit Knowledge** with pre-filled forms
- **Delete Knowledge** with confirmation dialog
- **Organization-specific knowledge** management
- **Real-time updates** after CRUD operations
- **Responsive table design** with hover effects

### Organization Management
- **Grid/Table Layout** showing all organizations
- **Add Organization** with auto-generated ID
- **Edit Organization** with name and description
- **Delete Organization** with knowledge deletion warning
- **Knowledge count** display per organization
- **Color-coded status badges** for visual clarity

### Sidebar Navigation
- **Auto-hide functionality** (3-second inactivity timer)
- **Hover-to-expand** behavior
- **Active page highlighting** with visual indicators
- **Collapsible design** for more screen space
- **Mobile-responsive** with overlay
- **Quick access** to all admin features
- **User profile display** with avatar and role

### Page Navigation
- **React Router** for client-side routing
- **Dedicated URLs** for each admin feature:
  - `/knowledge-manager` - Knowledge management page
  - `/manage-organization` - Organization management page
- **Browser history** support
- **Consistent navigation** across all pages

## Project Structure

```
src/
├── components/
│   ├── ChatInterface.tsx       # Main chat component with auth
│   ├── LoginDialog.tsx         # Login modal component
│   └── types/
│       └── auth.ts              # Authentication types
├── pages/
│   ├── KnowledgePage.tsx         # Knowledge management page
│   ├── OrganizationPage.tsx     # Organization management page
│   └── index.ts                  # Export barrel
├── App.tsx                     # Root component with routing
├── index.css                  # Tailwind CSS directives
└── index.tsx                  # App entry point
```

## Development Notes

- Uses TypeScript for type safety
- Tailwind CSS for styling (configured in `tailwind.config.js`)
- Path mapping configured in `tsconfig.json` for clean imports
- PostCSS configured for Tailwind CSS processing

## Available Scripts

### `npm start`

Runs the app in development mode.

### `npm test`

Launches the test runner.

### `npm run build`

Builds the app for production.

### `npm run eject`

**Note: this is a one-way operation.** Ejects from Create React App if you need full control over build configuration.
