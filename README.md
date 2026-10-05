# andrew-professional-site

Andrew Qin's professional site: about, projects, blog, uses, and bookshelf.

Built from the `@andyhqin/*` packages published by
[`remus-external-pkg`](https://github.com/andyhqin/remus-external-pkg), set up as
its `docs/CLIENT-SITES.md` describes. The first real consumer of the library.

## How it works

- **Every page is static HTML**, prerendered at build time and served from the
  host's CDN. The only server code is `/api/contact`, one serverless function.
- **Content lives in the repo:** Markdown in `content/` for the about and uses
  pages and the blog, and typed data for projects and books. Edit, commit, and
  the host rebuilds. See [CONTENT.md](CONTENT.md).
- **The contact form** emails you through Resend. There is no database, so the
  email is the record: if sending fails, the visitor is told so and can try
  again, rather than told it was sent.
- **The theme** is `app/theme.css`, which redefines the library's design tokens.
  A test checks every colour pair the blocks use for WCAG AA contrast.

## Developing

Installing needs a token that can read the private `@andyhqin` packages, read
by `.npmrc`. With the GitHub CLI, signed in with the `read:packages` scope:

```sh
export PACKAGES_TOKEN=$(gh auth token)
npm install
cp .env.example .env.local   # optional in development
npm run dev                  # http://localhost:3000
```

Without `RESEND_API_KEY`, the contact form shows the email in the terminal
instead of sending it.

| Command | What it does |
|---|---|
| `npm run dev` | The site at http://localhost:3000, drafts included |
| `npm test` | Content, accessibility, contrast, and the contact form |
| `npm run typecheck`, `npm run lint` | What CI runs before the build |
| `npm run build` | A production build; needs `SITE_URL` |

## Deploying to Netlify

`netlify.toml` holds the build settings. In Netlify:

1. Import this repository. Netlify reads `netlify.toml` and detects Next.js.
2. Choose the site's name: it becomes the address, `<name>.netlify.app`.
3. Set the environment variables:

   | Variable | Value |
   |---|---|
   | `PACKAGES_TOKEN` | A classic GitHub token with only `read:packages` |
   | `SITE_URL` | `https://<name>.netlify.app`, or your domain once you have one |
   | `CONTACT_NOTIFY_TO` | The address that receives contact form messages |
   | `RESEND_API_KEY` | From Resend |
   | `EMAIL_FROM_ADDRESS` | Leave unset until you verify a domain in Resend |

4. Deploy, then send yourself a message through the contact form.

**Email without a domain.** Resend's shared sender, `onboarding@resend.dev`, can
only email the address the Resend account was created with. Sign up to Resend
with the `CONTACT_NOTIFY_TO` address. Once you own a domain, verify it in
Resend and set `EMAIL_FROM_ADDRESS` to an address on it.

## CI

`.github/workflows/ci.yml` runs typecheck, lint, tests, and a build on every
push and pull request. It installs the private packages with the
**`PACKAGES_TOKEN` repository secret**: a classic GitHub token with only
`read:packages`, the same kind Netlify uses. Set it with
`gh secret set PACKAGES_TOKEN`, or in *Settings → Secrets and variables →
Actions*.
