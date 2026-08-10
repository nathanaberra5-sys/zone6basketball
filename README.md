# Zone6 Basketball

Marketing site for Zone6 Basketball — school-based basketball development across
Western Sydney, founded by Gum Majak (NBL1 East). Live at
[zone6basketball.com.au](https://zone6basketball.com.au).

- Vite + React, static build — no backend.
- Design tokens in `src/styles/tokens/` are the source of truth (Zone Green
  `#39FF14` on Deep Black `#0A0A0A`; green for accents and CTAs only).
- Enquiries are relayed by Web3Forms to coach@zone6basketball.com.au
  (`src/config.js`). Web3Forms does not store submissions.
- Deploys automatically to GitHub Pages on push to `main`
  (`.github/workflows/deploy.yml`).

## Develop

```bash
npm install
npm run dev
```

## Pending

- Higgsfield imagery: hero video upgrade, `images/hf/nebula.jpg` (Founder
  backdrop), `images/hf/ball-planet.jpg` (Experience manifesto tile).
- Real coaching photography to replace the blurred placeholders.
