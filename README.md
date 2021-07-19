# 🦄 unicorn

A search for the unicorns in the wild universe of SumUp

## Stack

This project was bootstrapped from the [`next-firebase-auth`](https://github.com/gladly-team/next-firebase-auth/tree/main/example) example.

It uses:

- [Next.js](https://nextjs.org/): a React-based frontend framework
- [Firebase](https://firebase.google.com/): auth, data persistence
- [Circuit UI](https://circuit.sumup.com): SumUp's component library

## Local development

### Setup

You need to add the Firebase environment variables to your local environment in order to run the app:

1. Copy the `.env.local.example` file to `.env.local` to set up your local development environment
2. Add the secret keys shared via 1Password to the file (if you're not in the Vault, ask [#hack-week-2021-unicorn](https://sumup.slack.com/archives/C028G0Y5482) for access)

### Run the app

```bash
# install dependencies
yarn
# start the Next.js dev server
yarn dev
# view the app at localhost:3000
```

### Notes

- Lint/format the code easily with the `yarn lint` (eslint) and `yarn format` (prettier) scripts
- TypeScript or JavaScript? Yes

🌈
