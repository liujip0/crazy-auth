# @liujip0/crazy-auth

My entry into [Authly](https://authly.hackclub.com/home.html)!

The app itself is a simple site where users can make posts that show up on a global feed.

## How authentication works

Instead of users creating a password like normal, this app has them choose an OS, and then drag and drop apps into a dock/taskbar. Internally, the OS name and the app names are concatenated together, then treated as a normal password.

## Technologies used

For this project, I used Vite + TS + React to make the frontend, and Cloudflare Workers + TS to make the backend. The communication between them is done using tRPC.
