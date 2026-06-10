# Stack — Landing Site

🌐 **Live at [whatsyourstack.app](https://www.whatsyourstack.app)**

Marketing site for **Stack**, the iOS peptide tracking & analytics app.

Stack helps users run complex peptide protocols — smart reconstitution,
stack scheduling, body analytics, and nutrition — engineered for the
protocol-obsessed.

## Tech

Static HTML / CSS / vanilla JS. No build step. Hosts anywhere.

## Pages

| Route | File |
|---|---|
| Home | `index.html` |
| Privacy Policy | `privacy.html` |
| Terms of Service | `terms.html` |
| Affiliate Program | `affiliate.html` |

## Local preview

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Structure

```
.
├── index.html          Landing page (hero, features, showcase, pricing, CTA)
├── privacy.html        Privacy Policy
├── terms.html          Terms of Service
├── affiliate.html      Affiliate program + application form
├── styles.css          Shared styles (dark, brand-gradient theme)
├── script.js           Nav, reveal-on-scroll, mobile menu, form handler
└── assets/             Logo, background, in-app screenshots
```

## Pricing reflected on site

- Weekly: **$9.99 / week**
- Yearly: **$49.99 / year** (saves ~$469 / yr vs weekly)

## Affiliate terms

15% recurring commission on every subscription paid through a creator's
custom referral link. 60-day cookie window. Paid monthly via PayPal or
Stripe with no minimums.

## Deploy

The site is fully static — drop into Netlify, Vercel, Cloudflare Pages,
GitHub Pages, S3 + CloudFront, or any other static host. No environment
variables, no build, no server.

## License

All rights reserved.
