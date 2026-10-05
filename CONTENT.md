# Content checklist

Everything personal on the site is a placeholder until you replace it. Search
the repo for `Placeholder` (case-insensitive) to find anything missed.

## Replace

| Where | What |
|---|---|
| `app/page.tsx` | The home page: the hero's supporting text, and the "What I work on" headline and three items |
| `content/about.md` | Your about page. The contact form is added below it automatically |
| `content/uses.md` | Your tools and setup. The "This site" section is accurate already |
| `content/projects.ts` | Your projects: name, description, tags, and optional links to the live project and its source |
| `content/bookshelf.ts` | Your books: title, author, status (`reading`, `read`, or `want-to-read`), and an optional note |
| `content/blog/hello-world.md` | A draft, shown only in development. Rewrite it, or delete it once you have a real post |
| `lib/site.ts` | The site description used in search results, and your GitHub link |

## Writing a blog post

Add a Markdown file to `content/blog/`. Its file name is its address:
`content/blog/my-first-post.md` is `/blog/my-first-post`.

```markdown
---
title: My first post
description: One sentence, shown in the post list and in search results.
date: 2026-10-04
draft: true
---

The post, in Markdown.
```

- `title` up to 60 characters, `description` up to 160.
- `draft: true` shows the post in development only. Remove it, or set it to
  `false`, to publish.
- A missing or malformed field fails the build with a message naming the file.

## Checking your changes

```sh
npm run dev      # http://localhost:3000, drafts included
npm test         # content, accessibility, contrast, and the contact form
```

`npm test` includes a colour-contrast check of `app/theme.css`: if you change
the colours, it tells you which text would become hard to read.
