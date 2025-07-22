# 😜 tiny-yurl

A personal link shortening service.

> 🛠️ Built with: [NextJS](https://nextjs.org/), [Redis](https://redis.io/), [TailwindCSS](https://tailwindcss.com/), and [Vitest](https://vitest.dev/).

- [See it in action](#see-it-in-action)
- [Play with it locally](#play-with-it-locally)
- [Running the tests](#running-the-tests)

## See it in action

**tiny-yurl** is deployed live in [Vercel](https://vercel.com/).  You can visit the following link to try it out:

> [https://tiny-yurl.vercel.app](https://tiny-yurl.vercel.app)

## Play with it locally

**Note:** To run it locally, you'll need [latest Node.js](https://github.com/nvm-sh/nvm) and [Docker](https://www.docker.com/) installed.

First run the following:

```bash
npm i
docker compose up -d
npm run dev
```

Then access the service at [http://localhost:3000](http://localhost:3000).


## Running the tests

**Note:** You'll need Redis up and running before you can run the tests.

Run the following to execute the tests and watch for file changes:

```bash
docker compose up -d
npm run test
```
