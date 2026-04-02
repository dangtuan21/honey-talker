# Honey Talker Web Frontend (ht-web)

A React TypeScript web application for the Honey Talker AI chat system with Tailwind CSS styling.

## Features

- **🤖 AI Chat Interface**: Real-time conversation with Honey Talker AI
- **🏢 Organization Support**: Switch between different organizations
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

1. **Set Organization ID**: Enter your organization ID in the input field
2. **Send Messages**: Type your question and press Enter or click Send
3. **View Responses**: AI responses appear in the chat interface
4. **Real-time Updates**: Messages appear instantly with timestamps

## API Integration

The frontend communicates with the following backend endpoints:

- `POST /chat` - Send messages and receive AI responses

## Project Structure

```
src/
├── components/
│   └── ChatInterface.tsx    # Main chat component
├── App.tsx                  # Root component
├── index.css               # Tailwind CSS directives
└── index.tsx               # App entry point
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
