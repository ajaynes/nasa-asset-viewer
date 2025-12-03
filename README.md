# NASA Space Explorer

NASA Space Explorer is a web application for searching and browsing NASA’s public image and video library using the NASA Images API. Users can search by keyword, filter by media type, view media details, and download original assets.

## Features

- Keyword search of NASA media
- Filter results by images or videos
- Detail view with title, description, date, location, photographer, and keywords
- Download links for original media
- Mobile-friendly responsive layout
- Modal fullscreen viewing for images and videos
- Graceful fallback for missing or incomplete data
- Accessibility checks and manual testing
- Component and utility test coverage

---

## Tech Stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- React Testing Library
- Jest
- jest-axe
- NASA Open Images API
- axe DevTools
- WAVE
- Chrome Lighthouse

---

## Local Development

Install dependencies and start the dev server:

```bash
npm install
npm run dev
```

The app will be available at:

http://localhost:3000

---

## Testing

Run all tests:

```bash
npm run test
```

Testing includes:

- Component behavior testing
- Controlled input testing
- API mocking
- Filter logic validation
- Detail rendering tests
- Error and fallback handling
- Accessibility validation using jest-axe

---

## Accessibility

Automated accessibility testing is performed using `jest-axe`.

Manual testing was performed using the following free tools:

- axe DevTools browser extension
- WAVE accessibility extension
- Chrome Lighthouse

Passing automated checks does not guarantee full accessibility compliance. Manual audits were conducted to validate real-world usage and browser behavior.

---

## Media Attribution

All imagery and videos are provided by NASA’s public content library.

NASA retains ownership of all media assets.

NASA API documentation:

https://images.nasa.gov/docs/images.nasa.gov_api_docs.pdf - _NOTE: this returns a 404_

---

## Author

Built by Ashley Jaynes

Website: https://ashleyjaynes.com
GitHub: https://github.com/ajaynes
