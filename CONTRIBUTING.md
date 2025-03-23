# brainbox-frontend's Development Guidelines

## Table of Contents

- [brainbox-frontend's Development Guidelines](#brainbox-frontends-development-guidelines)
  - [Table of Contents](#table-of-contents)
  - [Requirements](#requirements)
    - [Tools](#tools)
    - [Extensions](#extensions)
    - [Commit Conventions](#commit-conventions)
    - [Environment Variables](#environment-variables)
  - [Development](#development)

---

## Requirements

### Tools

- Environment: `Node.js v20.17.0`
  - You can download it from [here](https://nodejs.org/en/download/).
- Package manager: `pnpm`
  - To install it, run `npm i -g pnpm` after installing Node.js.
- Code editor: `Visual Studio Code`
  - You can download it from [here](https://code.visualstudio.com/).

### Extensions

- [EditorConfig for VS Code](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig)
- [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)

### Commit Conventions

Format: `<type>: <subject>`

Conventions:

- `add`: Add a new code what does not exist.
- `update`: Update an existing code.
- `fix`: Fix a bug, issue, or error, tool scan warning.
- `docs`: Update or add documentation.
- `feat`: Add a new feature. (Usually used in the PR title)
- `refactor`: Refactor an existing code.
- `delete`: Delete an existing code.

Examples:

- `add: add a new feature`
- `update: update a function`
- `fix: fix a bug`
- `docs: update contributing guidelines`
- `feat: add a new feature`
- `refactor: refactor a function`
- `delete: delete a function`

> **Note**: Please follow the conventions to keep the commit history clean and easy to read.

### Environment Variables

Create a `.env` file there and add the following environment variables:
| # | Name | Description | Example |
| --- | ------------------------------ | --------------------------------- | ----------------------------- |
| 1 | NODE_ENV | Environment | `development` or `production` |
| 2 | NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY | Clerk publishable key | `pk_test_example` |
| 3 | CLERK_SECRET_KEY | Clerk secret key | `sk_test_example` |
| 4 | NEXT_PUBLIC_API_URL | API URL backend | `https://example.com` or `http://localhost:4000` |
| 5 | NEXT_PUBLIC_SUPABASE_URL | Supabase URL | `https://example.supabase.co` |
| 6 | NEXT_PUBLIC_SUPABASE_ANON_KEY | Supabase anonymous key | `example` |
| 7 | NEXT_PUBLIC_SERVICE_ROLE_KEY | Supabase service role key | `example` |
| 8 | NEXT_PUBLIC_CHATBOT_URL | Chatbot URL | `https://www.example.com/embed.min.js` |
| 9 | NEXT_PUBLIC_CHATBOT_ID | Chatbot ID | `example_id` |

---

## Development

- Step 1: Clone the repository.

  ```bash
  git clone https://github.com/lzaycoe/brainbox-frontend.git
  ```

- Step 2: Install dependencies

  ```bash
  cd brainbox-frontend
  pnpm install
  ```

- Step 3: Create `.env` file and add the environment variables mentioned above.

- Step 4: Run the development server.

  ```bash
  pnpm run dev
  ```
