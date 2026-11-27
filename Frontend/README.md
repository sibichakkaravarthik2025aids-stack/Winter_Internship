# PulseWorks AI

A responsive team workspace dashboard built with React, Vite, and Zod. The task board, search, personal-task filter, completion controls, system refresh timestamp, and task-creation form run locally in the browser.

## Run locally

```sh
npm install
Copy-Item .env.example .env
npm run dev
```

Run the production build and lint checks with `npm run build` and `npm run lint`.

## Environment

`VITE_APP_NAME` sets the workspace name for future integrations. `VITE_API_BASE_URL` is the placeholder endpoint for a future backend; task data is currently held in client-side state and is not persisted.

Only public configuration belongs in `VITE_*` variables. Never put secrets in frontend environment variables.
