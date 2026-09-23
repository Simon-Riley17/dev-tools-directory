# Dev Directory | Curated Stack

![Dev Directory Preview](https://simon-riley17.github.io/dev-tools-directory/icon.png)

**Dev Directory** is a premium, highly-curated directory of nearly 600 modern developer tools, AI platforms, frameworks, and APIs. 

Built with an ultra-clean glassmorphism UI, this directory allows developers to seamlessly search, filter, and discover the exact tools they need to build their next major project.

🔗 **[Live Demo / Website](https://simon-riley17.github.io/dev-tools-directory/)**

## ✨ Features
- **Massive Database:** Nearly 600 curated tools across dozens of categories (AI Agents, Codebase Understanding, Datasets, UI/UX, etc.)
- **Lightning Fast Search:** Real-time client-side filtering and deduplication.
- **Premium UI/UX:** Vercel/Linear-inspired dark mode aesthetic using advanced Tailwind CSS glassmorphism, glowing orbs, and 3D flip-cards.
- **SEO Optimized:** Fully static Next.js export with dynamic Open Graph metadata, `sitemap.xml`, and an `llms.txt` file for AI web crawlers.

## 🛠️ Tech Stack
- **Framework:** [Next.js](https://nextjs.org/) (App Router, Static Export)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Deployment:** GitHub Actions + GitHub Pages
- **Database:** Local JSON (`src/data.json`)

## 🚀 Running Locally

If you want to clone this repository and run it on your own machine:

```bash
# Clone the repository
git clone https://github.com/Simon-Riley17/dev-tools-directory.git

# Navigate into the project
cd dev-tools-directory

# Install dependencies
npm install

# Start the development server
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📝 Data Source
All tools and platforms are managed via a lightweight, scalable JSON database located at `src/data.json`.
