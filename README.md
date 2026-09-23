# 🌌 Dev Directory | Curated Stack

<div align="center">
  <img src="https://simon-riley17.github.io/dev-tools-directory/icon.png" width="120" alt="Dev Directory Logo" style="border-radius: 20px; box-shadow: 0 4px 14px 0 rgba(0,0,0,0.39);" />
  <br/><br/>
  
  **A premium, highly-curated directory of nearly 600 modern developer tools, AI platforms, frameworks, and codebase understanding APIs.**
  <br/>

  [![Website](https://img.shields.io/badge/Live_Demo-simon--riley17.github.io-blue?style=for-the-badge&logo=vercel)](https://simon-riley17.github.io/dev-tools-directory/)
  [![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
</div>

---

## 📖 About The Project

The **Dev Directory** was built to solve a simple problem: developers have too many bookmarks. From AI Agents to Codebase Extractors and UI Inspiration, the modern tech landscape moves incredibly fast. 

This project acts as a **master brain**—a meticulously categorized, ultra-fast index of nearly 600 essential developer resources. Originally extracted from hundreds of private Joplin markdown notes, this repository now serves as a beautiful, open, and searchable directory for the entire developer community.

## ✨ Premium Features

- **Massive Database:** ~600 hand-curated tools split across dozens of granular categories (AI Agents, Control Devices, Datasets, UI/UX, etc.)
- **Lightning Fast Search:** 100% client-side filtering. Find exactly what you need with zero network latency.
- **Deduplication Engine:** Automatically merges GitHub and Official Website links for the same tool into a single unified card.
- **Premium UI/UX:** Built with a Vercel/Linear-inspired dark mode aesthetic using advanced Tailwind CSS glassmorphism, glowing backdrop orbs, and seamless transitions.
- **Interactive 3D Flip-Cards:** Cards feature a custom CSS 3D perspective flip animation to reveal metadata and action buttons upon interaction.
- **Fully Responsive:** Completely overhauled for mobile devices with a horizontal-scrolling category dock and fluid layout breakpoints.
- **SEO & AI Optimized:** Fully static Next.js export with dynamic Open Graph metadata, `sitemap.xml`, and an `llms.txt` file specifically designed for ChatGPT/Claude web crawlers.

---

## 🛠️ Tech Stack & Architecture

This project is built using modern web development standards and prioritizes speed, SEO, and developer experience.

* **Framework:** [Next.js](https://nextjs.org/) (App Router) utilizing Static HTML Export (`output: 'export'`)
* **Styling:** [Tailwind CSS](https://tailwindcss.com/) for utility-first styling and complex UI effects (blur, gradients).
* **Animations:** Custom React components (like `MorphText.tsx`) and raw CSS utility classes for 3D transforms.
* **Database:** A lightweight, highly scalable local JSON engine (`src/data.json`) that eliminates database hosting costs and maximizes load speed.
* **Deployment:** Fully automated CI/CD pipeline using **GitHub Actions** deploying to **GitHub Pages**.

---

## 🚀 Running Locally

If you want to clone this repository, run it on your own machine, or fork it to build your own directory:

### Prerequisites
Make sure you have Node.js installed on your machine.

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Simon-Riley17/dev-tools-directory.git
   cd dev-tools-directory
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **View the application**
   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📝 How to Add New Tools (Contributing)

Adding a new tool to the directory is incredibly simple. All data is driven by a single JSON file. You don't need to write any React code to update the site.

1. Open `src/data.json`
2. Find the category array you want to add to (e.g., `"category": "AI Platforms"`)
3. Append a new object to the `tools` array:
   ```json
   {
     "id": "unique-id-here",
     "title": "Tool Name",
     "description": "A brief description of what the tool does.",
     "websiteUrl": "https://example.com",
     "githubUrl": "https://github.com/example/repo",
     "icon": "/icons/example.png"
   }
   ```
4. Commit and push to `main`. The GitHub Action will automatically rebuild and deploy the site!

---

## 📜 License & Acknowledgments

This curated stack represents countless hours of research, extraction, and UI design. Feel free to use the codebase as inspiration for your own projects!
