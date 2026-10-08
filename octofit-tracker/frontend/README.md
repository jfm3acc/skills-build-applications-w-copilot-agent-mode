# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:


## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and Oxlint's TypeScript related rules in your project.

# OctoFit Tracker presentation tier

The React application reads users, teams, activities, leaderboards, and workouts from the Express API on port `8000`.

## API URL

In Codespaces, `VITE_CODESPACE_NAME` must be defined for the Vite client. Create `octofit-tracker/frontend/.env.local` and set it to the value of the Codespaces `CODESPACE_NAME` environment variable:

```dotenv
VITE_CODESPACE_NAME=your-codespace-name
```

Use the actual name as the value, without `${...}`. Restart Vite after changing the file. The app then requests `https://<CODESPACE_NAME>-8000.app.github.dev`.

For local development, leave `VITE_CODESPACE_NAME` unset; the app falls back to `http://localhost:8000`.

## Run

```bash
npm ci --prefix octofit-tracker/frontend
npm run dev --prefix octofit-tracker/frontend
```
