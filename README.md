# Suyu website

This project contains the source code for the Suyu website, found at [suyu.dev](https://suyu.dev)


## Developing
If you are deeloping, please take note of the `.env.example` & the secrets config (found at src/lib/server/secrets/secrets.example.json). 
At minimum, please make sure to clone the `secrets.example.json` file and rename it to `secrets.json`. Otherwise, the project will not run or build (you don't have to edit the values to get it running, but you can if you'd like).


Once you've installed dependencies with `npm install` (or `pnpm install` or `yarn`), you can start a development server by running:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of our app, you can run:

```bash
npm run build
```

