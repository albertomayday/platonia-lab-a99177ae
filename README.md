# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

This project includes a GitHub Actions workflow that builds the site with Vite and deploys the `dist` output to GitHub Pages automatically when you push to `main`.

How the automated deploy works
- On push to `main` the workflow runs `npm ci` and `npm run build`.
- The built output in `dist/` is uploaded and deployed to GitHub Pages via the official Pages actions.
- The workflow creates a `404.html` copy from `index.html` so client-side routing works for the SPA.

What you need
- No extra secrets are required for the default setup. The workflow uses the repository `GITHUB_TOKEN` to publish to Pages.
- If you want to deploy from a different branch, update `.github/workflows/deploy.yml` accordingly.

Useful local commands
```bash
# install deps
npm ci

# start dev server
npm run dev

# build locally (same command used in CI)
npm run build

# build and preview the production build
npm run build
npm run preview
```

Published site
- After a successful deploy the site will be available at the GitHub Pages URL configured in the repository settings (typically `https://<owner>.github.io/<repo>`). You can verify the Pages URL in the repository `Settings → Pages` panel.

Security notes
- For this workflow the default `GITHUB_TOKEN` is sufficient. If you prefer to use a Personal Access Token, add it as a repository secret and modify the workflow accordingly.

Troubleshooting
- If the Pages deployment fails, check the Actions tab for the workflow run logs. The build step prints Vite output and potential errors.


## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)
