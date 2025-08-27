# Node.js Stringinator Service

This is a Node.js implementation of the Stringinator service.

## Prerequisites

- Node.js (v14 or higher)
- npm (comes with Node.js)

## API Endpoints

- `GET /` - Welcome page with API documentation
- `POST /stringinate` - Get information about a string. Send JSON in the format: `{"input":"your-string-goes-here"}`
- `GET /stats` - Get statistics about all strings the server has processed
