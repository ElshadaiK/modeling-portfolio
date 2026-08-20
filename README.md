# Elshadai Tegegn — Modeling Portfolio

A cinematic, editorial portfolio site built with plain HTML, CSS and JavaScript + GSAP.

## Folder structure

```text
elshadai-modeling-portfolio/
├── index.html
├── styles.css
├── script.js
├── README.md
└── assets/
    ├── Elshadai-Tegegn-Modeling-Portfolio.pdf
    ├── images/
    │   ├── hero.jpg
    │   ├── beauty.jpg
    │   ├── contact.jpg
    │   ├── pop-smoke-gala-01.jpg
    │   ├── pop-smoke-gala-02.jpg
    │   ├── amazon-sustainability-01.jpg
    │   ├── amazon-sustainability-02.jpg
    │   ├── ecmaa-01.jpg
    │   ├── ecmaa-02.jpg
    │   ├── lifestyle-01.jpg
    │   ├── digital-front.jpg
    │   ├── digital-profile.jpg
    │   └── digital-full.jpg
    ├── video/
    └── icons/
```

## Setup

1. Put your photos into `assets/images/` using the filenames above.
2. Put the portfolio PDF in `assets/` as `Elshadai-Tegegn-Modeling-Portfolio.pdf`.
3. Open `index.html`, or run a tiny local server:
   - VS Code Live Server, or
   - `python3 -m http.server 8080`
4. Visit `http://localhost:8080`.

## Best photo choices

- `hero.jpg`: strongest dramatic editorial portrait, ideally vertical and high resolution.
- `pop-smoke-gala-01/02.jpg`: runway + full-look images.
- `amazon-sustainability-01/02.jpg`: one posed editorial, one walking/runway.
- `ecmaa-01/02.jpg`: contrasting looks from the Ethiopian New Year fashion show.
- `beauty.jpg`: clean close-up.
- `digital-*`: recent natural-light digitals.
- `contact.jpg`: a high-impact full-width portrait with negative space.

## UX concept

- Cinematic shutter intro
- Oversized editorial typography
- Animated image curtain reveals
- Horizontal sticky runway archive
- Scroll-driven image motion
- Custom cursor + magnetic CTA motion
- Responsive full-screen mobile navigation
- Reduced-motion accessibility support
- Minimal acid-green accent for memorable branding

## Deploy

This is static and works well on:
- AWS Amplify Hosting
- S3 + CloudFront
- Netlify
- Vercel
- GitHub Pages

For AWS: Amplify Hosting is the easiest path; connect a GitHub repo and deploy the root directory.
