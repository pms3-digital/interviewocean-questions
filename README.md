# Interview Questions Repository

This is a personal, open-source interview questions repository and showcase website. It's built with Next.js and Tailwind CSS, and it renders markdown files for the questions.

## Features

- **Organized Markdown Files**: Questions are stored in markdown files with frontmatter for metadata like title, tags, difficulty, and category.
- **Static Site Generation**: The website is statically generated with Next.js for great performance and SEO.
- **Tag-based Filtering**: Filter questions by category and difficulty.
- **Search**: Client-side search for questions by title or tag.
- **Responsive Design**: The website is designed to be responsive and work on both mobile and desktop.
- **SEO & Sharing**: Each question page has meta tags for SEO and Open Graph support for link sharing.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Adding Questions

To add a new question, create a new markdown file in the `questions` directory. The file should have the following frontmatter:

```markdown
---
title: "Your Question Title"
tags: ["tag1", "tag2"]
difficulty: "easy" | "medium" | "hard"
category: "dsa" | "frontend" | "backend"
---

Your question content in markdown...
```

The `slug` for the question page will be generated from the file name. For example, a file named `my-new-question.md` will have a slug of `my-new-question`.
If you create a file in a subdirectory like `dsa/two-sum.md`, the slug will be `dsa-two-sum`. 