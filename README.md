# BARNE — Waitlist Landing Page

BARNE is an upcoming application designed to help users organize, surface, and interact with their personal digital content more intelligently.

This repository contains the public landing page and waitlist system for BARNE. Users can submit their email address to join the waitlist and receive an automatic welcome email.

## Current Features

- Responsive landing page
- Modal-based waitlist signup
- Google Sheets–backed email storage
- Automatic welcome email on signup
- Duplicate email protection
- Basic rate limiting to prevent abuse
- Environment-specific configuration (no secrets committed)

## Tech Stack

- Frontend: HTML, CSS, Vanilla JavaScript
- Backend: Google Apps Script (Web App)
- Database: Google Sheets
- Email: Gmail via Google Apps Script

## Project Structure

.
├── index.html
├── styles.css
├── script.js
├── config.example.js
├── public/
│   └── images/
├── .gitignore
├── README.md
└── LICENSE

## Configuration

This project uses a local configuration file that is not committed to the repository.

1. Copy the example file:
cp config.example.js config.js

2. Edit `config.js` and add your Google Apps Script Web App URL:

window.__BARNE_CONFIG__ = {
  GOOGLE_SCRIPT_URL: "YOUR_GOOGLE_APPS_SCRIPT_URL_HERE"
};

`config.js` is ignored by Git and should never be committed.

## Local Development

Because this is a static site, you can run it locally with any static server.

Example:
npx serve .

Or use VS Code Live Server.

## Waitlist Flow

1. User submits email on the landing page
2. Email is sent to a Google Apps Script Web App
3. Email is stored in Google Sheets
4. A welcome email is sent automatically
5. Duplicate signups are prevented

## Security Notes

- Duplicate email submissions are blocked server-side
- Rate limiting is enforced via Apps Script caching
- Configuration and endpoints are excluded from version control

## Future Plans

- Official Website for the AI Assistant BARNE

## License

All rights reserved.
This repository and its contents may not be copied, modified, or redistributed without explicit permission.
