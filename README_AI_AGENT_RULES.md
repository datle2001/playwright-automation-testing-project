# AI-Agent Rules — Playwright Automation Project

Purpose
- This file must be read by any AI agent or automated assistant before making code changes.

Core Rules for AI agents
1. Read this file and the repo structure first. Do not proceed without acknowledging you read it.
2. Use existing fixtures, POMs, and test types. Prefer reuse over creating new equivalents.
3. For file edits always use the repository's `apply_patch` / `create_file` APIs (or `git` in CLI) and keep changes minimal and focused.
4. Use the `manage_todo_list` fixture to add and update a short plan for multi-step tasks.
5. When implementing tests: run only deterministic, local actions; do not attempt network operations outside the test runner unless explicitly allowed by the user.
6. Do not add secrets, credentials, or personal data to the repo. If credentials are required, read them from environment variables and ask the user to provide them securely.
7. Run linters/formatters and test commands locally where possible; report results and failures back to the user.
8. If a change is large or risky, propose it first and ask for confirmation before applying.
9. Add or update tests alongside code changes; keep tests passing. If you cannot run tests, explain why and provide run commands.
10. Keep messages concise and provide a one-line preamble before making tool calls.

Checklist before making edits
- Create a short TODO via `manage_todo_list` when task has multiple steps.
- Search for existing helpers or POMs to reuse.
- Run or suggest `npx playwright test` for verification.
- Use descriptive commit messages or tell the user what you changed.

Coding standards

How to run tests locally (recommended)
```bash
cd playwright-automation-testing-project
npx playwright test
```

Contact
- If unsure, ask the user before applying non-trivial changes.

Thank you for following these rules — this keeps the project stable and easier to collaborate with automated assistants.
