# @liujip0/crazy-auth

My entry into [Authly](https://authly.hackclub.com/home.html)!

The app itself is a simple site where users can make posts that show up on a global feed.

## How authentication works

Instead of users creating a password like normal, this app has them choose an OS, and then drag and drop apps into a dock/taskbar.

Internally, the OS name and the app names are concatenated together, then treated as a normal password.

## Technologies used

For this project, I used Vite + TS + React to make the frontend, and Cloudflare Workers + TS to make the backend. The communication between them is done using tRPC.

## Setup for local testing

These instructions are for local development/testing only. You can find a production version of this app at [https://liujip0.github.io/crazy-auth/](https://liujip0.github.io/crazy-auth/).

### Prerequisites

```text
node >= 22.14.0
npm >= 11.3.0
pnpm >= 10.15.0
```

### 1. Clone repo locally

```zsh
git clone https://github.com/liujip0/crazy-auth.git
cd crazy-auth
```

### 2. Install dependencies

```zsh
pnpm install
```

### 3. Create local environment files

Mac/Linux:

```zsh
pnpm create-environment
```

Windows:

```zsh
pnpm create-environment-windows
```

### 4. Start local development server

```zsh
pnpm dev
```

The frontend will be on `localhost:5176` and the backend will be on `localhost:8789`.
