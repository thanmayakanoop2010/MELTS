# MELTS Website

A visual-first prototype for the student-led MELTS interdisciplinary learning initiative.

## Stage 1

The current implementation includes:

- Responsive homepage and navigation
- Pastel jelly-world visual system
- About MELTS mission and vision
- Five department previews
- Monthly interdisciplinary theme presentation
- MELTS World house preview with room selection
- Founding-team recruitment and Google Form link
- Partnership opportunity information
- Ask MELTS demo chat with grade-level switching and suggested prompts
- Accessible navigation and reduced-motion support

## Project Structure

```text
MELTS/
├── index.html   # Page structure and content
├── styles.css   # Design system, responsive layouts, and animations
├── app.js       # Navigation, reveal effects, and world interactions
└── README.md
```

## Technology Choice

Stage 1 uses dependency-free HTML, CSS, and JavaScript so the prototype can run without a package manager or build step. As interaction and data needs grow, the same structure can move to React or another component framework without changing the visual direction.

## Run Locally

```powershell
py -3 -m http.server 4173
```

Then open `http://localhost:4173`.

## Future Services

Character customization, learning progress, and unlocked items can initially use browser `localStorage`. Accounts, cross-device progress, moderation records, or school/admin features require a server-side database such as PostgreSQL plus authenticated APIs.

The Ask MELTS chatbot should eventually call a server endpoint rather than embed an API key in browser code. That endpoint should:

- Validate input size and output length
- Apply age-appropriate system instructions and content filters
- Avoid collecting names, addresses, school records, or unnecessary student data
- Require parental consent and obtain school or guardian approval where applicable
- Keep provider secrets, moderation logs, and personal data under organizational control
- Preserve a clear distinction between educational guidance and professional medical, legal, or mental-health advice

MELTS is an emerging initiative. The site does not claim launched workshops, confirmed partnerships, secured funding, completed participation, or approved chapters.
